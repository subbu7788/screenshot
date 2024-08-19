chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'captureNode') {
      // This is a simplified version. You may want to implement a node selection mechanism.
      const node = document.querySelector(request.selector); // Capture the entire body for this example
      
      html2canvas(node).then(canvas => {
        const dataUrl = canvas.toDataURL('image/png');
        chrome.runtime.sendMessage({action: 'nodeScreenshotCaptured', dataUrl: dataUrl});
      });
    }
  });