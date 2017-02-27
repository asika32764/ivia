# Sparrow.js

A reactive MVVM framework for jQuery Vue-like interface.

## Getting Started

### Installation

Install by npm or yarn.

``` bash
npm install sparrow --save

yarn add sparrow
```

Install by bower

```bash
bower install sparrow --save
```

Download single file for browser.

```html
<script src="js/jquery.min.js"></script>
<script src="js/sparrow.min.js"></script>
```

CDN

```html
<script src="//cdn.rawgit.com/asika32764/sparrow/00125e19/dist/sparrow.min.js"></script>
```

If you are not in browser environment, you must inject jQuery or Zepto first.

```js
import jQuery from 'jquery';

Sparrow.$ = jQuery;

// Or Zepto
Sparrow.$ = Zepto;

// Use _name to know which is in Sparrow later
Sparrow.$._name; // `jquery` or `zepto`
```

### Create Sparrow Instance

Sparrow's interface is very similar to Vue, we can create an instance and add `el`in option to select element.

```html
<div id="app"></div>

<script>
var sp = new Sparrow({
  el: '#app', // You can also use $('#app')
  data: { ... },
  methods: {
    ...
  }
});
</script>
```

Sometimes you may need to put your code before HTML `<body>`, you can add `domready` option.

```html
<head>
  <script>
  var sp = new Sparrow({
    el: '#app',
    domready: true
  });
  </script>
</head>
<body>
  <div id="app"></div>
</body>
```

Or use jQuery plugin pattern.

```js
$(function () {
  var sp = $('#app').sparrow({ ... });
});
```

## Binding Data (One-way-binding)

### Simple Binding

- API: `this.$bind(selector, dataPath, handler)`
- Handler: `function ($element, value, oldValue, arrayControl)`

Sparrow has a reactive data structure, you can bind an HTML element to a data value then if this data changed, Sparrow
will notice your handler to change DOM.

```html
<div id="app">
  <p id="flower"></p>
</div>

<script>
var sp = new Sparrow({
  el: '#app',
  data: {
    flower: {
      name: 'sakura',
      nmuber: 25 
    }
  },
  configure: function () {
    this.$bind('#flower', 'flower.name', ':text');
    this.$bind('#flower', 'flower.number', 'data-number');
  }
});
</script>
```

`$bind()` method help us bin a value to element we selected, don't worry to double selected, Sparrow will cache it.
the third argument tells Sparrow to bind the attribute to this data. This is similar to Vue `v-bind:data-number` directive. 

An attribute name start with `:` is a special control, currently we supports `:text`, `:html` and `:value`, which will
auto use jquery `.text()`, `html()` or `val()` to bind data, otherwise will use `attr()`.

> NOTE: All selector must under the root element which you set in `el:` option, Sparrow will use `this.$find()` to find
> elements only contains in root element, if you have to control outside element, inject a custom element object.
> `this.$bind(this.$('.my-outside-item'), 'flower')`

The rendered result will be:

```html
<p id="flower" data-number="25">sakura</p>
```

Now you can change data:

```js
sp.flower.name = 'rose';
```

the text in `<p>` will change to `rose`, try this in [playground](https://jsfiddle.net/asika32764/jvyzv1uc/)

### Custom Handler

You will hope to do some extra action when data changed, just bind a callback.

```js
this.$bind('#flower', 'flower.name', function ($ele, value, oldValue) {
  $ele.text(name);
  
  // Push new data to remote
  this.$.ajax(...); // this.$ is a jQuery obj reference 
  
  // Add new child to other element
  this.$find('.logs').append(
    // Sparrow provides createElement() method
    // You can still use $(`<li>...</li>`) to create element.
    Sparrow.createElement('li', {'data-number': this.flower.number}, value)  
  );
});
```

### Array Operation

If data is an array and changed by `push`, `unshift` and `splice`, there will be forth argument with control info, 
it includes `method` and `args` to help you know what has been inserted.

```js
var sp = new Sparrow({
  el: '#app',
  data: {
    items: ['a', 'b', 'c']
  },
  configure: function () {
    this.$bind('#flower', 'items', function ($ele, value, oldValue, ctrl) {
      if (ctrl) {
        switch (ctrl.method) {
          case 'push':
            ctrl.args.forEach(e => $ele.append(this.$(`<li>${e}</li>`)));
            break;
          case 'splice':
            ...
            break;
          case 'unshift':
            ...
            break;
        }
        return;
      }
      
      // Not array inserted, just refresh all
      $ele.empty();
      value.forEach(e => $ele.append(this.$(`<li>${e}</li>`)));
    });
  }
});

// Let's push a new item
sp.items.push('d');
```

## DOM Events

- API: `this.$on(selector, eventName, handler, delegate = false)`
- Handler: `function ($ele, event)`

Use `$on()` to bind DOM events to your data.

```html
<div id="app">
  <input id="flower-input" type="text" />
  <p id="flower-output"></p>
</div>

<script>
var sp = new Sparrow({
  el: '#app',
  data: {
    flower: ''
  },
  configure: function () {
    this.$on('#flower-input', 'input', function ($ele, event) {
      this.flower = $ele.val();
    });
    
    this.$bind('#flower-output', 'flower', ':text');
  }
});
</script>
```

See [example](https://jsfiddle.net/asika32764/6wgzyw0q/)

If your elements are not always on page, your JS will add or remove them, you can add `true` to forth argument to use 
jQuery delegate event binding, then jQuery will help you watch your element.

```js
this.$on('#flower-input', 'input', $ele => this.flower = $ele.val(), true);
```

## Two-Way Binding

- API: `this.$model(selector, dataPath, delegate = false)`
 
Two-way binding can only works for `input`, `textarea` and `select` now.

```html
<div id="app">
  <input id="flower-input" type="text" />
  <p id="flower-output"></p>
</div>

<script>
var sp = new Sparrow({
  el: '#app',
  data: {
    flower: ''
  },
  configure: function () {
    this.$model('#flower-input', 'flower')
      .$bind('#flower-output', 'flower', ':text');
  }
});
</script>
```
