// Mobile navigation
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form — no backend yet, so hand off to the visitor's mail client.
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    note.textContent = 'Please fill in every field with a valid email address.';
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const name = `${data.get('first')} ${data.get('last')}`.trim();
  const body = `Name: ${name}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;

  window.location.href =
    `mailto:info@thigpencattle.com?subject=${encodeURIComponent('Website inquiry from ' + name)}` +
    `&body=${encodeURIComponent(body)}`;

  note.textContent = 'Thanks for submitting! Your email program should now be open.';
});
