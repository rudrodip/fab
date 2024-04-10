const pattern = /\/blogs\/.+/;
const blogStyle = {
  maxWidth: '48rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: 'larger',
};

function fixArpit() {
  const cols = document.querySelectorAll('.column');
  cols.forEach((col) => {
    col.classList.remove('column');
  });
  const blogSection = document.querySelector(
    'body > div.container > div > div > section.section'
  );
  for (const key in blogStyle) {
    blogSection.style[key] = blogStyle[key];
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.toggleFix) {
    chrome.storage.sync.get('isBlogFixEnabled', (data) => {
      let isBlogFixEnabled = true;
      if (data.isBlogFixEnabled !== undefined) {
        isBlogFixEnabled = data.isBlogFixEnabled;
      } else {
        chrome.storage.sync.set({ isBlogFixEnabled: true });
      }

      const newState = !isBlogFixEnabled;
      chrome.storage.sync.set({ isBlogFixEnabled: newState });

      if (window.location.pathname.match(pattern)) {
        if (newState) {
          fixArpit();
        } else {
          window.location.reload();
        }
      }
    });
  }
});

chrome.storage.sync.get('isBlogFixEnabled', (data) => {
  const isBlogFixEnabled = data.isBlogFixEnabled !== undefined ? data.isBlogFixEnabled : true;
  if (window.location.pathname.match(pattern) && isBlogFixEnabled) {
    fixArpit();
  }
});