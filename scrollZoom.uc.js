// ==UserScript==
// @name                 Scroll Zoom
// @version              1.0
// @description          Hover button and use mouse wheel to zoom. Left-click on button to reset zoom.
// ==/UserScript==


(function() { 

  "use strict";

  var disableScript = false;

  if (disableScript || location != "chrome://browser/content/browser.xul") return;

  const btnImage = "list-style-image: url('file:///C:/Firefox Images/scroll.png')",
        btnLabel = "Scroll Zoom",
        btnTip = "Hover button and use mouse wheel to zoom.\nLeft-click to reset zoom.";

  function onClick(e) {
    if (e.button === 0) zoomNormal();
  }

  function zoomNormal() { FullZoom.reset() }

  function zoomOut() { FullZoom.reduce() }

  function zoomIn() { FullZoom.enlarge() }

  function zoomScroll(e) { e.detail < 0 ? zoomOut() : zoomIn() }

  try {
    CustomizableUI.createWidget({
      id: "scroll-zoom",
      type: "custom",
      defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function(aDocument) {
        var toolbaritem = aDocument.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul", "toolbarbutton");
        toolbaritem.addEventListener("DOMMouseScroll", function(e) { zoomScroll(e) }, false);
        toolbaritem.onclick = e => onClick(e);
        var props = {
          id: "scroll-zoom",
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
