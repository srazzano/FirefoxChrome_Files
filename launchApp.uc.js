// ==UserScript==
// @name                 Launch App
// @version              1.0
// @description          Launch specified apps.
// ==/UserScript==

(function() { 

  "use strict";

  var disableScript = false;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  pref.root = "browser.launch_app.";

  var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

  const app = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsIFile),
        pb = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).QueryInterface(Ci.nsIPrefBranch),
        btnLabel = "Launch App",
        btnTip = "Launch App\n \u2022 Left-click for Wordpad\n \u2022 Middle-click for WordWeb\n \u2022 Right-click for Microsoft Word",
        btnImage = "list-style-image: url('file:///C:/Firefox Images/launch.png')";

  pref.defaults = {
    app1: "C:\\Windows\\System32\\write.exe",
    app2: "C:\\Program Files (x86)\\WordWeb\\wweb32.exe",
    app3: "C:\\Program Files (x86)\\Microsoft Office\\Office10\\WINWORD.EXE"
  }

  for (let key in pref.defaults) {
    if (pref.defaults.hasOwnProperty(key)) {
      let val = pref.defaults[key];
      switch (typeof val) { case "string": pb.getDefaultBranch(pref.root).setCharPref(key, val) }
  } }

  function pref(key) {
    let {branch, defaults} = pref;
    if (branch == null) branch = pb.getBranch(pref.root);
    switch (typeof defaults[key]) { case "string": return branch.getCharPref(key) }
    return null;
  }

  function launchApp(event) {
    if (event.button === 0) var exe = pref("app1");
    if (event.button === 1) var exe = pref("app2");
    if (event.button === 2) var exe = pref("app3");
    app.initWithPath(exe);
    if (!app.exists()) {
      console.error("[userChrome script 'launchApp.uc.js'] Couldn't locate executable.");
      return;
    }
    app.launch();
  }

  try {
    CustomizableUI.createWidget({
      id: "launch-app",
      type: "custom",
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbarbutton");
        toolbaritem.onclick = event => launchApp(event);
        var props = {
          id: "launch-app",
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
