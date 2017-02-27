/**
 * Part of sparrow project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    The MIT License (MIT)
 */

import Utilities from "../util/utilities";
import Sparrow from "../sparrow";

export default function createElement (name, attrs = {}, content = null) {
  const ele = document.createElement(name);

  for (let key in attrs) {
    const value = attrs[key];

    ele.setAttribute(key, value);
  }

  addContent(ele, content);

  return ele;
}

function addContent (ele, content) {
  if (content !== null) {
    if (typeof content === 'string' || typeof content === 'number') {
      ele.append(content);
    } else if (content instanceof Element) {
      ele.appendChild(content);
    } else if (content instanceof Sparrow.$ || Utilities.isJquery(content)) {
      content.each(function () {
        ele.appendChild(this);
      });
    } else if (Array.isArray(content) || typeof content === 'object') {
      for (let k in content) {
        addContent(ele, content[k]);
      }
    }
  }
}
