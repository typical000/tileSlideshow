# tileSlideshow
Simple jQuery-based random slideshow plugin

For more information see [DEMO](http://typical000.github.io/tileSlideshow)

Setup
-----
Add this tags to the `<head>` of your document (or before the `</body>` tag). This will link jQuery, Tile Slideshow CSS\JS into your webpage.

```html
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/javascript" src="jquery.tileSlideshow.js"></script>
<link rel="stylesheet" type="text/css" href="tileSlideshow.css" >
```

Markup
------
Start with a single containing element, in this example is `<div class="tile-container">`. After, create a list of items (blocks) with the same class (In this example there are `<div class="tile-item">`).
Inside each item insert inner element that will be switched (slided) in given interval (in our example there are just `<img>` tags. Buy you can use any html tag you need)

```html
<div class="tile-container">
  <div class="tile-item">
    <img src="#" alt=""/>
    <img src="#" alt=""/>
    <img src="#" alt=""/>
  </div>
  <div class="tile-item">
    <img src="#" alt=""/>
    <img src="#" alt=""/>
    <img src="#" alt=""/>
    <img src="#" alt=""/>
  </div>
  <div class="tile-item">
    <img src="#" alt=""/>
    <img src="#" alt=""/>
    <img src="#" alt=""/>
    <img src="#" alt=""/>
    <img src="#" alt=""/>
  </div>
</div>
```

Start the slideshow
-------------------
In last step, add the following lines of JavaScript into the `<head>` of your document (or before the `</body>` tag).
The `$(window).load()` function is required to ensure the content of the page is loaded before the plugin initializes

```html
<script type="text/javascript" charset="utf-8">
  $(window).load(function() {
    $('.tile-container').tileSlideshow();
  });
</script>
```

Change CSS to your needs
------------------------

After all, take `tileSlideshow.css` and modify it to your needs, because this plugn was build as more independent from CSS as it can be. You can change anything according to your future website design,
except `overflow`, `opacity` and `z-index` parameters.

Advanced options & access to slideshow
--------------------------------------
Listed below are all of the options available to customize tileSlideshow to suite your needs.

```html
animation: 'fade'        // Animation type. Supported values: 'fade', 'moveUp', 'moveDown', 'moveLeft', 'moveRight'
animationSpeed: 500,     // Speed of switch for slided elements
selector: '.tile-item',  // Selector for items that contain sliding images/items
innerSelector: 'img',    // Selector for inner items that will be slided in given interval
itemsPerInterval: 1,     // Number of random container that will be slided in given interval
interval: 1000,          // Interval of time
```

Also, slideshow is accessible from any point of code vie jQuery `.data()` method. For example:
```html
$('#container-helpers').data('tileSlideshow').stop();
```

All this functions are listed below:

1. switchItems
2. play
3. stop
4. destroy

Helper strings have been added too for performing quick actions on slideshow. All this helper strings are listed below:
```html
$('.tile-container').tileSlideshow('switchItems');
$('.tile-container').tileSlideshow('play');
$('.tile-container').tileSlideshow('stop');
$('.tile-container').tileSlideshow('destroy');
```

Browser support
---------------
All modern versions of Firefox, Chrome, Safari, iOS, Android, and Internet Explorer have been tested and are supported.
It works fine in IE8 and IE7 too. But if you support this old browsers your soul will burn in hell :)

License
-------

The MIT License (MIT)

Copyright © 2014 [Pavel Davydov](<typical000@gmail.com>)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

