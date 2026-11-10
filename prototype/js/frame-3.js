(function () {
  // TODO: ganti dengan URL Tes Kaiwa yang sudah ada setelah dikonfirmasi tim (sementara ke AI Interview Training).
  var KAIWA_TEST_URL = 'https://dev.suka2jepang.com/dashboard/ai-interview-training';
  var LOGIN_URL = 'https://dev.suka2jepang.com/login';

  var source = read('kaiwa.source');
  var data = parse(read('kaiwa.data'));
  var form = document.getElementById('form-confirm');
  var consent = document.getElementById('consent');
  var consentError = document.getElementById('consent-error');
  var submitBtn = document.getElementById('submit-btn');
  var submitError = document.getElementById('submit-error');

  var valid = (source === 'mandiri' || source === 'lpk') && data && data.candidates && data.candidates.length;
  if (!valid) {
    document.getElementById('no-data').hidden = false;
    document.querySelector('#review .subtitle').hidden = true;
    return;
  }

  var isLpk = source === 'lpk';
  var candidates = isLpk ? data.candidates : data.candidates.slice(0, 1);
  var n = candidates.length;
  var submitLabel = isLpk ? 'Daftarkan ' + n + ' kandidat' : 'Mulai Tes Kaiwa';

  document.getElementById('page-title').textContent = isLpk ? 'Periksa lagi data kandidat' : 'Periksa lagi data dirimu';
  document.getElementById('consent-text').textContent = isLpk
    ? 'Saya menyatakan data di atas benar, dan kandidat yang didaftarkan bersedia mengikuti Tes Kaiwa sesuai ketentuan yang berlaku.'
    : 'Saya menyatakan data di atas benar dan bersedia mengikuti Tes Kaiwa sesuai ketentuan yang berlaku.';
  submitBtn.textContent = submitLabel;

  // Asal pendaftaran
  var src = document.getElementById('source-summary');
  if (isLpk) {
    src.innerHTML = row('Jalur', 'Dari LPK/LKP') +
      row('Nama LPK/LKP', data.lpk.lpkName) +
      row('PIC', data.lpk.picName) +
      row('WhatsApp PIC', data.lpk.picPhone);
    document.getElementById('edit-source').href = 'frame-2-data-kandidat.html#lpk';
    document.getElementById('edit-source').innerHTML = 'Ubah<span class="sr-only"> data LPK/LKP</span>';
  } else {
    src.innerHTML = row('Jalur', 'Mandiri');
  }

  // Kandidat
  document.getElementById('candidate-summaries').innerHTML = candidates.map(function (c, i) {
    var title = isLpk ? 'Kandidat ' + (i + 1) : 'Data diri';
    return '<section class="summary-card" aria-labelledby="sum-' + i + '">' +
      '<div class="summary-head">' +
        '<h2 class="section-title" id="sum-' + i + '">' + title + '</h2>' +
        '<a class="text-btn" href="frame-2-data-kandidat.html#kandidat-' + (i + 1) + '">Ubah<span class="sr-only"> ' + title.toLowerCase() + '</span></a>' +
      '</div>' +
      '<dl class="summary">' +
        row('Nama lengkap', c.name) +
        row('WhatsApp', c.phone, 'Tidak diisi') +
        row('Gender', c.gender) +
        row('Tanggal lahir', birthText(c.birth)) +
        row('Agama', c.religion) +
        row('Email', c.email) +
      '</dl>' +
    '</section>';
  }).join('');

  form.hidden = false;
  document.getElementById('footer').hidden = false;

  consent.addEventListener('change', function () {
    if (consent.checked) toggleConsentError(false);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitBtn.getAttribute('aria-busy') === 'true') return;
    if (!consent.checked) {
      toggleConsentError(true);
      consent.focus();
      return;
    }
    submitError.hidden = true;
    setBusy(true);
    send().then(showDone, function (err) {
      setBusy(false);
      document.getElementById('submit-error-text').textContent = err.message;
      submitError.hidden = false;
      submitError.scrollIntoView({ block: 'center' });
    });
  });

  // Prototipe: belum ada API. Ganti dengan request ke backend pendaftaran.
  function send() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (!navigator.onLine) reject(new Error('Pendaftaran gagal dikirim. Periksa koneksi internet, lalu tekan "' + submitLabel + '" lagi.'));
        else resolve();
      }, 900);
    });
  }

  function showDone() {
    var title = document.getElementById('done-title');
    var text = document.getElementById('done-text');
    var list = document.getElementById('done-list');
    var actions = document.getElementById('done-actions');

    if (isLpk) {
      title.textContent = n + ' kandidat terdaftar';
      text.textContent = 'Setiap kandidat bisa login dengan email dan password yang kamu isi, lalu mengerjakan Tes Kaiwa dari akunnya sendiri.';
      list.innerHTML = candidates.map(function (c) {
        return '<li><strong>' + esc(c.name) + '</strong><span>' + esc(c.email) + '</span></li>';
      }).join('');
      actions.innerHTML =
        '<a class="btn" href="frame-1-asal-pendaftaran.html">Daftarkan kandidat lain</a>' +
        '<a class="btn secondary" href="' + LOGIN_URL + '">Ke halaman login</a>';
    } else {
      title.textContent = 'Akunmu sudah dibuat';
      text.textContent = 'Login berikutnya pakai email ' + candidates[0].email + ' dan password yang tadi kamu isi.';
      list.hidden = true;
      actions.innerHTML = '<a class="btn" href="' + KAIWA_TEST_URL + '">Mulai Tes Kaiwa</a>';
    }

    // Data pendaftaran (termasuk password) dihapus dari browser setelah terkirim.
    try { sessionStorage.removeItem('kaiwa.data'); sessionStorage.removeItem('kaiwa.source'); } catch (e) {}

    document.getElementById('review').hidden = true;
    document.getElementById('footer').hidden = true;
    document.getElementById('done').hidden = false;
    document.querySelector('.back').hidden = true;
    title.focus();
  }

  function setBusy(busy) {
    submitBtn.setAttribute('aria-busy', String(busy));
    submitBtn.textContent = busy ? 'Mengirim...' : submitLabel;
  }

  function toggleConsentError(show) {
    consentError.classList.toggle('show', show);
    consent.setAttribute('aria-invalid', show ? 'true' : 'false');
  }

  function row(label, value, emptyText) {
    var has = value && String(value).trim();
    return '<dt>' + esc(label) + '</dt><dd' + (has ? '' : ' class="empty"') + '>' + esc(has ? value : (emptyText || '-')) + '</dd>';
  }

  function birthText(v) {
    if (!v) return '';
    var d = new Date(v + 'T00:00:00');
    var now = new Date();
    var age = now.getFullYear() - d.getFullYear();
    if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) age--;
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + ' (' + age + ' tahun)';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function read(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function parse(s) { try { return s ? JSON.parse(s) : null; } catch (e) { return null; } }
})();
