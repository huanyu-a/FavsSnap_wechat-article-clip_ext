// Open side panel on icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// Context menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'clip-wechat-article',
    title: '剪藏到 FavsSnap',
    documentUrlPatterns: ['https://mp.weixin.qq.com/*'],
    contexts: ['page']
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'clip-wechat-article') {
    await chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

// Keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'clip-current-page') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url && tab.url.includes('mp.weixin.qq.com')) {
      await chrome.sidePanel.open({ windowId: tab.windowId });
    }
  }
});
