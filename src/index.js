/**
 * Part of Ivia project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    The MIT License (MIT)
 */

import Ivia from "./ivia";
import { inBrowser } from "./util/environment";

if (inBrowser) {
  let $ = window.jQuery || window.Zepto || window.$ || null;

  if ($) {
    Ivia.$ = $;
  }
}

export default Ivia;
