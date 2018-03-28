/*!
 * ml-stack-nav - v1.1.2
 * Customizable, responsive, accessible, easy-to-use multi-level stack navigation menu with slide effect.
 * https://github.com/damianwajer/ml-stack-nav
 * 
 * Author: Damian Wajer
 * License: MIT
 * 
 * @preserve
 */
;(function (factory) {
    // Uses CommonJS, AMD or browser globals to create a jQuery plugin | | MIT License | https://github.com/umdjs/umd
    if (typeof define === "function" && define.amd) {
        // AMD.
        define(["jquery"], factory);
    } else if (typeof module === "object" && module.exports) {
        // Node/CommonJS.
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== "undefined") {
                    jQuery = require("jquery");
                }
                else {
                    jQuery = require("jquery")(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {
    "use strict";

    // Defaults.
    var pluginName = "mlStackNav",
        dataKey = pluginName,
        defaultConfig = {
            navToggleSelector: ".ml-stack-nav-toggle",
            openClass: "is-open",
            activeClass: "is-active",
            zIndexValue: 900
        };

    /**
     * mlStackNav plugin constructor.
     *
     * @param element
     * @param config
     * @constructor
     */
    function Plugin(element, config) {
        var $nav = $(element);

        this.config = $.extend({}, defaultConfig, config);
        this.el = {
            $nav: $nav,
            $toggleButton: $($nav.attr("data-nav-toggle") || this.config.navToggleSelector),
            $menuFirstLevel: $nav.find(".ml-stack-nav__menu").eq(0),
            $buttonNext: $nav.find(".js-ml-stack-nav-next"),
            $buttonBack: $nav.find(".js-ml-stack-nav-back")
        };
        this._defaults = defaultConfig;
        this._name = pluginName;
        this._init();
    }

    $.extend(Plugin.prototype, {
        /**
         * Initialization.
         *
         * @private
         */
        _init: function () {
            this._initAttributes();
            this._attachEvents();
        },

        /**
         * Set initial attributes and classes.
         *
         * @private
         */
        _initAttributes: function () {
            if (!this.el.$nav.hasClass("ml-stack-nav")) {
                this.el.$nav.addClass("ml-stack-nav");
            }
        },

        /**
         * Attach event handlers to DOM elements.
         *
         * @private
         */
        _attachEvents: function () {
            var that = this;

            that.el.$toggleButton.on("click", function (e) {
                that.toggle();
                e.preventDefault();
            });

            that.el.$buttonBack.on("click", function (e) {
                that.moveBack();
                e.preventDefault();
            });

            that.el.$buttonNext.on("click", function (e) {
                that._moveNext($(this).closest(".ml-stack-nav__item").find(".ml-stack-nav__menu").eq(0));
                e.preventDefault();
            });

            that.el.$menuFirstLevel.on("webkitTransitionEnd msTransitionEnd oTransitionEnd transitionend", function (e) {
                // TODO - improve detecting CSS animation completion.
                if (!that.isOpen()) {
                    // Move menu below whole document when a transition has completed.
                    that.el.$nav.css("z-index", "-1");
                }
            });
        },

        /**
         * Check if nav is open.
         *
         * @returns {boolean}
         */
        isOpen: function () {
            return !!(this.el.$nav.hasClass(this.config.openClass));
        },

        /**
         * Toggle nav state.
         */
        toggle: function () {
            if (this.isOpen()) {
                this.close();
            } else {
                this.open();
            }
        },

        /**
         * Open navigation.
         */
        open: function () {
            // Trigger show event.
            this.el.$nav.trigger($.Event("show.ml-stack-nav", {
                relatedTarget: this.el.$toggleButton[0]
            }));

            this.el.$toggleButton.addClass(this.config.activeClass);

            this.el.$nav
                .attr("aria-expanded", "true")
                .addClass(this.config.openClass + " " + this.config.activeClass)
                .css("z-index", this.config.zIndexValue);
        },

        /**
         * Move to the next menu level.
         *
         * @param $menu Menu item that should be activated.
         * @private
         */
        _moveNext: function ($menu) {
            $menu.closest("." + this.config.activeClass).removeClass(this.config.activeClass);
            $menu.closest(".ml-stack-nav__item").addClass(this.config.openClass + " " + this.config.activeClass);
        },

        /**
         * Move to the previous menu level.
         */
        moveBack: function () {
            if (this.el.$nav.hasClass(this.config.activeClass)) {
                this.close();
                return;
            }

            this.el.$nav
                .find("." + this.config.activeClass).removeClass(this.config.activeClass)
                .removeClass(this.config.openClass)
                .closest("." + this.config.openClass).addClass(this.config.activeClass)
                .find("." + this.config.openClass).removeClass(this.config.openClass); // Make sure to close all levels above the one we are currently in.
        },

        /**
         * Close whole navigation and clear all states.
         */
        close: function () {
            // Trigger hide event.
            this.el.$nav.trigger($.Event("hide.ml-stack-nav", {
                relatedTarget: this.el.$toggleButton[0]
            }));

            // Remove open class from $toggleButton.
            this.el.$toggleButton.removeClass(this.config.activeClass);

            // Remove open and active classes from all elements.
            this.el.$nav
                .removeClass(this.config.openClass + " " + this.config.activeClass)
                .attr("aria-expanded", "false")
                .find("." + this.config.openClass).removeClass(this.config.openClass);
            this.el.$nav.find("." + this.config.activeClass).removeClass(this.config.activeClass);
        }
    });

    $.fn[pluginName] = function (config) {
        return this.each(function () {
            if (!$.data(this, dataKey)) {
                $.data(this, dataKey, new Plugin(this, config));
            } else if (typeof config === "string" && config.charAt(0) !== "_" && $.isFunction(Plugin.prototype[config])) {
                $.data(this, dataKey)[config]();
            }
        });
    };
}));

//# sourceMappingURL=ml-stack-nav.js.map