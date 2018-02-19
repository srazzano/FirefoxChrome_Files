// ==UserScript==
// @name                 Menubar Before Urlbar
// @version              1.0
// @description          Put Menubar in front of Urlbar.
// ==/UserScript==


(function() { 

  "use strict";

  var disableScript = false;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  var menubar = document.getElementById("toolbar-menubar"),
      navbar = document.getElementById("nav-bar");
  navbar.insertBefore(menubar, navbar.firstChild);

})();
