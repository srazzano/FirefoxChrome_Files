// ==UserScript==
// @name                 Toggle Statusbar
// @version              1.0
// @description          Toggles Statusbar.
// ==/UserScript==

(function() { 

  "use strict";

  var disableScript = false;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  pref.root = "browser.toggle_statusbar.";

  var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

  const pb = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).QueryInterface(Ci.nsIPrefBranch),
        btnLabel = "Toggle Statusbar",
        btnTip = "Toggle Statusbar",
        btnImage = "list-style-image: url('file:///C:/Firefox Images/toggleSB.png')";

  pref.defaults = {
    collapsed: false
  }

  for (let key in pref.defaults) {
    if (pref.defaults.hasOwnProperty(key)) {
      let val = pref.defaults[key];
      switch (typeof val) {
        case "boolean": pb.getDefaultBranch(pref.root).setBoolPref(key, val);
  } } }

  var gRoot = pb.getBranch(pref.root);

  function pref(key) {
    let {branch, defaults} = pref;
    if (branch == null) branch = pb.getBranch(pref.root);
    switch (typeof defaults[key]) {
      case "boolean": return branch.getBoolPref(key);
    }
    return null;
  }

  function setStatusbar() {
    var tb = document.getElementById("statusbar");
    tb.collapsed = pref("collapsed");
  }

  function toggleStatusbar(e) {
    if (e.button === 0) {
      var bool = pref("collapsed") !== true ? true : false;
      gRoot.setBoolPref("collapsed", bool);
      setStatusbar();
  } }

  setTimeout(function() { setStatusbar() }, 250);

  try {
    CustomizableUI.createWidget({
      id: "statusbar-button",
      type: "custom",
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbarbutton");
        toolbaritem.onclick = event => toggleStatusbar(event);
        var props = {
          id: "statusbar-button",
          class: "toolbarbutton-1 chromeclass-toolbar-additional",
          label: btnLabel,
          tooltiptext: btnTip,
          style: btnImage
        };
        for (var p in props) toolbaritem.setAttribute(p, props[p]);
        return toolbaritem;
      }
    });
  } catch(e) {};

})();

