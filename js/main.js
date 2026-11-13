(function () {
  var track = document.getElementById('track'), slides = track.children, dots = document.getElementById('dots'), cur = 0;
  function go(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  for (var k = 0; k < slides.length; k++) {
    (function (k) {
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-label', 'Projeto ' + (k + 1));
      b.onclick = function () { go(k) }; dots.appendChild(b);
    })(k)
  }
  function mark() {
    var w = slides[0].getBoundingClientRect().width + 20;
    cur = Math.round(track.scrollLeft / w);
    for (var k = 0; k < dots.children.length; k++)dots.children[k].setAttribute('aria-current', k === cur ? 'true' : 'false');
  }
  track.addEventListener('scroll', function () { requestAnimationFrame(mark) });
  document.getElementById('prev').onclick = function () { go(cur - 1) };
  document.getElementById('next').onclick = function () { go(cur + 1) };
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1) }
  });
  mark();
})();
