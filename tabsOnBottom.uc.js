// ==UserScript==
// @name                 Tabs On Bottom
// @version              1.0
// @description          Toggles tabs on bottom.
// ==/UserScript==

(function() { 

  "use strict";

  var disableScript = false;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  pref.root = "browser.tabs.";

  var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

  const pb = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).QueryInterface(Ci.nsIPrefBranch),
        btnImage = "list-style-image: url('file:///C:/Firefox Images/tabBottom.png')",
        btnLabel = "Tabs On Bottom",
        btnTip = "Toggle Tabs Bottom/Top";

  pref.defaults = { onBottom: false }

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

  function setTabs(bool) {
    if (bool) document.getElementById("main-window").setAttribute("tabs-on-bottom", true);
    else document.getElementById("main-window").removeAttribute("tabs-on-bottom");
    setTimeout(function() {
      var mw = document.getElementById("main-window"),
          nb = document.getElementById("nav-bar");
      if (pb.getBoolPref("browser.toggle_toolbar.toolbarCollapsed")) nb.setAttribute("style", "border-top: 1px solid #9F9FA1 !important; margin-top: -1px !important;");
      else nb.setAttribute("style", "border-top: 1px solid transparent !important; margin-top: 0 !important;");
      if (pb.getBoolPref("browser.toggle_toolbar.toolbarCollapsed") && mw.hasAttribute("tabs-on-bottom")) nb.style.marginRight = "190px";
      else nb.style.marginRight = "0";
    }, 250);
  }

  function onClick(event) {
    if (event.button === 0) {
      let bool = pref("onBottom") != true ? true : false;
      gRoot.setBoolPref("onBottom", bool);
      setTabs(bool);
    }
    else return;
  }

  setTabs(pref("onBottom"));

  try {
    CustomizableUI.createWidget({
      id: "on-bottom",
      type: "custom",
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbarbutton");
        toolbaritem.onclick = event => onClick(event);
        var props = {
          id: "on-bottom",
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
