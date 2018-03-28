# Multi-level stack navigation (jQuery mlStackNav)
> Customizable, accessible, easy-to-use multi-level stack navigation menu.

The purpose behind this project is to provide a fully functional, responsive and usable navigation with minimal styling, which can also be used as a good starting point to implement your own custom design.

## Demo

https://damianwajer.github.io/ml-stack-nav/

## Requirements

- [jQuery](https://github.com/jquery/jquery) >= 1.7

## Browser support

- All modern browsers such as Chrome, Firefox, Safari, Edge (last 2 versions) and Internet Explorer 10+
- Stock browser on Android 4.0+ and Safari on iOS 7+
- Internet Explorer 9 is also supported but without transition animations and with some additional CSS (I recommend placing IE 9 rules within conditional comment in `<head>` section of the HTML file or in some separate `.css` file with other IE 9 fixes):

```html
<!--[if IE 9]>
<style type="text/css">
    .ml-stack-nav {
        display: none;
    }
    
    .ml-stack-nav.is-open {
        display: block;
    }
</style>
<![endif]-->
```

## Download

- via [bower](https://bower.io): `bower install ml-stack-nav`
- via [npm](https://www.npmjs.com/package/ml-stack-nav): `npm install ml-stack-nav`
- from the [releases page](https://github.com/damianwajer/ml-stack-nav/releases)

## Usage

To get started just add required styles:

```html
<link rel="stylesheet" href="dist/ml-stack-nav.css">
```

Include jQuery:

```html
<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
```

…and the plugin JS file:

```html
<script src="dist/ml-stack-nav.js"></script>
```

Navigation HTML markup should be placed at the top-level position directly under the `body` element in the document to avoid the stacking context issues.

```html
<body>
    <nav class="ml-stack-nav js-ml-stack-nav">(…)</nav>
</body>
```

Please see `index.html` file for demo and code example.

Finally, initiate the plugin:
 
```javascript
$(".js-ml-stack-nav").mlStackNav();
```

The `dist/ml-stack-nav.js` and `dist/ml-stack-nav.css` files contain all what is necessary for the menu to work properly and they should not be edited directly. Unlike them, `dist/ml-stack-nav-theme.css` theme file provides example styles for the navigation and can be edited, extended or completely replaced with your own styles (the minified files `.min.css` and `.min.js` are also available in `dist` directory and you can use them on production instead of regular ones).

## Advanced usage

The goal behind the mlStackNav is to provide a good starting point to implement navigation with custom design, so advanced usage is highly recommended. In order to take full advantage of the mlStackNav, please keep in mind its most important features:

- separation of the appearance and the functionality
- CSS class names according to BEM methodology
- state rules inspired by SMACSS (Scalable and Modular Architecture for CSS)
- `js-` prefixed classes to decouple JavaScript classes from CSS ones

### Multiple instances

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

### Navigation with JavaScript disabled

mlStackNav can still works in its basic form even when JavaScript is disabled. You just need to make sure that:

- `no-js` class is present on the top-level element on your page (e.g. on `html` element: `<html class="no-js">`
- `no-js` is removed before mlStackNav initialization, e.g. `$("html").removeClass("no-js")`
- a link with the anchor matching the navigation `id` is used instead of a button (e.g. `<a href="#ml-stack-nav-1" class="ml-stack-nav-toggle">` and `<nav id="ml-stack-nav-1" class="ml-stack-nav js-ml-stack-nav">`)

## Options

#### navToggleSelector

Type: `String`

Default: `.ml-stack-nav-toggle`

jQuery selector with toggle button element (or a link).

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

## Methods

Using methods you can interact with the plugin programmatically from within your scripts, e.g. you can open or close the navigation on some custom event.

Available methods:

- `open` Open the navigation.
- `close` Close the whole navigation.
- `toggle` Open the navigation if it's closed, close if it's open.
- `moveBack` Move to the previous menu level.
- `isOpen` Check if the navigation is currently open.


Example:

```javascript
$(".ml-stack-nav__link").on("click", function () {
    $(".js-ml-stack-nav").mlStackNav("close");
});
```

## Events

Using events you can run some custom code, e.g. when menu opens or closes.

- `show.ml-stack-nav` This event is triggered before the navigation opens (immediately when the `open` method is called).
- `hide.ml-stack-nav` This event is triggered before the navigation closes (immediately when the `close` method is called).

Example:

```javascript
$(".js-ml-stack-nav")
    .on("show.ml-stack-nav", function (e) {
        console.log(e);
        alert("The navigation will open!");
    })
    .on("hide.ml-stack-nav", function (e) {
        console.log(e);
        alert("The navigation will close!");
    });
```

## TODO

- add swipe support
- off-canvas mode (push)
- more themes
- tests

## Support

Please [open an issue](https://github.com/damianwajer/ml-stack-nav/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, [open a pull request](https://github.com/damianwajer/ml-stack-nav/pull/new/master).
