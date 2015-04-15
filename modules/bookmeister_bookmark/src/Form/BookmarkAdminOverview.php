<?php

/**
 * @file
 * Contains \Drupal\bookmeister_bookmark\Form\BookmarkAdminOverview.
 */

namespace Drupal\bookmeister_bookmark\Form;

use Drupal\Component\Utility\Unicode;
use Drupal\Core\Datetime\DateFormatter;
use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\Core\Entity\Sql\SqlContentEntityStorage;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides the bookmeister_bookmarks overview administration form.
 */
class BookmarkAdminOverview extends FormBase {

  /**
   * The entity storage.
   *
   * @var \Drupal\Core\Entity\EntityManagerInterface
   */
  protected $entityManager;

  /**
   * The bookmeister_bookmark storage.
   *
   * @var \Drupal\Core\Entity\Sql\SqlContentEntityStorage
   */
  protected $bookmarkStorage;

  /**
   * The date formatter service.
   *
   * @var \Drupal\Core\Datetime\DateFormatter
   */
  protected $dateFormatter;

  /**
   * The module handler.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * Creates a BookmarkAdminOverview form.
   *
   * @param \Drupal\Core\Entity\EntityManagerInterface $entity_manager
   *   The entity manager service.
   * @param \Drupal\bookmeister_bookmark\BookmarkStorageInterface $bookmeister_bookmark_storage
   *   The bookmeister_bookmark storage.
   * @param \Drupal\Core\Datetime\DateFormatter $date_formatter
   *   The date formatter service.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler.
   */
  public function __construct(EntityManagerInterface $entity_manager, SqlContentEntityStorage $bookmeister_bookmark_storage, DateFormatter $date_formatter, ModuleHandlerInterface $module_handler) {
    $this->entityManager = $entity_manager;
    $this->bookmeister_bookmarkStorage = $bookmeister_bookmark_storage;
    $this->dateFormatter = $date_formatter;
    $this->moduleHandler = $module_handler;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity.manager'),
      $container->get('entity.manager')->getStorage('bookmeister_bookmark'),
      $container->get('date.formatter'),
      $container->get('module_handler')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormID() {
    return 'bookmeister_bookmark_admin_overview';
  }

  /**
   * Form constructor for the bookmeister_bookmark overview administration form.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   * @param string $type
   *   The type of the overview form ('approval' or 'new').
   *
   * @return array
   *   The form structure.
   */
  public function buildForm(array $form, FormStateInterface $form_state, $type = 'new') {

    // Build an 'Update options' form.
    $form['options'] = array(
      '#type' => 'details',
      '#title' => $this->t('Update options'),
      '#open' => TRUE,
      '#attributes' => array('class' => array('container-inline')),
    );

    $options['delete'] = $this->t('Delete the selected bookmarks');

    $form['options']['operation'] = array(
      '#type' => 'select',
      '#title' => $this->t('Action'),
      '#title_display' => 'invisible',
      '#options' => $options,
      '#default_value' => 'delete',
    );
    $form['options']['submit'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Update'),
    );

    $header = array(
      'uuid' => [
        'data' => $this->t('UUID'),
        'specifier' => 'uuid',
      ],
      'url' => array(
        'data' => $this->t('URL'),
        'specifier' => 'url',
      ),
      'title' => array(
        'data' => $this->t('Title'),
        'specifier' => 'title',
        'class' => array(RESPONSIVE_PRIORITY_MEDIUM),
      ),
      'operations' => $this->t('Operations'),
    );
    $cids = $this->bookmeister_bookmarkStorage->getQuery()
     ->tableSort($header)
     ->pager(50)
     ->execute();

    /** @var $bookmeister_bookmarks \Drupal\bookmeister_bookmark\BookmarkInterface[] */
    $bookmeister_bookmarks = $this->bookmeister_bookmarkStorage->loadMultiple($cids);

    // Build a table listing the appropriate bookmarks.
    $options = array();
    $destination = $this->getDestinationArray();

    foreach ($bookmeister_bookmarks as $bookmeister_bookmark) {
      kint($bookmeister_bookmark->url->value);
      $options[$bookmeister_bookmark->id()] = array(
        'uuid' => [
          'data' => [ '#title' => $bookmeister_bookmark->uuid->value ]
        ],
        'title' => array('data' => array('#title' => $bookmeister_bookmark->title->value ?: $bookmeister_bookmark->id())),
        'url' => array(
          'data' => array(
//            '#type' => 'link',
            '#title' => $bookmeister_bookmark->url->value,
            '#url' => $bookmeister_bookmark->url->value
          ),
        ),
      );

      //$bookmeister_bookmark_uri_options = $bookmeister_bookmark->urlInfo()->getOptions();

      $links = array();

      $links['edit'] = array(
        'title' => $this->t('Edit'),
        'url' => Url::fromRoute('entity.bookmeister_bookmark.edit_form', ['bookmeister_bookmark' => $bookmeister_bookmark->id()], ['query' => $destination]),
      );

//      $options[$bookmeister_bookmark->id()]['operations']['data'] = array(
//        '#type' => 'operations',
//        '#links' => $links,
//      );
    }

    $form['bookmeister_bookmarks'] = array(
      '#type' => 'tableselect',
      '#header' => $header,
      '#options' => $options,
      '#empty' => $this->t('No bookmarks available.'),
    );

    $form['pager'] = array('#type' => 'pager');

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $form_state->setValue('bookmeister_bookmarks', array_diff($form_state->getValue('bookmeister_bookmarks'), array(0)));
    // We can't execute any 'Update options' if no bookmeister_bookmarks were selected.
    if (count($form_state->getValue('bookmeister_bookmarks')) == 0) {
      $form_state->setErrorByName('', $this->t('Select one or more bookmeister_bookmarks to perform the update on.'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Delete operation handled in \Drupal\bookmeister_bookmark\Form\ConfirmDeleteMultiple
    // see \Drupal\bookmeister_bookmark\Controller\AdminController::adminPage().

    drupal_set_message($this->t('The update has been performed.'));
    $form_state->setRedirect('bookmeister_bookmark.admin');
  }

}
