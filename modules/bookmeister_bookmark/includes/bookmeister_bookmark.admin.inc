<?php
/**
 * @file
 * Admin forms and callbacks for newsletter module.
 */

/**
 * UI controller class for the admin interface.
 */
class BookmeisterBookmarkAdminUIController extends EntityDefaultUIController {
}

/**
 * Form for creating and editing newsletter entities.
 */
function bookmeister_bookmark_form(array $form, array &$form_state, BookmeisterBookmark $bookmark = NULL) {
  if (empty($bookmark)) {
    $bookmark = entity_create('bookmeister_bookmark', array());
  }

  $form['url'] = array(
    '#type' => 'textfield',
    '#title' => t('URL'),
    '#default_value' => $bookmark->url,
    '#required' => TRUE,
  );

  $form['title'] = array(
    '#type' => 'textfield',
    '#title' => t('Title'),
    '#default_value' => $bookmark->title,
  );

  $form['description'] = array(
    '#type' => 'textarea',
    '#title' => t('Description'),
    '#default_value' => $bookmark->description,
  );

  // Add the field related form elements.
  field_attach_form('bookmeister_bookmark', $bookmark, $form, $form_state);

  $form['buttons']['save'] = array(
    '#type' => 'submit',
    '#value' => t('Save bookmark'),
  );

  $form['buttons']['cancel'] = array(
    '#type' => 'submit',
    '#value' => t('Cancel'),
    '#submit' => array('bookmeister_bookmark_form_submit_cancel'),
  );

  $form_state['bookmark'] = $bookmark;

  return $form;
}

/**
 * Submit handler for bookmeister_bookmark_form().
 */
function bookmeister_bookmark_form_submit(&$form, &$form_state) {
  $bookmark = entity_ui_form_submit_build_entity($form, $form_state);

  $bookmark->save();

  // Confirm creation and redirect to the new newsletter page.
  drupal_set_message(t('Bookmark %bookmark was successfully saved.', array('%bookmark' => entity_label('bookmeister_bookmark', $bookmark))));

  $form_state['redirect'] = BOOKMEISTER_BOOKMARK_ADMIN_BASE_PATH;
}

/**
 * Submit handler for the newsletter cancel button.
 */
function bookmeister_bookmark_form_submit_cancel($form, &$form_state) {
  $form_state['redirect'] = BOOKMEISTER_BOOKMARK_ADMIN_BASE_PATH;
}
