<?php
/**
 * @file
 * Entity controller class for the bookmark module.
 */

class BookmeisterBookmarkController extends EntityAPIController {
  /**
   * Called when entity is created.
   */
  public function create(array $values = array()) {
    // Add default values.
    $values += array(
      'added_at' => NULL,
      'created_at' => date('c', REQUEST_TIME),
      'url' => '',
      'title' => '',
      'description' => '',
    );

    return parent::create($values);
  }
}
