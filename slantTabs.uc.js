// ==UserScript==
// @name                 Slant Tabs
// @version              1.0
// @description          Toggles slanted tabs theme on/off.
// ==/UserScript==

(function() { 

  "use strict";

  var disableScript = false;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  pref.root = "browser.tabs.";

  var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

  const pb = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).QueryInterface(Ci.nsIPrefBranch),
        btnImage = "list-style-image: url('file:///C:/Firefox Images/tab.png')",
        btnLabel = "Slanted Tabs",
        btnTip = "Toggle Slant Tabs On/Off";

  pref.defaults = { slantTabs: false }
  var gRoot = pb.getBranch(pref.root);

  for (let key in pref.defaults) {
    if (pref.defaults.hasOwnProperty(key)) {
      let val = pref.defaults[key];
      switch (typeof val) { case "boolean": pb.getDefaultBranch(pref.root).setBoolPref(key, val) }
  } }

  function pref(key) {
    let {branch, defaults} = pref;
    if (branch == null) branch = pb.getBranch(pref.root);
    switch (typeof defaults[key]) { case "boolean": return branch.getBoolPref(key) }
    return null;
  }

  function setSlantTab() {
    if (pref("slantTabs")) document.getElementById("main-window").setAttribute("slant-tab", true);
    else document.getElementById("main-window").removeAttribute("slant-tab");
  }

  function onClick(event) {
    if (event.button === 0) {
      var bool = pref("slantTabs") != true ? true : false;
      gRoot.setBoolPref("slantTabs", bool);
      setSlantTab();
    }
    else return;
  }

  setSlantTab();

  try {
    CustomizableUI.createWidget({
      id: "slant-tabs",
      type: "custom",
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbarbutton");
        toolbaritem.onclick = event => onClick(event);
        var props = {
          id: "slant-tabs",
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
