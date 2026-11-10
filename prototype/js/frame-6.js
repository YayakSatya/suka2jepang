(function () {
  // Contoh data untuk prototipe. Di aplikasi asli, data ini datang dari hasil Tes Kaiwa kandidat.
  var SAMPLE = {
    pass: {
      passed: true,
      level: 'Level 4',
      note: 'Lulus standar',
      scores: { pronunciation: 85, fluency: 80, grammar: 78, comprehension: 82, vocabulary: 80 },
      advice: 'Pertahankan latihan percakapan rutin. Tata bahasa masih bisa ditingkatkan supaya kalimatmu makin rapi saat wawancara kerja.'
    },
    fail: {
      passed: false,
      level: 'Level 2',
      note: 'Belum memenuhi batas lulus',
      scores: { pronunciation: 64, fluency: 48, grammar: 58, comprehension: 66, vocabulary: 52 },
      advice: 'Fokus dulu pada kelancaran dan kosakata. Latih percakapan pendek setiap hari dan hafalkan kosakata kerja sebelum mengulang tes.'
    }
  };

  var CATEGORIES = [
    { key: 'pronunciation', name: 'Pengucapan', en: 'Pronunciation' },
    { key: 'fluency', name: 'Kelancaran', en: 'Fluency' },
    { key: 'grammar', name: 'Tata bahasa', en: 'Grammar' },
    { key: 'comprehension', name: 'Pemahaman', en: 'Comprehension' },
    { key: 'vocabulary', name: 'Kosakata', en: 'Vocabulary' }
  ];

  // TODO: ganti dengan URL Tes Kaiwa yang sudah ada setelah dikonfirmasi tim (sementara ke AI Interview Training).
  var KAIWA_TEST_URL = 'https://dev.suka2jepang.com/dashboard/ai-interview-training';
  var DASHBOARD_URL = 'https://dev.suka2jepang.com/dashboard';

  var params = new URLSearchParams(location.search);
  var state = params.get('state');
  if (['loading', 'pending', 'error'].indexOf(state) === -1) state = 'result';
  document.querySelector('[data-state="' + state + '"]').hidden = false;
  document.getElementById('reload').addEventListener('click', function () { location.reload(); });

  var status = params.get('status') === 'fail' ? 'fail' : 'pass';
  var r = SAMPLE[status];
  document.getElementById('back').href = r.passed ? 'frame-5-lulus.html' : 'frame-4-tidak-lulus.html';
  if (state !== 'result') return;

  var mark = document.getElementById('final-mark');
  mark.classList.add(r.passed ? 'pass' : 'fail');
  mark.innerHTML = '<svg class="icon" viewBox="0 0 24 24">' +
    (r.passed ? '<path d="M20 6 9 17l-5-5"/>' : '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>') + '</svg>';
  document.getElementById('final-status').textContent = r.passed ? 'Lulus' : 'Tidak lulus';
  document.getElementById('final-level').textContent = r.level;
  document.getElementById('final-note').textContent = r.note;

  // Dua nilai terendah ditandai "Perlu dilatih", supaya kandidat tahu bagian yang harus diperkuat.
  var weakest = CATEGORIES.slice()
    .sort(function (a, b) { return r.scores[a.key] - r.scores[b.key]; })
    .slice(0, 2)
    .map(function (c) { return c.key; });

  document.getElementById('scores-hint').textContent = 'Skala 0 sampai 100. Dua nilai terendah ditandai "Perlu dilatih".';
  document.getElementById('score-list').innerHTML = CATEGORIES.map(function (c) {
    var v = r.scores[c.key];
    var weak = weakest.indexOf(c.key) !== -1;
    return '<li class="score-item' + (weak ? ' weak' : '') + '">' +
      '<div class="score-head">' +
        '<span class="score-name">' + c.name + ' <small lang="en">' + c.en + '</small>' + (weak ? '<span class="tag">Perlu dilatih</span>' : '') + '</span>' +
        '<span class="score-value"><strong>' + v + '</strong> / 100</span>' +
      '</div>' +
      '<div class="bar" aria-hidden="true"><span style="width:' + v + '%"></span></div>' +
    '</li>';
  }).join('');

  document.getElementById('advice').textContent = r.advice;

  document.getElementById('actions').innerHTML = r.passed
    ? '<a class="btn secondary" href="' + DASHBOARD_URL + '">Kembali ke dashboard</a>'
    : '<a class="btn" href="' + KAIWA_TEST_URL + '">Ulangi Tes Kaiwa</a>' +
      '<a class="text-btn" href="' + DASHBOARD_URL + '">Kembali ke dashboard</a>';
})();
