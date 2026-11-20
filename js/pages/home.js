// Code propre à la page d'accueil

// Diaporama (slides) dans chaque écran : ordinateur, téléphone, tablette.
// JavaScript natif, sans bibliothèque.

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.slides').forEach((slider, sliderIndex) => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (slides.length < 2) return;

    const screen = slider.closest('.screen');
    const device = slider.closest('.laptop, .phone, .tablet');
    const indicatorsBox = screen.querySelector('.indicators');
    const interval = Number(slider.dataset.interval) || 4000;

    let current = slides.findIndex((s) => s.classList.contains('is-active'));
    if (current < 0) current = 0;
    let timer = null;

    // Crée un point cliquable par slide
    const indicators = slides.map((_, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'indicator';
      button.setAttribute('aria-label', `Afficher la slide ${i + 1}`);
      button.addEventListener('click', () => {
        goTo(i);
        restart();
      });
      if (indicatorsBox) indicatorsBox.appendChild(button);
      return button;
    });

    // Affiche la slide demandée
    function goTo(index) {
      const next = (index + slides.length) % slides.length;
      if (next === current) {
        updateIndicators();
        return;
      }

      const previous = slides[current];
      previous.classList.remove('is-active');
      previous.classList.add('is-leaving');
      setTimeout(() => previous.classList.remove('is-leaving'), 500);

      slides[next].classList.add('is-active');
      current = next;
      updateIndicators();
    }

    function updateIndicators() {
      indicators.forEach((button, i) => {
        const active = i === current;
        button.classList.toggle('is-active', active);
        if (active) {
          button.setAttribute('aria-current', 'true');
        } else {
          button.removeAttribute('aria-current');
        }
      });
    }

    function start() {
      if (reduceMotion || timer) return;
      timer = setInterval(() => goTo(current + 1), interval);
    }

    function stop() {
      clearInterval(timer);
      timer = null;
    }

    function restart() {
      stop();
      start();
    }

    // Pause au survol de l'appareil
    if (device) {
      device.addEventListener('mouseenter', stop);
      device.addEventListener('mouseleave', start);
    }

    // Pause quand l'onglet n'est pas visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });

    updateIndicators();

    // Décale le départ de chaque écran pour qu'ils ne changent pas tous en même temps
    setTimeout(start, sliderIndex * 800);
  });
});

const section = document.querySelector('.termsync');
const branches = section.querySelectorAll('.branch');

window.addEventListener('scroll', () => {
  if (window.innerWidth <= 768) {               // mobile : tout visible
    branches.forEach(b => b.classList.add('is-visible'));
    return;
  }
  const rect = section.getBoundingClientRect();
  const progress = -rect.top / (section.offsetHeight - innerHeight); // 0 → 1
  // Reste entre la première et la dernière branche : sinon, au début et à la fin
  // de la section, aucune branche n'est affichée et il reste un grand vide.
  const active = Math.min(branches.length - 1, Math.max(0, Math.floor(progress * branches.length)));
  branches.forEach((b, i) => b.classList.toggle('is-visible', i === active));
});