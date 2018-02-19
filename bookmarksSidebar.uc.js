// ==UserScript==
// @name                 Sidebar Button
// @version              1.0
// @description          Hover button opens/closes sidebar.
// ==/UserScript==

(function() { 

  "use strict";

  var disableScript = false;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  const btnImage = "list-style-image: url('file:///C:/Firefox Images/bookmarks.png')";

  try {
    CustomizableUI.createWidget({
      id: "bookmark-button",
      type: "custom",
      defaultArea: CustomizableUI.AREA_MENUBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbarbutton");
        toolbaritem.addEventListener("mouseover", function() { SidebarUI.toggle("viewBookmarksSidebar") }, false);
       var props = { 
          id: "bookmark-button",
          class: "toolbarbutton-1 chromeclass-toolbar-additional",
          style: btnImage
        };
        for (var p in props) toolbaritem.setAttribute(p, props[p]);
        return toolbaritem;
      }
    });
  } catch(e) {};

})();
