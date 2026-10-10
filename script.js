const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });

  }, { threshold: 0.15 });

  reveals.forEach(element => observer.observe(element));
} else {
  reveals.forEach(element => element.classList.add('active'));
}

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-navigation');

function setMenuOpen(isOpen) {
  if (!menuToggle || !nav) return;

  nav.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

menuToggle?.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenuOpen(false);
});

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle?.querySelector('.theme-toggle-icon');
const themeColor = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = 'maa-sharda-theme';

function setTheme(theme, persist = false) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
  if (themeColor) themeColor.setAttribute('content', isDark ? '#11100f' : '#fffdf8');

  if (persist) {
    try {
      window.localStorage.setItem(themeStorageKey, theme);
    } catch (error) {
      console.warn('Could not save the selected theme in this browser.', error);
    }
  }
}

let savedTheme = 'light';
try {
  const storedTheme = window.localStorage.getItem(themeStorageKey);
  if (storedTheme === 'dark' || storedTheme === 'light') savedTheme = storedTheme;
} catch (error) {
  console.warn('Could not read the saved theme in this browser.', error);
}

setTheme(savedTheme);
themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
  setTheme(nextTheme, true);
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item, .place-photo-button').forEach(button => {
  button.addEventListener('click', () => {
    const imagePath = button.getAttribute('data-full-image');
    const imageAlt = button.getAttribute('data-image-alt');
    if (!lightbox || !lightboxImage || !imagePath || !imageAlt) return;

    lightboxImage.src = imagePath;
    lightboxImage.alt = imageAlt;
    if (lightboxCaption) lightboxCaption.textContent = imageAlt;
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener('click', () => lightbox?.close());
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
