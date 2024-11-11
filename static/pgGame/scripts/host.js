"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function m() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ m = function m() { return L; }; var E, L = {}, e = Object.prototype, t = e.hasOwnProperty, I = Object.defineProperty || function (a, t, e) { a[t] = e.value; }, n = "function" == typeof Symbol ? Symbol : {}, B = n.iterator || "@@iterator", a = n.asyncIterator || "@@asyncIterator", i = n.toStringTag || "@@toStringTag"; function r(a, t, e) { return Object.defineProperty(a, t, { value: e, enumerable: !0, configurable: !0, writable: !0 }), a[t]; } try { r({}, ""); } catch (e) { r = function r(a, t, e) { return a[t] = e; }; } function c(s, t, e, r) { var n = t && t.prototype instanceof u ? t : u, i = Object.create(n.prototype), a = new j(r || []); return I(i, "_invoke", { value: k(s, e, a) }), i; } function w(a, t, e) { try { return { type: "normal", arg: a.call(t, e) }; } catch (e) { return { type: "throw", arg: e }; } } L.wrap = c; var R = "suspendedStart", o = "suspendedYield", l = "executing", h = "completed", s = {}; function u() {} function y() {} function f() {} var C = {}; r(C, B, function () { return this; }); var b = Object.getPrototypeOf, d = b && b(b(A([]))); d && d !== e && t.call(d, B) && (C = d); var v = f.prototype = u.prototype = Object.create(C); function g(a) { ["next", "throw", "return"].forEach(function (s) { r(a, s, function (e) { return this._invoke(s, e); }); }); } function T(s, o) { function d(e, n, r, i) { var a = w(s[e], s, n); if ("throw" !== a.type) { var l = a.arg, c = l.value; return c && "object" == _typeof(c) && t.call(c, "__await") ? o.resolve(c.__await).then(function (e) { d("next", e, r, i); }, function (e) { d("throw", e, r, i); }) : o.resolve(c).then(function (e) { l.value = e, r(l); }, function (e) { return d("throw", e, r, i); }); } i(a.arg); } var l; I(this, "_invoke", { value: function value(a, t) { function e() { return new o(function (s, e) { d(a, t, s, e); }); } return l = l ? l.then(e, e) : e(); } }); } function k(t, e, r) { var n = R; return function (o, i) { if (n === l) throw Error("Generator is already running"); if (n === h) { if ("throw" === o) throw i; return { value: E, done: !0 }; } for (r.method = o, r.arg = i;;) { var a = r.delegate; if (a) { var d = x(a, r); if (d) { if (d === s) continue; return d; } } if ("next" === r.method) r.sent = r._sent = r.arg;else if ("throw" === r.method) { if (n === R) throw n = h, r.arg; r.dispatchException(r.arg); } else "return" === r.method && r.abrupt("return", r.arg); n = l; var m = w(t, e, r); if ("normal" === m.type) { if (n = r.done ? h : o, m.arg === s) continue; return { value: m.arg, done: r.done }; } "throw" === m.type && (n = h, r.method = "throw", r.arg = m.arg); } }; } function x(t, e) { var r = e.method, n = t.iterator[r]; if (n === E) return e.delegate = null, "throw" === r && t.iterator["return"] && (e.method = "return", e.arg = E, x(t, e), "throw" === e.method) || "return" !== r && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + r + "' method")), s; var o = w(n, t.iterator, e.arg); if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, s; var i = o.arg; return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = E), e.delegate = null, s) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, s); } function G(a) { var t = { tryLoc: a[0] }; 1 in a && (t.catchLoc = a[1]), 2 in a && (t.finallyLoc = a[2], t.afterLoc = a[3]), this.tryEntries.push(t); } function _(a) { var t = a.completion || {}; t.type = "normal", delete t.arg, a.completion = t; } function j(e) { this.tryEntries = [{ tryLoc: "root" }], e.forEach(G, this), this.reset(!0); } function A(a) { if (a || "" === a) { var e = a[B]; if (e) return e.call(a); if ("function" == typeof a.next) return a; if (!isNaN(a.length)) { var s = -1, n = function e() { for (; ++s < a.length;) if (t.call(a, s)) return e.value = a[s], e.done = !1, e; return e.value = E, e.done = !0, e; }; return n.next = n; } } throw new TypeError(_typeof(a) + " is not iterable"); } return y.prototype = f, I(v, "constructor", { value: f, configurable: !0 }), I(f, "constructor", { value: y, configurable: !0 }), y.displayName = r(f, i, "GeneratorFunction"), L.isGeneratorFunction = function (a) { var t = "function" == typeof a && a.constructor; return !!t && (t === y || "GeneratorFunction" === (t.displayName || t.name)); }, L.mark = function (e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, f) : (e.__proto__ = f, r(e, i, "GeneratorFunction")), e.prototype = Object.create(v), e; }, L.awrap = function (e) { return { __await: e }; }, g(T.prototype), r(T.prototype, a, function () { return this; }), L.AsyncIterator = T, L.async = function (e, t, s, n, r) { void 0 === r && (r = Promise); var o = new T(c(e, t, s, n), r); return L.isGeneratorFunction(t) ? o : o.next().then(function (e) { return e.done ? e.value : o.next(); }); }, g(v), r(v, i, "Generator"), r(v, B, function () { return this; }), r(v, "toString", function () { return "[object Generator]"; }), L.keys = function (a) { var s = Object(a), e = []; for (var t in s) e.push(t); return e.reverse(), function a() { for (; e.length;) { var n = e.pop(); if (n in s) return a.value = n, a.done = !1, a; } return a.done = !0, a; }; }, L.values = A, j.prototype = { constructor: j, reset: function reset(a) { if (this.prev = 0, this.next = 0, this.sent = this._sent = E, this.done = !1, this.delegate = null, this.method = "next", this.arg = E, this.tryEntries.forEach(_), !a) for (var e in this) "t" === e.charAt(0) && t.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = E); }, stop: function stop() { this.done = !0; var e = this.tryEntries[0].completion; if ("throw" === e.type) throw e.arg; return this.rval; }, dispatchException: function dispatchException(s) { if (this.done) throw s; var e = this; function n(t, a) { return l.type = "throw", l.arg = s, e.next = t, a && (e.method = "next", e.arg = E), !!a; } for (var r = this.tryEntries.length - 1; r >= 0; --r) { var d = this.tryEntries[r], l = d.completion; if ("root" === d.tryLoc) return n("end"); if (d.tryLoc <= this.prev) { var m = t.call(d, "catchLoc"), p = t.call(d, "finallyLoc"); if (m && p) { if (this.prev < d.catchLoc) return n(d.catchLoc, !0); if (this.prev < d.finallyLoc) return n(d.finallyLoc); } else if (m) { if (this.prev < d.catchLoc) return n(d.catchLoc, !0); } else { if (!p) throw Error("try statement without catch or finally"); if (this.prev < d.finallyLoc) return n(d.finallyLoc); } } } }, abrupt: function abrupt(n, d) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var l = this.tryEntries[e]; if (l.tryLoc <= this.prev && t.call(l, "finallyLoc") && this.prev < l.finallyLoc) { var c = l; break; } } c && ("break" === n || "continue" === n) && c.tryLoc <= d && d <= c.finallyLoc && (c = null); var m = c ? c.completion : {}; return m.type = n, m.arg = d, c ? (this.method = "next", this.next = c.finallyLoc, s) : this.complete(m); }, complete: function complete(a, t) { if ("throw" === a.type) throw a.arg; return "break" === a.type || "continue" === a.type ? this.next = a.arg : "return" === a.type ? (this.rval = this.arg = a.arg, this.method = "return", this.next = "end") : "normal" === a.type && t && (this.next = t), s; }, finish: function finish(a) { for (var t = this.tryEntries.length - 1; t >= 0; --t) { var n = this.tryEntries[t]; if (n.finallyLoc === a) return this.complete(n.completion, n.afterLoc), _(n), s; } }, "catch": function _catch(a) { for (var t = this.tryEntries.length - 1; t >= 0; --t) { var s = this.tryEntries[t]; if (s.tryLoc === a) { var i = s.completion; if ("throw" === i.type) { var d = i.arg; _(s); } return d; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(t, e, a) { return this.delegate = { iterator: A(t), resultName: e, nextLoc: a }, "next" === this.method && (this.arg = E), s; } }, L; }
function p(s, n, t, e, r, o, a) { try { var d = s[o](a), i = d.value; } catch (e) { return void t(e); } d.done ? n(i) : Promise.resolve(i).then(e, r); }
function g(s) { return function () { var n = this, t = arguments; return new Promise(function (e, i) { var r = s.apply(n, t); function a(t) { p(r, e, i, a, o, "next", t); } function o(t) { p(r, e, i, a, o, "throw", t); } a(void 0); }); }; }
function u(a, e) { var s = Object.keys(a); if (Object.getOwnPropertySymbols) { var t = Object.getOwnPropertySymbols(a); e && (t = t.filter(function (e) { return Object.getOwnPropertyDescriptor(a, e).enumerable; })), s.push.apply(s, t); } return s; }
function y(a) { for (var e = 1; e < arguments.length; e++) { var s = null != arguments[e] ? arguments[e] : {}; e % 2 ? u(Object(s), !0).forEach(function (e) { h(a, e, s[e]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(s)) : u(Object(s)).forEach(function (e) { Object.defineProperty(a, e, Object.getOwnPropertyDescriptor(s, e)); }); } return a; }
function h(a, e, s) { return (e = E(e)) in a ? Object.defineProperty(a, e, { value: s, enumerable: !0, configurable: !0, writable: !0 }) : a[e] = s, a; }
function E(e) { var t = L(e, "string"); return "symbol" == _typeof(t) ? t : t + ""; }
function L(a, t) { if ("object" != (typeof a === "undefined" ? "undefined" : _typeof(a)) || !a) return a; var s = a[Symbol.toPrimitive]; if (void 0 !== s) { var e = s.call(a, t || "default"); if ("object" != _typeof(e)) return e; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === t ? String : Number)(a); }
function v(t, a) { return R(t) || w(t, a) || B(t, a) || I(); }
function I() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function B(e, s) { if (e) { if ("string" == typeof e) return f(e, s); var a = {}.toString.call(e).slice(8, -1); return "Object" === a && e.constructor && (a = e.constructor.name), "Map" === a || "Set" === a ? Array.from(e) : "Arguments" === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a) ? f(e, s) : void 0; } }
function f(t, s) { (null == s || s > t.length) && (s = t.length); for (var i = 0, r = Array(s); i < s; i++) r[i] = t[i]; return r; }
function w(s, r) { var d = null == s ? null : "undefined" != typeof Symbol && s[Symbol.iterator] || s["@@iterator"]; if (null != d) { var l, c, m, p, g = [], a = !0, y = !1; try { if (m = (d = d.call(s)).next, 0 === r) { if (Object(d) !== d) return; a = !1; } else for (; !(a = (l = m.call(d)).done) && (g.push(l.value), g.length !== r); a = !0); } catch (e) { y = !0, c = e; } finally { try { if (!a && null != d["return"] && (p = d["return"](), Object(p) !== p)) return; } finally { if (y) throw c; } } return g; } }
function R(e) { if (Array.isArray(e)) return e; }
var C;
var b;
var T;
var k = true;
var x = false;
var G = false;
var _ = false;
var j = false;
var A = false;
var S = false;
var O = false;
var M = false;
var V = 0;
var H = false;
var q = false;
var D = [];
var P = [];
var F = {};
var W = 6;
var U = '';
var N = '';
var Q = localStorage.getItem('pc-gm-qual');
var z = [];
var Y = {
  round1Time: 240,
  round2Time: 120,
  round3Time: 90,
  round4Time: 35
};
var X = 240;
var J = 120;
var K = 90;
var Z = 35;
var $ = false;
var ee;
gameMenuListening = false;
var te;
var ae = false;
var se = false;
var ne = false;
var ie = false;
var re = false;
var oe = false;
var de = false;
var le;
var ce;
if (Q) {
  le = ge(Q, 3);
}
var me = document.getElementById('fullscreen');
(function () {
  var e = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(e)) {
    var t = document.createElement('div');
    t.id = "loadingScreen";
    t.classList.add('message-screen');
    t.classList.add('show');
    t.classList.add('warning');
    t.innerHTML = "\n    <div class=\"menu-part warning\">\n        <div class=\"categories-element\"><span>Aviso</span></div>\n        <div class=\"categories-container warning\">\n            <div class=\"element-container warning\">\n                <span>Ainda estamos trabalhando no suporte para mobile.</span> \n            </div>\n            <button class=\"primary-btn\" id=\"newGameBtn\" onclick=\"backToBox()\">Voltar \xE0 Caixa</button>\n        </div>\n    </div>\n    <img id=\"finalLogo\" src=\"/static/images/index/planoA.png\" alt=\"\">\n    ";
    document.body.appendChild(t);
    oe = true;
    return;
  }
  function a() {}
  a();
})();
function pe(e, t, a) {
  if (t < 0 || t >= e.length) {
    console.log("Posição inválida.");
    return e;
  }
  Q = e.substring(0, t) + a + e.substring(t + 1);
}
function ge(e, t) {
  if (t < 0 || t >= e.length) {
    console.log("Posição inválida.");
    return null;
  }
  return e[t];
}
function ue() {
  var e = document.querySelectorAll('.bar-element');
  var t = document.getElementById('gameOption');
  var a = document.getElementById('videoOption');
  var s = document.getElementById('audioOption');
  var n = document.getElementById('accessibilityOption');
  var i = document.querySelectorAll('audio');
  var r = document.getElementById('sampleAudio');
  var o = document.getElementById('volume-slider');
  var d = document.getElementById('animationSelect');
  var l = document.getElementById('screenSelect');
  var c = document.getElementById('legendaActivationSelect');
  var m = document.getElementById('legendaSizeSelect');
  var p = document.getElementById('effectContainer');
  var g = document.getElementById('roundtime1Input');
  var u = document.getElementById('roundtime2Input');
  var y = document.getElementById('roundtime3Input');
  var h = document.getElementById('roundtime4Input');
  gameMenuListening = true;
  g.addEventListener('input', function () {
    X = g.value;
    Y.round1Time = g.value;
  });
  u.addEventListener('input', function () {
    J = u.value;
    Y.round2Time = u.value;
  });
  y.addEventListener('input', function () {
    K = y.value;
    Y.round3Time = y.value;
  });
  h.addEventListener('input', function () {
    Z = h.value;
    Y.round4Time = h.value;
  });
  d.addEventListener('change', function () {
    if (d.value === 'Alto') {
      pe(Q, 0, '1');
      localStorage.setItem('pc-gm-qual', Q);
    } else {
      pe(Q, 0, '0');
      localStorage.setItem('pc-gm-qual', Q);
    }
  });
  l.addEventListener('change', function () {
    p.classList.toggle('ativo');
    if (l.value === 'Desativado') {
      pe(Q, 1, '0');
      localStorage.setItem('pc-gm-qual', Q);
    } else {
      pe(Q, 1, '1');
      localStorage.setItem('pc-gm-qual', Q);
    }
  });
  c.addEventListener('change', function () {
    document.getElementById('subtitles').classList.toggle('active');
    var e = document.getElementById('subtitles').classList.contains('active') ? '1' : '0';
    pe(Q, 2, e);
    localStorage.setItem('pc-gm-qual', Q);
  });
  m.addEventListener('change', function () {
    var e = document.querySelectorAll('.caption-container');
    var t = m.value;
    e.forEach(function (e) {
      e.style.fontSize = t + 'pt';
    });
  });
  o.addEventListener('input', function () {
    var e = o.value;
    i.forEach(function (t) {
      t.volume = e;
    });
  });
  o.addEventListener('mouseup', function () {
    r.play();
  });
  e.forEach(function (i, r) {
    i.addEventListener('click', function () {
      if (r == 0) {
        e.forEach(function (e) {
          return e.classList.remove('ativo');
        });
        i.classList.add('ativo');
        t.style.display = 'flex';
        a.style.display = 'none';
        n.style.display = 'none';
        s.style.display = 'none';
      }
      if (r == 1) {
        e.forEach(function (e) {
          return e.classList.remove('ativo');
        });
        i.classList.add('ativo');
        t.style.display = 'none';
        a.style.display = 'flex';
        n.style.display = 'none';
        s.style.display = 'none';
      }
      if (r == 2) {
        e.forEach(function (e) {
          return e.classList.remove('ativo');
        });
        i.classList.add('ativo');
        t.style.display = 'none';
        a.style.display = 'none';
        n.style.display = 'none';
        s.style.display = 'flex';
      }
      if (r == 3) {
        e.forEach(function (e) {
          return e.classList.remove('ativo');
        });
        i.classList.add('ativo');
        t.style.display = 'none';
        a.style.display = 'none';
        s.style.display = 'none';
        n.style.display = 'flex';
      }
    });
  });
}
me.addEventListener('click', function () {
  if (!document.fullscreenElement && me.src.includes('fullscreen.svg')) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
    me.src = '/static/images/collapse.svg';
    me.classList.add('pop');
    setTimeout(function () {
      me.classList.remove('pop');
    }, 100);
  } else if (document.fullscreenElement && me.src.includes('collapse.svg')) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    me.src = '/static/images/fullscreen.svg';
    me.classList.add('pop');
    setTimeout(function () {
      me.classList.remove('pop');
    }, 100);
  }
});
document.addEventListener('fullscreenchange', function () {
  if (!document.fullscreenElement) {
    me.src = '/static/images/fullscreen.svg';
  } else {
    me.src = '/static/images/collapse.svg';
  }
});
var ye = document.getElementById('setting');
ye.addEventListener('click', function () {
  if (!ie) {
    if (!$ && !gameMenuListening) {
      Re();
      ue();
      ye.classList.add('roll');
      setTimeout(function () {
        ye.classList.remove('roll');
      }, 1000);
    } else if ($) {
      Ce();
    } else if (!$) {
      Re();
      ye.classList.add('roll');
      setTimeout(function () {
        ye.classList.remove('roll');
      }, 1000);
    }
  }
});
var he = document.getElementById('report');
he.addEventListener('click', function () {
  if (!be && !gameMenuListening) {
    Te();
    ue();
    he.classList.add('pop');
    setTimeout(function () {
      he.classList.remove('pop');
    }, 1000);
  } else if (be) {
    ke();
  } else if (!be) {
    Te();
    he.classList.add('pop');
    setTimeout(function () {
      he.classList.remove('pop');
    }, 1000);
  }
});
var Ee = document.getElementById('eyeBtn');
Ee.addEventListener('click', function () {
  var e = document.getElementById('roomId');
  if (e.style.filter == 'blur(0px)') {
    Ee.src = '/static/images/eye-close.svg';
    e.style.filter = 'blur(10px)';
  } else {
    Ee.src = '/static/images/eye-open.svg';
    e.style.filter = 'blur(0px)';
    e.innerText = roomId;
  }
});
var Le = document.getElementById('copyBtn');
Le.addEventListener('click', function (e) {
  if (document.querySelector('.context-box')) {
    return;
  }
  var t = window.location.hostname;
  navigator.clipboard.writeText(t + '/player/' + roomId);
  var a = document.createElement('span');
  a.classList.add('context-box');
  a.classList.add('aparecendo');
  a.innerText = 'Copiado!';
  document.body.appendChild(a);
  a.style.position = 'absolute';
  a.style.left = e.pageX - 40 + 'px';
  a.style.top = e.pageY + 25 + 'px';
  a.classList.add('appear');
  document.body.addEventListener('mousemove', function (e) {
    a.style.position = 'absolute';
    a.style.left = e.pageX - 40 + 'px';
    a.style.top = e.pageY + 25 + 'px';
  });
  setTimeout(function () {
    a.classList.remove('appear');
  }, 1000);
  setTimeout(function () {
    a.remove();
  }, 1200);
});

//TESTAR ROUNDS
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !H) {
    H = true;
    _e();
  }
  if (e.key === 's') {
    document.getElementById('skipRoundBtn').click();
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'f' && !be && !gameMenuListening) {
    Te();
    ue();
    he.classList.add('pop');
    setTimeout(function () {
      he.classList.remove('pop');
    }, 1000);
  } else if (e.key === 'f' && be) {
    ke();
  } else if (e.key === 'f' && !be) {
    Te();
    he.classList.add('pop');
    setTimeout(function () {
      he.classList.remove('pop');
    }, 1000);
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === '1' && !H) {
    pe(Q, 3, '0');
    localStorage.setItem('pc-gm-qual', Q);
    le = ge(Q, 3);
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === '2' && !H) {
    $e();
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === '4' && !H) {
    et();
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === '3' && !H) {
    k = false;
    x = true;
    b = 0;
    A = true;
    G = true;
    b = 0;
    S = true;
    Je(nt, nt, nt);
    ve.emit('message', {
      message: 'Round 3 finished',
      room_id: roomId
    });
  }
});
document.addEventListener('keydown', function (e) {
  if (!ie) {
    if (e.key === 'Escape' && !$ && !gameMenuListening) {
      ne = true;
      Re();
      ue();
      ye.classList.add('roll');
      setTimeout(function () {
        ye.classList.remove('roll');
      }, 1000);
    } else if (e.key === 'Escape' && $) {
      ne = false;
      Ce();
    } else if (e.key === 'Escape' && !$) {
      ne = true;
      Re();
      ye.classList.add('roll');
      setTimeout(function () {
        ye.classList.remove('roll');
      }, 1000);
    }
  }
});
document.addEventListener("visibilitychange", function () {
  if (document.hidden && ne == false) {
    console.log(se);
    var e = new KeyboardEvent("keydown", {
      key: "Escape"
    });
    document.dispatchEvent(e);
  }
});
if (oe === false) {
  console.log('Connecting to server with roomId:', roomId);
  var ve = io({
    query: {
      roomId: roomId
    },
    transports: ['websocket', 'polling']
  });
  ve.on('connect', function () {
    console.log('Connected to server');
    ve.emit('join', {
      room_id: roomId,
      user_type: 'host'
    });
  });
  ve.on('admin_message', function (e) {
    var t = document.getElementById('errorMsg');
    var a = document.getElementById('errorContainer');
    t.innerText = "".concat(e.msg);
    a.classList.add('appear');
    setTimeout(function () {
      a.classList.remove('appear');
    }, 9000);
  });
  ve.on('message', function (e) {
    if (e.msg) {
      var t = e.msg;
      var a = document.getElementById("container-".concat(t));
      if (a) {
        a.classList.remove('in-game');
      }
    }
  });
  ve.on('remove_success', function (e) {
    var t = document.getElementById("container-".concat(e.msg));
    t.remove();
  });
}
var Ie = {};
var Be = {};
function fe() {
  fetch("/room_status/".concat(roomId)).then(function (e) {
    return e.json();
  }).then(function (e) {
    var t = document.getElementById('playerList');
    for (var a = 0, s = Object.entries(e.players); a < s.length; a++) {
      var n = v(s[a], 2),
        i = n[0],
        r = n[1];
      var o = document.getElementById("container-".concat(i));
      var d = void 0,
        l = void 0;
      if (!o) {
        o = document.createElement('div');
        o.classList.add('player-container');
        o.id = "container-".concat(i);
        d = document.createElement('img');
        d.classList.add('character-image');
        d.id = "image-".concat(i);
        o.appendChild(d);
        l = document.createElement('div');
        playerSign = document.createElement('div');
        playerDel = document.createElement('button');
        l.classList.add('fodao');
        playerSign.classList.add('sign');
        playerDel.classList.add('player-del-btn');
        playerDel.setAttribute('onclick', "removePlayer('".concat(i, "')"));
        l.id = i;
        playerSign.appendChild(l);
        o.appendChild(playerSign);
        o.appendChild(playerDel);
        t.appendChild(o);
      } else {
        d = document.getElementById("image-".concat(i));
        l = document.getElementById(i);
      }
      var c = "/static/images/".concat(r.character, ".png");
      if (!Be[i] || Be[i].character !== r.character) {
        d.src = c;
      }
      if (!Be[i] || Be[i].username !== r.username) {
        l.textContent = "".concat(r.username);
      }
    }
    Be = y({}, e.players);
    if (e.remaining_time === 0 && k === true) {
      k = false;
      b = 0;
      document.querySelectorAll('.player-container').forEach(function (e) {
        e.classList.remove('in-game');
      });
      if (ge(Q, 0) === '0') {
        Je(Ze, Ze, Ze);
      } else {
        Je(Ze, $e, et);
      }
    }
    if (e.current_round === 2 && x === false) {
      x = true;
      document.querySelectorAll('.player-container').forEach(function (e) {
        e.classList.add('in-game');
      });
      ve.emit('message', {
        message: 'Round 2 started',
        room_id: roomId
      });
    }
    if (e.remaining_time === 0 && e.current_round === 2 && A === false) {
      b = 0;
      A = true;
      document.querySelectorAll('.player-container').forEach(function (e) {
        e.classList.remove('in-game');
      });
      if (ge(Q, 0) === '0') {
        Je(tt, at, st);
      } else {
        Je(tt, at, st);
      }
    }
    if (e.current_round === 3 && G === false) {
      G = true;
      document.querySelectorAll('.player-container').forEach(function (e) {
        e.classList.add('in-game');
      });
      ve.emit('message', {
        message: 'Round 3 started',
        room_id: roomId
      });
    }
    if (e.remaining_time === 0 && e.current_round === 3 && S === false) {
      b = 0;
      S = true;
      document.querySelectorAll('.player-container').forEach(function (e) {
        e.classList.remove('in-game');
      });
      Je(nt, nt, nt);
      ve.emit('message', {
        message: 'Round 3 finished',
        room_id: roomId
      });
    }
    if (e.current_round === 4 && _ === false) {
      _ = true;
      document.querySelectorAll('.player-container').forEach(function (e) {
        e.classList.add('in-game');
      });
      ve.emit('message', {
        message: 'Round 4 started',
        room_id: roomId
      });
    }
    if (e.remaining_time === 0 && e.current_round === 4 && O === false) {
      O = true;
      b = 0;
      Qe(e);
      if (re === true) {
        je(30, 1000);
        console.log('piroquinha');
      } else {
        je(30, 8000);
        setTimeout(function () {
          document.getElementById('papaleguas').classList.remove('appear');
        }, 5000);
      }
      document.getElementById('timerContainer').classList.remove('appear');
      re = false;
      ve.emit('message', {
        message: 'Round 4 finished',
        room_id: roomId
      });
    }
    if (e.current_round === 5 && j === false) {
      document.getElementById('papaleguas').classList.add('appear');
      document.getElementById('timerContainer').classList.add('appear');
      j = true;
      ve.emit('message', {
        message: 'Round 5 started',
        room_id: roomId
      });
    }
    if (e.remaining_time === 0 && e.current_round === 5 && M === false) {
      M = true;
      b = 0;
      if (!ee) {
        Qe(e);
        if (re === true) {
          je(30, 1000);
          console.log('piroquinha');
        } else {
          je(30, 8000);
          setTimeout(function () {
            document.getElementById('papaleguas').classList.remove('appear');
          }, 5000);
        }
      } else {
        je(90, 8000);
      }
      document.getElementById('timerContainer').classList.remove('appear');
      re = false;
      ve.emit('message', {
        message: 'Round 5 finished',
        room_id: roomId
      });
    }
    if (e.current_round >= 6) {
      if (e.remaining_time === 0 && F[e.current_round] === false) {
        F[e.current_round] = true;
        b = 0;
        if (!ee) {
          Qe(e);
          if (re === true) {
            je(30, 1000);
            console.log('piroquinha');
          } else {
            je(30, 8000);
            setTimeout(function () {
              document.getElementById('papaleguas').classList.remove('appear');
            }, 5000);
          }
        } else {
          je(90, 8000);
        }
        document.getElementById('timerContainer').classList.remove('appear');
        re = false;
        ve.emit('message', {
          message: "Last round finished",
          room_id: roomId
        });
      }
      if (e.current_round === W && !(W in F)) {
        F[W] = false;
        document.getElementById('papaleguas').classList.add('appear');
        ve.emit('message', {
          message: "Next round started",
          room_id: roomId
        });
        W++;
        document.getElementById('timerContainer').classList.add('appear');
      }
    }
  })["catch"](function (e) {
    console.error('Error:', e);
  });
}
function we(e) {
  ve.emit('remove_player', {
    room_id: roomId,
    player_id: e
  });
}
function Re() {
  if (!be) {
    var e = document.getElementById('lateralMenu');
    var t = document.createElement('div');
    var a = document.body;
    var s = document.querySelectorAll('audio');
    e.classList.add('active');
    t.classList.add('inativo');
    a.appendChild(t);
    $ = true;
    t.id = 'bgInactive';
    t.addEventListener("click", function () {
      Ce();
    });
    s.forEach(function (e) {
      e.pause();
    });
    Ae();
  } else {
    ke();
    Re();
  }
}
function Ce() {
  var e = document.getElementById('lateralMenu');
  var t = document.getElementById('bgInactive');
  var a = document.body;
  var s = document.querySelectorAll('audio');
  var n = Array.from(s).filter(function (e) {
    return e.currentTime > 0;
  });
  e.classList.remove('active');
  n.forEach(function (e) {
    if (e.currentTime < e.duration) {
      e.play();
    }
  });
  a.removeChild(t);
  $ = false;
  Ae();
}
var be = false;
function Te() {
  if (!$) {
    var e = document.getElementById('reportMenu');
    var t = document.createElement('div');
    var a = document.body;
    var s = document.querySelectorAll('audio');
    e.classList.add('ativo');
    t.classList.add('inativo');
    a.appendChild(t);
    t.id = 'bgInactive';
    be = true;
    t.addEventListener("click", function () {
      ke();
    });
    s.forEach(function (e) {
      e.pause();
    });
    Ae();
  } else {
    Ce();
    Te();
  }
}
function ke() {
  var e = document.getElementById('reportMenu');
  var t = document.getElementById('bgInactive');
  var a = document.body;
  var s = document.querySelectorAll('audio');
  var n = Array.from(s).filter(function (e) {
    return e.currentTime > 0;
  });
  e.classList.remove('ativo');
  a.removeChild(t);
  n.forEach(function (e) {
    if (e.currentTime < e.duration) {
      e.play();
    }
  });
  be = false;
  Ae();
}
function xe() {
  var e = {
    browserName: navigator.userAgentData ? navigator.userAgentData.brands[0].brand : navigator.userAgent,
    browserVersion: navigator.userAgentData ? navigator.userAgentData.brands[0].version : navigator.appVersion,
    platform: navigator.platform,
    language: navigator.language,
    userAgent: navigator.userAgent
  };
  return e;
}
function Ge() {
  var e = xe();
  var t = {
    browser: "".concat(e.browserName, " (vers\xE3o: ").concat(e.browserVersion, ")"),
    description: document.getElementById('descricaoInput').value,
    motive: document.getElementById('motivoInput').value,
    platform: e.platform,
    user_agent: e.userAgent
  };
  fetch('/send_report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(t)
  }).then(function (e) {
    return e.json();
  }).then(function (e) {
    if (e.message) {
      console.log(e.message);
    }
  })["catch"](function (e) {
    console.error('Erro:', e);
  });
}
document.getElementById('reportForm').addEventListener('submit', function (e) {
  e.preventDefault();
  Ge();
});
Xe();
function _e() {
  fetch("/start_game/".concat(roomId), {
    method: 'POST'
  }).then(function (e) {
    return e.json();
  }).then(function (e) {
    if (e.message === 'Game started') {
      if (ge(Q, 0) === '0') {
        Je(Ke, Ke, Ke);
      } else {
        Je(Ke, Ke, Ke);
      }
      document.querySelectorAll('.player-container').forEach(function (e) {
        e.classList.add('in-game');
      });
      document.querySelectorAll('.input-container').forEach(function (e) {
        e.disabled = true;
      });
      document.querySelectorAll('.player-del-btn').forEach(function (e) {
        e.classList.add('in-game');
      });
      document.getElementById('idContainer').remove();
    } else {
      var t = document.getElementById('errorMsg');
      var a = document.getElementById('errorContainer');
      t.innerText = "".concat(e.message);
      a.classList.add('appear');
      setTimeout(function () {
        a.classList.remove('appear');
      }, 9000);
    }
  })["catch"](function (e) {
    console.error('Error:', e);
  });
}
function je(e, t, a) {
  e = Number(e);
  if (ae && !se) {
    return;
  }
  clearInterval(C);
  var s = document.getElementById('timer');
  b = se ? b : e;
  if (q === true) {
    z.push(setTimeout(function () {
      console.log(q);
      Oe(e, a);
      b = e;
      s.textContent = b;
    }, t));
  } else {
    b = e;
    q = true;
    s.textContent = b;
  }
  ae = true;
  se = false;
  z.push(setTimeout(function () {
    C = setInterval(function () {
      b--;
      s.textContent = b;
      if (b <= 0) {
        clearInterval(C);
        s.style.display = 'none';
        ae = false;
      }
    }, 1000);
  }, t));
}
function Ae() {
  if (ae) {
    if (!se) {
      clearInterval(C);
      se = true;
      console.log('Temporizador pausado');
    } else {
      console.log('Retomando temporizador');
      se = false;
      C = setInterval(function () {
        b--;
        var e = document.getElementById('timer');
        e.textContent = b;
        if (b <= 0) {
          clearInterval(C);
          e.style.display = 'none';
          ae = false;
        }
      }, 1000);
    }
  }
}
function Se(e) {
  b += e;
  var t = document.getElementById('timer');
  t.textContent = b;
}
function Oe(e, t) {
  fetch("/start_round/".concat(roomId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      duration: e,
      round: t
    })
  }).then(function (e) {
    return e.json();
  }).then(function (e) {
    if (e.message === 'Round started') {
      document.getElementById('timer').style.display = 'block';
    }
  })["catch"](function (e) {
    console.error('Error:', e);
  });
}
window.onload = function () {
  fe();
  setInterval(fe, 3000);
};
function Me(e) {
  if (de === false) {
    fetch("/start_tournament/".concat(e), {
      method: 'POST'
    }).then(function (e) {
      return e.json();
    }).then(function (e) {
      console.log('Tournament started:', e.rounds);
      de = true;
    });
  }
}
function Ve() {
  return He.apply(this, arguments);
}
function He() {
  He = g(/*#__PURE__*/m().mark(function e() {
    var t, a;
    return m().wrap(function s(e) {
      while (1) switch (e.prev = e.next) {
        case 0:
          e.next = 2;
          return fetch("/tournament/".concat(roomId, "/matchup"));
        case 2:
          t = e.sent;
          e.next = 5;
          return t.json();
        case 5:
          a = e.sent;
          if (a.matchups) {
            D = a.matchups;
            V = 0;
            P = [];
            qe();
          } else {}
        case 7:
        case "end":
          return e.stop();
      }
    }, e);
  }));
  return He.apply(this, arguments);
}
function qe() {
  var e = document.getElementById('matchups');
  e.innerHTML = '';
  if (V < D.length) {
    var t = D[V];
    var a = document.createElement('div');
    a.classList.add('matchup');
    a.id = 'papaleguas';
    var s = t.players[0];
    var n = t.players[1];
    var i = t.combinations;
    var r = i[0][0];
    var o = document.createElement('div');
    o.classList.add('fodinha');
    o.id = "".concat(s, "Container");
    U = "".concat(s);
    o.innerHTML = "\n            <div id=\"".concat(s, "Voters\" class=\"voters-container\"></div>\n            <img id=\"").concat(s, "Drawing\" class=\"drawings\" style=\"background-image: url(").concat(r.image_path, "); background-size: 68%;\" src=\"/static/images/cu.png\" alt=\"").concat(s, "\">\n            <div id=\"").concat(s, "PhraseContainer\" class=\"phrase-container\">\n                <span id=\"").concat(s, "Phrase\" class=\"phrases\">").concat(r.phrase, "</span>\n            </div>\n            <img id=\"").concat(s, "Iluminacao\" class=\"iluminacao-matchup\" src=\"/static/images/iluminacao.png\"></img>\n        ");
    a.appendChild(o);
    setTimeout(function () {
      var e = document.getElementById("".concat(s, "Iluminacao"));
      e.classList.add('aceso');
      document.getElementById('lightTurnOn').play();
    }, 4000);
    if (n) {
      var d = function e() {
        players = [r.image_path, l.image_path];
        var t = players[Math.floor(Math.random() * players.length)];
        if (Math.random() <= 0.8) {
          ot(t);
          setTimeout(function () {
            document.getElementById('messageContainer').classList.add('appear');
          }, 2000);
        }
        function a() {
          var e = ["Pedro", "Goku", "Sasuke", "OcultDay", "PaulaNoku", s, n];
          var t = ["SocaFofo", "FC", "OFC", "Implacavel", "Amostradinho", "Pensador"];
          var a = [12, 34, 56, 78, 90];
          function i(e) {
            return e[Math.floor(Math.random() * e.length)];
          }
          var r = i(e);
          var o = i(t);
          var d = i(a);
          var l = "".concat(r).concat(o).concat(d);
          return l;
        }
        var i = a();
        document.getElementById('usernameMessage').innerText = "@".concat(i);
      };
      var l = i[1][0];
      var c = document.createElement('div');
      c.classList.add('fodinha');
      c.id = "".concat(n, "Container");
      N = "".concat(n);
      c.innerHTML = "\n                <div id=\"".concat(n, "Voters\" class=\"voters-container\"></div>\n                <img id=\"").concat(n, "Drawing\" class=\"drawings\" style=\"background-image: url(").concat(l.image_path, "); background-size: 68%;\" src=\"/static/images/cu.png\" alt=\"").concat(n, "\">\n                <div id=\"").concat(n, "PhraseContainer\" class=\"phrase-container\">\n                    <span id=\"").concat(n, "Phrase\" class=\"phrases\">").concat(l.phrase, "</span>\n                </div>\n                <img id=\"").concat(n, "Iluminacao\" class=\"iluminacao-matchup\" src=\"/static/images/iluminacao.png\"></img>\n            ");
      a.appendChild(c);
      d();
      document.getElementById('timer').classList.add('appear');
      setTimeout(function () {
        document.getElementById('messageContainer').classList.remove('appear');
      }, 25000);
      setTimeout(function () {
        var e = document.getElementById("".concat(n, "Iluminacao"));
        e.classList.add('aceso');
      }, 4000);
    } else {
      N = "".concat(s);
      setTimeout(function () {
        document.getElementById('timerContainer').classList.remove('appear');
        De(1);
        b = 0;
        setTimeout(function () {
          m.play();
        }, 5000);
      }, 1000);
      o.innerHTML = "\n            <img class=\"drawings aparecendo\" src=\"/static/images/mistery.png\"></img>\n            ";
      var m = document.getElementById("soundTrackR4");
      audioSolo = document.getElementById('audioFallingSolo');
      audioSolo.play();
      m.pause();
      audioSolo.addEventListener('timeupdate', function () {
        if (audioSolo.currentTime >= 4.4) {
          o.classList.add('perdedor');
        }
      });
      ve.emit('message', {
        message: "Player Solo",
        room_id: roomId
      });
      re = true;
    }
    e.appendChild(a);
  }
}
function De(e) {
  fetch("/change_duration/".concat(roomId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      new_remaining_time: parseInt(e)
    })
  }).then(function (e) {
    return e.json();
  })["catch"](function (e) {
    console.error('Erro:', e);
  });
}
function Pe(e) {
  P.push(e);
  V++;
  if (re === true) {
    setTimeout(function () {
      Fe();
    }, 1000);
    Ye(e);
    console.log('top');
  } else {
    setTimeout(function () {
      Fe();
    }, 7000);
    setTimeout(function () {
      Ye(e);
    }, 2000);
  }
}
function Fe() {
  return We.apply(this, arguments);
}
function We() {
  We = g(/*#__PURE__*/m().mark(function e() {
    var t, a;
    return m().wrap(function s(e) {
      while (1) switch (e.prev = e.next) {
        case 0:
          e.prev = 0;
          e.next = 3;
          return fetch("/tournament/".concat(roomId, "/advance"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              winners: P
            })
          });
        case 3:
          t = e.sent;
          if (t.ok) {
            e.next = 7;
            break;
          }
          if (t.status === 400) {
            ve.emit('message', {
              message: "Tournament next",
              room_id: roomId
            });
            qe();
          }
          throw new Error("Failed to advance the tournament: ".concat(t.statusText));
        case 7:
          e.next = 9;
          return t.json();
        case 9:
          a = e.sent;
          if (a.winner) {
            ee = a.winner;
            document.getElementById('timerContainer').classList.remove('appear');
            ve.emit('message', {
              message: "Tournament finished",
              room_id: roomId
            });
            console.log(a.winner);
            console.log('sou IRADO');
            Ue(ee);
          }
          Ve();
          ve.emit('message', {
            message: "Tournament advanced",
            room_id: roomId
          });
          e.next = 18;
          break;
        case 15:
          e.prev = 15;
          e.t0 = e["catch"](0);
          console.error(e.t0);
        case 18:
        case "end":
          return e.stop();
      }
    }, e, null, [[0, 15]]);
  }));
  return We.apply(this, arguments);
}
function Ue(e) {
  it();
  setTimeout(function () {
    var t = U === e ? N : U;
    if (document.getElementById("".concat(t, "Container"))) {
      document.getElementById("".concat(t, "Container")).remove();
    }
  }, 8000);
}
var Ne = null;
function Qe(e) {
  console.log('Room Status:', e);
  for (var t = 0, a = Object.entries(e.votes); t < a.length; t++) {
    var s = v(a[t], 2),
      n = s[0],
      i = s[1];
    var r = e.players[n].character;
    console.log("".concat(n, " votou em ").concat(i));
    var o = document.getElementById("".concat(i, "Voters"));
    if (o) {
      var d = document.createElement('div');
      o.appendChild(d);
      var l = document.createElement('img');
      l.src = "/static/images/vote/".concat(r, "Vote.png");
      l.classList.add('voter-image');
      d.appendChild(l);
    }
  }
  var c = {};
  for (var m = 0, p = Object.values(e.votes); m < p.length; m++) {
    var g = p[m];
    c[g] = (c[g] || 0) + 1;
  }
  var u = [];
  var y = 0;
  for (var h = 0, E = Object.entries(c); h < E.length; h++) {
    var L = v(E[h], 2),
      I = L[0],
      B = L[1];
    if (B > y) {
      y = B;
      u = [I];
    } else if (B === y) {
      u.push(I);
    }
  }
  if (u.length > 1 || u.length === 0) {
    var f = Math.floor(Math.random() * 2);
    u = f === 0 ? U : N;
  } else {
    u = u[0];
  }
  Ne = {
    username: e.players[u].username,
    character: e.players[u].character,
    voteCount: y,
    playerId: u
  };
  console.log('Most Voted Info:', Ne);
  var w = u === U ? N : U;
  if (w) {
    if (w !== u) {
      var R = document.getElementById("".concat(w, "Container"));
      var C = document.createElement('div');
      var b = document.createElement('div');
      var T = document.createElement('div');
      var k = document.createElement('img');
      b.src = '/static/images/plaquinha.png';
      k.src = "/static/images/perdedor/".concat(e.players[w].character, ".png");
      T.classList.add('fodao');
      T.innerHTML = "".concat(e.players[w].username);
      k.classList.add('perdedor-image');
      k.id = 'perdedorImg';
      C.classList.add('perdedor-container');
      b.classList.add('sign');
      R.appendChild(C);
      C.appendChild(k);
      C.appendChild(b);
      b.appendChild(T);
    }
  }
  Pe(u);
}
function ze() {
  var e = ['audioFalling1', 'audioFalling2', 'audioFalling3'];
  var t = Math.floor(Math.random() * e.length);
  var a = document.getElementById(e[t]);
  e.forEach(function (e) {
    return document.getElementById(e).pause();
  });
  a.currentTime = 0;
  a.play();
}
function Ye(e) {
  if (document.getElementById("".concat(e, "Drawing"))) {
    var t = document.getElementById("".concat(e, "Drawing"));
    var a = document.getElementById("".concat(e, "PhraseContainer"));
    t.classList.add('drawing-hold');
    a.classList.add('phrase-container-hold');
    t.classList.remove('drawings');
    a.classList.remove('phrase-container');
  }
  var s = document.getElementsByClassName('drawings');
  var n = document.getElementsByClassName('phrase-container');
  for (var r = 0; r < s.length; r++) {
    s[r].classList.add('perdedor');
    if (n[r]) {
      n[r].classList.add('perdedor');
      setTimeout(function () {
        ze();
      }, 420);
    }
  }
}
function Xe() {
  fetch("/room_status/".concat(roomId)).then(function (e) {
    return e.json();
  }).then(function (e) {
    if (e.started === true) {
      setTimeout(function () {
        document.getElementById('oopsMessage').style.display = 'flex';
        ve.disconnect();
      }, 890);
    }
  })["catch"](function (e) {
    console.error('Error:', e);
  });
}
function Je(e, t, a) {
  var s = [e, t, a];
  var n = s[Math.floor(Math.random() * s.length)];
  n();
}
function Ke() {
  z.length = 0;
  document.getElementById('skipRoundBtn').disabled = true;
  document.getElementById('startButton').disabled = true;
  document.getElementById('timer').style.display = 'block';
  document.getElementById('startButton').classList.add('translate');
  var e = document.getElementById("soundTrackR1");
  var t = document.getElementById("audioR1");
  var a = document.createElement('img');
  a.src = '/static/images/Round1.png';
  a.id = 'rounds';
  document.getElementById('roundContainer').appendChild(a);
  q = true;
  document.getElementById('roundContainer').innerHTML = "\n    <img id=\"iluminacao\" src=\"/static/images/iluminacao.png\" alt=\"\">\n    <img id=\"logoLow\" src=\"/static/images/LogoLow.png\" alt=\"\">\n    <img id=\"logo\" src=\"/static/images/LOGO.png\" alt=\"\">\n    <img id=\"show\" src=\"/static/images/OSHOW.png\" alt=\"\">\n    <img src=\"/static/images/Round1Low.png\" id=\"roundsLow\">\n    <img src=\"/static/images/Round1.png\" id=\"rounds\">\n    <audio id=\"whistleUp\" src=\"/static/pgGame/audios/WhistleUp.mp3\" type=\"audio/mpeg\"></audio>\n    <audio id=\"whistleDown\" src=\"/static/pgGame/audios/WhistleDown.mp3\" type=\"audio/mpeg\"></audio>\n    ";
  var s = document.getElementById("whistleDown");
  var n = document.getElementById("subtitles");
  var i = [];
  fetch('/static/pgGame/rounds/legenda.json').then(function (e) {
    return e.json();
  }).then(function (e) {
    i = e;
  });
  t.ontimeupdate = function () {
    var e = t.currentTime;
    var a = i.find(function (t) {
      return e >= t.start && e <= t.end;
    });
    if (a) {
      n.innerHTML = a.text;
    } else {
      n.innerHTML = '';
    }
  };
  if (ge(Q, 0) === '0') {
    fetch('/static/pgGame/rounds/round1/r1Var1Low.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    t.src = "/static/pgGame/audios/r1/audioR1Q".concat(le, ".mp3");
    setTimeout(function () {
      document.getElementById('startButton').classList.add('desappear');
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('circleLow').classList.add('close');
      s.play();
      setTimeout(function () {
        if (le == '1') {
          e.play();
        }
        t.play();
      }, 1000);
    }, 500);
  } else {
    fetch('/static/pgGame/rounds/round1/r1Var1.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    t.src = "/static/pgGame/audios/r1/audioR1Q".concat(le, ".mp3");
    setTimeout(function () {
      document.getElementById('startButton').classList.add('desappear');
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('circle').classList.add('close');
      s.play();
      setTimeout(function () {
        if (le == '1') {
          e.play();
        }
        t.play();
      }, 1000);
    }, 500);
  }
  t.addEventListener('timeupdate', function () {
    var e = t.currentTime;
    te.forEach(function (t) {
      if (Math.abs(e - t.time) < 0.5) {
        var a = document.getElementById(t.elementId);
        if (a) {
          if (t.classlistRemove) {
            a.classList.remove(t.classlistRemove);
          }
          if (t.classlistAdd) {
            a.classList.add(t.classlistAdd);
          }
          if (t.play) {
            a.play();
          }
          if (t.remove) {
            a.remove();
          }
          if (t.startCountdown) {
            var s = t.startCountdown.split(', ');
            var n = Y[s[0]];
            var i = parseInt(s[1], 10);
            je(n, i);
          }
          if (t.socketEmit) {
            ve.emit('message', {
              message: t.socketEmit,
              room_id: roomId
            });
          }
        }
      }
    });
  });
}
function Ze() {
  z.length = 0;
  T = 1;
  ve.emit('message', {
    message: 'Round 1 finished',
    room_id: roomId
  });
  document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(2)');
  document.getElementById('skipRoundBtn').classList.add('aparecendo');
  document.getElementById('timer').style.display = 'block';
  document.getElementById('skipRoundBtn').disabled = false;
  var e = document.getElementById("soundTrackR1");
  var t = document.getElementById("soundTrackR2");
  var a = document.getElementById("audioR2");
  t.src = '/static/pgGame/audios/r2/soundTrackR2.mp3';
  a.src = '/static/pgGame/audios/r2/audioR2Var1.mp3';
  var s = document.getElementById('playerList');
  var n = s.cloneNode(true);
  var i = n.querySelectorAll('.player-container');
  z.push(setTimeout(function () {
    i.forEach(function (e) {
      var t = e.querySelector('img');
      if (t.src.includes('/static/images/')) {
        t.src = t.src.replace('/static/images/', '/static/images/perdedor/');
      }
    });
  }, 5500));
  n.id = 'playerListR2';
  document.getElementById('roundContainer').innerHTML = "\n    <img id=\"iluminacao\" src=\"/static/images/iluminacao.png\" alt=\"\">\n    <img id=\"logoLow\" src=\"/static/images/LogoLow.png\" alt=\"\">\n    <img id=\"logo\" src=\"/static/images/LOGO.png\" alt=\"\">\n    <img id=\"show\" src=\"/static/images/OSHOW.png\" alt=\"\">\n    <img src=\"/static/images/Round2Low.png\" id=\"roundsLow\">\n    <img src=\"/static/images/Round2.png\" id=\"rounds\">\n    <audio id=\"whistleUp\" src=\"/static/pgGame/audios/WhistleUp.mp3\" type=\"audio/mpeg\"></audio>\n    <audio id=\"whistleDown\" src=\"/static/pgGame/audios/WhistleDown.mp3\" type=\"audio/mpeg\"></audio>\n    ";
  document.getElementById('roundContainer').appendChild(n);
  var r = document.getElementById("subtitles");
  var o = [];
  fetch('/static/pgGame/rounds/captionR2Var1.json').then(function (e) {
    return e.json();
  }).then(function (e) {
    o = e;
  });
  a.ontimeupdate = function () {
    var e = a.currentTime;
    var t = o.find(function (t) {
      return e >= t.start && e <= t.end;
    });
    if (t) {
      r.innerHTML = t.text;
    } else {
      r.innerHTML = '';
    }
  };
  if (ge(Q, 0) === '0') {
    fetch("/static/pgGame/rounds/round2/r2Var1Low.json").then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r2/audioR2Var1Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circleLow').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        audioRodada1.remove();
        if (le === '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  } else {
    fetch("/static/pgGame/rounds/round2/r2Var1.json").then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r2/audioR2Var1Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circle').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        audioRodada1.remove();
        if (le === '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  }
  ce = a;
  setTimeout(function () {
    a.addEventListener('timeupdate', function () {
      var e = a.currentTime;
      te.forEach(function (t) {
        if (Math.abs(e - t.time) < 0.5) {
          var a = document.getElementById(t.elementId);
          if (a) {
            if (t.classlistRemove) {
              a.classList.remove(t.classlistRemove);
              console.log(1);
            }
            if (t.classlistAdd) {
              a.classList.add(t.classlistAdd);
              console.log(2);
            }
            if (t.play) {
              a.play();
              console.log(3);
            }
            if (t.remove) {
              a.remove();
            }
            if (t.startCountdown) {
              var s = t.startCountdown.split(', ');
              var n = Y[s[0]];
              var i = parseInt(s[1], 10);
              je(n, i);
              console.log(4);
            }
          }
        }
      });
    });
  }, 200);
}
function $e() {
  z.length = 0;
  T = 2;
  ve.emit('message', {
    message: 'Round 1 finished',
    room_id: roomId
  });
  document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(2)');
  document.getElementById('skipRoundBtn').classList.add('aparecendo');
  document.getElementById('timer').style.display = 'block';
  document.getElementById('skipRoundBtn').disabled = false;
  var e = document.getElementById("soundTrackR1");
  var t = document.getElementById("soundTrackR2");
  var a = document.getElementById("audioR2");
  t.src = '/static/pgGame/audios/r2/soundTrackR2.mp3';
  a.src = '/static/pgGame/audios/r2/audioR2Var2.mp3';
  var s = document.getElementById('playerList');
  var n = s.cloneNode(true);
  n.id = 'playerListR2';
  document.getElementById('roundContainer').innerHTML = "\n    <img id=\"iluminacao\" src=\"/static/images/iluminacao.png\" alt=\"\">\n    <img id=\"logoLow\" src=\"/static/images/LogoLow.png\" alt=\"\">\n    <img id=\"logo\" src=\"/static/images/LOGO.png\" alt=\"\">\n    <img id=\"show\" src=\"/static/images/OSHOW.png\" alt=\"\">\n    <img src=\"/static/images/Round2Low.png\" id=\"roundsLow\">\n    <img src=\"/static/images/Round2.png\" id=\"rounds\">\n    <audio id=\"whistleUp\" src=\"/static/pgGame/audios/WhistleUp.mp3\" type=\"audio/mpeg\"></audio>\n    <audio id=\"whistleDown\" src=\"/static/pgGame/audios/WhistleDown.mp3\" type=\"audio/mpeg\"></audio>\n    ";
  document.getElementById('roundContainer').appendChild(n);
  var i = document.getElementById("subtitles");
  var r = [];
  fetch('/static/pgGame/rounds/captionR2Var2.json').then(function (e) {
    return e.json();
  }).then(function (e) {
    r = e;
  });
  a.ontimeupdate = function () {
    var e = a.currentTime;
    var t = r.find(function (t) {
      return e >= t.start && e <= t.end;
    });
    if (t) {
      i.innerHTML = t.text;
    } else {
      i.innerHTML = '';
    }
  };
  if (ge(Q, 0) === '0') {
    fetch("/static/pgGame/rounds/round2/r2Var2Low.json").then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r2/audioR2Var2Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circleLow').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        audioRodada1.remove();
        if (le === '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  } else {
    fetch('/static/pgGame/rounds/round2/r2Var2.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r2/audioR2Var2Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circle').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        audioRodada1.remove();
        if (le === '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  }
  ce = a;
  setTimeout(function () {
    a.addEventListener('timeupdate', function () {
      var e = a.currentTime;
      te.forEach(function (t) {
        if (Math.abs(e - t.time) < 0.5) {
          var a = document.getElementById(t.elementId);
          if (a) {
            if (t.classlistRemove) {
              a.classList.remove(t.classlistRemove);
            }
            if (t.classlistAdd) {
              a.classList.add(t.classlistAdd);
            }
            if (t.play) {
              a.play();
            }
            if (t.remove) {
              a.remove();
            }
            if (t.startCountdown) {
              var s = t.startCountdown.split(', ');
              var n = Y[s[0]];
              var i = parseInt(s[1], 10);
              je(n, i);
            }
            if (t.socketEmit) {
              ve.emit('message', {
                message: t.socketEmit,
                room_id: roomId
              });
            }
          }
        }
      });
    });
  }, 200);
}
function et() {
  z.length = 0;
  T = 3;
  ve.emit('message', {
    message: 'Round 1 finished',
    room_id: roomId
  });
  document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(2)');
  document.getElementById('skipRoundBtn').classList.add('aparecendo');
  document.getElementById('timerContainer').classList.remove('appear');
  document.getElementById('timer').style.display = 'block';
  document.getElementById('skipRoundBtn').disabled = false;
  var e = document.getElementById("soundTrackR1");
  var t = document.getElementById("soundTrackR2");
  var a = document.getElementById("audioR2");
  t.src = '/static/pgGame/audios/r2/soundTrackR2.mp3';
  var s = document.getElementById('playerList');
  var n = s.cloneNode(true);
  n.id = 'playerListR2';
  document.getElementById('roundContainer').innerHTML = "\n    <img id=\"iluminacao\" src=\"/static/images/iluminacao.png\" alt=\"\">\n    <img id=\"logoLow\" src=\"/static/images/LogoLow.png\" alt=\"\">\n    <img id=\"logo\" src=\"/static/images/LOGO.png\" alt=\"\">\n    <img id=\"show\" src=\"/static/images/OSHOW.png\" alt=\"\">\n    <img src=\"/static/images/Round2Var2Low.png\" id=\"roundsLow\">\n    <img src=\"/static/images/Round2Var2.png\" id=\"rounds\">\n    <audio id=\"whistleUp\" src=\"/static/pgGame/audios/WhistleUp.mp3\" type=\"audio/mpeg\"></audio>\n    <audio id=\"whistleDown\" src=\"/static/pgGame/audios/WhistleDown.mp3\" type=\"audio/mpeg\"></audio>\n    ";
  document.getElementById('roundContainer').appendChild(n);
  var i = n.querySelectorAll('.player-container');
  i.forEach(function (e) {
    var t = e.querySelector('img');
    if (t.src.includes('/static/images/')) {
      t.src = t.src.replace('/static/images/', '/static/images/perdedor/');
    }
  });
  var r = document.getElementById("subtitles");
  var o = [];
  fetch('/static/pgGame/rounds/captionR2Var3.json').then(function (e) {
    return e.json();
  }).then(function (e) {
    o = e;
  });
  a.ontimeupdate = function () {
    var e = a.currentTime;
    var t = o.find(function (t) {
      return e >= t.start && e <= t.end;
    });
    if (t) {
      r.innerHTML = t.text;
    } else {
      r.innerHTML = '';
    }
  };
  if (ge(Q, 0) === '0') {
    fetch('/static/pgGame/rounds/round2/r2Var3Low.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r2/audioR2Var3Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circleLow').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        audioRodada1.remove();
        if (le === '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  } else {
    fetch('/static/pgGame/rounds/round2/r2Var3.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r2/audioR2Var3Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circle').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        audioRodada1.remove();
        if (le === '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  }
  ce = a;
  setTimeout(function () {
    a.addEventListener('timeupdate', function () {
      var e = a.currentTime;
      te.forEach(function (t) {
        if (Math.abs(e - t.time) < 0.5) {
          var a = document.getElementById(t.elementId);
          if (a) {
            if (t.classlistRemove) {
              a.classList.remove(t.classlistRemove);
            }
            if (t.classlistAdd) {
              a.classList.add(t.classlistAdd);
            }
            if (t.play) {
              a.play();
            }
            if (t.remove) {
              a.remove();
            }
            if (t.startCountdown) {
              var s = t.startCountdown.split(', ');
              var n = Y[s[0]];
              var i = parseInt(s[1], 10);
              je(n, i);
            }
            if (t.src) {
              a.src = t.src;
            }
          }
        }
      });
    });
  }, 200);
}
function tt() {
  z.length = 0;
  T = 1;
  ve.emit('message', {
    message: 'Round 2 finished',
    room_id: roomId
  });
  document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(3)');
  document.getElementById('skipRoundBtn').classList.add('aparecendo');
  document.getElementById('timer').style.display = 'block';
  document.getElementById('skipRoundBtn').disabled = false;
  var e = document.getElementById("soundTrackR2");
  var t = document.getElementById("soundTrackR3");
  var a = document.getElementById("audioR3");
  t.src = '/static/pgGame/audios/r3/soundTrackR3Var1.mp3';
  a.src = '/static/pgGame/audios/r3/audioR3var1.mp3';
  var s = document.getElementById('playerList');
  var n = s.cloneNode(true);
  n.id = 'playerListR2';
  document.getElementById('roundContainer').innerHTML = "\n    <img id=\"iluminacao\" src=\"/static/images/iluminacao.png\" alt=\"\">\n    <img id=\"logoLow\" src=\"/static/images/LogoLow.png\" alt=\"\">\n    <img id=\"logo\" src=\"/static/images/LOGO.png\" alt=\"\">\n    <img id=\"show\" src=\"/static/images/OSHOW.png\" alt=\"\">\n    <img src=\"/static/images/Round3Low.png\" id=\"roundsLow\">\n    <img src=\"/static/images/Round3.png\" id=\"rounds\">\n    <audio id=\"whistleUp\" src=\"/static/pgGame/audios/WhistleUp.mp3\" type=\"audio/mpeg\"></audio>\n    <audio id=\"whistleDown\" src=\"/static/pgGame/audios/WhistleDown.mp3\" type=\"audio/mpeg\"></audio>\n    ";
  document.getElementById('roundContainer').appendChild(n);
  var i = document.getElementById("subtitles");
  var r = [];
  fetch('/static/pgGame/rounds/captionR3Var1.json').then(function (e) {
    return e.json();
  }).then(function (e) {
    r = e;
  });
  a.ontimeupdate = function () {
    var e = a.currentTime;
    var t = r.find(function (t) {
      return e >= t.start && e <= t.end;
    });
    if (t) {
      i.innerHTML = t.text;
    } else {
      i.innerHTML = '';
    }
  };
  if (ge(Q, 0) === '0') {
    fetch('/static/pgGame/rounds/round3/r3Var1Low.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r3/audioR3var1Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circleLow').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        ce.remove();
        if (le === '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  } else {
    fetch('/static/pgGame/rounds/round3/r3Var1.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r3/audioR3var1Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circle').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        ce.remove();
        if (le == '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  }
  ce = a;
  setTimeout(function () {
    a.addEventListener('timeupdate', function () {
      var e = a.currentTime;
      te.forEach(function (t) {
        if (Math.abs(e - t.time) < 0.5) {
          var a = document.getElementById(t.elementId);
          if (a) {
            if (t.classlistRemove) {
              a.classList.remove(t.classlistRemove);
            }
            if (t.classlistAdd) {
              a.classList.add(t.classlistAdd);
            }
            if (t.play) {
              a.play();
            }
            if (t.remove) {
              a.remove();
            }
            if (t.startCountdown) {
              var s = t.startCountdown.split(', ');
              var n = Y[s[0]];
              var i = parseInt(s[1], 10);
              je(n, i);
            }
            if (t.src) {
              a.src = t.src;
            }
          }
        }
      });
    });
  }, 200);
}
function at() {
  z.length = 0;
  T = 2;
  ve.emit('message', {
    message: 'Round 2 finished',
    room_id: roomId
  });
  document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(3)');
  document.getElementById('skipRoundBtn').classList.add('aparecendo');
  document.getElementById('timer').style.display = 'block';
  document.getElementById('skipRoundBtn').disabled = false;
  var e = document.getElementById("soundTrackR2");
  var t = document.getElementById("soundTrackR3");
  var a = document.getElementById("audioR3");
  t.src = '/static/pgGame/audios/r3/soundTrackR3Var2.mp3';
  a.src = '/static/pgGame/audios/r3/audioR3var2.mp3';
  var s = document.getElementById('playerList');
  var n = s.cloneNode(true);
  n.id = 'playerListR2';
  document.getElementById('roundContainer').innerHTML = "\n    <img id=\"iluminacao\" src=\"/static/images/iluminacao.png\" alt=\"\">\n    <img id=\"logoLow\" src=\"/static/images/LogoLow.png\" alt=\"\">\n    <img id=\"logo\" src=\"/static/images/LOGO.png\" alt=\"\">\n    <img id=\"show\" src=\"/static/images/OSHOW.png\" alt=\"\">\n    <img src=\"/static/images/Round3Low.png\" id=\"roundsLow\">\n    <img src=\"/static/images/Round3.png\" id=\"rounds\">\n    <audio id=\"whistleUp\" src=\"/static/pgGame/audios/WhistleUp.mp3\" type=\"audio/mpeg\"></audio>\n    <audio id=\"whistleDown\" src=\"/static/pgGame/audios/WhistleDown.mp3\" type=\"audio/mpeg\"></audio>\n    ";
  document.getElementById('roundContainer').appendChild(n);
  var i = document.getElementById("subtitles");
  var r = [];
  fetch('/static/pgGame/rounds/captionR3Var2.json').then(function (e) {
    return e.json();
  }).then(function (e) {
    r = e;
  });
  a.ontimeupdate = function () {
    var e = a.currentTime;
    var t = r.find(function (t) {
      return e >= t.start && e <= t.end;
    });
    if (t) {
      i.innerHTML = t.text;
    } else {
      i.innerHTML = '';
    }
  };
  if (ge(Q, 0) === '0') {
    fetch('/static/pgGame/rounds/round3/r3Var2Low.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r3/audioR3var2Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circleLow').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        ce.remove();
        if (le == '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  } else {
    fetch('/static/pgGame/rounds/round3/r3Var2.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r3/audioR3var2Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circle').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        ce.remove();
        if (le == '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  }
  ce = a;
  setTimeout(function () {
    a.addEventListener('timeupdate', function () {
      var e = a.currentTime;
      te.forEach(function (t) {
        if (Math.abs(e - t.time) < 0.5) {
          var a = document.getElementById(t.elementId);
          if (a) {
            if (t.classlistRemove) {
              a.classList.remove(t.classlistRemove);
            }
            if (t.classlistAdd) {
              a.classList.add(t.classlistAdd);
            }
            if (t.play) {
              a.play();
            }
            if (t.remove) {
              a.remove();
            }
            if (t.startCountdown) {
              var s = t.startCountdown.split(', ');
              var n = Y[s[0]];
              var i = parseInt(s[1], 10);
              je(n, i);
            }
            if (t.src) {
              a.src = t.src;
            }
          }
        }
      });
    });
  }, 200);
}
function st() {
  z.length = 0;
  T = 3;
  ve.emit('message', {
    message: 'Round 2 finished',
    room_id: roomId
  });
  document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(3)');
  document.getElementById('skipRoundBtn').classList.add('aparecendo');
  document.getElementById('timer').style.display = 'block';
  document.getElementById('skipRoundBtn').disabled = false;
  var e = document.getElementById("soundTrackR2");
  var t = document.getElementById("soundTrackR3");
  var a = document.getElementById("audioR3");
  t.src = '/static/pgGame/audios/r3/soundTrackR3.mp3';
  a.src = '/static/pgGame/audios/r3/audioR3var3.mp3';
  var s = document.getElementById('playerList');
  var n = s.cloneNode(true);
  n.id = 'playerListR2';
  document.getElementById('roundContainer').innerHTML = "\n    <img id=\"iluminacao\" src=\"/static/images/iluminacao.png\" alt=\"\">\n    <img id=\"logoLow\" src=\"/static/images/LogoLow.png\" alt=\"\">\n    <img id=\"logo\" src=\"/static/images/LOGO.png\" alt=\"\">\n    <img id=\"show\" src=\"/static/images/OSHOW.png\" alt=\"\">\n    <img src=\"/static/images/Round3Low.png\" id=\"roundsLow\">\n    <img src=\"/static/images/Round3.png\" id=\"rounds\">\n    <audio id=\"whistleUp\" src=\"/static/pgGame/audios/WhistleUp.mp3\" type=\"audio/mpeg\"></audio>\n    <audio id=\"whistleDown\" src=\"/static/pgGame/audios/WhistleDown.mp3\" type=\"audio/mpeg\"></audio>\n    ";
  document.getElementById('roundContainer').appendChild(n);
  var i = document.getElementById("subtitles");
  var r = [];
  fetch('/static/pgGame/rounds/captionR3Var3.json').then(function (e) {
    return e.json();
  }).then(function (e) {
    r = e;
  });
  a.ontimeupdate = function () {
    var e = a.currentTime;
    var t = r.find(function (t) {
      return e >= t.start && e <= t.end;
    });
    if (t) {
      i.innerHTML = t.text;
    } else {
      i.innerHTML = '';
    }
  };
  if (ge(Q, 0) === '0') {
    fetch('/static/pgGame/rounds/round3/r3Var3Low.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r3/audioR3var3Q".concat(le, ".mp3");
    console.log(te);
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circleLow').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        ce.remove();
        if (le == '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  } else {
    fetch('/static/pgGame/rounds/round3/r3Var3.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r3/audioR3var3Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circle').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        ce.remove();
        if (le == '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  }
  ce = a;
  setTimeout(function () {
    a.addEventListener('timeupdate', function () {
      var e = a.currentTime;
      te.forEach(function (t) {
        if (Math.abs(e - t.time) < 0.5) {
          var a = document.getElementById(t.elementId);
          if (a) {
            if (t.classlistRemove) {
              a.classList.remove(t.classlistRemove);
            }
            if (t.classlistAdd) {
              a.classList.add(t.classlistAdd);
            }
            if (t.play) {
              a.play();
            }
            if (t.remove) {
              a.remove();
            }
            if (t.startCountdown) {
              var s = t.startCountdown.split(', ');
              var n = Y[s[0]];
              var i = parseInt(s[1], 10);
              je(n, i);
            }
            if (t.src) {
              a.src = t.src;
            }
          }
        }
      });
    });
  }, 200);
}
function nt() {
  z.length = 0;
  T = 1;
  ve.emit('message', {
    message: 'Round 3 finished',
    room_id: roomId
  });
  document.getElementById('skipRoundBtn').setAttribute('onclick', 'skipRound(4)');
  document.getElementById('timer').style.display = 'block';
  document.getElementById('skipRoundBtn').disabled = true;
  var e = document.getElementById("soundTrackR3");
  var t = document.getElementById("soundTrackR4");
  var a = document.getElementById("audioR4");
  document.getElementById('roundContainer').innerHTML = "\n    <img id=\"iluminacao\" src=\"/static/images/iluminacao.png\" alt=\"\">\n    <img id=\"logoLow\" src=\"/static/images/LogoLow.png\" alt=\"\">\n    <img id=\"logo\" src=\"/static/images/LOGO.png\" alt=\"\">\n    <img id=\"show\" src=\"/static/images/OSHOW.png\" alt=\"\">\n    <img src=\"/static/images/Round4Low.png\" id=\"roundsLow\">\n    <img src=\"/static/images/Round4.png\" id=\"rounds\">\n    <audio id=\"whistleUp\" src=\"/static/pgGame/audios/WhistleUp.mp3\" type=\"audio/mpeg\"></audio>\n    <audio id=\"whistleDown\" src=\"/static/pgGame/audios/WhistleDown.mp3\" type=\"audio/mpeg\"></audio>\n    ";
  var s = document.getElementById("subtitles");
  var n = [];
  fetch('/static/pgGame/rounds/captionR4.json').then(function (e) {
    return e.json();
  }).then(function (e) {
    n = e;
  });
  a.ontimeupdate = function () {
    var e = a.currentTime;
    var t = n.find(function (t) {
      return e >= t.start && e <= t.end;
    });
    if (t) {
      s.innerHTML = t.text;
    } else {
      s.innerHTML = '';
    }
  };
  if (ge(Q, 0) === '0') {
    fetch('/static/pgGame/rounds/round4/r4Var1Low.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r4/audioR4Q".concat(le, ".mp3");
    console.log(te);
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circleLow').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        ce.remove();
        if (le == '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  } else {
    fetch('/static/pgGame/rounds/round4/r4Var1.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      te = e;
    });
    a.src = "/static/pgGame/audios/r4/audioR4Q".concat(le, ".mp3");
    z.push(setTimeout(function () {
      document.getElementById('timerContainer').classList.remove('appear');
      document.getElementById('timer').classList.add('appear');
      document.getElementById('circle').classList.add('close');
      whistleDown.play();
      z.push(setTimeout(function () {
        e.remove();
        ce.remove();
        if (le == '1') {
          t.play();
        }
        a.play();
      }, 1000));
    }, 500));
  }
  ce = a;
  setTimeout(function () {
    a.addEventListener('timeupdate', function () {
      var e = a.currentTime;
      te.forEach(function (t) {
        if (Math.abs(e - t.time) < 0.5) {
          var a = document.getElementById(t.elementId);
          if (a) {
            if (t.classlistRemove) {
              a.classList.remove(t.classlistRemove);
            }
            if (t.classlistAdd) {
              a.classList.add(t.classlistAdd);
            }
            if (t.play) {
              a.play();
            }
            if (t.remove) {
              a.remove();
            }
            if (t.startCountdown) {
              var s = t.startCountdown.split(', ');
              var n = Y[s[0]];
              var i = parseInt(s[1], 10);
              var r = parseInt(s[2], 10);
              je(35, 0, 4);
            }
            if (t.startTournament) {
              Me(roomId);
            }
            if (t.src) {
              a.src = t.src;
            }
            if (t.timeOut) {
              z.push(setTimeout(function () {
                Ve();
              }, 1000));
              z.push(setTimeout(function () {
                document.getElementById('papaleguas').classList.add('appear');
              }, 2000));
            }
          }
        }
      });
    });
  }, 200);
  Me(roomId);
}
function it() {
  z.length = 0;
  T = 1;
  document.getElementById('skipRoundBtn').setAttribute('onclick', "skipRound('final')");
  var e = document.getElementById("audioFinal");
  var t = document.getElementById("soundTrackR4");
  t.pause();
  document.getElementById('roundContainer').innerHTML = "\n    <img id=\"iluminacao\" src=\"/static/images/iluminacao.png\" alt=\"\">\n    <img src=\"/static/images/Round2.png\" id=\"rounds\">\n    <audio id=\"whistleUp\" src=\"/static/pgGame/audios/WhistleUp.mp3\" type=\"audio/mpeg\"></audio>\n    <audio id=\"whistleDown\" src=\"/static/pgGame/audios/WhistleDown.mp3\" type=\"audio/mpeg\"></audio>\n    ";
  var a = document.getElementById("whistleDown");
  var s = document.getElementById("whistleUp");
  var n = document.getElementById("subtitles");
  var i = [];
  fetch('/static/pgGame/rounds/captionFinal.json').then(function (e) {
    return e.json();
  }).then(function (e) {
    i = e;
  });
  e.ontimeupdate = function () {
    var t = e.currentTime;
    var a = i.find(function (e) {
      return t >= e.start && t <= e.end;
    });
    if (a) {
      n.innerHTML = a.text;
    } else {
      n.innerHTML = '';
    }
  };
  document.getElementById('timerContainer').classList.remove('appear');
  setTimeout(function () {
    document.getElementById('circle').classList.add('close');
    a.play();
    setTimeout(function () {
      t.remove();
      ce.remove();
      e.play();
      document.getElementById('timerContainer').classList.remove('appear');
    }, 1000);
  }, 500);
  setTimeout(function () {
    document.getElementById('circle').classList.remove('close');
    document.getElementById('circle').classList.add('final-round');
    ie = true;
    s.play();
    document.getElementById('timerContainer').classList.remove('appear');
    var e = document.getElementById('matchups');
    var t = document.getElementById('papaleguas');
    t.classList.add('final-round');
    e.classList.add('final-round');
    var a = document.getElementById("".concat(Ne.playerId, "Container"));
    var n = document.createElement('div');
    var i = document.createElement('div');
    var r = document.createElement('div');
    var o = document.createElement('img');
    var d = document.getElementById('iluminacao');
    d.classList.add('final');
    i.src = '/static/images/plaquinha.png';
    o.src = "/static/images/".concat(Ne.character, ".png");
    r.classList.add('fodao');
    r.innerHTML = "".concat(Ne.username);
    o.classList.add('perdedor-image');
    o.id = 'perdedorImg';
    n.classList.add('vencedor-container');
    i.classList.add('sign');
    a.appendChild(n);
    n.appendChild(o);
    n.appendChild(i);
    i.appendChild(r);
    fetch('/static/pgGame/rounds/round4/creditos.json').then(function (e) {
      return e.json();
    }).then(function (e) {
      var a = document.createElement('div');
      a.id = 'creditosContainer';
      e.creditos.forEach(function (e) {
        var t = document.createElement('div');
        t.classList.add('creditos-element');
        var s = document.createElement('h1');
        s.classList.add('h1-creditos');
        s.textContent = e.categoria;
        t.appendChild(s);
        var n = document.createElement('ul');
        n.classList.add('list-creditos');
        e.items.forEach(function (e) {
          var t = document.createElement('li');
          t.classList.add('list-element-creditos');
          var a = document.createElement('span');
          a.classList.add('span-creditos');
          a.innerHTML = "<b>".concat(e.titulo, "</b>");
          var s = document.createElement('span');
          s.classList.add('span-creditos');
          s.textContent = e.nome;
          t.appendChild(a);
          t.appendChild(s);
          n.appendChild(t);
        });
        t.appendChild(n);
        a.appendChild(t);
      });
      var s = document.createElement('span');
      s.classList.add('span-creditos');
      s.textContent = e.inspiracao;
      a.appendChild(s);
      var n = document.createElement('img');
      n.classList.add('logo-creditos');
      n.src = e.logoSrc;
      a.appendChild(n);
      t.appendChild(a);
    })["catch"](function (e) {
      return console.error('Erro ao carregar os créditos:', e);
    });
    function l() {
      fetch("/room_status/".concat(roomId)).then(function (e) {
        return e.json();
      }).then(function (e) {
        for (var t = 0, a = Object.entries(e.players); t < a.length; t++) {
          var s = v(a[t], 2),
            n = s[0],
            i = s[1];
          var r = document.createElement('li');
          var o = document.getElementById('participantesCreditos');
          var d = document.createElement('span');
          var l = document.createElement('span');
          r.classList.add('list-element-creditos');
          l.innerHTML = "".concat(i.username, " como ");
          d.innerHTML = "<b>".concat(i.character, "</b>");
          d.classList.add('span-creditos');
          l.classList.add('span-creditos');
          r.appendChild(l);
          r.appendChild(d);
          o.appendChild(r);
        }
      });
    }
    l();
    document.getElementById('skipRoundBtn').disabled = false;
    document.getElementById('skipRoundBtn').classList.add('aparecendo');
  }, 10500);
  z.push(setTimeout(function () {
    var e = document.createElement('div');
    e.id = "loadingScreen";
    e.classList.add('message-screen');
    e.classList.add('show');
    e.innerHTML = "\n        <button class=\"final-btn\" id=\"newGameBtn\" onclick=\"backToBox()\">Voltar \xE0 Caixa</button>\n        <img id=\"finalLogo\" src=\"/static/images/index/planoA.png\" alt=\"\">\n        ";
    document.body.appendChild(e);
  }, 90000));
}
function rt(e) {
  document.getElementById('skipRoundBtn').disabled = true;
  document.getElementById('skipRoundBtn').classList.remove('aparecendo');
  z.forEach(function (e) {
    clearTimeout(e);
  });
  if (e === 1) {
    var t = document.getElementById("audioR1");
    t.pause();
    t.currentTime = 0;
    je(X, 500);
    document.getElementById('timerContainer').classList.add('appear');
  }
  if (e === 2) {
    var a = document.getElementById("audioR2");
    if (T === 1) {
      a.currentTime = 10.6;
      setTimeout(function () {
        a.currentTime = 11;
      }, 100);
    }
    if (T === 2) {
      a.currentTime = 11;
      setTimeout(function () {
        a.currentTime = 14;
      }, 100);
    }
    if (T === 3) {
      a.currentTime = 17;
      setTimeout(function () {
        a.currentTime = 17.8;
      }, 100);
    }
    je(J, 500);
    document.getElementById('timerContainer').classList.add('appear');
  }
  if (e === 3) {
    var s = document.getElementById("audioR3");
    if (T === 1) {
      s.currentTime = 29.4;
      setTimeout(function () {
        s.currentTime = 30;
      }, 100);
    }
    if (T === 2) {
      s.currentTime = 22.2;
      setTimeout(function () {
        s.currentTime = 22.2;
      }, 100);
    }
    if (T === 3) {
      s.currentTime = 15.4;
      setTimeout(function () {
        s.currentTime = 15.7;
      }, 100);
    }
    je(K, 500);
    document.getElementById('timerContainer').classList.add('appear');
  }
  if (e === 4) {
    var n = document.getElementById("audioR4");
    je(Z, 500);
    document.getElementById('timerContainer').classList.add('appear');
  }
  if (e === 'final') {
    var i = document.getElementById("audioFinal");
    i.pause();
    i.currentTime = 0;
    var r = document.createElement('div');
    r.id = "loadingScreen";
    r.classList.add('message-screen');
    r.classList.add('show');
    r.innerHTML = "\n        <img src=\"/static/images/LOGO.png\" class=\"loading-screen-img\"></img>\n        <button class=\"final-btn\" onclick=\"createRoom()\" id=\"newGameBtn\">Jogar Novamente</button>\n        <button class=\"final-btn\" id=\"newGameBtn\" onclick=\"backToBox()\">Voltar \xE0 Caixa</button>\n        <img id=\"finalLogo\" src=\"/static/images/index/planoA.png\" alt=\"\">\n        ";
    document.body.appendChild(r);
  }
  document.getElementById('circle').classList.remove('close');
  document.getElementById('circle').classList.add('open');
  document.getElementById('roundContainer').innerHTML = '';
  document.getElementById('roundContainer').innerHTML = "\n        <img id=\"iluminacao\" src=\"/static/images/iluminacao.png\" alt=\"\">\n        <img id=\"logo\" src=\"/static/images/LOGO.png\" alt=\"\">\n        <img id=\"show\" src=\"/static/images/OSHOW.png\" alt=\"\">\n    ";
}
function ot(e) {
  var t = e;
  fetch('/call_ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_path: t
    })
  }).then(function (e) {
    return e.json();
  }).then(function (e) {
    document.getElementById('responseMessage').innerText = e.response;
  })["catch"](function (e) {
    return console.error('Error:', e);
  });
}
var dt = performance.now();
var lt = 0;
var ct = [];
var mt = performance.now();
var pt = 5000;
var gt = true;
function ut() {
  if (localStorage.getItem('pc-gm-qual')) {
    Q = localStorage.getItem('pc-gm-qual');
    if (Q == 'high') {
      yt(Q);
    } else if (Q == 'medium') {
      yt(Q);
    } else {
      yt(Q);
    }
  } else {
    requestAnimationFrame(ht);
  }
}
function yt(e) {
  var t = document.getElementById('animationSelect');
  var a = document.getElementById('screenSelect');
  var s = document.getElementById('effectContainer');
  var n = document.getElementById('legendaActivationSelect');
  Q = e;
  localStorage.setItem('pc-gm-qual', Q);
  Et().then(function (e) {
    if (e) {
      pe(Q, 3, "1");
      localStorage.setItem('pc-gm-qual', Q);
      le = ge(Q, 3);
    } else {
      pe(Q, 3, "0");
      localStorage.setItem('pc-gm-qual', Q);
      le = ge(Q, 3);
    }
  });
  if (ge(e, 0) == 1) {
    pe(Q, 0, "1");
    t.value = 'Alto';
    vt(e);
  } else {
    pe(Q, 0, "0");
    t.value = 'Baixo';
    vt(e);
  }
  if (ge(e, 1) == 1) {
    pe(Q, 1, "1");
    a.value = 'Ativado';
    vt(e);
  } else {
    pe(Q, 1, "0");
    a.value = 'Desativado';
    s.classList.toggle('ativo');
    vt(e);
  }
  if (ge(e, 2) == 1) {
    pe(Q, 2, "1");
    n.value = 'Ativado';
    vt(e);
  } else {
    pe(Q, 2, "0");
    n.value = 'Desativado';
    document.getElementById('subtitles').classList.toggle('active');
    vt(e);
  }
}
function ht() {
  var e = performance.now();
  var t = (e - dt) / 1000;
  dt = e;
  lt = 1 / t;
  if (gt) {
    ct.push(lt);
    if (e - mt >= pt) {
      gt = false;
      var a = ct.reduce(function (e, t) {
        return e + t;
      }, 0) / ct.length;
      var s = 0;
      if (a < 10) {
        s = '00111111';
      } else if (a < 30) {
        s = '10111111';
      } else {
        s = '11111111';
      }
      yt(s);
    }
  }
  document.getElementById('fps').textContent = "FPS: ".concat(lt.toFixed(2));
  document.getElementById('fps').style.display = 'none';
  requestAnimationFrame(ht);
}
function Et() {
  return Lt.apply(this, arguments);
}
function Lt() {
  Lt = g(/*#__PURE__*/m().mark(function e() {
    var t, a, s, n;
    return m().wrap(function i(e) {
      while (1) switch (e.prev = e.next) {
        case 0:
          e.prev = 0;
          t = new (window.AudioContext || window.webkitAudioContext)();
          a = t.createGain();
          a.gain.value = 0.0001;
          s = t.createOscillator();
          n = t.createOscillator();
          s.frequency.setValueAtTime(440, t.currentTime);
          n.frequency.setValueAtTime(660, t.currentTime);
          s.connect(a);
          n.connect(a);
          a.connect(t.destination);
          s.start();
          n.start();
          setTimeout(function () {
            s.stop();
            n.stop();
            t.close();
          }, 1000);
          return e.abrupt("return", true);
        case 17:
          e.prev = 17;
          e.t0 = e["catch"](0);
          return e.abrupt("return", false);
        case 20:
        case "end":
          return e.stop();
      }
    }, e, null, [[0, 17]]);
  }));
  return Lt.apply(this, arguments);
}
function vt(e) {
  var t = document.getElementById('loadingScreen');
  t.classList.add('skip');
  setTimeout(function () {
    t.remove();
  }, 1000);
}
ut();
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/static/pgGame/scripts/sw.js').then(function (e) {
    console.log('Service Worker registrado com sucesso:', e);
  })["catch"](function (e) {
    console.log('Falha ao registrar o Service Worker:', e);
  });
}
function It() {
  fetch('/create_room', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (e) {
    return e.json();
  }).then(function (e) {
    if (e.room_id === undefined) {
      var t = document.getElementById('errorMsg');
      var a = document.getElementById('errorContainer');
      if (e.cooldown_remaining !== undefined) {
        t.innerText = "Cooldown ativo. Tente novamente em ".concat(Math.ceil(e.cooldown_remaining), " segundos.");
        a.classList.add('appear');
        setTimeout(function () {
          a.classList.remove('appear');
        }, 2000);
      } else {
        console.error('Erro: room_id retornou undefined');
      }
    } else {
      var s = e.room_id;
      window.location.href = "/host/".concat(s);
    }
  })["catch"](function (e) {
    console.error('Error:', e);
  });
}
function Bt() {
  window.location.href = "/";
}