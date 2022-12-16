chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (request.type == 'saveToInputField') saveToInputField(request.data);
});

function saveToInputField(fileList) {
  function inspectMouseClick(event) {
    const element = event.target;
    element.classList.remove('hoverForSelection');
    deleteAllEventListenersOfInspect();
  }
  function deleteAllEventListenersOfInspect() {
    document.removeEventListener('mouseover', inspectMouseHover);
    document.removeEventListener('mouseout', inspectMouseHover);
    document.removeEventListener('click', inspectMouseClick);
  }
  document.addEventListener('mouseover', inspectMouseHover);
  document.addEventListener('mouseout', inspectMouseHover);
  document.addEventListener('click', inspectMouseClick);
}

function inspectMouseHover(event) {
  event.target.classList.toggle('hoverForSelection');
}
