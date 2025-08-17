document.addEventListener('DOMContentLoaded', () => {
  const reveal = () => {
    document.querySelectorAll('.fade-in-up').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < (window.innerHeight - 60)) el.classList.add('show');
    });
  };
  reveal();
  window.addEventListener('scroll', reveal);

  // Registration image preview
  const imageInput = document.getElementById('image');
  const preview = document.getElementById('preview');
  const previewWrapper = document.getElementById('previewWrapper');

  if (imageInput && preview) {
    imageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) { previewWrapper.style.display = 'none'; return; }
      if (!file.type.startsWith('image/')) { alert('Please upload an image file'); imageInput.value=''; return; }
      const reader = new FileReader();
      reader.onload = () => { preview.src = reader.result; previewWrapper.style.display = 'block'; };
      reader.readAsDataURL(file);
    });
  }

  // Registration form validation (demo)
  const regForm = document.getElementById('registrationForm');
  const registerAlert = document.getElementById('registerAlert');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('name')||{}).value?.trim();
      const email = (document.getElementById('email')||{}).value?.trim();
      const address = (document.getElementById('address')||{}).value?.trim();
      const pw = (document.getElementById('password')||{}).value || '';
      const pw2 = (document.getElementById('password2')||{}).value || '';
      const agree = (document.getElementById('agree')||{}).checked || false;

      if (!name || !email || !address) { showRegisterAlert('Please fill all required fields', 'danger'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showRegisterAlert('Enter a valid email', 'danger'); return; }
      if (pw.length < 8) { showRegisterAlert('Password must be at least 8 characters', 'danger'); return; }
      if (pw !== pw2) { showRegisterAlert('Passwords do not match', 'danger'); return; }
      if (!agree) { showRegisterAlert('You must accept terms', 'danger'); return; }

      const profile = { name, email, address, role: (document.getElementById('role')||{}).value || 'student', created: new Date().toISOString() };
      try { localStorage.setItem('diu_profile', JSON.stringify(profile)); } catch(e){}

      showRegisterAlert('Account created — redirecting...', 'success');
      setTimeout(()=> window.location.href = 'index.html', 1000);
    });
  }

  function showRegisterAlert(msg, type='info'){
    if (!registerAlert) return;
    registerAlert.style.display = 'block';
    registerAlert.className = `alert alert-${type}`;
    registerAlert.textContent = msg;
  }

  // Contact form handling (demo)
  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contactAlert');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('cname')||{}).value?.trim();
      const email = (document.getElementById('cemail')||{}).value?.trim();
      const message = (document.getElementById('cmessage')||{}).value?.trim();

      if (!name || !email || !message) { showContactAlert('Please fill all fields', 'danger'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showContactAlert('Enter a valid email', 'danger'); return; }

      showContactAlert('Thanks! Your message has been received (demo).', 'success');
      contactForm.reset();
    });
  }

  function showContactAlert(msg, type='info'){
    if (!contactAlert) return;
    contactAlert.style.display = 'block';
    contactAlert.className = `alert alert-${type}`;
    contactAlert.textContent = msg;
  }

  // Highlight active nav link based on URL
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item');
  navLinks.forEach(a => {
    try {
      const href = a.getAttribute('href');
      if (href && location.pathname.endsWith(href)) a.classList.add('active');
    } catch (e){}
  });
});
