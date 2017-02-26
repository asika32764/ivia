/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */
import Utilities from "../util/utilities";

export default class FormHelper {
  static isFormElement ($element) {
    const tag = Utilities.isJquery($element) ? $element[0].tagName : $element.tagName;

    return [FormHelper.INPUT, FormHelper.SELECT, FormHelper.TEXTAREA].indexOf(tag) !== -1;
  }

  static update ($element, value) {
    const method = 'update' + $element[0].tagName;

    FormHelper[method]($element, value);
  }

  static updateINPUT($element, value) {
    switch ($element.attr('type')) {
      case 'radio':
      case 'checkbox':
        $element.filter(`[value=${value}]`).prop('checked', true);
        break;
      default:
        $element.val(value);
    }
  }

  static updateTEXTAREA($element, value) {
    $element.val(value);
  }

  static updateSELECT($element, value) {
    $element.val(value);
  }
}

FormHelper.INPUT = 'INPUT';
FormHelper.SELECT = 'SELECT';
FormHelper.TEXTAREA = 'TEXTAREA';
