const IMAGE_CONTEXT_MENU_ID = "IMAGE_CONTEXT_MENU";
const SCREENSHOT_CONTEXT_MENU_ID = "SCREENSHOT_CONTEXT_MENU";
var invokeAction = info => {
    if (![IMAGE_CONTEXT_MENU_ID, SCREENSHOT_CONTEXT_MENU_ID].includes(info.menuItemId)) return;

    if (info.menuItemId == IMAGE_CONTEXT_MENU_ID) {
        chrome.storage.local.set({ action: 'IMAGE', image: info.srcUrl }, function () {
            chrome.tabs.create({ url: chrome.extension.getURL('extension.html') });
        });
    }
    else if (info.menuItemId == SCREENSHOT_CONTEXT_MENU_ID) {
        chrome.tabs.captureVisibleTab(null, {}, (dataUri) => {
            chrome.storage.local.set({ action: 'SCREENSHOT', image: dataUri }, function () {
                chrome.tabs.create({ url: chrome.extension.getURL('extension.html') });
            });
        });
    }
}

chrome.contextMenus.create({
    title: "Generate Meme from Image",
    contexts: ["image"],
    id: IMAGE_CONTEXT_MENU_ID
});

chrome.contextMenus.create({
    title: "Screenshot Meme",
    contexts: ["all"],
    id: SCREENSHOT_CONTEXT_MENU_ID
});
chrome.contextMenus.onClicked.addListener(invokeAction);

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "SCREENSHOT") {
        chrome.tabs.captureVisibleTab(null, {format: "jpeg", quality: 100}, (dataUri) => {
            chrome.storage.local.set({ action: 'SCREENSHOT', image: dataUri }, function () {
                chrome.tabs.create({ url: chrome.extension.getURL('extension.html') });
            });
        });
    }
});