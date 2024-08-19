chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'captureFullScreenshot') {
      chrome.tabs.captureVisibleTab(null, {format: 'png'}, (dataUrl) => {
        openEditorTab(dataUrl);
      });
    } else if (request.action === 'captureNodeScreenshot') {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'captureNode',selector:request.selector});
      });
    }
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'nodeScreenshotCaptured') {
      openEditorTab(request.dataUrl);
    }
  });
  
  function openEditorTab(dataUrl) {
    chrome.tabs.create({url: 'editor.html'}, (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tab.id && info.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener);
          chrome.tabs.sendMessage(tabId, {action: 'initEditor', dataUrl: dataUrl});
        }
      });
    });
  }