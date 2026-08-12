/* ==========================================================================
   MINDFULSHIFT MAIN APPLICATION JS (src/app.js) - CLEAN MOBILE-FIRST
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initQuickActions();
});

// Tab Router Logic
function initTabs() {
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      navBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(t => t.classList.remove('active'));

      btn.classList.add('active');
      const targetEl = document.getElementById(`tab-${targetTab}`);
      if (targetEl) {
        targetEl.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

function initQuickActions() {
  const btnQuickConnect = document.getElementById('btnQuickConnect');
  if (btnQuickConnect) {
    btnQuickConnect.addEventListener('click', () => {
      const connectTab = document.querySelector('[data-tab="connect"]');
      if (connectTab) connectTab.click();
    });
  }
}
