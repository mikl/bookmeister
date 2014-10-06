<?php
/**
 * @file
 * Contains \Drupal\bookmeister_bookmark\BookmarkViewsData.
 */

namespace Drupal\bookmeister_bookmark;

use Drupal\views\EntityViewsData;

/**
 * Provides views data for the file entity type.
 */
class BookmarksViewData extends EntityViewsData{
  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    //@TODO: implement this

    return $data;
  }
}
