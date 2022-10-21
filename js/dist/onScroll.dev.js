"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/*! onscroll-effect v1.3.1 | (c) 2020 Matthieu Bué <https://twikito.com> | MIT license | https://twikito.github.io/onscroll-effect/ */
(function () {
  var e = new Event("insideViewport"),
      t = new Event("outsideViewport"),
      n = document.documentElement.getAttribute("data-onscroll-effect-custom-prefix") || "scroll";
  var i = !1;

  var s = function s(e) {
    return "onscrollEffect_" + e;
  },
      o = function o(e) {
    return void 0 === e;
  },
      a = function a() {
    var a = _toConsumableArray(document.querySelectorAll("[data-".concat(n, "]")));

    if (!i && 0 === a.length) return i = !0, console.warn("onScroll Effect is not used: there's no element with 'data-".concat(n, "' attribute."));
    i = !1, a.filter(function (e) {
      return o(e[s("isRepeating")]) || e[s("isRepeating")];
    }).forEach(function (i) {
      var _i$classList, _i$classList2;

      var a = {
        className: i.dataset[n].split(" ").filter(Boolean),
        repeat: i.dataset[n + "Repeat"],
        offset: Number(i.dataset[n + "Offset"]),
        count: Number(i.dataset[n + "Count"]),
        reverse: i.dataset[n + "Reverse"]
      },
          r = i.getBoundingClientRect(),
          c = "true" === a.reverse,
          d = a.className.length ? a.className : [c ? "is-inside" : "is-outside"],
          l = "true" === a.repeat,
          p = isNaN(a.offset) ? 0 : a.offset,
          u = isNaN(Number(a.repeat)) ? 1 : Number(a.repeat),
          g = !d.filter(function (e) {
        return !i.classList.contains(e);
      }).length;
      return i[s("repeatingCount")] = o(i[s("repeatingCount")]) ? 0 : i[s("repeatingCount")], i[s("isRepeating")] = !!o(i[s("isRepeating")]) || i[s("isRepeating")], (!c && g || c && !g) && r.top + p <= window.innerHeight && r.bottom - p >= 0 ? ((_i$classList = i.classList)[c ? "add" : "remove"].apply(_i$classList, _toConsumableArray(d)), i[s("repeatingCount")] += 1, i[s("isInsideViewport")] = !0, i.dispatchEvent(e), !l && i[s("repeatingCount")] >= u && (i[s("isRepeating")] = !1), !0) : (!c && !g || c && g) && (0 === i[s("repeatingCount")] || (l || i[s("repeatingCount")] < u) && (r.top > window.innerHeight || r.bottom < 0)) ? ((_i$classList2 = i.classList)[c ? "remove" : "add"].apply(_i$classList2, _toConsumableArray(d)), i[s("isInsideViewport")] = !1, i.dispatchEvent(t), !1) : void 0;
    });
  },
      r = function r() {
    a(), "complete" === document.readyState && document.removeEventListener("readystatechange", r);
  };

  document.addEventListener("readystatechange", r), window.addEventListener("scroll", function (e, t, n) {
    var i;
    return function () {
      var s = arguments,
          o = this;
      clearTimeout(i), i = setTimeout(function () {
        i = null, n || Reflect.apply(e, o, s);
      }, t), n && !i && Reflect.apply(e, o, s);
    };
  }(a, 10), !0), window.onScrollEffect = Object.assign(function () {
    a(), a();
  }, {
    isRepeating: function isRepeating(e) {
      return e[s("isRepeating")];
    },
    repeatingCount: function repeatingCount(e) {
      return e[s("repeatingCount")];
    },
    isInsideViewport: function isInsideViewport(e) {
      return e[s("isInsideViewport")];
    }
  });
})();