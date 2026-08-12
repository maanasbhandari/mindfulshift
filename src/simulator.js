/* ==========================================================================
   MINDFULSHIFT SIMULATOR JS (src/simulator.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSimulator();
});

const sampleQuizzes = [
  {
    q: "What does CSS property `backdrop-filter: blur()` do?",
    answers: ["Blurs content behind an element", "Blurs the element text", "Makes element invisible", "Rotates background"],
    correct: 0
  },
  {
    q: "Which keyword in JavaScript declares a block-scoped variable?",
    answers: ["var", "let", "global", "static"],
    correct: 1
  },
  {
    q: "In high-yield focus techniques, what is the default Pomodoro ratio?",
    answers: ["50m work / 10m break", "25m focus / 5m break", "15m work / 1m break", "120m work / 30m break"],
    correct: 1
  }
];

function initSimulator() {
  const btnTriggerSim = document.getElementById('btnTriggerSim');
  const btnSimInsta = document.getElementById('btnSimInsta');
  const btnSimYT = document.getElementById('btnSimYT');
  const mockFeedTitle = document.getElementById('mockFeedTitle');
  const mindfulOverlay = document.getElementById('mindfulOverlay');
  const mockVideoPlayer = document.getElementById('mockVideoPlayer');
  const intentBtns = document.querySelectorAll('.intent-btn');
  const swapBox = document.getElementById('swapBox');
  const roastBox = document.getElementById('roastBox');

  let currentPlatform = 'instagram';

  // Toggle platform switch
  btnSimInsta.addEventListener('click', () => {
    btnSimInsta.classList.add('active');
    btnSimYT.classList.remove('active');
    currentPlatform = 'instagram';
    mockFeedTitle.innerText = '📸 Instagram Reels';
    mockVideoPlayer.style.background = 'linear-gradient(180deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)';
  });

  btnSimYT.addEventListener('click', () => {
    btnSimYT.classList.add('active');
    btnSimInsta.classList.remove('active');
    currentPlatform = 'youtube';
    mockFeedTitle.innerText = '▶️ YouTube Shorts';
    mockVideoPlayer.style.background = 'linear-gradient(180deg, #1F1F1F 0%, #FF0000 100%)';
  });

  // Trigger Simulation Overlay
  btnTriggerSim.addEventListener('click', () => {
    mindfulOverlay.classList.remove('hidden');
    swapBox.classList.add('hidden');
    roastBox.classList.add('hidden');
    mockVideoPlayer.classList.remove('grayscale-active');
  });

  // Handle Intent Button Clicks
  intentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const intentType = btn.getAttribute('data-intent');

      if (intentType === 'bored') {
        // Trigger 30s Dopamine Swap Challenge
        swapBox.classList.remove('hidden');
        loadSwapQuiz();
      } else {
        // Learning intent selected ➔ grant 10 min session
        alert('✅ Learning Intent Registered! MindfulShift set a 10-minute focus session timer.');
        mindfulOverlay.classList.add('hidden');
      }
    });
  });

  // Check Mode selection
  const simModeSelect = document.getElementById('simModeSelect');
  simModeSelect.addEventListener('change', () => {
    if (simModeSelect.value === 'hardcore') {
      mockVideoPlayer.classList.add('grayscale-active');
      roastBox.classList.remove('hidden');
    } else {
      mockVideoPlayer.classList.remove('grayscale-active');
      roastBox.classList.add('hidden');
    }
  });
}

function loadSwapQuiz() {
  const swapQuestion = document.getElementById('swapQuestion');
  const swapAnswers = document.getElementById('swapAnswers');
  const btnResumeScroll = document.getElementById('btnResumeScroll');

  const quiz = sampleQuizzes[Math.floor(Math.random() * sampleQuizzes.length)];

  swapQuestion.innerText = quiz.q;
  swapAnswers.innerHTML = '';

  quiz.answers.forEach((ans, index) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerText = `${index + 1}. ${ans}`;
    btn.addEventListener('click', () => {
      if (index === quiz.correct) {
        btn.style.background = 'rgba(16, 185, 129, 0.3)';
        btn.style.borderColor = '#10B981';
        swapQuestion.innerText = '🎯 Perfect! Dopamine Boost Earned (+30 pts)';
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

  if (btnResumeScroll) {
    btnResumeScroll.addEventListener('click', () => {
      const mindfulOverlay = document.getElementById('mindfulOverlay');
      if (mindfulOverlay) mindfulOverlay.classList.add('hidden');
    });
  }
}
