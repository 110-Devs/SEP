import { finder } from '@medv/finder';

/* eslint-disable prefer-rest-params */
/**
 * domJSON.js: A simple framework for converting DOM nodes to special JSON objects, and vice versa
 * Rewritten for TypeScript and removed module initialization. Import required to use the logic.
 * 
 * @fileOverview
 * @author  Alex Zaslavsky, Ruben the G.O.A.T
 * @version 0.1.2
 * @license The MIT License: Copyright (c) 2013 Alex Zaslavsky
 */

/**
 * domJSON is a global variable to store two methods: `.toJSON()` to convert a DOM Node into a JSON object, and `.toDOM()` to turn that JSON object back into a DOM Node
 * @namespace domJSON
 * @global
 */
export const domJSON: any = {};

/**
 * An object specifying a list of fields and how to filter it, or an array with the first value being an optional boolean to convey the same information
 * @typedef {Object|Array} FilterList
 * @property {boolean} [exclude=false] If this is set to `true`, the `filter` property will specify which fields to exclude from the result (boolean difference), not which ones to include (boolean intersection)
 * @property {string[]} values An array of strings which specify the fields to include/exclude from some broader list
 */

/**
 * Default options for creating the JSON object
 * @private
 * @ignore
 */
const defaultsForToJSON = {
  absolutePaths: ['action', 'data', 'href', 'src'],
  attributes: true,
  computedStyle: false,
  cull: true,
  deep: true,
  domProperties: true,
  filter: false,
  htmlOnly: false,
  metadata: true,
  serialProperties: false,
  stringify: false,
  allowDangerousElements: false,
};

/**
 * A list of disallowed HTMLElement tags - there is no flexibility here, these cannot be processed by domJSON for security reasons!
 * @private
 * @ignore
 */
const banned = ['link', 'script']; //Consider (maybe) adding the following tags: iframe, html, audio, video, object

/**
 * A list of node properties that must be copied if they exist; there is no user option that will remove these
 * @private
 * @ignore
 */
const required = ['nodeType', 'nodeValue', 'tagName'];

/**
 * A list of node properties to specifically avoid simply copying; there is no user option that will allow these to be copied directly
 * @private
 * @ignore
 */
const ignored = [
  'attributes',
  'childNodes',
  'children',
  'classList',
  'dataset',
  'style',
];

/**
 * A list of serialized read-only nodes to ignore; these can ovewritten if the user specifies the "filter" option
 * @private
 * @ignore
 */
const serials = [
  'innerHTML',
  'innerText',
  'outerHTML',
  'outerText',
  'prefix',
  'text',
  'textContent',
  'wholeText',
];

/**
 * Utility function to extend an object - useful for synchronizing user-submitted options with default values; same API as underscore extend
 * @param {Object} [target] The object that will be extended
 * @param {...Object} [added] Additional objects that will extend the target
 * @private
 * @ignore
 */
const extend: any = function (target: any) {
  if (!arguments.length) {
    return arguments[0] || {};
  }

  //Overwrite matching properties on the target from the added object
  for (const p in arguments[1]) {
    target[p] = arguments[1][p];
  }

  //If we have more arguments, run the function recursively
  if (arguments.length > 2) {
    const moreArgs = [target].concat(Array.prototype.slice.call(arguments, 2));
    // eslint-disable-next-line prefer-spread
    return extend.apply(null, moreArgs);
  } else {
    return target;
  }
};

/**
 * Get all of the unique values (in the order they first appeared) from one or more arrays
 * @param {...Array} constituent An array to combine into a larger array of unique values
 * @private
 * @ignore
 */
const unique = function (...args: any) {
  if (!arguments.length) {
    return [];
  }

  // eslint-disable-next-line prefer-const
  let all = Array.prototype.concat.apply([], args);
  for (let a = 0; a < all.length; a++) {
    if (all.indexOf(all[a]) < a) {
      all.splice(a, 1);
      a--;
    }
  }
  return all;
};

/**
 * Make a shallow copy of an object or array
 * @param {Object|string[]} item The object/array that will be copied
 * @private
 * @ignore
 */
const copy = function (item: any) {
  if (item instanceof Array) {
    return item.slice();
  } else {
    // eslint-disable-next-line prefer-const
    let output: any = {};
    for (const i in item) {
      output[i] = item[i];
    }
    return output;
  }
};

/**
 * Do a boolean intersection between an array/object and a filter array
 * @param {Object|string[]} item The object/array that will be intersected with the filter
 * @param {boolean|string[]} filter Specifies which properties to select from the "item" (or element to keep, if "item is an array")
 * @private
 * @ignore
 */
const boolInter = function (item: any, filter: any) {
  let output: any;
  if (item instanceof Array) {
    output = unique(
      item.filter(function (val) {
        return filter.indexOf(val) > -1;
      })
    );
  } else {
    output = {};
    for (const f in filter) {
      // eslint-disable-next-line no-prototype-builtins
      if (item.hasOwnProperty(filter[f])) {
        output[filter[f]] = item[filter[f]];
      }
    }
  }
  return output;
};

/**
 * Do a boolean difference between an array/object and a filter array
 * @param {Object|string[]} item The object/array that will be differntiated with the filter
 * @param {boolean|string[]} filter Specifies which properties to exclude from the "item" (or element to remove, if "item is an array")
 * @private
 * @ignore
 */
const boolDiff = function (item: any, filter: any) {
  let output: any;
  if (item instanceof Array) {
    output = unique(
      item.filter(function (val) {
        return filter.indexOf(val) === -1;
      })
    );
  } else {
    output = {};
    for (const i in item) {
      output[i] = item[i];
    }
    for (const f in filter) {
      // eslint-disable-next-line no-prototype-builtins
      if (output.hasOwnProperty(filter[f])) {
        delete output[filter[f]];
      }
    }
  }
  return output;
};

/**
 * Determine whether we want to do a boolean intersection or difference
 * @param {Object|string[]} item The object/array that will be differntiated with the filter
 * @param {boolean|Array} filter Specifies which a filter behavior; if it is an array, the first value can be a boolean, indicating whether the filter array is intended for differentiation (true) or intersection (false)
 * @private
 * @ignore
 */
const boolFilter = function (item: any, filter: any) {
  //A "false" filter means we return an empty copy of item
  if (filter === false) {
    return item instanceof Array ? [] : {};
  }

  if (filter instanceof Array && filter.length) {
    if (typeof filter[0] === 'boolean') {
      if (filter.length == 1 && typeof filter[0] === 'boolean') {
        //There is a filter array, but its only a sigle boolean
        if (filter[0] === true) {
          return copy(item);
        } else {
          return item instanceof Array ? [] : {};
        }
      } else {
        //The filter operation has been set explicitly; true = difference
        if (filter[0] === true) {
          return boolDiff(item, filter.slice(1));
        } else {
          return boolInter(item, filter.slice(1));
        }
      }
    } else {
      //There is no explicit operation on the filter, meaning it defaults to an intersection
      return boolInter(item, filter);
    }
  } else {
    return copy(item);
  }
};

/**
 * Ensure that a FilterList type input is converted into its shorthand array form
 * @param {boolean|FilterList} filterList The FilterList, or boolean, that will converted into the shorthand form
 * @private
 * @ignore
 */
const toShorthand = function (filterList: any) {
  let outputArray;
  if (typeof filterList === 'boolean') {
    return filterList;
  } else if (typeof filterList === 'object' && filterList !== null) {
    if (filterList instanceof Array) {
      return filterList.filter(function (v, i) {
        return typeof v === 'string' || (i === 0 && v === true) ? true : false;
      });
    } else {
      if (!(filterList.values instanceof Array)) {
        return false;
      }

      outputArray = filterList.values.filter(function (v: any) {
        return typeof v === 'string' ? true : false;
      });

      if (!outputArray.length) {
        return false;
      }

      if (filterList.exclude) {
        outputArray.unshift(filterList.exclude);
      }
      return outputArray;
    }
  } else if (filterList) {
    return true;
  }
  return false;
};

/**
 * Check if the supplied string value is a relative path, and convert it to an absolute one if necessary; the segment processing paths leading with "../" was inspired by: http://stackoverflow.com/a/14780463/2230156
 * @param {string} value The value that might be a relative path, and would thus need conversion
 * @param {Object} origin The origin URL from which to which non-absolute paths are relative
 * @private
 * @ignore
 */
const toAbsolute = function (value: any, origin: any) {
  let protocol, stack, parts;
  //Sometimes, we get lucky and the DOM Node we're working on already has the absolute URL as a DOM property, so we can just use that
  /*if (node[name]){
              //We can just grab the compiled URL directly from the DOM element - easy peasy
              var sub = node[name].indexOf(value);
              if (sub !== -1) {
                  return node[name];
              }
          }*/

  //Check to make sure we don't already have an absolute path, or even a dataURI
  // eslint-disable-next-line no-useless-escape
  if (value.match(/(?:^data\:|^[\w\-\+\.]*?\:\/\/|^\/\/)/i)) {
    return value;
  }

  //If we are using the root URL, start from there
  if (value.charAt(0) === '/') {
    return origin + value.substr(1);
  }

  //Uh-oh, the relative path is leading with a single or double dot ("./" or "../"); things get a bit harder...
  // eslint-disable-next-line prefer-const
  protocol =
    origin.indexOf('://') > -1
      ? origin.substring(0, origin.indexOf('://') + 3)
      : '';
  // eslint-disable-next-line prefer-const
  stack = (protocol.length ? origin.substring(protocol.length) : origin).split(
    '/'
  );
  // eslint-disable-next-line prefer-const
  parts = value.split('/');

  //The value after the last slash is ALWAYS considered a filename, not a directory, so always have trailing slashes on paths ending at directories!
  stack.pop();

  //Cycle through the relative path, changing the stack as we go
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] == '.') {
      continue;
    }
    if (parts[i] == '..') {
      if (stack.length > 1) {
        stack.pop();
      }
    } else {
      stack.push(parts[i]);
    }
  }
  return protocol + stack.join('/');
};

/**
 * Create a copy of a node's properties, ignoring nasty things like event handles and functions
 * @param {Node} node The DOM Node whose properties will be copied
 * @param {Object} [opts] The options object passed down from the .toJSON() method; includes all options, even those not relevant to this function
 * @private
 * @ignore
 */
const copyJSON = function (node: any, opts: any) {
  let copy: any = {};
  //Copy all of the node's properties
  for (const n in node) {
    //Make sure this property can be accessed
    try {
      //accessing `selectionDirection6`, `selectionStart`, or `selectionEnd` throws in WebKit-based browsers
      node[n];
    } catch (e) {
      continue;
    }
    //Make sure this is an own property, and isn't a live javascript function for security reasons
    if (
      typeof node[n] !== 'undefined' &&
      typeof node[n] !== 'function' &&
      n.charAt(0).toLowerCase() === n.charAt(0)
    ) {
      //Only allowed objects are arrays
      if (typeof node[n] !== 'object' || node[n] instanceof Array) {
        //If we are eliminating empty fields, make sure this value is not NULL or UNDEFINED
        if (opts.cull) {
          if (node[n] || node[n] === 0 || node[n] === false) {
            copy[n] = node[n];
          }
        } else {
          copy[n] = node[n];
        }
      }
    }
  }

  copy = boolFilter(copy, opts.domProperties);
  return copy;
};

/**
 * Convert the attributes property of a DOM Node to a JSON ready object
 * @param {Node} node The DOM Node whose attributes will be copied
 * @param {Object} [opts] The options object passed down from the .toJSON() method; includes all options, even those not relevant to this function
 * @private
 * @ignore
 */
const attrJSON = function (node: any, opts: any) {
  let attributes: any = {};
  const attr = node.attributes;
  const length = attr.length;
  let absAttr;

  for (let i = 0; i < length; i++) {
    attributes[attr[i].name] = attr[i].value;
  }

  //Author: Ruben a.k.a the GOAT
  //Inserting custom attribute "data-selector" with the selector of the element as the value.
  //attributes['data-selector'] = finder(node);

  attributes = opts.attributes ? boolFilter(attributes, opts.attributes) : null;

  //Add the attributes object, converting any specified absolute paths along the way
  // eslint-disable-next-line prefer-const
  absAttr = boolFilter(attributes, opts.absolutePaths);
  for (const i in absAttr) {
    attributes[i] = toAbsolute(absAttr[i], opts.absoluteBase);
  }

  return attributes;
};

/**
 * Convert a single DOM Node into a simple object
 * @param {Node} node The DOM Node that will be converted
 * @param {Object} [opts] The options object passed down from the .toJSON() method; includes all options, even those not relevant to this function
 * @private
 * @ignore
 */
const toJSON = function (node: any, opts: any, depth: any) {
  let kids,
    kidCount,
    thisChild,
    children,
    // eslint-disable-next-line prefer-const
    copy = copyJSON(node, opts);

  //Per default, some tags are not allowed
  if (node.nodeType === 1) {
    if (!opts.allowDangerousElements) {
      for (const b in banned) {
        if (node.tagName.toLowerCase() === banned[b]) {
          return null;
        }
      }
    }
  } else if (node.nodeType === 3 && !node.nodeValue.trim()) {
    //Ignore empty buffer text nodes
    return null;
  }

  //Copy all attributes and styles, if allowed
  if (opts.attributes && node.attributes) {
    copy.attributes = attrJSON(node, opts);
  }

  //Should we continue iterating?
  if (
    opts.deep === true ||
    (typeof opts.deep === 'number' && opts.deep > depth)
  ) {
    //We should!
    children = [];
    kids = opts.htmlOnly ? node.children : node.childNodes;
    kidCount = kids.length;
    for (let c = 0; c < kidCount; c++) {
      thisChild = toJSON(kids[c], opts, depth + 1);
      if (thisChild) {
        children.push(thisChild);
      }
    }

    //Append the children in the appropriate place
    copy.childNodes = children;
  }
  return copy;
};

/**
 * Take a DOM node and convert it to simple object literal (or JSON string) with no circular references and no functions or events
 * @param {Node} node The actual DOM Node which will be the starting point for parsing the DOM Tree
 * @param {Object} [opts] A list of all method options
 * @param {boolean} [opts.allowDangerousElements=`false`] Use `true` to parse the potentially dangerous elements `<link>` and `<script>`
 * @param {boolean|FilterList} [opts.absolutePaths=`'action', 'data', 'href', 'src'`] Only relevant if `opts.attributes` is not `false`; use `true` to convert all relative paths found in attribute values to absolute paths, or specify a `FilterList` of keys to boolean search
 * @param {boolean|FilterList} [opts.attributes=`true`] Use `true` to copy all attribute key-value pairs, or specify a `FilterList` of keys to boolean search
 * @param {boolean|FilterList} [opts.computedStyle=`false`] Use `true` to parse the results of "window.getComputedStyle()" on every node (specify a `FilterList` of CSS properties to be included via boolean search); this operation is VERY costly performance-wise!
 * @param {boolean} [opts.cull=`false`] Use `true` to ignore empty element properties
 * @param {boolean|number} [opts.deep=`true`] Use `true` to iterate and copy all childNodes, or an INTEGER indicating how many levels down the DOM tree to iterate
 * @param {boolean|FilterList} [opts.domProperties=true] 'false' means only 'tagName', 'nodeType', and 'nodeValue' properties will be copied, while a `FilterList` can specify DOM properties to include or exclude in the output (except for ones which serialize the DOM Node, which are handled separately by `opts.serialProperties`)
 * @param {boolean} [opts.htmlOnly=`false`] Use `true` to only iterate through childNodes where nodeType = 1 (aka, instances of HTMLElement); irrelevant if `opts.deep` is `true`
 * @param {boolean} [opts.metadata=`false`] Output a special object of the domJSON class, which includes metadata about this operation
 * @todo {boolean|FilterList} [opts.parse=`false`] a `FilterList` of properties that are DOM nodes, but will still be copied **PLANNED**
 * @param {boolean|FilterList} [opts.serialProperties=`true`] Use `true` to ignore the properties that store a serialized version of this DOM Node (ex: outerHTML, innerText, etc), or specify a `FilterList` of serial properties (no boolean search!)
 * @param {boolean} [opts.stringify=`false`] Output a JSON string, or just a JSON-ready javascript object?
 * @return {Object|string} A JSON-friendly object, or JSON string, of the DOM node -> JSON conversion output
 * @method
 * @memberof domJSON
 */
domJSON.toJSON = function (node: any, opts: any) {
  let copy,
    options: any = {},
    output = {};
  const timer = new Date().getTime();
  const requiring = required.slice();
  let ignoring: any = ignored.slice();

  //Update the default options w/ the user's custom settings
  options = extend({}, defaultsForToJSON, opts);

  //Convert all options that accept FilterList type inputs into the shorthand notation
  options.absolutePaths = toShorthand(options.absolutePaths);
  options.attributes = toShorthand(options.attributes);
  options.computedStyle = toShorthand(options.computedStyle);
  options.domProperties = toShorthand(options.domProperties);
  options.serialProperties = toShorthand(options.serialProperties);

  //Make sure there is a base URL for absolute path conversions
  //options.absoluteBase = win.location.origin + "/";

  //Make lists of which DOM properties to skip and/or which are absolutely necessary
  if (options.serialProperties !== true) {
    if (
      options.serialProperties instanceof Array &&
      options.serialProperties.length
    ) {
      if (options.serialProperties[0] === true) {
        ignoring = ignoring.concat(boolDiff(serials, options.serialProperties));
      } else {
        ignoring = ignoring.concat(
          boolInter(serials, options.serialProperties)
        );
      }
    } else {
      ignoring = ignoring.concat(serials);
    }
  }
  if (options.domProperties instanceof Array) {
    if (options.domProperties[0] === true) {
      options.domProperties = boolDiff(
        unique(options.domProperties, ignoring),
        requiring
      );
    } else {
      options.domProperties = boolDiff(
        unique(options.domProperties, requiring),
        ignoring
      );
    }
  } else {
    if (options.domProperties === false) {
      options.domProperties = requiring;
    } else {
      options.domProperties = [true].concat(ignoring);
    }
  }

  //Transform the node into an object literal
  // eslint-disable-next-line prefer-const
  copy = toJSON(node, options, 0);

  //Wrap our copy object in a nice object of its own to save some metadata
  output = copy;

  return output;
};
