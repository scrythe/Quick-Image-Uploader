const saveToInputField = document.querySelector('.saveToInputField');
const dataTransfer = new DataTransfer();

document.addEventListener('paste', async (event) => {
  const items = (event.clipboardData || event.originalEvent.clipboardData)
    .items;
  const file = items[0].getAsFile();
  dataTransfer.items.add(file);
  const fileURL = await convertFileToUrl(file);
  const imageElement = document.createElement('img');
  imageElement.src = fileURL;
  document.body.prepend(imageElement);
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

saveToInputField.addEventListener('click', async () => {
  const activeTab = await getActiveTab();
  chrome.tabs.sendMessage(activeTab.id, {
    type: 'saveToInputField',
    data: dataTransfer.files,
  });
});

async function getActiveTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
