document.addEventListener('DOMContentLoaded', () => {
  const shortcodeInput = document.getElementById('shortcode');
  const sentenceInput = document.getElementById('sentence');
  const addButton = document.getElementById('add-btn');
  const snippetsList = document.getElementById('snippets-list');

  // Function to display all snippets in the list
  function displaySnippets() {
    // Clear the current list
    snippetsList.innerHTML = '';
    // Request snippets from the background script
    chrome.runtime.sendMessage({ action: "getSnippets" }, (response) => {
      const snippets = response.snippets;
      for (const shortcode in snippets) {
        const sentence = snippets[shortcode];

        const snippetDiv = document.createElement('div');
        snippetDiv.className = 'snippet-item';

        const textDiv = document.createElement('div');
        textDiv.className = 'snippet-text';
        textDiv.innerHTML = `<strong>${shortcode}</strong>: ${sentence}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
          chrome.runtime.sendMessage({ action: "deleteSnippet", shortcode: shortcode }, () => {
            displaySnippets(); // Refresh the list after deleting
          });
        });

        snippetDiv.appendChild(textDiv);
        snippetDiv.appendChild(deleteBtn);
        snippetsList.appendChild(snippetDiv);
      }
    });
  }

  // Event listener for the "Add Snippet" button
  addButton.addEventListener('click', () => {
    const shortcode = shortcodeInput.value;
    const sentence = sentenceInput.value;

    if (shortcode && sentence) {
      chrome.runtime.sendMessage({ action: "addSnippet", shortcode: shortcode, sentence: sentence }, () => {
        shortcodeInput.value = ''; // Clear inputs
        sentenceInput.value = '';
        displaySnippets(); // Refresh the list
      });
    }
  });

  // Initial display of snippets when the popup is opened
  displaySnippets();
});