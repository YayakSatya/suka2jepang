(function () {
  var MAX_CANDIDATES = 20; // Usulan PRD, belum final.
  var STORE_KEY = 'kaiwa.data';

  var source = read('kaiwa.source');
  var form = document.getElementById('form-data');
  var list = document.getElementById('candidate-list');
  var addRow = document.getElementById('add-row');
  var addBtn = document.getElementById('add-candidate');
  var count = document.getElementById('candidate-count');
  var alertBox = document.getElementById('form-alert');
  var alertText = document.getElementById('form-alert-text');

  if (source !== 'mandiri' && source !== 'lpk') {
    document.getElementById('no-source').hidden = false;
    document.getElementById('page-subtitle').hidden = true;
    document.querySelector('.required-note').hidden = true;
    return;
  }

  var isLpk = source === 'lpk';
  // Prototipe: data (termasuk password) disimpan di sessionStorage supaya bisa diedit dari Frame 3.
  // Di aplikasi asli, simpan di state form dan jangan taruh password di storage browser.
  var data = parse(read(STORE_KEY)) || { lpk: { lpkName: '', picName: '', picPhone: '' }, candidates: [blank()] };
  if (!isLpk) data.candidates = data.candidates.slice(0, 1);
  var errors = { lpk: {}, candidates: data.candidates.map(function () { return {}; }) };

  document.getElementById('page-title').textContent = isLpk ? 'Data kandidat' : 'Data dirimu';
  document.getElementById('page-subtitle').textContent = isLpk
    ? 'Isi data LPK/LKP, lalu tambahkan setiap kandidat. Setiap kandidat mendapat akun sendiri untuk mengerjakan Tes Kaiwa.'
    : 'Data ini dipakai untuk membuat akunmu dan mencatat hasil Tes Kaiwa.';
  document.getElementById('lpk-group').hidden = !isLpk;
  document.getElementById('candidates-title').hidden = !isLpk;
  addRow.hidden = !isLpk;
  form.hidden = false;
  document.getElementById('footer').hidden = false;

  ['lpkName', 'picName', 'picPhone'].forEach(function (k) {
    form.elements[k].value = data.lpk[k] || '';
  });

  render();
  focusFromHash();

  // Tombol "Ubah" di Frame 3 membuka bagian yang dipilih: #lpk atau #kandidat-N.
  function focusFromHash() {
    var m = location.hash.match(/^#kandidat-(\d+)$/);
    var target = m ? list.children[Number(m[1]) - 1] : (location.hash === '#lpk' && isLpk ? document.getElementById('lpk-group') : null);
    if (!target) return;
    target.scrollIntoView({ block: 'start' });
    target.querySelector('input').focus({ preventScroll: true });
  }

  // ---------- Render ----------

  function render() {
    list.innerHTML = data.candidates.map(candidateHtml).join('');
    data.candidates.forEach(function (c, i) {
      var root = list.children[i];
      setValue(root, 'name', c.name);
      setValue(root, 'phone', c.phone);
      setValue(root, 'birth', c.birth);
      setValue(root, 'religion', c.religion);
      setValue(root, 'email', c.email);
      setValue(root, 'password', c.password);
      root.querySelectorAll('input[data-key="gender"]').forEach(function (r) { r.checked = r.value === c.gender; });
      updateAge(i);
      Object.keys(errors.candidates[i] || {}).forEach(function (k) { showError(fieldEl(i, k), errors.candidates[i][k]); });
    });
    var full = data.candidates.length >= MAX_CANDIDATES;
    addBtn.disabled = full;
    count.textContent = isLpk
      ? data.candidates.length + ' kandidat' + (full ? '. Batas ' + MAX_CANDIDATES + ' kandidat per pendaftaran sudah tercapai.' : ', maksimal ' + MAX_CANDIDATES + ' per pendaftaran.')
      : '';
  }

  function candidateHtml(c, i) {
    var p = 'c' + i + '-';
    var n = i + 1;
    var max = new Date().toISOString().slice(0, 10);
    var auto = isLpk ? 'off' : null;
    return '' +
      '<fieldset class="candidate' + (isLpk ? '' : ' solo') + '" data-index="' + i + '">' +
        (isLpk
          ? '<legend><h3 class="section-title">Kandidat ' + n + '</h3></legend>' +
            (i > 0 ? '<button class="text-btn remove" type="button" data-remove="' + i + '">' + icon('trash') + 'Hapus<span class="sr-only"> kandidat ' + n + '</span></button>' : '')
          : '<legend class="sr-only">Data diri</legend>') +
        field(p, 'name', 'Nama lengkap',
          '<input class="input" id="' + p + 'name" name="name" autocomplete="' + (auto || 'name') + '" placeholder="Sesuai KTP"' + desc(p, 'name') + '>') +
        field(p, 'phone', 'Nomor WhatsApp <span class="opt">(opsional)</span>',
          '<input class="input" id="' + p + 'phone" name="phone" type="tel" inputmode="tel" autocomplete="' + (auto || 'tel') + '" placeholder="08xxxxxxxxxx"' + desc(p, 'phone') + '>') +
        '<div class="field" data-field="gender">' +
          '<span class="label" id="' + p + 'gender-label">Gender</span>' +
          '<div class="radio-row" role="radiogroup" aria-labelledby="' + p + 'gender-label"' + desc(p, 'gender') + '>' +
            '<label class="radio-inline"><input type="radio" name="' + p + 'gender" data-key="gender" value="Laki-laki">Laki-laki</label>' +
            '<label class="radio-inline"><input type="radio" name="' + p + 'gender" data-key="gender" value="Perempuan">Perempuan</label>' +
          '</div>' +
          '<p class="error-text" id="' + p + 'gender-err"></p>' +
        '</div>' +
        field(p, 'birth', 'Tanggal lahir',
          '<div class="date-row">' +
            '<input class="input" id="' + p + 'birth" name="birth" type="date" max="' + max + '" autocomplete="' + (auto || 'bday') + '"' + desc(p, 'birth') + '>' +
            '<span class="age" id="' + p + 'age" aria-live="polite"></span>' +
          '</div>') +
        field(p, 'religion', 'Agama',
          '<select class="select" id="' + p + 'religion" name="religion"' + desc(p, 'religion') + '>' +
            '<option value="">Pilih agama</option>' +
            ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu', 'Lainnya'].map(function (r) { return '<option>' + r + '</option>'; }).join('') +
          '</select>') +
        field(p, 'email', 'Email',
          '<input class="input" id="' + p + 'email" name="email" type="email" inputmode="email" autocomplete="' + (auto || 'email') + '" placeholder="nama@email.com"' + desc(p, 'email') + '>') +
        field(p, 'password', 'Password',
          '<div class="input-group">' +
            '<input class="input" id="' + p + 'password" name="password" type="password" autocomplete="new-password" aria-describedby="' + p + 'password-hint ' + p + 'password-err">' +
            '<button class="toggle" type="button" data-toggle="' + p + 'password" aria-label="Tampilkan password" aria-pressed="false">' + icon('eye') + '</button>' +
          '</div>' +
          '<p class="hint" id="' + p + 'password-hint">Minimal 6 karakter.' + (isLpk ? ' Kandidat memakai password ini untuk login.' : '') + '</p>') +
      '</fieldset>';
  }

  function field(p, key, label, control) {
    return '<div class="field" data-field="' + key + '">' +
      '<label for="' + p + key + '">' + label + '</label>' + control +
      '<p class="error-text" id="' + p + key + '-err"></p>' +
    '</div>';
  }

  function desc(p, key) { return ' aria-describedby="' + p + key + '-err"'; }

  function icon(name) {
    var paths = {
      trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
      eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
      eyeOff: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><path d="m3 3 18 18"/>',
      alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>'
    };
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + paths[name] + '</svg>';
  }

  // ---------- Validasi ----------

  var rules = {
    lpkName: function (v) { return v.trim() ? '' : 'Isi nama LPK/LKP.'; },
    picName: function (v) { return v.trim() ? '' : 'Isi nama penanggung jawab.'; },
    picPhone: function (v) {
      if (!v.trim()) return 'Isi nomor WhatsApp PIC.';
      return validPhone(v) ? '' : 'Nomor WhatsApp tidak valid. Contoh format: 081234567890.';
    },
    name: function (v) {
      v = v.trim();
      if (!v) return 'Isi nama lengkap.';
      if (v.length < 3) return 'Nama minimal 3 huruf.';
      return /^[A-Za-zÀ-ÿ' .-]+$/.test(v) ? '' : 'Nama hanya boleh berisi huruf, spasi, titik, dan tanda petik.';
    },
    phone: function (v) { return !v.trim() || validPhone(v) ? '' : 'Nomor WhatsApp tidak valid. Contoh format: 081234567890.'; },
    gender: function (v) { return v ? '' : 'Pilih gender.'; },
    birth: function (v) {
      if (!v) return 'Isi tanggal lahir.';
      var d = new Date(v + 'T00:00:00');
      if (isNaN(d) || d >= new Date()) return 'Tanggal lahir harus sebelum hari ini.';
      return d.getFullYear() < 1900 ? 'Periksa lagi tahun lahirnya.' : '';
    },
    religion: function (v) { return v ? '' : 'Pilih agama.'; },
    email: function (v, i) {
      v = v.trim().toLowerCase();
      if (!v) return 'Isi email.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Format email tidak valid. Contoh: nama@email.com.';
      var dup = data.candidates.some(function (c, j) { return j !== i && c.email.trim().toLowerCase() === v; });
      return dup ? 'Email ini sudah dipakai kandidat lain di form ini.' : '';
    },
    password: function (v) { return v.length >= 6 ? '' : 'Password minimal 6 karakter.'; }
  };

  function validPhone(v) { return /^(\+62|62|0)8\d{8,12}$/.test(v.replace(/[\s-]/g, '')); }

  function validateLpk(key) {
    var msg = rules[key](data.lpk[key] || '');
    setErr(errors.lpk, key, msg);
    showError(form.querySelector('[data-field="' + key + '"]'), msg);
    return !msg;
  }

  function validateCandidate(i, key) {
    var msg = rules[key](data.candidates[i][key] || '', i);
    setErr(errors.candidates[i], key, msg);
    showError(fieldEl(i, key), msg);
    return !msg;
  }

  function setErr(bag, key, msg) { if (msg) bag[key] = msg; else delete bag[key]; }

  function showError(fieldNode, msg) {
    if (!fieldNode) return;
    var p = fieldNode.querySelector('.error-text');
    fieldNode.classList.toggle('invalid', !!msg);
    p.innerHTML = msg ? icon('alert') + '<span>' + msg + '</span>' : '';
    p.classList.toggle('show', !!msg);
    fieldNode.querySelectorAll('input, select').forEach(function (el) {
      if (el.type !== 'radio') el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    });
  }

  function fieldEl(i, key) {
    return list.children[i] && list.children[i].querySelector('[data-field="' + key + '"]');
  }

  // ---------- Event ----------

  form.addEventListener('input', onEdit);
  form.addEventListener('change', onEdit);

  function onEdit(e) {
    var el = e.target;
    var key = el.dataset.key || el.name;
    var card = el.closest('.candidate');
    if (card) {
      var i = Number(card.dataset.index);
      data.candidates[i][key] = el.value;
      if (key === 'birth') updateAge(i);
      // Pesan error hilang begitu kolom diperbaiki, tidak muncul saat masih mengetik.
      if (errors.candidates[i][key] || e.type === 'change') validateCandidate(i, key);
      if (key === 'email') revalidateEmails(i);
    } else if (key in data.lpk) {
      data.lpk[key] = el.value;
      if (errors.lpk[key] || e.type === 'change') validateLpk(key);
    }
    save();
  }

  form.addEventListener('focusout', function (e) {
    var el = e.target;
    if (!el.name || el.type === 'radio' || !el.value) return;
    var card = el.closest('.candidate');
    if (card) validateCandidate(Number(card.dataset.index), el.name);
    else if (el.name in data.lpk) validateLpk(el.name);
  });

  function revalidateEmails(except) {
    data.candidates.forEach(function (c, j) {
      if (j !== except && c.email && errors.candidates[j].email !== undefined) validateCandidate(j, 'email');
    });
  }

  list.addEventListener('click', function (e) {
    var toggle = e.target.closest('[data-toggle]');
    if (toggle) {
      var input = document.getElementById(toggle.dataset.toggle);
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      toggle.setAttribute('aria-pressed', String(show));
      toggle.setAttribute('aria-label', show ? 'Sembunyikan password' : 'Tampilkan password');
      toggle.innerHTML = icon(show ? 'eyeOff' : 'eye');
      return;
    }
    var remove = e.target.closest('[data-remove]');
    if (remove) {
      var i = Number(remove.dataset.remove);
      data.candidates.splice(i, 1);
      errors.candidates.splice(i, 1);
      save();
      render();
      var prev = list.children[i - 1];
      (prev ? prev.querySelector('input[name="name"]') : addBtn).focus();
    }
  });

  addBtn.addEventListener('click', function () {
    if (data.candidates.length >= MAX_CANDIDATES) return;
    data.candidates.push(blank());
    errors.candidates.push({});
    save();
    render();
    var input = list.lastElementChild.querySelector('input[name="name"]');
    input.focus();
    input.scrollIntoView({ block: 'center' });
  });

  form.addEventListener('submit', function (e) {
    var ok = true;
    if (isLpk) ['lpkName', 'picName', 'picPhone'].forEach(function (k) { ok = validateLpk(k) && ok; });
    data.candidates.forEach(function (c, i) {
      Object.keys(rules).forEach(function (k) {
        if (k in c) ok = validateCandidate(i, k) && ok;
      });
    });
    save();
    if (ok) { alertBox.hidden = true; return; }

    e.preventDefault();
    var total = form.querySelectorAll('.field.invalid').length;
    alertText.textContent = total === 1 ? 'Ada 1 kolom yang perlu diperbaiki.' : 'Ada ' + total + ' kolom yang perlu diperbaiki.';
    alertBox.hidden = false;
    var first = form.querySelector('.field.invalid input, .field.invalid select');
    first.focus();
    first.scrollIntoView({ block: 'center' });
  });

  // ---------- Util ----------

  function updateAge(i) {
    var out = document.getElementById('c' + i + '-age');
    var v = data.candidates[i].birth;
    var d = v ? new Date(v + 'T00:00:00') : null;
    if (!d || isNaN(d) || d >= new Date()) { out.textContent = 'Usia: -'; return; }
    var now = new Date();
    var age = now.getFullYear() - d.getFullYear();
    if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) age--;
    out.textContent = age + ' tahun';
  }

  function setValue(root, name, v) { var el = root.querySelector('[name="' + name + '"]'); if (el) el.value = v || ''; }
  function blank() { return { name: '', phone: '', gender: '', birth: '', religion: '', email: '', password: '' }; }
  function save() { try { sessionStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {} }
  function read(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function parse(s) { try { return s ? JSON.parse(s) : null; } catch (e) { return null; } }
})();
