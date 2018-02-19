// ==UserScript==
// @name                 Restart Button
// @version              1.0
// @description          A toolbar button that restarts Firefox.
// ==/UserScript==

(function() { 

  "use strict";

  var disableScript = false;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

  const aName = Services.appinfo.name,
        aVersion = Services.appinfo.version,
        btnTip = "Restart " + aName + " " + aVersion;

  function restartNow(event) {
    if (event.button === 1) Services.appinfo.invalidateCachesOnRestart();
    else if (event.button === 2) return;
    let cancelQuit = Cc["@mozilla.org/supports-PRBool;1"].createInstance(Ci.nsISupportsPRBool);
    Services.obs.notifyObservers(cancelQuit, "quit-application-requested", "restart");
    if (!cancelQuit.data) Services.startup.quit(Services.startup.eAttemptQuit | Services.startup.eRestart);
  }

  var titlebox = document.getElementById("titlebar-buttonbox"),
      restartbtn = document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbarbutton");
  restartbtn.setAttribute("id", "restart-button");
  restartbtn.setAttribute("class", "titlebar-button");
  restartbtn.setAttribute("tooltiptext", btnTip);
  restartbtn.onclick = event => restartNow(event);
  titlebox.insertBefore(restartbtn, titlebox.firstChild);

})();
