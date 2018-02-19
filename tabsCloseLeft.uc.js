// ==UserScript==
// @name                 Tabs Close Left
// @version              1.0
// @description          Tabs close cn left over favicon 0n hover.
// ==/UserScript==

(function() { 

  "use strict";

  var disableScript = false;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  pref.root = "browser.tabs.";

  var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

  const pb = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).QueryInterface(Ci.nsIPrefBranch),
        btnImage = "list-style-image: url('file:///C:/Firefox Images/closeLeft.png')",
        btnLabel = "Tab Close Left",
        btnTip = "Toggle Tab Close Left On/Off";

  pref.defaults = { tabsCloseLeft: false }
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

  function setCloseLeft() {
    if (pref("tabsCloseLeft")) document.getElementById("main-window").setAttribute("close-left", true);
    else document.getElementById("main-window").removeAttribute("close-left");
  }

  function onClick(event) {
    if (event.button === 0) {
      var bool = pref("tabsCloseLeft") != true ? true : false;
      gRoot.setBoolPref("tabsCloseLeft", bool);
      setCloseLeft();
    }
    else return;
  }

  setCloseLeft();

  try {
    CustomizableUI.createWidget({
      id: "close-left",
      type: "custom",
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbarbutton");
        toolbaritem.onclick = event => onClick(event);
        var props = {
          id: "close-left",
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
