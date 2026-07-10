/* ========================================
   PORTFOLIO - Main JavaScript
   Navigation, Animations, Contact Form
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initSmoothScroll();
  initTypedText();
  initContactForm();
  initFilters();
  initSpotlight();
  initScrollNav();
});

/* ── Navbar ── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');
  const navAnchors = document.querySelectorAll('.nav-links a');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  });

  // Mobile toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
      overlay.classList.toggle('active');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close mobile nav on link click
  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      if (links.classList.contains('open')) {
        toggle.classList.remove('active');
        links.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
}

/* ── Active nav link based on scroll ── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length === 0 || navLinks.length === 0) return;

  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* ── Scroll Animations (IntersectionObserver) ── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ── Smooth Scroll for anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ── Typed Text Effect ── */
function initTypedText() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const strings = [
    'Cybersecurity Student',
    'Ethical Hacker',
    'Red Teaming Enthusiast',
    'Security Tools Developer',
    'Bug Bounty Learner'
  ];

  let stringIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const current = strings[stringIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      stringIndex = (stringIndex + 1) % strings.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ── Contact Form (EmailJS) ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Initialize EmailJS with the public key
  emailjs.init('HiReTbmx8mxylK8XI');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    const status = document.getElementById('form-status');
    const originalText = btn.textContent;

    // Validate fields
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showStatus(status, 'Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus(status, 'Please enter a valid email address.', 'error');
      return;
    }

    // Rate Limiting (5 messages per hour)
    let rateData = JSON.parse(localStorage.getItem('contact_rate_limit') || '{"count": 0, "startTime": 0}');
    const now = Date.now();
    
    // Reset if 1 hour has passed since the first message
    if (now - rateData.startTime > (1000 * 60 * 60)) {
      rateData = { count: 0, startTime: now };
    }
    
    if (rateData.count >= 5) {
      showStatus(status, 'You can only send 5 messages per hour. Please try again later.', 'error');
      return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const serviceID = 'service_cu8vobs';
      const templateID = 'template_qud6iji';

      // Send via EmailJS (Public key is initialized globally at the top)
      await emailjs.send(serviceID, templateID, {
        from_name: name,
        from_email: email,
        message: message,
        reply_to: email,      // Crucial for replying directly to the user
      });

      // Update rate limiter count
      rateData.count++;
      localStorage.setItem('contact_rate_limit', JSON.stringify(rateData));

      showStatus(status, '✓ Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      // Detailed error for developers in console, friendly error for user
      const errorMsg = error.text || 'Failed to send message.';
      showStatus(status, `✗ ${errorMsg} Please try again or email me directly.`, 'error');
    }

    btn.textContent = originalText;
    btn.disabled = false;
  });
}

function showStatus(el, message, type) {
  el.textContent = message;
  el.className = 'form-status ' + type;
  el.style.display = 'block';

  setTimeout(() => {
    el.style.display = 'none';
  }, 6000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ── Filter  (Projects / Blog) ── */
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      const cards = document.querySelectorAll('[data-category]');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── Text Scramble Effect ── */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud" style="color:var(--text-muted)">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const titles = document.querySelectorAll('h1, h2.section-title');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!entry.target.hasAttribute('data-scrambled')) {
          if (!entry.target.dataset.original) {
              entry.target.dataset.original = entry.target.innerText;
          }
          const fx = new TextScramble(entry.target);
          fx.setText(entry.target.dataset.original);
          entry.target.setAttribute('data-scrambled', 'true');
        }
      } else {
        entry.target.removeAttribute('data-scrambled');
      }
    });
  }, { threshold: 0.1 });
  
  titles.forEach(t => observer.observe(t));
});

function initSpotlight() {
  const cards = document.querySelectorAll('.project-card, .about-card, .skill-category, .timeline-card, .achievement-card, .tool-item');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initScrollNav() {
  const lines = document.querySelectorAll('.scroll-nav-line');
  if (!lines.length) return;

  // Click to scroll
  lines.forEach(line => {
    line.addEventListener('click', () => {
      const targetId = line.getAttribute('data-target');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Highlight on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const top = section.offsetTop - window.innerHeight / 2.5;
      if (window.scrollY >= top) {
        current = '#' + section.getAttribute('id');
      }
    });

    lines.forEach(line => {
      line.classList.remove('active');
      if (line.getAttribute('data-target') === current) {
        line.classList.add('active');
      }
    });
    
    // Fallback if at top
    if (window.scrollY < 100 && lines.length > 0) {
       lines.forEach(l => l.classList.remove('active'));
       lines[0].classList.add('active');
    }
  });
  
  // Trigger once to set initial state
  window.dispatchEvent(new Event('scroll'));
}

/* ── Gallery & Lightbox Logic ── */
function initGallery() {
  const stacks = document.querySelectorAll('.gallery-stack');
  stacks.forEach(stack => {
    updateGallery(stack, 0);
  });
}

function changeGalleryImage(btn, dir) {
  const stack = btn.closest('.gallery-container').querySelector('.gallery-stack');
  const cards = stack.querySelectorAll('.gallery-card');
  let activeIndex = Array.from(cards).findIndex(c => c.classList.contains('active'));
  if (activeIndex === -1) activeIndex = 0;
  
  let newIndex = (activeIndex + dir + cards.length) % cards.length;
  updateGallery(stack, newIndex, dir, activeIndex);
}

function updateGallery(stack, newIndex, dir=1, oldIndex=-1) {
  const cards = stack.querySelectorAll('.gallery-card');
  const len = cards.length;
  
  cards.forEach((card, i) => {
    card.className = 'gallery-card'; // reset classes
    
    if (i === newIndex) {
      card.classList.add('active');
    } else if (i === (newIndex + 1) % len) {
      card.classList.add('next-1');
    } else if (i === (newIndex + 2) % len) {
      card.classList.add('next-2');
    } else if (dir > 0 && i === oldIndex) {
      card.classList.add('prev-1');
    } else if (dir < 0 && i === oldIndex) {
      // It went backwards, the old one goes to next-1, which is handled above if it's newIndex+1.
      // But we want it to look smooth
    }
  });
}

function openLightbox(btn) {
  const imgSrc = btn.previousElementSibling.src;
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (overlay && lightboxImg) {
    lightboxImg.src = imgSrc;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(e) {
  const overlay = document.getElementById('lightbox-overlay');
  if (e.target.tagName !== 'IMG' && overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
});

/* ── External Links Management ── */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    // If the link is external (starts with http:// or https://)
    if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
