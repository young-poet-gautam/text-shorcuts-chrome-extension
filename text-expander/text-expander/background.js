// Initialize storage with an empty object on first install.
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ snippets: {} });
  console.log('Initialized snippets storage.');
});

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "addSnippet") {
    // 1. Get the current snippets from storage
    chrome.storage.sync.get("snippets", (data) => {
      const snippets = data.snippets || {};
      // 2. Add the new snippet
      snippets[request.shortcode] = request.sentence;
      // 3. Save the updated snippets back to storage
      chrome.storage.sync.set({ snippets }, () => {
        console.log('Snippet added:', request.shortcode);
        sendResponse({ status: "success" });
      });
    });
    return true; // Indicates that the response is sent asynchronously
  }

  if (request.action === "getSnippets") {
    chrome.storage.sync.get("snippets", (data) => {
      sendResponse({ snippets: data.snippets || {} });
    });
    return true;
  }
  
  if (request.action === "deleteSnippet") {
    chrome.storage.sync.get("snippets", (data) => {
      const snippets = data.snippets || {};
      delete snippets[request.shortcode]; // Delete the key
      chrome.storage.sync.set({ snippets }, () => {
        console.log('Snippet deleted:', request.shortcode);
        sendResponse({ status: "success" });
      });
    });
    return true;
  }
});