# Multi-level stack navigation (jQuery mlStackNav)
> Customizable, accessible, easy-to-use multi-level stack navigation menu.

## Demo

https://damianwajer.github.io/ml-stack-nav/

## Requirements

- [jQuery](https://github.com/jquery/jquery)

## Usage

Add required styles:    

```html
<link rel="stylesheet" href="dist/ml-stack-nav.css">
```

Include jQuery (tested with v1.12.4 and above): 

```html
<script src="//code.jquery.com/jquery-1.12.4.min.js"></script>
```

…and the plugin JS file:

```html
<script src="dist/ml-stack-nav.js"></script>
```

Finally, initiate the plugin:
 
```javascript
$(".js-ml-stack-nav").mlStackNav();
```

Please see `index.html` file for demo and code example.

## Advanced usage

Multi-level stack navigation also supports multiple instances of the menu. 

You can use it to implement as many navigation menus as you want by simply initializing different menus with separate toggle buttons. For example:

```javascript
$(".js-ml-stack-nav").mlStackNav({
    navToggleSelector: ".js-ml-stack-nav-toggle"
});

$(".js-ml-stack-nav-2").mlStackNav({
    navToggleSelector: ".js-ml-stack-nav-2-toggle"
});
```

or by providing jQuery selector inside `data-nav-toggle` attribute:

```html
<button type="button" class="ml-stack-nav-toggle" id="ml-stack-nav-toggle-1">(…)</button>

<nav class="ml-stack-nav js-ml-stack-nav" data-nav-toggle="#ml-stack-nav-toggle-1">(…)</nav>

<button type="button" class="ml-stack-nav-toggle" id="ml-stack-nav-toggle-2">(…)</button>

<nav class="ml-stack-nav js-ml-stack-nav" data-nav-toggle="#ml-stack-nav-toggle-2">(…)</nav>
```

## Options

#### navToggleSelector

Type: `String`

Default: `.ml-stack-nav-toggle`

jQuery selector with toggle button element.

#### openClass

Type: `String`

Default: `is-open`

Class name for open menu items (also background items below current level).

#### activeClass

Type: `String`

Default: `is-active`

Class name for currently active menu item and active toggle button.

#### zIndexValue

Type: `Number`

Default: `900`

CSS z-index property for navigation menu container.

## TODO

**Features**

- add swipe support
- off-canvas mode (push)
- improve documentation (methods, events)

## Support

Please [open an issue](https://github.com/damianwajer/ml-stack-nav/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, [open a pull request](https://github.com/damianwajer/ml-stack-nav/pull/new/master).
