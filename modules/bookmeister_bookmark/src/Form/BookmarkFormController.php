<?php
/**
 * @file
 * Definition of Drupal\foo_bar\Form\FooBarFormController.
 */

namespace Drupal\bookmeister_bookmark\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for editing Bookmark entities.
 */
class BookmarkFormController extends ContentEntityForm {
  /**
   * Overrides Drupal\Core\Entity\EntityForm::form().
   *
   * {@inheritDoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $bookmark = $this->entity;

    $form['url'] = array(
      '#type' => 'url',
      '#title' => $this->t('URL'),
      '#default_value' => $bookmark->getUrl(),
      '#required' => TRUE,
    );

    $form['title'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Title'),
      '#default_value' => $bookmark->getTitle(),
    );

    return parent::form($form, $form_state, $bookmark);
  }
}
