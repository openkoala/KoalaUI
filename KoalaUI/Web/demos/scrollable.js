/*!
 * jQuery Tools v1.2.5 - The missing UI library for the Web
 * 
 * scrollable/scrollable.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * 
 */
(function (root) { var amdExports; define(['jquery'], function () { (function () {
	
!function ($) {
	
	"use strict"; // jshint ;
	
    $.tools = $.tools || {
        version: "v1.2.5"
    },
    $.tools.scrollable = {
        conf: {
            activeClass: "active",
            circular: !1,
            clonedClass: "cloned",
            disabledClass: "disabled",
            easing: "swing",
            initialIndex: 0,
            item: null,
            items: ".items",
            keyboard: !0,
            mousewheel: !1,
            next: ".next",
            prev: ".prev",
            speed: 400,
            vertical: !1,
            touch: !0,
            wheelSpeed: 0
        }
    };
    function b(a,b) {
        var c = parseInt($.css(b), 10);
        if (c) return c;
        var d = a[0].currentStyle;
        return d && d.width && parseInt(d.width, 10)
    }
    function c(b, c) {
        var d = $(c);
        return d.length < 2 ? d: b.parent().find(c)
    }
    var d;
    function e(b, e) {
        var f = this,
        g = b.add(f),
        h = b.children(),
        i = 0,
        j = e.vertical;
        d || (d = f),
        h.length > 1 && (h = $(e.items, b)),
        $.extend(f, {
            getConf: function() {
                return e
            },
            getIndex: function() {
                return i
            },
            getSize: function() {
                return f.getItems().size()
            },
            getNaviButtons: function() {
                return m.add(n)
            },
            getRoot: function() {
                return b
            },
            getItemWrap: function() {
                return h
            },
            getItems: function() {
                return h.children(e.item).not("." + e.clonedClass)
            },
            move: function(a, b) {
                return f.seekTo(i + a, b)
            },
            next: function(a) {
                return f.move(1, a)
            },
            prev: function(a) {
                return f.move( - 1, a)
            },
            begin: function(a) {
                return f.seekTo(0, a)
            },
            end: function(a) {
                return f.seekTo(f.getSize() - 1, a)
            },
            focus: function() {
                d = f;
                return f
            },
            addItem: function(b) {
                b = a(b),
                e.circular ? (h.children("." + e.clonedClass + ":last").before(b), h.children("." + e.clonedClass + ":first").replaceWith(b.clone().addClass(e.clonedClass))) : h.append(b),
                g.trigger("onAddItem", [b]);
                return f
            },
            seekTo: function(b, c, k) {
                b.jquery || (b *= 1);
                if (e.circular && b === 0 && i == -1 && c !== 0) return f;
                if (!e.circular && b < 0 || b > f.getSize() || b < -1) return f;
                var l = b;
                b.jquery ? b = f.getItems().index(b) : l = f.getItems().eq(b);
                var m = $.Event("onBeforeSeek");
                if (!k) {
                    g.trigger(m, [b, c]);
                    if (m.isDefaultPrevented() || !l.length) return f
                }
                var n = j ? {
                    top: -l.position().top
                }: {
                    left: -l.position().left
                };
                i = b,
                d = f,
                c === undefined && (c = e.speed),
                h.animate(n, c, e.easing, k ||function() {
                    g.trigger("onSeek", [b])
                });
                return f
            }
        }),
        $.each(["onBeforeSeek", "onSeek", "onAddItem"], function(b, c) {
            $.isFunction(e[c]) && $(f).bind(c, e[c]),
            f[c] = function(b) {
                b && $(f).bind(c, b);
                return f
            }
        });
        if (e.circular) {
            var k = f.getItems().slice( - 1).clone().prependTo(h),
            l = f.getItems().eq(1).clone().appendTo(h);
            k.add(l).addClass(e.clonedClass),
            f.onBeforeSeek(function(a, b, c) {
                if (!a.isDefaultPrevented()) {
                    if (b == -1) {
                        f.seekTo(k, c,
                        function() {
                            f.end(0)
                        });
                        return a.preventDefault()
                    }
                    b == f.getSize() && f.seekTo(l, c,
                    function() {
                        f.begin(0)
                    })
                }
            }),
            f.seekTo(0, 0, function() {})
        }
        var m = c(b, e.prev).click(function() {
            f.prev()
        }),
        n = c(b, e.next).click(function() {
            f.next()
        }); ! e.circular && f.getSize() > 1 && (f.onBeforeSeek(function(a, b) {
            setTimeout(function() {
                a.isDefaultPrevented() || (m.toggleClass(e.disabledClass, b <= 0), n.toggleClass(e.disabledClass, b >= f.getSize() - 1))
            },
            1)
        }), e.initialIndex || m.addClass(e.disabledClass)),
        e.mousewheel && a.fn.mousewheel && b.mousewheel(function(a, b) {
            if (e.mousewheel) {
                f.move(b < 0 ? 1 : -1, e.wheelSpeed || 50);
                return ! 1
            }
        });
        if (e.touch) {
            var o = {};
            h[0].ontouchstart = function(a) {
                var b = a.touches[0];
                o.x = b.clientX,
                o.y = b.clientY
            },
            h[0].ontouchmove = function(a) {
                if (a.touches.length == 1 && !h.is(":animated")) {
                    var b = a.touches[0],
                    c = o.x - b.clientX,
                    d = o.y - b.clientY;
                    f[j && d > 0 || !j && c > 0 ? "next": "prev"](),
                    a.preventDefault()
                }
            }
        }
        e.keyboard && $(document).bind("keydown.scrollable",
        function(b) {
            if (e.keyboard && !b.altKey && !b.ctrlKey && !a(b.target).is(":input")) {
                if (e.keyboard != "static" && d != f) return;
                var c = b.keyCode;
                if (j && (c == 38 || c == 40)) {
                    f.move(c == 38 ? -1 : 1);
                    return b.preventDefault()
                }
                if (!j && (c == 37 || c == 39)) {
                    f.move(c == 37 ? -1 : 1);
                    return b.preventDefault()
                }
            }
        }),
        e.initialIndex && f.seekTo(e.initialIndex, 0,
        function() {})
    }
    $.fn.scrollable = function(b) {
        var c = this.data("scrollable");
        if (c) return c;
        b = $.extend({},$.tools.scrollable.conf, b),
        this.each(function() {
            c = new e($(this), b),
            $(this).data("scrollable", c)
        });
        return b.api ? c: this
    }
}(window.jQuery);

}.call(root));
    return amdExports;
}); }(this));