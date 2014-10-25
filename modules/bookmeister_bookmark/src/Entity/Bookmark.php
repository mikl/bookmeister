<?php
/**
 * @file
 * Definition of Drupalbookmeister_bookmark\Entity\Bookmark.
 */

namespace Drupal\bookmeister_bookmark\Entity;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\bookmeister_bookmark\BookmarkInterface;


/**
 * Defines the file entity class.
 *
 * @ContentEntityType(
 *   id = "bookmeister_bookmark",
 *   label = @Translation("Bookmark entity"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\bookmeister_bookmark\Entity\Controller\BookmarkListBuilder",
 *
 *     "form" = {
 *       "add" = "Drupal\bookmeister_bookmark\Entity\Form\BookmarkFormController",
 *       "edit" = "Drupal\bookmeister_bookmark\Entity\Form\BookmarkFormController",
 *       "delete" = "Drupal\bookmeister_bookmark\Entity\Form\BookmarkDeleteForm",
 *     }
 *   },
 *   base_table = "bookmeister_bookmarks",
 *   admin_permission = "admin_bookmeister_bookmark",
 *   fieldable = TRUE,
 *   translatable = FALSE,
 *   entity_keys = {
 *     "id" = "bookmark_id",
 *     "label" = "title",
 *     "uuid" = "uuid"
 *   },
 *   links = {
 *     "canonical" = "bookmeister_bookmark.view",
 *     "edit-form" = "bookmeister_bookmark.edit",
 *     "admin-form" = "bookmeister_bookmark.settings",
 *     "delete-form" = "bookmeister_bookmark.delete"
 *   }
 * )
 */
class Bookmark extends ContentEntityBase implements BookmarkInterface {
  /**
   * {@inheritDoc}
   */
  public function id() {
    return $this->get('bookmark_id')->value;
  }

  /**
   * {@inheritDoc}
   */
  public function getUrl() {
    return $this->get('url')->value;
  }

  /**
   * {@inheritDoc}
   */
  public function getTitle() {
    return $this->get('title')->value;
  }
  /**
   * {@inheritDoc}
   */
  public function label() {
    $name = $this->get('title')->value;

    if (empty($name)) {
      $name = $this->get('url')->value;
    }

    return $name;
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields['bookmark_id'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Bookmark ID'))
      ->setDescription(t('The bookmark ID.'))
      ->setReadOnly(TRUE)
      ->setSetting('unsigned', TRUE);

    $fields['uuid'] = BaseFieldDefinition::create('uuid')
      ->setLabel(t('UUID'))
      ->setDescription(t('The bookmark UUID.'))
      ->setReadOnly(TRUE);

    $fields['url'] = BaseFieldDefinition::create('uri')
      ->setLabel(t('URL'))
      ->setDescription(t('URL for the bookmark.'));

    $fields['title'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Title'))
      ->setDescription(t('Title for the bookmark.'));

    $fields['description'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Description'))
      ->setDescription(t('Description for the bookmark.'));

    return $fields;
  }
}
