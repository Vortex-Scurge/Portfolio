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
  const sections = document.querySelectorAll('section, .page-header, .hero, .project-detail-header, .project-detail-section, article, .blog-post, .blog-post-header, .blog-post-content');

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const animElements = Array.from(entry.target.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right'));
      
      // If the target itself has the fade-in class, add it to the array
      if (entry.target.matches('.fade-in, .fade-in-left, .fade-in-right')) {
        animElements.push(entry.target);
      }
      
      let titles = Array.from(entry.target.querySelectorAll('h1:not(.hero-headline), h2.section-title, .scramble-line'));
      
      // Also handle the case where the section ITSELF is the title (though unlikely, it's safe)
      if (entry.target.matches('h1:not(.hero-headline), h2.section-title, .scramble-line')) {
        titles = [entry.target];
      }

      if (entry.isIntersecting) {
        animElements.forEach(el => el.classList.add('visible'));
        titles.forEach(title => {
          if (!title.hasAttribute('data-scrambled')) {
            if (!title.dataset.original) {
                title.dataset.original = title.innerText;
            }
            const fx = new TextScramble(title);
            fx.setText(title.dataset.original);
            title.setAttribute('data-scrambled', 'true');
          }
        });
      } else {
        animElements.forEach(el => el.classList.remove('visible'));
        // Do not remove data-scrambled, let the text scramble only once to prevent infinite intersection glitching
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px'
  });

  sections.forEach(section => observer.observe(section));
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
    'Full-Stack Developer',
    'Ethical Hacker',
    'Software Engineer',
    'Security Tools Builder'
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

// Text scramble observer removed - now handled by initScrollAnimations

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
        
        // Force reload animations when nav bar is clicked
        const animElements = targetSection.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
        animElements.forEach(el => {
          el.classList.remove('visible');
          void el.offsetWidth; // Force a reflow
          el.classList.add('visible');
        });

        const titles = targetSection.querySelectorAll('h1:not(.hero-headline), h2.section-title, .scramble-line');
        titles.forEach(title => {
          if (!title.dataset.original) {
              title.dataset.original = title.innerText;
          }
          const fx = new TextScramble(title);
          fx.setText(title.dataset.original);
          title.setAttribute('data-scrambled', 'true');
        });
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

/* ── Interactive Draggable Stickers with Physics (Brutalist Theme) ── */
document.addEventListener('DOMContentLoaded', () => {
  const draggables = document.querySelectorAll('.drag-item');
  const container = document.getElementById('draggable-container');
  if (!draggables.length || !container) return;

  const containerW = container.offsetWidth || 1000;
  const containerH = container.offsetHeight || 600;

  const state = new Map();
  const numItems = draggables.length;

  draggables.forEach((item, index) => {
    const itemW = item.offsetWidth || 100;
    const itemH = item.offsetHeight || 50;
    
    const cx = containerW / 2;
    const cy = containerH / 2;

    // Distribute angles evenly to form a ring around the portrait, with some random variance
    const baseAngle = (index / numItems) * Math.PI * 2;
    const angle = baseAngle + (Math.random() - 0.5) * 0.5; 
    
    // Ensure they spawn far enough away from the center portrait (radius)
    const rx = 280 + Math.random() * 120;
    const ry = 220 + Math.random() * 100;

    let randomX = cx + Math.cos(angle) * rx - (itemW / 2);
    let randomY = cy + Math.sin(angle) * ry - (itemH / 2);

    // Clamp to container edges to prevent them from spawning fully outside
    randomX = Math.max(20, Math.min(containerW - itemW - 20, randomX));
    randomY = Math.max(20, Math.min(containerH - itemH - 20, randomY));
    
    let randomRot = (Math.random() - 0.5) * 60; // -30 to 30 deg

    item.style.position = 'absolute';
    item.style.left = '0px';
    item.style.top = '0px';
    item.style.transform = `translate3d(${randomX}px, ${randomY}px, 0) rotate(${randomRot}deg)`;
    
    state.set(item, {
      x: randomX, y: randomY,
      velX: (Math.random() - 0.5) * 4,
      velY: (Math.random() - 0.5) * 4,
      lastMouseX: 0, lastMouseY: 0,
      grabOffsetX: 0, grabOffsetY: 0,
      initialLeft: 0,
      initialTop: 0,
      currentRot: randomRot,
      baseRot: randomRot,
      targetRot: randomRot,
      isDragging: false,
      scale: 1,
      targetScale: 1
    });

    item.addEventListener('mousedown', (e) => dragStart(e, item));
    item.addEventListener('touchstart', (e) => dragStart(e, item), { passive: false });
    
    item.addEventListener('mouseenter', () => {
      if (!state.get(item).isDragging) state.get(item).targetScale = 1.05;
    });
    item.addEventListener('mouseleave', () => {
      if (!state.get(item).isDragging) state.get(item).targetScale = 1;
    });
  });

  let activeItem = null;
  let highestZIndex = 50;

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag, { passive: false });
  document.addEventListener('mouseup', dragEnd);
  document.addEventListener('touchend', dragEnd);

  function dragStart(e, item) {
    if (!item.classList.contains('drag-item')) return;
    activeItem = item;
    
    let clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    let clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    const s = state.get(activeItem);
    s.isDragging = true;
    s.targetScale = 1.1;
    
    highestZIndex++;
    activeItem.style.zIndex = highestZIndex;

    const rect = activeItem.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    s.grabOffsetX = clientX - centerX;
    s.grabOffsetY = clientY - centerY;
    s.lastMouseX = clientX;
    s.lastMouseY = clientY;
  }

  function drag(e) {
    if (!activeItem) return;
    e.preventDefault();
    
    let clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    let clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    const s = state.get(activeItem);
    
    s.velX = clientX - s.lastMouseX;
    s.velY = clientY - s.lastMouseY;
    
    s.x += s.velX;
    s.y += s.velY;
    
    // Torque physics: cross product of offset and velocity
    const torque = (s.grabOffsetX * s.velY - s.grabOffsetY * s.velX) * 0.05;
    s.targetRot = s.baseRot + torque;
    
    s.lastMouseX = clientX;
    s.lastMouseY = clientY;
  }

  function dragEnd(e) {
    if (!activeItem) return;
    const s = state.get(activeItem);
    s.isDragging = false;
    s.targetScale = 1;
    s.targetRot = s.baseRot; 
    activeItem = null;
  }

  function updatePhysics() {
    const containerW = container.offsetWidth;
    const containerH = container.offsetHeight;

    draggables.forEach(item => {
      const s = state.get(item);
      
      if (!s.isDragging) {
        // Friction
        s.velX *= 0.94;
        s.velY *= 0.94;
        
        s.x += s.velX;
        s.y += s.velY;
      }
      
      // Calculate boundaries
      let currentLeft = s.initialLeft + s.x;
      let currentTop = s.initialTop + s.y;
      const itemW = item.offsetWidth;
      const itemH = item.offsetHeight;
      
      // X boundaries
      if (currentLeft < 0) {
        s.x = -s.initialLeft;
        s.velX *= -0.7; // Bounce
      } else if (currentLeft + itemW > containerW) {
        s.x = containerW - itemW - s.initialLeft;
        s.velX *= -0.7;
      }

      // Y boundaries
      if (currentTop < 0) {
        s.y = -s.initialTop;
        s.velY *= -0.7;
      } else if (currentTop + itemH > containerH) {
        s.y = containerH - itemH - s.initialTop;
        s.velY *= -0.7;
      }

      // Arch Corner Boundaries (400px radius)
      let cx = s.initialLeft + s.x + itemW / 2;
      let cy = s.initialTop + s.y + itemH / 2;
      const cornerR = 400;
      const r = Math.max(itemW, itemH) / 2;
      const maxDist = cornerR - r;

      // Top-Left Arch
      if (cx < cornerR && cy < cornerR) {
        const dx = cx - cornerR;
        const dy = cy - cornerR;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxDist) {
          const nx = dx / dist;
          const ny = dy / dist;
          cx = cornerR + nx * maxDist;
          cy = cornerR + ny * maxDist;
          s.x = cx - itemW / 2 - s.initialLeft;
          s.y = cy - itemH / 2 - s.initialTop;
          const dot = s.velX * nx + s.velY * ny;
          s.velX = (s.velX - 2 * dot * nx) * 0.7;
          s.velY = (s.velY - 2 * dot * ny) * 0.7;
        }
      }

      // Top-Right Arch
      if (cx > containerW - cornerR && cy < cornerR) {
        const dx = cx - (containerW - cornerR);
        const dy = cy - cornerR;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxDist) {
          const nx = dx / dist;
          const ny = dy / dist;
          cx = (containerW - cornerR) + nx * maxDist;
          cy = cornerR + ny * maxDist;
          s.x = cx - itemW / 2 - s.initialLeft;
          s.y = cy - itemH / 2 - s.initialTop;
          const dot = s.velX * nx + s.velY * ny;
          s.velX = (s.velX - 2 * dot * nx) * 0.7;
          s.velY = (s.velY - 2 * dot * ny) * 0.7;
        }
      }
    });

    // Handle Collisions between stickers
    const items = Array.from(draggables);
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const s1 = state.get(items[i]);
        const s2 = state.get(items[j]);
        
        const r1 = Math.max(items[i].offsetWidth, items[i].offsetHeight) / 2;
        const r2 = Math.max(items[j].offsetWidth, items[j].offsetHeight) / 2;
        
        const cx1 = s1.initialLeft + s1.x + items[i].offsetWidth / 2;
        const cy1 = s1.initialTop + s1.y + items[i].offsetHeight / 2;
        const cx2 = s2.initialLeft + s2.x + items[j].offsetWidth / 2;
        const cy2 = s2.initialTop + s2.y + items[j].offsetHeight / 2;
        
        const dx = cx2 - cx1;
        const dy = cy2 - cy1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = r1 + r2;
        
        if (dist < minDist && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = minDist - dist;
          
          // Resolve overlap
          if (!s1.isDragging && !s2.isDragging) {
            s1.x -= nx * overlap * 0.5;
            s1.y -= ny * overlap * 0.5;
            s2.x += nx * overlap * 0.5;
            s2.y += ny * overlap * 0.5;
          } else if (s1.isDragging) {
            s2.x += nx * overlap;
            s2.y += ny * overlap;
          } else if (s2.isDragging) {
            s1.x -= nx * overlap;
            s1.y -= ny * overlap;
          }
          
          // Bounce velocities
          const rVelX = s2.velX - s1.velX;
          const rVelY = s2.velY - s1.velY;
          const dot = rVelX * nx + rVelY * ny;
          
          if (dot < 0) {
            const restitution = 0.5;
            const impulse = -(1 + restitution) * dot / 2; // Assuming equal mass
            
            if (!s1.isDragging) {
              s1.velX -= impulse * nx;
              s1.velY -= impulse * ny;
            }
            if (!s2.isDragging) {
              s2.velX += impulse * nx;
              s2.velY += impulse * ny;
            }
          }
        }
      }
    }
    
    // Apply transforms
    draggables.forEach(item => {
      const s = state.get(item);
      // Smoothly interpolate rotation and scale
      s.currentRot += (s.targetRot - s.currentRot) * 0.15;
      s.scale += (s.targetScale - s.scale) * 0.2;
      
      item.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.currentRot}deg) scale(${s.scale})`;
    });
    
    requestAnimationFrame(updatePhysics);
  }
  
  updatePhysics();
});

/* ── Anti-Copy Protection ── */
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X' || e.key === 'u' || e.key === 'U')) {
    e.preventDefault();
  }
});
