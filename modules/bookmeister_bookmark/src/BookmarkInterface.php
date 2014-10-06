<?php
/**
 * @file
 * Contains \Drupal\bookmeister_bookmark\BookmarkInterface.
 */

namespace Drupal\bookmeister_bookmark;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityTypeInterface;

interface BookmarkInterface extends EntityInterface {
  /**
   * Returns the identifier.
   *
   * @return int
   *   The entity identifier.
   */
  public function id();

  /**
   * Returns the entity UUID (Universally Unique Identifier).
   *
   * The UUID is guaranteed to be unique and can be used to identify an entity
   * across multiple systems.
   *
   * @return string
   *   The UUID of the entity.
   */
  public function uuid();

  /**
   * Return the URL.
   *
   * @return string
   *   The content of the field.
   */
  public function getUrl();

  /**
   * Return the bookmark's title, if any.
   *
   * @return string|NULL
   *   Title, if set. May be NULL.
   */
  public function getTitle();

  /**
   * Defines the base fields of the entity type.
   *
   * @param EntityTypeInterface $entity_type
   *   Name of the entity type
   *
   * @return \Drupal\Core\Field\FieldDefinitionInterface[]
   *   An array of entity field definitions, keyed by field name.
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type);
}
