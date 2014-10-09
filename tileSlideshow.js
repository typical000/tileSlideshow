/*
 * jQuery tileSlideshow v0.1.0
 * Copyright 2014 Pavel Davydov
 */

;
(function($){

    'use strict';

    $.tileSlideshow = function(item, options){
        var $item = $(item);

        // making variables public
        $item.settings = $.extend({}, $.tileSlideshow.defaults, options);

        $.data(item, 'tileSlideshow', $item);

        var $target = $item.find($item.settings.selector),
            $targetInner = $item.find($item.settings.innerSelector),
            targetNumber = $target.length,
            showInterval,
            itemsIndexes = [],
            itemsPerInterval = ($item.settings.itemsPerInterval > targetNumber) ? targetNumber : $item.settings.itemsPerInterval;

        // Function for getting randow item in all collection of blocks
        var getRandomItem = function(){
            var currentIndex = null,
                duplicate = false;

            while(!duplicate) {
                currentIndex = parseInt(Math.random()* targetNumber);
                if(!isInArray(currentIndex, itemsIndexes)) {
                    itemsIndexes.push(currentIndex);
                    duplicate = true;
                }
            }
            return $target.eq(currentIndex);
        };

        // Set count of items in inner container
        var setInnerCount = function($target) {
            $target.data('count', $target.find($item.settings.innerSelector).length);
        };

        // Get count of inner items inside inner container
        var getInnerCount = function($target) {
            return $target.data('count');
        };

        // Test if element is in array, returns true\false
        var isInArray = function(value, array) {
            return $.inArray(value, array) > -1;
        };

        var placeItemUnder = function($item, count, direction) {
            $item.css('z-index', -(count - $item.index())).show().addClass('slided');
            if(direction) {
                $item.css(direction, '');
            }
        };

        // Animation types
        var animateFade = function($element, count) {
            $element.fadeOut($item.settings.animationSpeed, function(){
                placeItemUnder($element, count);
            });
        };

        var animateMoveUp = function($element, count) {
            $element.animate({
                top : '-100%'
            }, $item.settings.animationSpeed, function(){
                placeItemUnder($element, count, 'top');
            });
        };

        var animateMoveDown = function($element, count) {
            $element.animate({
                top : '100%'
            }, $item.settings.animationSpeed, function(){
                placeItemUnder($element, count, 'top');
            });
        };

        var animateMoveLeft = function($element, count) {
            $element.animate({
                left : '-100%'
            }, $item.settings.animationSpeed, function(){
                placeItemUnder($element, count, 'left');
            });
        };

        var animateMoveRight = function($element, count) {
            $element.animate({
                left : '100%'
            }, $item.settings.animationSpeed, function(){
                placeItemUnder($element, count, 'left');
            });
        };

        var animateRandomMove = function($element, count) {
            // Take random number from 0 to 3 (because we have 4 animations with element move)
            var randomAnimation = parseInt(Math.random()* 4);
            switch (randomAnimation) {
                case 0:
                    animateMoveUp($element, count);
                    break;
                case 1:
                    animateMoveDown($element, count);
                    break;
                case 2:
                    animateMoveLeft($element, count);
                    break;
                case 3:
                    animateMoveRight($element, count);
                    break;
            }
        };

        // Initialization function
        $item.init = function(){
            // Count number of images in each item and set it to block
            $target.each(function(element, index){
                setInnerCount($(this));
            });
            $item.play();
        };

        // Destroy function
        $item.destroy = function(){
            // Remove all attributes, inline styles and slideshow data attribute
            this.find($item.settings.innerSelector).removeClass('slided').removeAttr('style');
            $.removeData(item);
            // Clear interval forever
            clearInterval(showInterval)
        };

        // Init main interval
        $item.play = function(){
            showInterval = setInterval($item.switchItems, $item.settings.interval);
        };

        // Pause sliding interval
        $item.stop = function(){
            clearInterval(showInterval);
        };

        // Function for switching inner items in one iteration
        $item.switchItems = function(){
            // Get random items (number of items we take from 'itemsPerInterval'
            var $currentItems = getRandomItem();
            for(var i = 0; i < itemsPerInterval - 1; i++) {
                $currentItems = $currentItems.add(getRandomItem());
            }

            // Switch images in each block
            $currentItems.each(function(){
                var $this = $(this),
                    itemCount = getInnerCount($this),
                    $slidingItem = $this.find($item.settings.innerSelector).not('.slided').last();

                // If there is no element that we can slide
                if(!$slidingItem.length) {
                    // If there is no elements - revert all changes to inner blocks to initial state
                    $this.find($item.settings.innerSelector).removeClass('slided').removeAttr('style');
                    // Select again our item
                    $slidingItem = $this.find($item.settings.innerSelector).not('.slided').last();
                }
                // Animate current item and place it under other items and make visible
                switch ($item.settings.animation) {
                    case 'fade':
                        animateFade($slidingItem, itemCount);
                        break;
                    case 'moveUp':
                        animateMoveUp($slidingItem, itemCount);
                        break;
                    case 'moveDown':
                        animateMoveDown($slidingItem, itemCount);
                        break;
                    case 'moveLeft':
                        animateMoveLeft($slidingItem, itemCount);
                        break;
                    case 'moveRight':
                        animateMoveRight($slidingItem, itemCount);
                        break;
                    case 'randomMove':
                        animateRandomMove($slidingItem, itemCount);
                        break;
                    default:
                        break;
                }
            });

            // Clear indexes
            itemsIndexes = [];
        };

        // Init our slideshow
        $item.init();
    };

    $.tileSlideshow.defaults = {
        animation: 'fade',
        animationSpeed: 500, // Speed of switch for slided elements
        selector: '.tile-item', // Selector for items that contain sliding images/items
        innerSelector: 'img', // Selector for inner items that will be slided in given interval
        itemsPerInterval: 1, // Number of random container that will be slided in given interval
        interval: 1000 // Interval of time
    };

    $.fn.tileSlideshow = function(options){

        if(options === undefined) {
            options = {};
        }

        if(typeof options === 'object') {
            return this.each(function(){
                new $.tileSlideshow(this, options);
                // Show slideshow when initialized
                $(this).animate({opacity: 1}, 500);
            });
        } else {
            // Helper strings for making quick changes to our slider
            var $tileSlideshow = $(this).data('tileSlideshow');
            switch (options) {
                case 'play': $tileSlideshow.play(); break;
                case 'stop': $tileSlideshow.stop(); break;
                case 'destroy': $tileSlideshow.destroy(); break;
                case 'switchItems': $tileSlideshow.switchItems(); break;
            }
        }
    };

})(jQuery);
