let markerInstance;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'initEditor') {
    const img = new Image();
    img.onload = () => {
      document.getElementById('imageContainer').appendChild(img);
      markerInstance = new markerjs2.MarkerArea(img);
      markerInstance.addEventListener('render', (event) => {
        img.src = event.dataUrl;
      });
      markerInstance.show();
    };
    img.src = request.dataUrl;
  }
});

document.getElementById('downloadButton').addEventListener('click', () => {
  const img = document.querySelector('#imageContainer img');
  if (img) {
    const a = document.createElement('a');
    a.href = img.src;
    a.download = 'edited_screenshot.png';
    a.click();
  }
});