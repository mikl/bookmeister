<?php
/**
 * @file
 * Contains \Drupal\bookmeister_bookmark\Controller\BookmarkListBuilder.
 */
namespace Drupal\bookmeister_bookmark\Controller;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
/**
 * Provides a list controller for bookmeister_bookmark entity.
 */
class BookmarkListBuilder extends EntityListBuilder {
  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['uuid'] = t('UUID');
    $header['label'] = t('Label');
    $header['url'] = t('URL');
    return $header + parent::buildHeader();
  }
  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var $entity \Drupal\bookmeister_bookmark\Entity\Bookmark */
    $row['uuid'] = $entity->uuid();
    //$row['label'] = l($this->getLabel($entity), 'foo-bar/' . $entity->id());
    $row['label'] = $this->getLabel($entity);
    $row['url'] = $entity->getUrl();
    return $row + parent::buildRow($entity);
  }
}
