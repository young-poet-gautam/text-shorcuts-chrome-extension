**Custom Text Expander Chrome Extension 🚀
A simple yet powerful Chrome extension designed to boost your productivity by replacing custom shortcodes with full sentences or paragraphs. Stop typing the same things over and over again!**

This extension is perfect for anyone who frequently fills out forms, answers emails, or types repetitive phrases.

**✨ Features**
Create Custom Snippets: Easily define your own shortcodes and the text they expand to.

Simple Trigger: Uses a simple prefix (>) and a shortcode (e.g., >addr) followed by a space to trigger the expansion.

Real-time Replacement: Works instantly in any standard <input> text box or <textarea> on any webpage.

Easy Management: Add and delete your snippets through a clean and simple popup interface.

Syncs Across Devices: Automatically syncs your saved snippets across all Chrome browsers where you are logged in, thanks to the chrome.storage.sync API.

**🛠️ Installation**
Method 1: For Developers (Loading the extension locally)
Download or clone this project's folder to your local machine.

Open Google Chrome and navigate to chrome://extensions.

Enable Developer mode by clicking the toggle switch in the top-right corner.

Click the "Load unpacked" button.

Select the text-expander project folder.

The extension will now be installed. Make sure to pin it to your toolbar for easy access!


**📖 How to Use**
Pin the Extension: After installing, click the puzzle piece icon 🧩 in your Chrome toolbar and pin the "Custom Text Expander" for easy access.

Add a Snippet:

Click the extension's icon to open the popup.

In the "Shortcode" field, enter a short, memorable word (e.g., sig).

In the "Full Sentence" field, enter the text you want it to expand to (e.g., Best regards, Your Name).

Click the "Add Snippet" button.

Trigger the Expansion:

Go to any webpage with a text field.

Type your trigger and shortcode, for example: >sig

Press the spacebar.

The text >sig  will be instantly replaced with "Best regards, Your Name".

**💻 Technology Stack**
HTML5

CSS3

JavaScript (ES6+)

Chrome Extension APIs (Manifest V3), including:

chrome.storage API for data persistence and sync.

chrome.scripting API for interacting with webpages.

chrome.runtime API for communication between extension components.
