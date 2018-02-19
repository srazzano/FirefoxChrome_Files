// ==UserScript==
// @name                 Toggle Toolbar
// @version              1.0
// @description          Toggles specified toolbar/s.
// ==/UserScript==


(function() { 

  "use strict";

  var disableScript = false;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  pref.root = "browser.toggle_toolbar.";

  var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

  const pb = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).QueryInterface(Ci.nsIPrefBranch),
        btnLabel = "Toggle Toolbar",
        btnImage = "list-style-image: url('file:///C:/Firefox Images/toggleTB.png')";

  pref.defaults = {
    toolbars: "PersonalToolbar",
    toolbarCollapsed: false,
    customCollapsed: true
  }

  for (let key in pref.defaults) {
    if (pref.defaults.hasOwnProperty(key)) {
      let val = pref.defaults[key];
      switch (typeof val) {
        case "boolean":
          pb.getDefaultBranch(pref.root).setBoolPref(key, val);
          break;
        case "string": pb.getDefaultBranch(pref.root).setCharPref(key, val);
  } } }

  function pref(key) {
    let {branch, defaults} = pref;
    if (branch == null) branch = pb.getBranch(pref.root);
    switch (typeof defaults[key]) {
      case "boolean": return branch.getBoolPref(key);
      case "string": return branch.getCharPref(key);
    }
    return null;
  }

  var tog = pref("toolbars").split(","),
      gRoot = pb.getBranch(pref.root),
      btnTip = "Toggle Toolbar\nLeft-click\n \u2022 " + pref("toolbars").replace(/,/g, " \n \u2022 ") + "\nMiddle-click\n \u2022 Custom Toolbar";

  function setToolbar() {
    var mw = document.getElementById("main-window"),
        nb = document.getElementById("nav-bar");
    for (var i in tog) {
      var tb = document.getElementById(tog[i]);
      tb.collapsed = pref("toolbarCollapsed");
    }
    if (pref("toolbarCollapsed")) nb.setAttribute("style", "border-top: 1px solid #9F9FA1 !important; margin-top: -1px !important;");
    else nb.setAttribute("style", "border-top: 1px solid transparent !important; margin-top: 0 !important;");
    if (pref("toolbarCollapsed") && mw.hasAttribute("tabs-on-bottom")) nb.style.marginRight = "190px";
    else nb.style.marginRight = "0";
    setTimeout(function() {
      var ct = document.getElementById("CustomToolbar");
      ct.collapsed = pref("customCollapsed");
    }, 250);
  }

  function toggleToolbar(e) {
    if (e.button === 0) {
      var bool = pref("toolbarCollapsed") !== true ? true : false;
      gRoot.setBoolPref("toolbarCollapsed", bool);
    }
    if (e.button === 1) {
      var bool = pref("customCollapsed") !== true ? true : false;
      gRoot.setBoolPref("customCollapsed", bool);
    }
    setToolbar();
  }

  setToolbar();

  try {
    CustomizableUI.createWidget({
      id: "toggle-toolbar",
      type: "custom",
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbarbutton");
        toolbaritem.onclick = event => toggleToolbar(event);
        var props = {
          id: "toggle-toolbar",
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
