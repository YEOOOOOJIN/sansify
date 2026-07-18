// Comic Sansify - content.js
// Injects Comic Sans MS across all text-bearing elements

const STORAGE_KEY = 'comicSansEnabled';

function injectComicSans() {
  const style = document.createElement('style');
  style.id = 'comic-sansify-style';
  style.textContent = `
    *, *::before, *::after {
      font-family: "Comic Sans MS", "Comic Sans", cursive !important;
    }
  `;
  document.documentElement.appendChild(style);
}

function removeComicSans() {
  const el = document.getElementById('comic-sansify-style');
  if (el) el.remove();
}

// Check stored state on load
chrome.storage.local.get([STORAGE_KEY], (result) => {
  const enabled = result[STORAGE_KEY] !== false; // default ON
  if (enabled) injectComicSans();
});

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'TOGGLE') {
    if (message.enabled) {
      injectComicSans();
    } else {
      removeComicSans();
    }
  }
});
