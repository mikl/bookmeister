<?php
/**
 * @file
 * BookmeisterBookmark entity subclass.
 */
class BookmeisterBookmark extends Entity {
  /**
   * Returns the "pretty" formatted name for the entity.
   *
   * @return string
   */
  public function defaultLabel() {
    if (!empty($this->title)) {
      return $this->title;
    }

    return $this->url;
  }

  /**
   * Returns the URL to the standard view of this entity.
   *
   * @return string
   */
  public function defaultUri() {
    return array('path' => BOOKMEISTER_BOOKMARK_ADMIN_BASE_PATH . '/manage/' . $this->identifier());
  }

  /**
   * Performs changes before entity is saved.
   */
  public function preSave() {
    // Ensure we have a UUID.
    if (empty($this->uuid)) {
      $this->uuid = uuid_generate();
    }

    // For the first creation, we add the added_at time.
    if (empty($this->added_at)) {
      $this->added_at = date('c', REQUEST_TIME);
    }
  }
}
