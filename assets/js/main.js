(function () {
  'use strict';

  var WHATSAPP = '5493512166870';

  // ---------- Links de la sesión de consultoría ----------
  // Pegá acá tus links. Mientras estén vacíos, los botones abren WhatsApp.
  var LINK_PAGO_MP = 'https://mpago.la/24FvuCF';   // Mercado Pago · Sesión SALT $40.000
  var LINK_AGENDA  = 'https://calendar.app.google/4FckD9eohae8ZFkYA';   // Google Calendar · Sesión SALT 60 min

  // ---------- Tracking (Meta Pixel / GA4 si están instalados) ----------
  function track(metaEvent, gaEvent, params) {
    try { if (typeof window.fbq === 'function') window.fbq('track', metaEvent, params || {}); } catch (e) {}
    try { if (typeof window.gtag === 'function') window.gtag('event', gaEvent, params || {}); } catch (e) {}
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (!el) return;
    var kind = el.getAttribute('data-track');
    if (kind === 'whatsapp') track('Contact', 'contact_whatsapp', { method: 'whatsapp' });
    if (kind === 'schedule') track('Schedule', 'click_diagnostico');
    if (kind === 'checkout') track('InitiateCheckout', 'begin_checkout', { value: 40000, currency: 'ARS', content_name: 'Sesion consultoria SALT' });
  });

  // ---------- Botones de pago y agenda ----------
  function waLink(text) { return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text); }
  document.querySelectorAll('[data-pay]').forEach(function (btn) {
    var isPay = btn.getAttribute('data-pay') === 'mp';
    var url = isPay ? LINK_PAGO_MP : LINK_AGENDA;
    btn.href = url || waLink(isPay
      ? 'Hola Carlos, quiero reservar una sesión de consultoría. ¿Me pasás el link de pago?'
      : 'Hola Carlos, ya pagué la sesión de consultoría y quiero elegir día y horario.');
    btn.target = '_blank';
    btn.rel = 'noopener';
  });

  // ---------- Menú mobile ----------
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- Animaciones de entrada ----------
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---------- Formulario → WhatsApp ----------
  var form = document.getElementById('leadForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = form.querySelectorAll('[required]');
      var ok = true;
      fields.forEach(function (f) {
        var valid = f.value.trim() !== '';
        f.classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        note.textContent = 'Completá todos los campos así preparo bien la llamada.';
        note.classList.add('is-error');
        return;
      }
      note.classList.remove('is-error');
      note.textContent = 'Abriendo WhatsApp…';

      var d = new FormData(form);
      var msg =
        'Hola Carlos, quiero agendar un diagnóstico.\n\n' +
        '• Nombre: ' + d.get('nombre') + '\n' +
        '• Negocio: ' + d.get('negocio') + '\n' +
        '• Rubro: ' + d.get('rubro') + '\n' +
        '• Inversión en publicidad: ' + d.get('inversion') + '\n' +
        '• Qué quiero resolver: ' + d.get('mensaje');

      track('Lead', 'generate_lead', { content_category: d.get('rubro'), inversion: d.get('inversion') });
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });

    form.addEventListener('input', function (e) {
      if (e.target.classList.contains('is-invalid') && e.target.value.trim() !== '') {
        e.target.classList.remove('is-invalid');
      }
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
