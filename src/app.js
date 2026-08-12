/* ==========================================================================
   MINDFULSHIFT MAIN APPLICATION JS (src/app.js) - 1-CLICK PWA AUTO-INSTALL
   ========================================================================== */

let deferredInstallPrompt = null;

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initQuickActions();
  initPwaInstallEngine();
  registerServiceWorker();
});

// Register Service Worker for PWA compliance
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('MindfulShift ServiceWorker registered successfully.'))
      .catch(err => console.log('ServiceWorker registration error:', err));
  }
}

// 1-Click PWA Auto-Install Engine
function initPwaInstallEngine() {
  const btnHeaderInstall = document.getElementById('btnHeaderInstall');
  const btnHeroInstall = document.getElementById('btnHeroInstall');
  const btnTabInstall = document.getElementById('btnTabInstall');
  const iosInstallModal = document.getElementById('iosInstallModal');
  const btnCloseIosModal = document.getElementById('btnCloseIosModal');

  // Capture native browser install prompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    console.log('MindfulShift beforeinstallprompt captured!');
  });

  const installButtons = [btnHeaderInstall, btnHeroInstall, btnTabInstall];

  installButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', async () => {
      if (deferredInstallPrompt) {
        // Trigger native browser install popup
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        console.log(`User install choice: ${outcome}`);
        deferredInstallPrompt = null;
      } else {
        // iPhone/Safari or fallback popup guide
        if (iosInstallModal) {
          iosInstallModal.classList.remove('hidden');
        } else {
          alert('📲 To install: Tap your browser menu (or Safari Share button 📤) and select "Add to Home Screen"!');
        }
      }
    });
  });

  if (btnCloseIosModal && iosInstallModal) {
    btnCloseIosModal.addEventListener('click', () => {
      iosInstallModal.classList.add('hidden');
    });
  }
}

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
