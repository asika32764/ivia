/**
 * Part of Sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    The MIT License (MIT)
 */

import Sparrow from "./sparrow";
import { inBrowser } from "./util/environment";

if (inBrowser) {
  let $ = window.jQuery || window.Zepto || window.$ || null;

  if ($) {
    Sparrow.$ = $;
  }
}

export default Sparrow;
