document.addEventListener('DOMContentLoaded', () => {
      const cardsWrapper = document.querySelector('.cards-wrapper');
      const cards = Array.from(document.querySelectorAll('.card'));
      const dots = Array.from(document.querySelectorAll('.dot'));
      const prevBtn = document.querySelector('.controls .nav-btn:first-child');
      const nextBtn = document.querySelector('.controls .nav-btn:last-child');

      let currentIndex = 2;

      function updateCarousel(index) {
        if (index < 0) {
          currentIndex = 0;
        } else if (index >= cards.length) {
          currentIndex = cards.length - 1;
        } else {
          currentIndex = index;
        }

        cards.forEach((card, idx) => {
          card.classList.remove('center', 'side');
          if (idx === currentIndex) {
            card.classList.add('center');
          } else {
            card.classList.add('side');
          }
        });

        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });

        const targetCard = cards[currentIndex];
        const viewport = document.querySelector('.cards-viewport');
        const scrollLeft = targetCard.offsetLeft - (viewport.offsetWidth - targetCard.offsetWidth) / 2;

        viewport.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }

      prevBtn.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
      });

      nextBtn.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
      });

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
          updateCarousel(idx);
        });
      });

      cards.forEach((card, idx) => {
        card.addEventListener('click', () => {
          updateCarousel(idx);
        });
      });

      updateCarousel(currentIndex);
    });