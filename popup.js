document.addEventListener('paste', async (event) => {
  const items = (event.clipboardData || event.originalEvent.clipboardData)
    .items;
  const file = items[0].getAsFile();
  const fileURL = await convertFileToUrl(file);
  const imageElement = document.createElement('img');
  imageElement.src = fileURL;
  document.body.appendChild(imageElement);
});

function convertFileToUrl(file) {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.addEventListener('load', (event) => {
      resolve(event.target.result);
    });
    reader.readAsDataURL(file);
  });
}
