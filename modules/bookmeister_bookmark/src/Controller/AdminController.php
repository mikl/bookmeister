<?php

/**
 * @file
 * Contains \Drupal\bookmeister_bookmark\Controller\AdminController.
 */

namespace Drupal\bookmeister_bookmark\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Form\FormBuilderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Returns responses for bookmeister_bookmark module administrative routes.
 */
class AdminController extends ControllerBase {

  /**
   * The form builder.
   *
   * @var \Drupal\Core\Form\FormBuilderInterface
   */
  protected $formBuilder;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('form_builder')
    );
  }

  /**
   * Constructs an AdminController object.
   *
   * @param \Drupal\Core\Form\FormBuilderInterface $form_builder
   *   The form builder.
   */
  public function __construct(FormBuilderInterface $form_builder) {
    $this->formBuilder = $form_builder;
  }

  /**
   * Presents an administrative bookmeister_bookmark listing.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request of the page.
   * @param string $type
   *   The type of the overview form ('approval' or 'new') default to 'new'.
   *
   * @return array
   *   Then bookmeister_bookmark multiple delete confirmation form or the bookmeister_bookmarks overview
   *   administration form.
   */
  public function adminPage(Request $request, $type = 'new') {
    if ($request->request->get('operation') == 'delete' && $request->request->get('bookmeister_bookmarks')) {
      return $this->formBuilder->getForm('\Drupal\bookmeister_bookmark\Form\ConfirmDeleteMultiple', $request);
    }
    else {
      return $this->formBuilder->getForm('\Drupal\bookmeister_bookmark\Form\BookmarkAdminOverview', $type);
    }
  }

}
