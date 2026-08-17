/*
  VictoryX Website
  -------------------------------------------------
  The counters below are intentionally local for now.
  localStorage means they are NOT shared between visitors.
  When the permanent backend is ready, replace these
  functions with API calls to the shared database counter.
*/

// Set this to the final APK URL/path when the APK is ready.
// Example: "APK/VictoryX.apk"
const APK_URL = "";

const visitorKey = "victoryx_local_visitors";
const downloadKey = "victoryx_local_downloads";

function getNumber(key) {
  const value = Number(localStorage.getItem(key));
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function setNumber(key, value) {
  localStorage.setItem(key, String(value));
}

function updateCounters() {
  document.getElementById("visitorCount").textContent =
    getNumber(visitorKey).toLocaleString();

  document.getElementById("downloadCount").textContent =
    getNumber(downloadKey).toLocaleString();
}

function registerLocalVisit() {
  setNumber(visitorKey, getNumber(visitorKey) + 1);
}

function setupDownloadButton() {
  const button = document.getElementById("downloadBtn");
  const status = document.getElementById("downloadStatus");

  if (!APK_URL) {
    button.disabled = true;
    status.textContent = "APK coming soon";
    return;
  }

  button.disabled = false;
  status.textContent = "Ready to download";

  button.addEventListener("click", () => {
    setNumber(downloadKey, getNumber(downloadKey) + 1);
    updateCounters();
    window.location.href = APK_URL;
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

registerLocalVisit();
updateCounters();
setupDownloadButton();
