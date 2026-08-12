/* ==========================================================================
   MINDFULSHIFT CONTENT SCRIPT (extension/content.js)
   ========================================================================== */

(function () {
  let isIntercepted = false;
  let scrollTimeSeconds = 0;
  let timerInterval = null;

  // Monitor URL changes for single-page app navigation (YouTube / Instagram)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      checkAndIntercept();
    }
  }).observe(document, { subtree: true, childList: true });

  // Initial check
  checkAndIntercept();

  function checkAndIntercept() {
    const isYTShorts = location.pathname.includes('/shorts');
    const isIGReels = location.pathname.includes('/reels');

    if ((isYTShorts || isIGReels) && !isIntercepted) {
      injectIntentGate();
      startDoomscrollTimer();
    }
  }

  function injectIntentGate() {
    if (document.getElementById('mindfulshift-root')) return;

    isIntercepted = true;

    const root = document.createElement('div');
    root.id = 'mindfulshift-root';

    root.innerHTML = `
      <div class="ms-modal">
        <span class="ms-tag">🧠 MindfulShift Gate</span>
        <h2>Hold on a sec! 🛑</h2>
        <p>You opened short-form videos. What is your goal right now?</p>
        
        <div class="ms-btn-group">
          <button class="ms-btn" id="msBtnStudy">
            📖 Watching a specific tutorial / study video
          </button>
          <button class="ms-btn" id="msBtnBored">
            🥱 Honestly, I'm just bored (30s Dopamine Swap)
          </button>
        </div>

        <div id="msQuizArea" style="display: none; margin-top: 15px; text-align: left;">
          <div style="font-weight: 700; color: #F59E0B; margin-bottom: 8px;">⚡ 30s Dopamine Swap Challenge</div>
          <p id="msQuizQ" style="font-size: 0.85rem; margin-bottom: 10px;"></p>
          <div id="msQuizOptions" style="display: flex; flex-direction: column; gap: 6px;"></div>
        </div>
      </div>
    `;

    document.body.appendChild(root);

    document.getElementById('msBtnStudy').addEventListener('click', () => {
      removeOverlay();
    });

    document.getElementById('msBtnBored').addEventListener('click', () => {
      showDopamineSwap();
    });
  }

  function showDopamineSwap() {
    const quizArea = document.getElementById('msQuizArea');
    const qEl = document.getElementById('msQuizQ');
    const optsEl = document.getElementById('msQuizOptions');

    quizArea.style.display = 'block';
    qEl.innerText = "Q: What key mindset prevents endless doomscrolling?";
    optsEl.innerHTML = `
      <button class="ms-btn" style="font-size: 0.8rem;" id="msAnsRight">Setting intentional time limits & micro-resets</button>
      <button class="ms-btn" style="font-size: 0.8rem;">Scrolling until 3 AM</button>
    `;

    document.getElementById('msAnsRight').addEventListener('click', () => {
      alert('🎉 Great choice! 10-minute focus session granted.');
      removeOverlay();
    });
  }

  function removeOverlay() {
    const root = document.getElementById('mindfulshift-root');
    if (root) root.remove();
  }

  function startDoomscrollTimer() {
    if (timerInterval) clearInterval(timerInterval);
    scrollTimeSeconds = 0;

    timerInterval = setInterval(() => {
      scrollTimeSeconds += 5;
      // If user scrolls > 5 minutes (300s), desaturate to grayscale to reduce addiction
      if (scrollTimeSeconds >= 300) {
        document.body.classList.add('ms-grayscale-body');
      }
    }, 5000);
  }
})();
