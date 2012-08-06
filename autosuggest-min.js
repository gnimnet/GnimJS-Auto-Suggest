/*
 *  This JavaScript file for Auto Suggest
 *  this component works for GnimJS
 *  Version 0.1.2
 *  Write by Ming
 *  Date 2012.03.10
 */
(function(m,f,k){function l(a,b,d,e,o,l){var c=this;c.d=b;c.l=d||p;c.g=e||q;c.s=o||r;c.v=l||s;c.i=f(a).focus(function(){g=c.i;i()}).blur(function(){g&&(g=k,i())}).keyup(function(a){a=m.event||a;a=a.keyCode;a==t?c.move(0):a==u?c.move(1):a==v?(c.s(g,c.v(h.find("."+j))),i()):8!=a&&32>a||33<=a&&46>=a||112<=a&&123>=a||(a=c.g(g),f.isFunc(c.d)?i(c.d(a,c)?c.l:k):f.isArr(c.d)&&(i(),c.dom(w(a,c.d))))})[0]}function q(a){return a.value}function r(a,b){b&&(a.value=b)}function s(a){return a.text()}function w(a,
b){var d=[];if(""==a)return d;for(var e=0;e<b.length;e++)f.isStr(b[e])&&0<=b[e].toLowerCase().indexOf(a.toLowerCase())&&d.push(b[e]);return d}function n(){if(g){for(var a=g,b=0,d=a.offsetHeight;a.offsetParent;)b+=a.offsetLeft,d+=a.offsetTop,a=a.offsetParent;h.css({left:b+"px",top:d+"px",display:"block"})}}function i(a){a?(h.empty(),f(a).appendTo(h),n()):h.css({display:"none"}).empty()}var j="autosuggest-item-hover",p='<div class="autosuggest-loading">\u6b63\u5728\u52a0\u8f7d...</div>',h=f('<ul class="autosuggest"></ul>').css({display:"none"}).appendTo("body"),
g=k,u=40,t=38,v=13;l.prototype={dom:function(a){var b=this;if(f.isArr(a)&&!f.isStr(a))if(h.empty(),0<a.length){for(var d=0;d<a.length;d++)f('<li class="autosuggest-item">'+a[d]+"</li>").hover(function(){h.find(".autosuggest-item").removeClass(j);f(this).addClass(j)},function(){f(this).removeClass(j)}).mousedown(function(){b.s(g,b.v(f(this)))}).appendTo(h);n()}else i();else i(a)},move:function(a){for(var b=h.find(".autosuggest-item"),d=b.length,e=k,g=0;g<d;g++)if(f(b[g]).hasClass(j)){e=g;break}e=e==
k?a?0:d-1:e+(a?1:-1);b.removeClass(j);0<=e&&e<d&&f(b[e]).addClass(j)}};m.AutoSuggest=l})(window,Gnim,null);
