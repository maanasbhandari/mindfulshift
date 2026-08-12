/* ==========================================================================
   MINDFULSHIFT MICRO-ARCADE JS (src/challenges.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initArcade();
});

function initArcade() {
  const playBtns = document.querySelectorAll('.btn-play-challenge');
  const arcadePlayArea = document.getElementById('arcadePlayArea');
  const arcadeTitle = document.getElementById('arcadeTitle');
  const arcadeBody = document.getElementById('arcadeBody');
  const btnCloseArcade = document.getElementById('btnCloseArcade');

  if (!arcadePlayArea) return;

  playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      arcadePlayArea.classList.remove('hidden');

      if (type === 'code') {
        arcadeTitle.innerText = '💻 30-Second Tech & Coding Quiz';
        renderCodeChallenge(arcadeBody);
      } else if (type === 'breath') {
        arcadeTitle.innerText = '🧘 15-Second Box Breathing Reset';
        renderBreathingChallenge(arcadeBody);
      } else if (type === 'math') {
        arcadeTitle.innerText = '🧩 Speed Mental Math';
        renderMathChallenge(arcadeBody);
      }
    });
  });

  if (btnCloseArcade) {
    btnCloseArcade.addEventListener('click', () => {
      arcadePlayArea.classList.add('hidden');
    });
  }
}

function renderCodeChallenge(container) {
  container.innerHTML = `
    <div style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px;">Q: What is the main benefit of using Manifest V3 in Chrome Extensions?</div>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      <button class="btn-secondary arcade-ans-btn" data-correct="true">A. Improved security, privacy, and background Service Workers</button>
      <button class="btn-secondary arcade-ans-btn">B. Removes all background scripts completely</button>
      <button class="btn-secondary arcade-ans-btn">C. Allows inline eval scripts</button>
    </div>
    <div id="arcadeResult" style="margin-top: 15px; font-weight: 700;"></div>
  `;

  container.querySelectorAll('.arcade-ans-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      const res = document.getElementById('arcadeResult');
      if (isCorrect) {
        btn.style.background = 'rgba(16, 185, 129, 0.3)';
        btn.style.borderColor = '#10B981';
        res.innerHTML = '🎉 Excellent answer! +30 Focus Points added to your daily score!';
      } else {
        btn.style.background = 'rgba(239, 68, 68, 0.3)';
        res.innerHTML = '❌ Not quite. Try again!';
      }
    });
  });
}

function renderBreathingChallenge(container) {
  container.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div id="breathCircle" style="width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #8B5CF6, #06B6D4); margin: 0 auto 20px auto; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; transition: transform 4s ease-in-out; box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);">🫁</div>
      <h4 id="breathText" style="font-size: 1.3rem; font-weight: 700; margin-bottom: 10px;">Inhale slowly...</h4>
      <p style="color: #94A3B8; font-size: 0.9rem;">Follow the rhythmic expand and contract cycle to reset your attention span.</p>
    </div>
  `;

  const circle = document.getElementById('breathCircle');
  const text = document.getElementById('breathText');

  let state = 0;
  const timer = setInterval(() => {
    if (!circle || !text) { clearInterval(timer); return; }
    state = (state + 1) % 2;
    if (state === 1) {
      circle.style.transform = 'scale(1.5)';
      text.innerText = 'Exhale completely...';
    } else {
      circle.style.transform = 'scale(1)';
      text.innerText = 'Inhale slowly...';
    }
  }, 4000);
}

function renderMathChallenge(container) {
  const num1 = Math.floor(Math.random() * 20) + 12;
  const num2 = Math.floor(Math.random() * 15) + 8;
  const ans = num1 * num2;

  container.innerHTML = `
    <div style="font-size: 1.2rem; font-weight: 700; margin-bottom: 16px;">What is ${num1} × ${num2}?</div>
    <div style="display: flex; gap: 12px; margin-bottom: 16px;">
      <input type="number" id="mathInput" placeholder="Enter answer..." class="custom-select" style="width: 200px;" />
      <button class="btn-primary" id="btnSubmitMath">Submit Answer</button>
    </div>
    <div id="mathRes" style="font-weight: 700;"></div>
  `;

  document.getElementById('btnSubmitMath').addEventListener('click', () => {
    const val = parseInt(document.getElementById('mathInput').value);
    const mathRes = document.getElementById('mathRes');
    if (val === ans) {
      mathRes.innerHTML = '⚡ Spot on! Analytical brain unlocked (+25 pts)';
      mathRes.style.color = '#10B981';
    } else {
      mathRes.innerHTML = `❌ Incorrect. The correct answer was ${ans}.`;
      mathRes.style.color = '#EF4444';
    }
  });
}
