chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "applyColors") {
    console.log('apply colors was requested')
	var paths = document.querySelectorAll('path');
    paths.forEach(function(path) {
      console.log('trying to set color and opacity')
	  path.style.stroke = request.color;
      path.style.strokeOpacity = request.opacity;
    });
  }
});
