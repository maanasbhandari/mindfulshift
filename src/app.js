/* ==========================================================================
   MINDFULSHIFT MAIN APPLICATION JS (src/app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initTimeSavedChart();
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
      }
    });
  });
}

// Render Focus vs. Doomscroll Time Chart on HTML5 Canvas
function initTimeSavedChart() {
  const canvas = document.getElementById('timeSavedChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Device pixel ratio scaling for crisp render
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const focusTime = [45, 60, 90, 75, 110, 95, 105]; // minutes saved
  const scrollTime = [80, 50, 30, 40, 20, 25, 15];  // doomscroll minutes

  const chartWidth = rect.width;
  const chartHeight = rect.height;
  const paddingLeft = 40;
  const paddingBottom = 30;
  const paddingTop = 20;

  const graphWidth = chartWidth - paddingLeft - 20;
  const graphHeight = chartHeight - paddingBottom - paddingTop;

  const maxVal = 120;
  const stepX = graphWidth / (days.length - 1);

  // Clear Canvas
  ctx.clearRect(0, 0, chartWidth, chartHeight);

  // Draw Grid Lines & Y-Labels
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillStyle = '#64748B';
  ctx.font = '11px Plus Jakarta Sans';
  ctx.textAlign = 'right';

  for (let i = 0; i <= 4; i++) {
    const yVal = Math.round((maxVal / 4) * i);
    const yPos = chartHeight - paddingBottom - (yVal / maxVal) * graphHeight;

    ctx.beginPath();
    ctx.moveTo(paddingLeft, yPos);
    ctx.lineTo(chartWidth - 20, yPos);
    ctx.stroke();

    ctx.fillText(`${yVal}m`, paddingLeft - 8, yPos + 4);
  }

  // Draw X Labels
  ctx.textAlign = 'center';
  days.forEach((day, index) => {
    const xPos = paddingLeft + index * stepX;
    ctx.fillText(day, xPos, chartHeight - 8);
  });

  // Draw Focus Saved Line (Purple Gradient)
  drawGradientLine(ctx, focusTime, paddingLeft, chartHeight, paddingBottom, graphHeight, maxVal, stepX, '#8B5CF6', 'rgba(139, 92, 246, 0.2)');

  // Draw Doomscroll Line (Pink/Red Gradient)
  drawGradientLine(ctx, scrollTime, paddingLeft, chartHeight, paddingBottom, graphHeight, maxVal, stepX, '#EC4899', 'rgba(236, 72, 153, 0.1)');
}

function drawGradientLine(ctx, data, paddingLeft, chartHeight, paddingBottom, graphHeight, maxVal, stepX, strokeColor, fillColor) {
  ctx.beginPath();

  data.forEach((val, i) => {
    const x = paddingLeft + i * stepX;
    const y = chartHeight - paddingBottom - (val / maxVal) * graphHeight;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Fill Area below
  const lastX = paddingLeft + (data.length - 1) * stepX;
  ctx.lineTo(lastX, chartHeight - paddingBottom);
  ctx.lineTo(paddingLeft, chartHeight - paddingBottom);
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.fill();
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
