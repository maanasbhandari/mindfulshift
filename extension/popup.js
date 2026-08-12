/* ==========================================================================
   MINDFULSHIFT POPUP SCRIPT (extension/popup.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  const btnOpenDashboard = document.getElementById('btnOpenDashboard');
  
  if (btnOpenDashboard) {
    btnOpenDashboard.addEventListener('click', async () => {
      // Open index.html in a new tab
      await chrome.tabs.create({ url: 'http://localhost:5173' });
    });
  }
});
