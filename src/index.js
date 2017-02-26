/**
 * Part of Sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import Sparrow from "./sparrow";

let jQuery;
let Zepto;

(function ($) {
  Sparrow.$ = $;
  window.Sparrow = Sparrow;
})(jQuery || Zepto || $);
