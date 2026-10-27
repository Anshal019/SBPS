/**
 * Shree Bhadbhid Primary School - Main JavaScript
 * Vanilla JS, Zero external dependencies, Mobile-first & Accessible
 */

window.openAdmissionModal = function() {
  const modal = document.getElementById('admissionModal');
  if (!modal) return;
  modal.classList.add('is-active');
  modal.setAttribute('aria-hidden', 'false');
  const firstInput = modal.querySelector('input:not(.hidden-honeypot)');
  if (firstInput) firstInput.focus();
  document.body.style.overflow = 'hidden';
};

window.closeAdmissionModal = function() {
  const modal = document.getElementById('admissionModal');
  if (!modal) return;
  modal.classList.remove('is-active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initAdmissionModal();
  initForms();
  initYouTubeLite();
  initGeoNavigation();
  initLightbox();
});

/* 1. Mobile Menu Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggleBtn');
  const navBar = document.getElementById('mainNavBar');

  if (!toggleBtn || !navBar) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navBar.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen ? '✕' : '☰';
  });

  // Close on nav link click
  navBar.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navBar.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = '☰';
    });
  });
}

/* 2. Admission Modal Controls */
function initAdmissionModal() {
  const modal = document.getElementById('admissionModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const openBtns = document.querySelectorAll('.js-open-admission');

  if (!modal) return;

  window.openAdmissionModal = function() {
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
    document.body.style.overflow = 'hidden';
  };

  window.closeAdmissionModal = function() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openAdmissionModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeAdmissionModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) window.closeAdmissionModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      window.closeAdmissionModal();
    }
  });
}

/* 3. Forms Handling (WhatsApp Integration + Spam Honeypot) */
function initForms() {
  // Modal Admission Form
  const modalForm = document.getElementById('admissionModalForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const honeypot = modalForm.querySelector('input[name="website_hp"]');
      if (honeypot && honeypot.value) return; // bot detected

      const studentName = modalForm.querySelector('[name="student_name"]')?.value.trim() || '';
      const parentName = modalForm.querySelector('[name="parent_name"]')?.value.trim() || '';
      const grade = modalForm.querySelector('[name="grade"]')?.value || 'ધોરણ ૧ થી ૮';
      const phone = modalForm.querySelector('[name="phone"]')?.value.trim() || '';

      const msg = `નમસ્તે શ્રી ભડભીડ પ્રાથમિક શાળા,\nમારી શાળા પ્રવેશ ઇન્ક્વાયરી નીચે મુજબ છે:\n\n` +
                  `• વિદ્યાર્થીનું નામ: ${studentName}\n` +
                  `• વાલીનું નામ: ${parentName}\n` +
                  `• પ્રવેશ ધોરણ: ${grade}\n` +
                  `• સંપર્ક નંબર: ${phone}\n\n` +
                  `કૃપા કરીને પ્રવેશ પ્રક્રિયા અને જરૂરી દસ્તાવેજ વિશે માહિતી આપશો. આભાર!`;

      const waUrl = `https://wa.me/919724232366?text=${encodeURIComponent(msg)}`;
      window.closeAdmissionModal();
      window.open(waUrl, '_blank');
    });
  }

  // Contact Page Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const honeypot = contactForm.querySelector('input[name="website_hp"]');
      if (honeypot && honeypot.value) return;

      const name = contactForm.querySelector('[name="sender_name"]')?.value.trim() || '';
      const phone = contactForm.querySelector('[name="sender_phone"]')?.value.trim() || '';
      const subject = contactForm.querySelector('[name="subject"]')?.value.trim() || 'સામાન્ય પૂછપરછ';
      const message = contactForm.querySelector('[name="message"]')?.value.trim() || '';

      const msg = `નમસ્તે શ્રી ભડભીડ પ્રાથમિક શાળા,\nવેબસાઇટ પરથી સંપર્ક સંદેશ:\n\n` +
                  `• નામ: ${name}\n` +
                  `• મોબાઇલ: ${phone}\n` +
                  `• વિષય: ${subject}\n` +
                  `• સંદેશ: ${message}\n\n` +
                  `આભાર!`;

      const waUrl = `https://wa.me/919724232366?text=${encodeURIComponent(msg)}`;
      const alertBox = document.getElementById('contactAlert');
      if (alertBox) {
        alertBox.textContent = 'વોટ્સએપ પર સંદેશ મોકલવામાં આવી રહ્યો છે...';
        alertBox.style.display = 'block';
      }
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 500);
    });
  }
}

/* 4. Privacy-Friendly YouTube Lite Embed */
function initYouTubeLite() {
  document.querySelectorAll('.js-youtube-lite').forEach(wrap => {
    const videoId = wrap.getAttribute('data-youtube-id');
    const playBtn = wrap.querySelector('.youtube-play-btn');

    if (!videoId) return;

    const playVideo = () => {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`);
      iframe.setAttribute('title', wrap.getAttribute('data-title') || 'School Video');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('loading', 'lazy');
      
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
    };

    if (playBtn) playBtn.addEventListener('click', playVideo);
    wrap.addEventListener('click', (e) => {
      if (e.target !== playBtn) playVideo();
    });
  });
}

/* 5. Geolocation Directions to School */
function initGeoNavigation() {
  const geoBtn = document.getElementById('btnGetDirections');
  const statusEl = document.getElementById('geoNavStatus');

  if (!geoBtn) return;

  geoBtn.addEventListener('click', () => {
    const schoolDest = 'Bhadbhid+Bhavnagar+Gujarat+364001';
    
    if (!navigator.geolocation) {
      if (statusEl) statusEl.textContent = 'બ્રાઉઝરમાં જીપીએસ સપોર્ટ નથી. ડાયરેક્ટ રસ્તો ખૂલી રહ્યો છે...';
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${schoolDest}`, '_blank');
      return;
    }

    if (statusEl) statusEl.textContent = 'તમારું વર્તમાન લોકેશન મેળવી રહ્યું છે...';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (statusEl) statusEl.textContent = 'લોકેશન પ્રાપ્ત થયું! ગૂગલ મેપ્સમાં રસ્તો દર્શાવેલ છે.';
        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${schoolDest}`;
        window.open(url, '_blank');
      },
      (err) => {
        if (statusEl) statusEl.textContent = 'વર્તમાન લોકેશન ન મળ્યું. શાળાનું સીધું સરનામું ખૂલી રહ્યું છે...';
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${schoolDest}`, '_blank');
      },
      { timeout: 7000 }
    );
  });
}

/* 6. Accessible Lightbox */
function initLightbox() {
  const lightbox = document.getElementById('siteLightbox');
  if (!lightbox) return;

  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentGallery = [];
  let currentIndex = 0;

  window.openLightbox = function(index, items) {
    currentGallery = items;
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  function updateLightbox() {
    const item = currentGallery[currentIndex];
    if (!item) return;
    lbImg.src = item.image;
    lbImg.alt = item.alt || item.title;
    lbCaption.textContent = item.title;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightbox();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}
