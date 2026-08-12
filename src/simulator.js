/* ==========================================================================
   MINDFULSHIFT SIMULATOR & WEB SHIELD (src/simulator.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initWebShield();
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

function initWebShield() {
  const btnLaunchYT = document.getElementById('btnLaunchYT');
  const btnLaunchIG = document.getElementById('btnLaunchIG');
  const btnTriggerSim = document.getElementById('btnTriggerSim');
  const shieldIframe = document.getElementById('shieldIframe');
  const mindfulOverlay = document.getElementById('mindfulOverlay');
  const shieldHeaderTitle = document.getElementById('shieldHeaderTitle');
  const intentBtns = document.querySelectorAll('.intent-btn');
  const swapBox = document.getElementById('swapBox');

  if (btnLaunchYT) {
    btnLaunchYT.addEventListener('click', () => {
      if (shieldHeaderTitle) shieldHeaderTitle.innerText = '🛡️ YouTube Shorts Shield Active';
      if (shieldIframe) shieldIframe.src = 'https://www.youtube.com/embed/';
      if (mindfulOverlay) mindfulOverlay.classList.remove('hidden');
    });
  }

  if (btnLaunchIG) {
    btnLaunchIG.addEventListener('click', () => {
      if (shieldHeaderTitle) shieldHeaderTitle.innerText = '🛡️ Instagram Shield Active';
      if (shieldIframe) shieldIframe.src = 'https://www.instagram.com/';
      if (mindfulOverlay) mindfulOverlay.classList.remove('hidden');
    });
  }

  if (btnTriggerSim) {
    btnTriggerSim.addEventListener('click', () => {
      if (mindfulOverlay) mindfulOverlay.classList.remove('hidden');
      if (swapBox) swapBox.classList.add('hidden');
    });
  }

  // Handle Intent Button Clicks
  intentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const intentType = btn.getAttribute('data-intent');

      if (intentType === 'bored') {
        if (swapBox) swapBox.classList.remove('hidden');
        loadSwapQuiz();
      } else {
        alert('✅ Learning Intent Registered! 10-minute focus session granted.');
        if (mindfulOverlay) mindfulOverlay.classList.add('hidden');
      }
    });
  });
}

function loadSwapQuiz() {
  const swapQuestion = document.getElementById('swapQuestion');
  const swapAnswers = document.getElementById('swapAnswers');
  const btnResumeScroll = document.getElementById('btnResumeScroll');

  const quiz = sampleQuizzes[Math.floor(Math.random() * sampleQuizzes.length)];

  if (swapQuestion) swapQuestion.innerText = quiz.q;
  if (swapAnswers) {
    swapAnswers.innerHTML = '';
    quiz.answers.forEach((ans, index) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.innerText = `${index + 1}. ${ans}`;
      btn.addEventListener('click', () => {
        if (index === quiz.correct) {
          btn.style.background = 'rgba(16, 185, 129, 0.3)';
          btn.style.borderColor = '#10B981';
          if (swapQuestion) swapQuestion.innerText = '🎯 Perfect! Dopamine Boost Earned (+30 pts)';
          if (btnResumeScroll) btnResumeScroll.classList.remove('hidden');

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
      swapAnswers.appendChild(btn);
    });
  }

  if (btnResumeScroll) {
    btnResumeScroll.addEventListener('click', () => {
      const mindfulOverlay = document.getElementById('mindfulOverlay');
      if (mindfulOverlay) mindfulOverlay.classList.add('hidden');
    });
  }
}
