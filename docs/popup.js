document.getElementById("btnScreenshot").onclick = () => {
    chrome.runtime.sendMessage({ action: "SCREENSHOT" })
}