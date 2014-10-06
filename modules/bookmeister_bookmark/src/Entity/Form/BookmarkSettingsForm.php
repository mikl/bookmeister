<?php
/**
 * @file
 * Defines Drupal\bookmeister_bookmark\Entity\Form\BookmarkSettingsForm.
 */
namespace Drupal\bookmeister_bookmark\Entity\Form;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
class BookmarkSettingsForm extends FormBase {
  /**
   * Returns a unique string identifying the form.
   *
   * @return string
   *   The unique string identifying the form.
   */
  public function getFormId() {
    return 'bookmeister_bookmark_settings';
  }
  /**
   * Form submission handler.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param FormStateInterface $form_state
   *   An associative array containing the current state of the form.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Empty implementation of the abstract submit class.
  }
  /**
   * Define the form used for Bookmark settings.
   * @return array
   *   Form definition array.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param FormStateInterface $form_state
   *   An associative array containing the current state of the form.
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['bookmeister_bookmark_settings']['#markup'] = 'Settings form for Bookmark. Manage field settings here.';
    return $form;
  }
}
