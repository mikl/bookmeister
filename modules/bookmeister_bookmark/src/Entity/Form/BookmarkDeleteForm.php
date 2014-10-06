<?php
/**
 * @file
 * Contains \Drupal\bookmeister_bookmark\Entity\Form\BookmarkDeleteForm
 */
namespace Drupal\bookmeister_bookmark\Entity\Form;
use Drupal\Core\Entity\ContentEntityConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
/**
 * Provides a form for deleting a bookmeister_bookmark entity.
 */
class BookmarkDeleteForm extends ContentEntityConfirmFormBase {
  /**
   * {@inheritdoc}
   */
  public function getQuestion() {
    return t('Huh? Are you sure you want to delete entity %name?', array('%name' => $this->entity->label()));
  }
  /**
   * {@inheritdoc}
   */
  public function getCancelUrl() {
    return new Url('bookmeister_bookmark.list');
  }
  /**
   * {@inheritdoc}
   */
  public function getConfirmText() {
    return t('Delete');
  }
  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->entity->delete();
    $variables = array(
      '@type' => $this->entity->bundle(),
      '%title' => $this->entity->label(),
      $variables['link'] = NULL,
    );
    \Drupal::service('logger.factory')
      ->get('content')
      ->log(WATCHDOG_NOTICE, '@type: deleted %title.', $variables);
    $form_state->setRedirectUrl($this->getCancelUrl());
  }
}
