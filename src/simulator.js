/* ==========================================================================
   MINDFULSHIFT PROTECTED SITE LAUNCHER (src/simulator.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initProtectedLauncher();
});

const sampleQuizzes = [
  {
    q: "What key mindset prevents endless doomscrolling?",
    answers: ["Setting intentional time limits & micro-resets", "Scrolling until 3 AM", "Disabling all notifications", "Ignoring time completely"],
    correct: 0
  },
  {
    q: "In high-yield focus techniques, what is the default Pomodoro ratio?",
    answers: ["50m work / 10m break", "25m focus / 5m break", "15m work / 1m break", "120m work / 30m break"],
    correct: 1
  }
];

function initProtectedLauncher() {
  const btnLaunchYT = document.getElementById('btnLaunchYT');
  const btnLaunchIG = document.getElementById('btnLaunchIG');
  const intentShieldModal = document.getElementById('intentShieldModal');
  const shieldTargetTitle = document.getElementById('shieldTargetTitle');
  const btnShieldStudy = document.getElementById('btnShieldStudy');
  const btnShieldBored = document.getElementById('btnShieldBored');
  const swapBoxShield = document.getElementById('swapBoxShield');
  const btnShieldProceed = document.getElementById('btnShieldProceed');

  let currentTargetUrl = 'https://www.youtube.com/shorts';

  if (btnLaunchYT) {
    btnLaunchYT.addEventListener('click', () => {
      currentTargetUrl = 'https://www.youtube.com/shorts';
      if (shieldTargetTitle) shieldTargetTitle.innerText = '▶️ YouTube Shorts Shield';
      if (intentShieldModal) intentShieldModal.classList.remove('hidden');
      if (swapBoxShield) swapBoxShield.classList.add('hidden');
    });
  }

  if (btnLaunchIG) {
    btnLaunchIG.addEventListener('click', () => {
      currentTargetUrl = 'https://www.instagram.com/reels/';
      if (shieldTargetTitle) shieldTargetTitle.innerText = '📸 Instagram Reels Shield';
      if (intentShieldModal) intentShieldModal.classList.remove('hidden');
      if (swapBoxShield) swapBoxShield.classList.add('hidden');
    });
  }

  if (btnShieldStudy) {
    btnShieldStudy.addEventListener('click', () => {
      alert('✅ Learning Intent Registered! Opening site with a 10-minute session limit.');
      if (intentShieldModal) intentShieldModal.classList.add('hidden');
      window.open(currentTargetUrl, '_blank');
    });
  }

  if (btnShieldBored) {
    btnShieldBored.addEventListener('click', () => {
      if (swapBoxShield) swapBoxShield.classList.remove('hidden');
      loadSwapQuizShield();
    });
  }

  if (btnShieldProceed) {
    btnShieldProceed.addEventListener('click', () => {
      if (intentShieldModal) intentShieldModal.classList.add('hidden');
      window.open(currentTargetUrl, '_blank');
    });
  }
}

function loadSwapQuizShield() {
  const swapQuestionShield = document.getElementById('swapQuestionShield');
  const swapAnswersShield = document.getElementById('swapAnswersShield');
  const btnShieldProceed = document.getElementById('btnShieldProceed');

  const quiz = sampleQuizzes[Math.floor(Math.random() * sampleQuizzes.length)];

  if (swapQuestionShield) swapQuestionShield.innerText = quiz.q;
  if (swapAnswersShield) {
    swapAnswersShield.innerHTML = '';
    quiz.answers.forEach((ans, index) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.innerText = `${index + 1}. ${ans}`;
      btn.addEventListener('click', () => {
        if (index === quiz.correct) {
          btn.style.background = 'rgba(16, 185, 129, 0.3)';
          btn.style.borderColor = '#10B981';
          if (swapQuestionShield) swapQuestionShield.innerText = '🎯 Perfect! Dopamine Boost Earned (+30 pts)';
          if (btnShieldProceed) btnShieldProceed.classList.remove('hidden');

          // Update Dashboard Stats
          const valDopamineSaved = document.getElementById('valDopamineSaved');
          if (valDopamineSaved) {
            const curVal = parseInt(valDopamineSaved.innerText) || 420;
            valDopamineSaved.innerText = `${curVal + 30} pts`;
          }
        } else {
          btn.style.background = 'rgba(239, 68, 68, 0.3)';
          btn.style.borderColor = '#EF4444';
        }
      });
      swapAnswersShield.appendChild(btn);
    });
  }
}
