// Zen quotes collection
const zenQuotes = [
    {
        text: "The present moment is the only time over which we have dominion.",
        author: "Thích Nhất Hạnh"
    },
    {
        text: "The quieter you become, the more you can hear.",
        author: "Ram Dass"
    },
    {
        text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
        author: "Buddha"
    },
    {
        text: "When you realize nothing is lacking, the whole world belongs to you.",
        author: "Lao Tzu"
    },
    {
        text: "The mind is everything. What you think you become.",
        author: "Buddha"
    },
    {
        text: "Be master of mind rather than mastered by mind.",
        author: "Zen Proverb"
    },
    {
        text: "Nature does not hurry, yet everything is accomplished.",
        author: "Lao Tzu"
    },
    {
        text: "Let go or be dragged.",
        author: "Zen Proverb"
    }
];

// Breathing exercise configuration
// Note: BREATHING_CYCLE_DURATION should be 2x BREATHING_PHASE_DURATION
// to match the CSS animation (breathe: 8s with scale at 50%)
const BREATHING_PHASE_DURATION = 4000; // 4 seconds per phase (in/out)
const BREATHING_CYCLE_DURATION = BREATHING_PHASE_DURATION * 2; // 8 seconds total

// Breathing exercise
let isBreathing = false;
let breathingInterval;

const breathingCircle = document.getElementById('breathingCircle');
const breathingText = document.getElementById('breathingText');
const breathingBtn = document.getElementById('breathingBtn');

// Only add event listener if elements exist
if (breathingBtn && breathingCircle && breathingText) {
    breathingBtn.addEventListener('click', toggleBreathing);
}

function toggleBreathing() {
    if (isBreathing) {
        stopBreathing();
    } else {
        startBreathing();
    }
}

function startBreathing() {
    isBreathing = true;
    breathingBtn.textContent = 'Stop';
    breathingBtn.setAttribute('aria-label', 'Stop breathing exercise');
    breathingCircle.classList.add('breathing');
    
    let phase = 0;
    const phases = ['Breathe In', 'Breathe Out'];
    
    // Set initial text immediately for instant feedback
    breathingText.textContent = phases[0];
    
    // Cycle through phases every BREATHING_PHASE_DURATION milliseconds
    breathingInterval = setInterval(() => {
        phase = (phase + 1) % phases.length;
        breathingText.textContent = phases[phase];
    }, BREATHING_PHASE_DURATION);
}

function stopBreathing() {
    isBreathing = false;
    breathingBtn.textContent = 'Start';
    breathingBtn.setAttribute('aria-label', 'Start breathing exercise');
    breathingCircle.classList.remove('breathing');
    breathingText.textContent = 'Breathe';
    
    if (breathingInterval) {
        clearInterval(breathingInterval);
    }
}

// Random quote on page load
function displayRandomQuote() {
    const randomQuote = zenQuotes[Math.floor(Math.random() * zenQuotes.length)];
    const quoteText = document.querySelector('.quote-text');
    const quoteAuthor = document.querySelector('.quote-author');
    
    if (quoteText && quoteAuthor) {
        quoteText.textContent = `"${randomQuote.text}"`;
        quoteAuthor.textContent = `— ${randomQuote.author}`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    displayRandomQuote();
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
