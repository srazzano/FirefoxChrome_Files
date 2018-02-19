// ==UserScript==
// @name                 App/Profile/Date
// @version              1.0
// @description          App/Profile/Date in menubar.
// ==/UserScript==

(function() { 

  "use strict";

  var disableScript = false;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

  const pb = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefService).QueryInterface(Ci.nsIPrefBranch),
        name = Services.appinfo.name,
        version = Services.appinfo.version,
        profile = Services.dirsvc.get("ProfD", Ci.nsIFile).path.split("\\Profiles\\")[1],
        index = profile.lastIndexOf("."),
        prof = profile.substring(index + 1, 20).trim(),
        loc = pb.getCharPref("general.useragent.locale"),
        opt = { weekday: "long", month: "short", day: "numeric" },
        today = " \u2007" + new Date().toLocaleDateString(loc, opt),
        btnLabel1 = name + " " + version + " [" + prof + "]",
        btnLabel2 = today;

  try {
    CustomizableUI.createWidget({
      id: "app-profile",
      type: "custom",
      defaultArea: CustomizableUI.AREA_MENUBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbarbutton");
       var props = {
          id: "app-profile",
          class: "toolbarbutton-1 chromeclass-toolbar-additional title",
          label: btnLabel1
        };
        for (var p in props) toolbaritem.setAttribute(p, props[p]);
        return toolbaritem;
      }
    });
    CustomizableUI.createWidget({
      id: "date-button",
      type: "custom",
      defaultArea: CustomizableUI.AREA_MENUBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbarbutton");
       var props = {
          id: "date-button",
          class: "toolbarbutton-1 chromeclass-toolbar-additional title",
          label: btnLabel2
        };
        for (var p in props) toolbaritem.setAttribute(p, props[p]);
        return toolbaritem;
      }
    });
  } catch(e) {};

})();
