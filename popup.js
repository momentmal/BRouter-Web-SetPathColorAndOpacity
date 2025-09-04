document.addEventListener("DOMContentLoaded", () => {
  const colorPicker = document.getElementById("color-picker");
  const opacitySlider = document.getElementById("opacity-slider");
  const applyButton = document.getElementById("apply-button");
  const autoToggle = document.getElementById("auto-toggle");

  // Restore stored settings
  chrome.storage.sync.get(
    { color: "#008000", opacity: 0.5, auto: false },
    (result) => {
      colorPicker.value = result.color;
      opacitySlider.value = result.opacity;
      autoToggle.checked = result.auto;
    }
  );

  // Apply button click
  applyButton.addEventListener("click", () => {
    const color = colorPicker.value;
    const opacity = opacitySlider.value;
    const auto = autoToggle.checked;

    chrome.storage.sync.set({ color, opacity, auto });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "applyColors",
        color,
        opacity,
        auto
      });
    });
  });

  // Toggle auto mode directly from checkbox
  autoToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ auto: autoToggle.checked });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleAuto",
        auto: autoToggle.checked
      });
    });
  });
});
