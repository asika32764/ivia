/**
 * Part of Sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

import Sparrow from "./sparrow";

let $ = window.jQuery || window.Zepto || window.$ || null;

if ($) {
  Sparrow.$ = $;
}

export default Sparrow;
