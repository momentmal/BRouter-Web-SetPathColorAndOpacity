document.addEventListener("DOMContentLoaded", function() {
  let colorPicker = document.getElementById("color-picker");
  let opacitySlider = document.getElementById("opacity-slider");
  let applyButton = document.getElementById("apply-button");

  // Retrieve the stored color and opacity values, or use default values if none are stored
  chrome.storage.sync.get({"color": "#008000", "opacity": 0.5}, function(result) {
    colorPicker.value = result.color;
    opacitySlider.value = result.opacity;
  });

  applyButton.addEventListener("click", function() {
    // Store the color and opacity values
    chrome.storage.sync.set({"color": colorPicker.value, "opacity": opacitySlider.value});

    // Send a message to the content script with the color and opacity values
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { 
        action: "applyColors",
        color: colorPicker.value,
        opacity: opacitySlider.value
      });
    });
  });
});
