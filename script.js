/*
  VictoryX website counters
  ---------------------------------------
  Local mode for now: counts are stored in this browser only.
  They are deliberately not fake/random.
  Later, replace the two local counter functions with API calls
  to the permanent shared backend/database.
*/

const APK_URL = ""; // When ready: "APK/VictoryX.apk"

const VISITOR_COUNT = "victoryx_visitors_v3";
const VISITOR_SEEN = "victoryx_visitor_seen_v3";
const DOWNLOAD_COUNT = "victoryx_downloads_v3";

function getCount(key) {
  const n = Number(localStorage.getItem(key));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function setCount(key, value) {
  localStorage.setItem(key, String(value));
}

function registerVisitor() {
  // One visitor registration per browser/device.
  if (localStorage.getItem(VISITOR_SEEN) !== "1") {
    setCount(VISITOR_COUNT, getCount(VISITOR_COUNT) + 1);
    localStorage.setItem(VISITOR_SEEN, "1");
  }
}

function renderCounters() {
  document.getElementById("visitorCount").textContent =
    getCount(VISITOR_COUNT).toLocaleString();
  document.getElementById("downloadCount").textContent =
    getCount(DOWNLOAD_COUNT).toLocaleString();
}

function setupAPK() {
  const button = document.getElementById("downloadBtn");
  const status = document.getElementById("downloadStatus");

  if (!APK_URL) {
    button.disabled = true;
    status.textContent = "Coming soon";
    return;
  }

  button.disabled = false;
  status.textContent = "Ready to download";

  button.addEventListener("click", () => {
    setCount(DOWNLOAD_COUNT, getCount(DOWNLOAD_COUNT) + 1);
    renderCounters();
    window.location.href = APK_URL;
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
registerVisitor();
renderCounters();
setupAPK();
