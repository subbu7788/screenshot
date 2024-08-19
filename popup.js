document.getElementById('captureFullScreenshot').addEventListener('click', () => {
    chrome.runtime.sendMessage({action: 'captureFullScreenshot'});
  });
  
  document.getElementById('captureNodeScreenshot').addEventListener('click', () => {
    const selector = document.getElementById('selector').value;
    chrome.runtime.sendMessage({action: 'captureNodeScreenshot',selector: selector});
  });