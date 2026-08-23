// =========================================================
// FALLING TULIP PETALS
// =========================================================
(function initPetals(){
  const field = document.getElementById('petalField');
  const colors = ['#F8AFA6', '#FF8B94', '#A8E6CF', '#FFD97D'];
  const petalCount = window.innerWidth < 600 ? 14 : 22;

  function petalSVG(color){
    return `<svg viewBox="0 0 20 20" width="100%" height="100%">
      <path d="M10 1 C15 4 16 11 10 19 C4 11 5 4 10 1Z" fill="${color}" opacity="0.9"/>
    </svg>`;
  }

  for (let i = 0; i < petalCount; i++){
    const petal = document.createElement('div');
    petal.className = 'petal';
    const color = colors[i % colors.length];
    petal.innerHTML = petalSVG(color);

    const size = 10 + Math.random() * 14;
    const startLeft = Math.random() * 100;
    const duration = 9 + Math.random() * 10;
    const delay = Math.random() * -18;
    const drift = (Math.random() * 160 - 80) + 'px';

    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.left = startLeft + 'vw';
    petal.style.setProperty('--drift', drift);
    petal.style.animationDuration = duration + 's';
    petal.style.animationDelay = delay + 's';

    field.appendChild(petal);
  }
})();

// =========================================================
// SCREEN 1: CAKE INTERACTION
// =========================================================
const cakeButton = document.getElementById('cakeButton');
const cakeHint = document.getElementById('cakeHint');
const continueBtn = document.getElementById('continueBtn');

let blown = false;

cakeButton.addEventListener('click', () => {
  if (blown) return;
  blown = true;
  cakeButton.classList.add('blown');
  cakeHint.classList.add('is-hidden');

  // reveal the continue button shortly after the candles go out
  setTimeout(() => {
    continueBtn.classList.add('is-ready');
  }, 500);
});

// =========================================================
// SCREEN TRANSITION: CAKE -> LETTER
// =========================================================
const screenCake = document.getElementById('screen-cake');
const screenLetter = document.getElementById('screen-letter');

continueBtn.addEventListener('click', () => {
  screenCake.classList.add('screen--fade-out');
  screenCake.classList.remove('screen--active');

  setTimeout(() => {
    screenCake.style.display = 'none';
    screenLetter.classList.add('screen--active', 'screen--fade-in');
  }, 650);
});

// =========================================================
// SCREEN 2: ENVELOPE OPEN
// =========================================================
const envelope = document.getElementById('envelope');
const envelopeHint = document.getElementById('envelopeHint');

envelope.addEventListener('click', () => {
  if (envelope.classList.contains('is-open')) return;
  envelope.classList.add('is-open');
  envelopeHint.classList.add('is-hidden');
});

envelope.setAttribute('tabindex', '0');
envelope.setAttribute('role', 'button');
envelope.setAttribute('aria-label', 'Open the birthday letter');
envelope.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    envelope.click();
  }
});

// =========================================================
// EDITABLE PLACEHOLDER BEHAVIOR (Name / Message / Sender)
// =========================================================
document.querySelectorAll('[contenteditable="true"]').forEach((el) => {
  const isDefaultText = () => el.textContent.trim() === el.getAttribute('data-placeholder')
    || el.textContent.trim() === el.dataset.original;

  el.dataset.original = el.textContent.trim();

  el.addEventListener('focus', () => {
    if (el.textContent.trim() === el.dataset.original){
      // select all text on first focus so typing replaces it easily
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });

  el.addEventListener('blur', () => {
    if (el.textContent.trim() === ''){
      el.textContent = el.dataset.original;
    }
  });
});
