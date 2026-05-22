const currentDir = document.getElementById('current-dir');
const selectBtn = document.getElementById('select-btn');
const clearBtn = document.getElementById('clear-btn');
const toast = document.getElementById('toast');

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('success');
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
    toast.classList.remove('success');
  }, 2000);
}

async function load() {
  const handle = await loadDirectoryHandle();
  if (handle) {
    currentDir.textContent = handle.name;
    currentDir.classList.remove('empty');
  } else {
    currentDir.textContent = '未设置';
    currentDir.classList.add('empty');
  }
}

async function selectFolder() {
  try {
    const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
    await saveDirectoryHandle(handle);
    currentDir.textContent = handle.name;
    currentDir.classList.remove('empty');
    showToast('保存目录已更新');
  } catch (err) {
    if (err.name !== 'AbortError') {
      showToast('操作失败：' + err.message);
    }
  }
}

async function clearSettings() {
  await clearDirectoryHandle();
  currentDir.textContent = '未设置';
  currentDir.classList.add('empty');
  showToast('设置已清除');
}

selectBtn.addEventListener('click', selectFolder);
clearBtn.addEventListener('click', clearSettings);

document.addEventListener('DOMContentLoaded', load);
