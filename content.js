function applyColors(color, opacity) {
  // only target real route lines, not helpers or icons
  const paths = document.querySelectorAll(".leaflet-overlay-pane path.leaflet-interactive");
  paths.forEach((path) => {
    path.style.stroke = color;
    path.style.strokeOpacity = opacity;
  });
}

let observer = null;
let autoEnabled = false;
let lastColor = "#008000";
let lastOpacity = 0.5;

function startObserver() {
  if (observer) return;
  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          if (
            (node.tagName === "path" && node.closest(".leaflet-overlay-pane, .leaflet-pane")) ||
            node.querySelector?.(".leaflet-overlay-pane path, .leaflet-pane path")
          ) {
            applyColors(lastColor, lastOpacity);
          }
        }
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  console.log("Auto recolor: ON");
}

function stopObserver() {
  if (observer) {
    observer.disconnect();
    observer = null;
    console.log("Auto recolor: OFF");
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "applyColors") {
    lastColor = request.color;
    lastOpacity = request.opacity;
    applyColors(lastColor, lastOpacity);
    if (request.auto) startObserver();
    else stopObserver();
    sendResponse({ status: "ok" });
  }

  if (request.action === "toggleAuto") {
    if (request.auto) {
      startObserver();
      applyColors(lastColor, lastOpacity); // refresh immediately
    } else {
      stopObserver();
    }
    sendResponse({ status: "ok" });
  }
});

// Restore settings on page load
chrome.storage.sync.get({ color: "#008000", opacity: 0.5, auto: false }, (result) => {
  lastColor = result.color;
  lastOpacity = result.opacity;
  if (result.auto) {
    applyColors(lastColor, lastOpacity);
    startObserver();
  }
});
