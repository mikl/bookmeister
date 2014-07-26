<?php
/**
 * @file
 * bookmeister_frontend.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function bookmeister_frontend_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "services" && $api == "services") {
    return array("version" => "3");
  }
}
