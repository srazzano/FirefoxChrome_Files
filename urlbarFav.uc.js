// ==UserScript==
// @name                 Favicon In Urlbar
// @version              1.0
// @description          Adds site favicon and throbber to urlbar.
// ==/UserScript==

(function() { 

  "use strict";

  var disableScript = false,
      throbber = true;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  const cbFav = "file:///C:/Firefox Images/cb.png",
        usoFav = "file:///C:/Firefox Images/uso.png",
        noFav = "file:///C:/Firefox Images/nofav.png",
        configFav = "file:///C:/Firefox Images/config.png",
        throbberFav = "file:///C:/Firefox Images/throbber1.png";

  try {
    var identityBox = document.getElementById("identity-box"),
        boxImg = document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "image");
    boxImg.setAttribute("id", "sitefavinurl-image");
    identityBox.insertBefore(boxImg, identityBox.firstChild);
  } catch(ex) {}

  setInterval(function() {loadFavs()}, 250);

  function loadFavs() {
    try {
      var favImage = document.getElementById("sitefavinurl-image"),
          tabs = document.getElementsByTagName("tab"),
          tabImg = gBrowser.selectedTab;
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].label.match("about:")) tabs[i].image = configFav;
        if (tabs[i].label.match("Custom Buttons")) tabs[i].image = cbFav;
        if (tabs[i].label.match("forum.userstyles")) tabs[i].image = usoFav;
        if (!tabs[i].image) tabs[i].image = noFav;
      }
      if (tabImg.hasAttribute("busy")) {
        if (throbber) favImage.setAttribute("src", throbberFav);
      } else if (tabImg.image) favImage.setAttribute("src", tabImg.image);
      else favImage.setAttribute("src", noFav);
    } catch(ex) {}
  }

})();
