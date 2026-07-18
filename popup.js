// popup.js
const STORAGE_KEY = 'comicSansEnabled';

const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

function updateStatus(enabled) {
  if (enabled) {
    status.textContent = 'Comic Sans is ON';
    status.className = 'status on';
  } else {
    status.textContent = 'Comic Sans is OFF';
    status.className = 'status off';
  }
}

// Load current state
chrome.storage.local.get([STORAGE_KEY], (result) => {
  const enabled = result[STORAGE_KEY] !== false;
  toggle.checked = enabled;
  updateStatus(enabled);
});

// Handle toggle
toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ [STORAGE_KEY]: enabled });
  updateStatus(enabled);

  // Send message to active tab's content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE', enabled });
    }
  });
});
