// This object will hold the snippets retrieved from storage.
let snippets = {};

// Immediately load the snippets from storage.
chrome.storage.sync.get("snippets", (data) => {
  snippets = data.snippets || {};
  console.log("Snippets loaded into content script:", snippets);
});

// Listen for any changes in storage. If the user adds/deletes a snippet
// in the popup, this will automatically update our local `snippets` object.
chrome.storage.onChanged.addListener((changes) => {
  if (changes.snippets) {
    snippets = changes.snippets.newValue || {};
    console.log("Snippets updated in content script:", snippets);
  }
});

// Listen for input events on the entire document.
// This is more efficient than adding a listener to every single text box.
document.addEventListener('input', (event) => {
  // We only care about events from textareas and text inputs.
  const target = event.target;
  if (target.tagName.toLowerCase() !== 'textarea' && target.type !== 'text') {
    return;
  }

  const text = target.value;
  // Use a regular expression to find a shortcode trigger.
  // This looks for our trigger '>' followed by letters/numbers, ending with a space.
  const match = text.match(/>(\w+)\s/);

  if (match) {
    const shortcode = match[1]; // The captured shortcode (e.g., "ttp")
    if (snippets[shortcode]) {
      // If the shortcode exists in our snippets...
      const sentence = snippets[shortcode];
      // Replace the shortcode trigger text with the full sentence.
      target.value = text.replace(match[0], sentence);
    }
  }
});