const faders = document.querySelectorAll(".fade-in");
const appearOptions = {
    threshold: 0.6

};


const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        console.log(entry)
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });