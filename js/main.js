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

const loadedAt = Date.now();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Bots fill the hidden field. Report success so they don't retry.
  if (form.elements.website.value !== '') {
    note.textContent = 'Thanks for submitting!';
    form.reset();
    return;
  }

  if (!form.checkValidity()) {
    note.textContent = 'Please fill in every field with a valid email address.';
    form.reportValidity();
    return;
  }

  // Nobody reads the page and types a message in under three seconds.
  if (Date.now() - loadedAt < 3000) {
    note.textContent = 'That came through a little too fast — please try again.';
    return;
  }

  const message = form.elements.message.value.trim();

  if (message.length < 10) {
    note.textContent = 'Please add a bit more detail to your message.';
    return;
  }

  if ((message.match(/https?:\/\/|www\./gi) || []).length > 1) {
    note.textContent = 'Please remove the links from your message and try again.';
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
