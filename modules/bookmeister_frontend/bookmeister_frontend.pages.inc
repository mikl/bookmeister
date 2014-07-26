<?php
/**
 * @file
 * Page callbacks for the Bookmeister frontend module.
 */

/**
 * Main page callback for the Bookmeister frontend application.
 */
function bookmeister_frontend_main_page() {
  $build = array();

  $build['#attached']['library'][] = array('bookmeister_frontend', 'bookmeister_frontend');

  $build[]['#markup'] = '<div class="bookmeister-frontend-placeholder">' . t('Loading application…') . '</div>';

  return $build;
}
