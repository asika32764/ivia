/**
 * Part of ivia project.
 *
 * @copyright  Copyright (C) 2017 {ORGANIZATION}. All rights reserved.
 * @license    The MIT License (MIT)
 */

import Utilities from "../util/utilities";
import Ivia from "../ivia";

export default function createElement (name, attrs = {}, children = null) {
  const ele = document.createElement(name);

  for (let key in attrs) {
    const value = attrs[key];

    ele.setAttribute(key, value);
  }

  addChildren(ele, children);

  return ele;
}

function addChildren (ele, children) {
  if (children !== null) {
    if (typeof children === 'string' || typeof children === 'number') {
      ele.append(children);
    } else if (children instanceof Element) {
      ele.appendChild(children);
    } else if (children instanceof Ivia.$ || Utilities.isJquery(children)) {
      children.each(function () {
        ele.appendChild(this);
      });
    } else if (Array.isArray(children) || Utilities.isObject(children)) {
      for (let k in children) {
        let child = children[k];
        if (child.hasOwnProperty('nodeName')) {
          child = createElement(child.nodeName, child.attributes, child.children);
          ele.appendChild(child);
        } else {
          addChildren(ele, child);
        }
      }
    }
  }
}
