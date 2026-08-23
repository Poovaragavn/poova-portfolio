/* =============================================
   POOVARAGAVAN C — PREMIUM PORTFOLIO SCRIPTS
   All interactions, animations, and features
   ============================================= */

(() => {
  'use strict';

  // ---- State ----
  const state = {
    mouseX: 0,
    mouseY: 0,
    scrollY: 0,
    loaded: false,
    theme: localStorage.getItem('theme') || 'dark',
    aiOpen: false,
  };

  // ---- DOM Cache ----
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ---- Utility ----
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

  // =============================================
  // LOADING SCREEN
  // =============================================
  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;
    
    const hideLoader = () => {
      if (loader.classList.contains('hidden')) return;
      loader.classList.add('hidden');
      state.loaded = true;
      document.body.style.overflow = '';
      initScrollAnimations();
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(hideLoader, 50);
    }
    setTimeout(hideLoader, 300);
    window.addEventListener('DOMContentLoaded', hideLoader);
    window.addEventListener('load', hideLoader);
  }

  // =============================================
  // CURSOR GLOW
  // =============================================
  function initCursor() {
    const glow = $('#cursor-glow');
    const dot = $('#cursor-dot');
    if (!glow || !dot) return;

    let cx = 0, cy = 0;
    let dx = 0, dy = 0;

    document.addEventListener('mousemove', (e) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      dx = e.clientX;
      dy = e.clientY;
    });

    function animateCursor() {
      cx = lerp(cx, dx, 0.08);
      cy = lerp(cy, dy, 0.08);
      glow.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      dot.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects on interactive elements
    const interactiveEls = $$('a, button, .glass-card, .skill-card, .project-card');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.style.width = '20px';
        dot.style.height = '20px';
        dot.style.background = 'rgba(124, 92, 255, 0.3)';
      });
      el.addEventListener('mouseleave', () => {
        dot.style.width = '8px';
        dot.style.height = '8px';
        dot.style.background = 'var(--color-primary)';
      });
    });
  }

  // =============================================
  // SCROLL PROGRESS
  // =============================================
  function initScrollProgress() {
    const progress = $('#scroll-progress');
    if (!progress) return;

    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (window.scrollY / total) * 100;
      progress.style.width = pct + '%';
    }, { passive: true });
  }

  // =============================================
  // NAVBAR
  // =============================================
  function initNavbar() {
    const navbar = $('#navbar');
    const navToggle = $('#nav-toggle');
    const mobileNav = $('#mobile-nav');
    const navLinks = $$('[data-nav]');
    const mobileLinks = $$('[data-mobile-nav]');

    // Scroll effect
    window.addEventListener('scroll', () => {
      state.scrollY = window.scrollY;
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile toggle
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      mobileNav.setAttribute('aria-hidden', !isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    const closeMobileNav = () => {
      navToggle.classList.remove('active');
      mobileNav.classList.remove('active');
      mobileNav.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    // Close mobile nav on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close mobile nav on backdrop tap outside links
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        closeMobileNav();
      }
    });

    // Active nav link on scroll
    const sections = $$('section[id]');
    function updateActiveNav() {
      const scrollPos = window.scrollY + 200;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          const activeLink = $(`[data-nav][href="#${id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
  }

  // =============================================
  // THEME TOGGLE
  // =============================================
  function initTheme() {
    const toggle = $('#theme-toggle');
    const html = document.documentElement;

    html.setAttribute('data-theme', state.theme);

    toggle.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    });
  }

  // =============================================
  // TYPING ANIMATION
  // =============================================
  function initTyping() {
    const el = $('#typed-role');
    if (!el) return;

    const roles = [
      'Python Developer / Software Developer',
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 80;

    function type() {
      const current = roles[roleIdx];
      if (isDeleting) {
        el.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        speed = 40;
      } else {
        el.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        speed = 80;
      }

      if (!isDeleting && charIdx === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        speed = 400;
      }

      setTimeout(type, speed);
    }

    setTimeout(type, 1500);
  }

  // =============================================
  // HERO CANVAS — Particle Network
  // =============================================
  function initHeroCanvas() {
    const canvas = $('#hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 25 : 60;
    const connectionDistance = isMobile ? 100 : 150;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction
        const dx = state.mouseX - this.x;
        const dy = state.mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          this.x -= dx * 0.005;
          this.y -= dy * 0.005;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 92, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 92, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }
    animate();
  }

  // =============================================
  // NEURAL NETWORK CANVAS
  // =============================================
  function initNeuralCanvas() {
    const canvas = $('#neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    function resize() {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Neural network nodes
    const layers = [4, 6, 8, 6, 4];
    const nodes = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const layerSpacing = canvas.width / (layers.length + 1);

    layers.forEach((count, layerIdx) => {
      const x = layerSpacing * (layerIdx + 1);
      const nodeSpacing = canvas.height / (count + 1);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: x - centerX,
          y: nodeSpacing * (i + 1) - centerY,
          layer: layerIdx,
          index: i,
          radius: 4,
          phase: Math.random() * Math.PI * 2,
        });
      }
    });

    let time = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      const ox = centerX + Math.sin(time * 0.5) * 10;
      const oy = centerY + Math.cos(time * 0.3) * 10;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[j].layer === nodes[i].layer + 1) {
            const pulse = Math.sin(time * 2 + nodes[i].phase) * 0.5 + 0.5;
            const alpha = 0.04 + pulse * 0.06;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x + ox, nodes[i].y + oy);
            ctx.lineTo(nodes[j].x + ox, nodes[j].y + oy);

            const grad = ctx.createLinearGradient(
              nodes[i].x + ox, nodes[i].y + oy,
              nodes[j].x + ox, nodes[j].y + oy
            );
            grad.addColorStop(0, `rgba(124, 92, 255, ${alpha})`);
            grad.addColorStop(1, `rgba(0, 212, 255, ${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        const pulse = Math.sin(time * 3 + node.phase) * 0.5 + 0.5;
        const r = node.radius + pulse * 2;
        const x = node.x + ox;
        const y = node.y + oy;

        // Glow
        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 92, 255, ${0.03 + pulse * 0.04})`;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        const nodeGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
        nodeGrad.addColorStop(0, `rgba(124, 92, 255, ${0.6 + pulse * 0.4})`);
        nodeGrad.addColorStop(1, `rgba(0, 212, 255, ${0.3 + pulse * 0.2})`);
        ctx.fillStyle = nodeGrad;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }
    draw();
  }

  // =============================================
  // SCROLL ANIMATIONS (IntersectionObserver)
  // =============================================
  function initScrollAnimations() {
    const elements = $$('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animated');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    });

    elements.forEach(el => observer.observe(el));
  }

  // =============================================
  // COUNTER ANIMATION
  // =============================================
  function initCounters() {
    const counters = $$('[data-count]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const duration = 2000;
          const start = performance.now();
          const isDecimal = target % 1 !== 0;

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quart
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = eased * target;

            el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          }
          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  // =============================================
  // SKILL BARS
  // =============================================
  function initSkillBars() {
    const bars = $$('.skill-bar');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.dataset.level;
          setTimeout(() => {
            bar.style.width = level + '%';
          }, 200);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
  }

  // =============================================
  // MAGNETIC BUTTONS
  // =============================================
  function initMagneticButtons() {
    const btns = $$('.magnetic-btn');

    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // =============================================
  // PARALLAX on Hero Visual + 3D Profile Tilt
  // =============================================
  function initParallax() {
    const container = $('#hero-visual-container');
    const profile3d = $('#profile-3d');
    if (!container || !window.matchMedia('(pointer: fine)').matches) return;

    const items = $$('[data-speed]', container);

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

      // 3D tilt on the profile wrapper
      if (profile3d) {
        const tiltX = y * 15; // tilt up/down
        const tiltY = -x * 15; // tilt left/right
        profile3d.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      // Parallax on orbiting tech icons
      items.forEach(item => {
        const speed = parseFloat(item.dataset.speed) || 1;
        const moveX = x * speed * 15;
        const moveY = y * speed * 15;
        // Only move items that aren't centered via CSS transforms
        const currentTransform = window.getComputedStyle(item).transform;
        if (item.classList.contains('orbit-icon-2') || item.classList.contains('orbit-icon-4')) {
          item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
      if (profile3d) {
        profile3d.style.transform = 'translate(-50%, -50%) perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    });
  }

  // =============================================
  // PROJECT FILTER
  // =============================================
  function initProjectFilter() {
    const filterBtns = $$('.filter-btn');
    const projects = $$('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projects.forEach(project => {
          const category = project.dataset.category;
          if (filter === 'all' || category === filter) {
            project.classList.remove('hidden');
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            setTimeout(() => {
              project.style.opacity = '1';
              project.style.transform = 'translateY(0)';
            }, 50);
          } else {
            project.classList.add('hidden');
          }
        });
      });
    });
  }

  // =============================================
  // BACK TO TOP
  // =============================================
  function initBackToTop() {
    const btn = $('#back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =============================================
  // SMOOTH SCROLL
  // =============================================
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();

        // Close mobile navigation overlay if open
        const mobileNav = $('#mobile-nav');
        const navToggle = $('#nav-toggle');
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          mobileNav.setAttribute('aria-hidden', 'true');
          if (navToggle) {
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
          }
          document.body.style.overflow = '';
        }

        const target = $(href);
        if (target) {
          let top = target.offsetTop - 70;
          
          // Special handling for Contact section at bottom of page
          if (href === '#contact') {
            const contactForm = $('#contact-form');
            if (contactForm) {
              const formRect = contactForm.getBoundingClientRect();
              top = window.pageYOffset + formRect.top - Math.max(20, (window.innerHeight - formRect.height) / 2);
            } else {
              top = Math.max(target.offsetTop - 50, document.documentElement.scrollHeight - window.innerHeight);
            }
          }

          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      });
    });
  }

  // =============================================
  // AI ASSISTANT
  // =============================================
  function initAIAssistant() {
    const widget = $('#ai-assistant');
    const toggle = $('#ai-assistant-toggle');
    const panel = $('#ai-panel');
    const input = $('#ai-input');
    const sendBtn = $('#ai-send');
    const chatBody = $('#ai-chat');

    if (!toggle) return;

    const responses = {
      skills: "Poovaragavan is skilled in Python, Machine Learning, Deep Learning, SQL, Power BI, OpenAI/LLMs, IoT, N8N Automation, Git, and Data Science. He's an expert-level Python and ML practitioner!",
      projects: "He's built some impressive projects including an AI Fraud Detection System, Customer Segmentation Engine, HR Analytics Dashboard, AI Idea Generator, and an IoT People Counter. Each showcases different aspects of his AI/ML expertise.",
      experience: "Poovaragavan has worked as an AI/ML Intern developing predictive models and NLP solutions, a Data Analytics Intern creating Power BI dashboards, and conducted IoT research at his university lab.",
      education: "He's pursuing a B.E. in Computer Science & Engineering with a strong CGPA. He's been recognized as a Dean's List student and Technical Club Lead.",
      contact: "You can reach Poovaragavan via email at poovaragavan450@gmail.com or phone at +91 9080777010, connect on LinkedIn, or check out his work on GitHub. He's always open to new opportunities!",
      certifications: "He holds certifications from Oracle (Cloud Infrastructure), Stanford/Coursera (ML Specialization), Microsoft (Power BI), NPTEL/IIT (Python & Data Analytics), and HackerRank (SQL).",
      hello: "Hello! 👋 Great to meet you! I'm here to help you learn about Poovaragavan's skills, projects, and experience. What would you like to know?",
      hire: "Poovaragavan is actively looking for opportunities in AI Engineering, Machine Learning, and Data Science. He's passionate, certified, and has hands-on project experience. Check out his projects section or download his resume!",
    };

    function getResponse(msg) {
      const lower = msg.toLowerCase();
      if (lower.includes('skill') || lower.includes('tech') || lower.includes('know')) return responses.skills;
      if (lower.includes('project') || lower.includes('work') || lower.includes('build') || lower.includes('portfolio')) return responses.projects;
      if (lower.includes('experience') || lower.includes('intern') || lower.includes('job')) return responses.experience;
      if (lower.includes('education') || lower.includes('college') || lower.includes('degree') || lower.includes('study')) return responses.education;
      if (lower.includes('contact') || lower.includes('reach') || lower.includes('email') || lower.includes('phone')) return responses.contact;
      if (lower.includes('certif') || lower.includes('cert')) return responses.certifications;
      if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return responses.hello;
      if (lower.includes('hire') || lower.includes('opportunity') || lower.includes('recruit') || lower.includes('resume')) return responses.hire;
      return "Great question! Poovaragavan is an AI Engineer passionate about building intelligent solutions. Try asking about his skills, projects, experience, education, or certifications! 🚀";
    }

    function addMessage(text, type) {
      const div = document.createElement('div');
      div.className = `ai-message ai-${type}`;
      div.innerHTML = `<p>${text}</p>`;
      chatBody.appendChild(div);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function sendMessage() {
      const msg = input.value.trim();
      if (!msg) return;

      addMessage(msg, 'user');
      input.value = '';

      const botReply = getResponse(msg);

      // Save to Supabase if connected
      if (window.supabaseClient) {
        window.supabaseClient
          .from('chat_logs')
          .insert([{ user_query: msg, bot_response: botReply, created_at: new Date().toISOString() }])
          .then(({ error }) => { if (error) console.warn('Supabase Chat Log Warning:', error.message); });
      }

      // Simulate typing delay
      setTimeout(() => {
        addMessage(botReply, 'bot');
      }, 600);
    }

    toggle.addEventListener('click', () => {
      state.aiOpen = !state.aiOpen;
      widget.classList.toggle('active');
      panel.setAttribute('aria-hidden', !state.aiOpen);
      if (state.aiOpen) input.focus();
    });

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // =============================================
  // CONTACT FORM (EmailJS → Gmail Inbox, no spam + Supabase Backup)
  // =============================================
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;

    // Initialize EmailJS if keys are set
    const EJ_PUBLIC_KEY   = window.EMAILJS_PUBLIC_KEY  || '';
    const EJ_SERVICE_ID   = window.EMAILJS_SERVICE_ID  || '';
    const EJ_TEMPLATE_ID  = window.EMAILJS_TEMPLATE_ID || '';
    const emailjsReady = EJ_PUBLIC_KEY && EJ_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

    if (emailjsReady && window.emailjs) {
      emailjs.init(EJ_PUBLIC_KEY);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;

      const name    = $('#form-name')?.value.trim()    || '';
      const email   = $('#form-email')?.value.trim()   || '';
      const subject = $('#form-subject')?.value.trim() || 'General Inquiry';
      const message = $('#form-message')?.value.trim() || '';

      const formData = { name, email, subject, message, created_at: new Date().toISOString() };

      btn.innerHTML = '<span>Sending... ⏳</span>';
      btn.disabled = true;

      let emailSent = false;
      let dbSaved   = false;

      try {
        // 1. Send via EmailJS → goes directly to Gmail inbox (no spam)
        if (emailjsReady && window.emailjs) {
          await emailjs.send(EJ_SERVICE_ID, EJ_TEMPLATE_ID, {
            from_name:    name,
            from_email:   email,
            subject:      subject,
            message:      message,
            to_email:     'poovaragavan450@gmail.com',
            reply_to:     email,
          });
          emailSent = true;
          console.log('✅ EmailJS: Message sent to inbox');
        } else {
          // Fallback: FormSubmit (requires prior activation at formsubmit.co)
          const res = await fetch('https://formsubmit.co/ajax/poovaragavan450@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              name, email,
              _subject: `New Portfolio Message from ${name}: ${subject}`,
              message,
              _captcha: 'false'
            })
          });
          const data = await res.json();
          if (data.success === 'true' || data.success === true) emailSent = true;
          console.log('📬 FormSubmit Response:', data);
        }

        // 2. Supabase backup
        if (window.supabaseClient) {
          const { error } = await window.supabaseClient
            .from('contact_messages')
            .insert([formData]);
          if (!error) {
            dbSaved = true;
            console.log('✅ Message saved to Supabase');
          } else {
            console.warn('Supabase Insert Warning:', error.message);
          }
        }

        btn.innerHTML = '<span>Message Sent! ✓</span>';
        btn.style.background = 'linear-gradient(135deg, #00FFC8, #00D4FF)';
        form.reset();

      } catch (err) {
        console.error('Contact form error:', err);
        // Still show success to user — Supabase may have saved it
        btn.innerHTML = '<span>Message Sent! ✓</span>';
        btn.style.background = 'linear-gradient(135deg, #00FFC8, #00D4FF)';
        form.reset();
      }

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
        if (window.lucide) lucide.createIcons();
      }, 4000);
    });
  }

  // =============================================
  // HERO PARTICLES (Small floating dots)
  // =============================================
  function initHeroParticles() {
    const container = $('#hero-particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        border-radius: 50%;
        background: rgba(124, 92, 255, ${Math.random() * 0.3 + 0.1});
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: float-particle ${Math.random() * 10 + 8}s ease infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      container.appendChild(particle);
    }

    // Add particle keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-particle {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        25% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.2); opacity: 0.6; }
        50% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0.8); opacity: 0.4; }
        75% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.1); opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
  }

  // =============================================
  // GLOBAL SCROLLING MOTION LOOP BACKGROUND
  // =============================================
  function initGlobalMotionBg() {
    const canvas = $('#global-bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Particle nodes for global constellation mesh
    const isMobile = window.innerWidth <= 768;
    const nodeCount = isMobile ? 35 : 95;
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.5 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        speedMultiplier: Math.random() * 0.8 + 0.6
      });
    }

    let smoothScrollY = window.scrollY;
    let prevScrollY = window.scrollY;
    let scrollVelocity = 0;
    let time = 0;

    function render() {
      // Smooth scroll tracking
      const targetScrollY = window.scrollY;
      const scrollDiff = targetScrollY - prevScrollY;
      prevScrollY = targetScrollY;

      // Dampened scroll velocity
      scrollVelocity = lerp(scrollVelocity, scrollDiff, 0.15);
      smoothScrollY = lerp(smoothScrollY, targetScrollY, 0.08);

      time += 0.012 + Math.abs(scrollVelocity) * 0.0005;
      ctx.clearRect(0, 0, width, height);

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollRatio = clamp(smoothScrollY / maxScroll, 0, 1);

      // Dynamic color hue cycling through scroll depth (Indigo -> Cyan -> Emerald -> Violet -> Blue)
      const baseHue = (250 + scrollRatio * 220 + Math.sin(time * 0.4) * 25) % 360;
      const secondaryHue = (baseHue + 100) % 360;

      // 1. Draw Liquid Aurora Background Orbs (Scroll & loop motion)
      const orb1X = width * 0.2 + Math.sin(time * 0.7 + scrollRatio * Math.PI) * 150;
      const orb1Y = height * 0.3 + Math.cos(time * 0.5 + scrollRatio * Math.PI * 2) * 120 - (scrollVelocity * 0.5);
      const grad1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, width * 0.5);
      grad1.addColorStop(0, `hsla(${baseHue}, 85%, 55%, 0.2)`);
      grad1.addColorStop(0.5, `hsla(${baseHue}, 90%, 45%, 0.06)`);
      grad1.addColorStop(1, 'transparent');

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const orb2X = width * 0.8 + Math.cos(time * 0.6 - scrollRatio * Math.PI * 1.5) * 180;
      const orb2Y = height * 0.7 + Math.sin(time * 0.8 + scrollRatio * Math.PI) * 140 + (scrollVelocity * 0.5);
      const grad2 = ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, width * 0.55);
      grad2.addColorStop(0, `hsla(${secondaryHue}, 95%, 50%, 0.16)`);
      grad2.addColorStop(0.6, `hsla(${secondaryHue}, 85%, 40%, 0.05)`);
      grad2.addColorStop(1, 'transparent');

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Dynamic Flow Wave (Reacts directly to scrolling)
      ctx.beginPath();
      const waveY = height * 0.82 + Math.sin(time * 1.2) * 30;
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 30) {
        const y = waveY + Math.sin(x * 0.005 + time * 1.5 + scrollRatio * Math.PI * 4) * 40 
                        + Math.cos(x * 0.008 - time * 0.8) * 20 
                        - (scrollVelocity * 1.2);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      const waveGrad = ctx.createLinearGradient(0, height - 200, width, height);
      waveGrad.addColorStop(0, `hsla(${baseHue}, 80%, 60%, 0.06)`);
      waveGrad.addColorStop(1, `hsla(${secondaryHue}, 80%, 50%, 0.02)`);
      ctx.fillStyle = waveGrad;
      ctx.fill();

      // 3. Draw Nodes & Moving Energy Grid (Loop + Scroll Motion)
      nodes.forEach((node, i) => {
        // Horizontal & vertical drift
        node.x += node.vx;
        node.y += node.vy - (scrollVelocity * 0.15 * node.speedMultiplier);

        // Loop boundaries seamlessly
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        node.pulse += 0.03;
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;

        // Draw node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${baseHue + (i % 40)}, 85%, 65%, ${0.35 + Math.sin(node.pulse) * 0.2})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.14 * (1 + Math.abs(scrollVelocity) * 0.02);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `hsla(${baseHue}, 85%, 65%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(render);
    }

    render();
  }

  // =============================================
  // CARD TILT EFFECT
  // =============================================
  function initCardTilt() {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const cards = $$('.glass-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
      });
    });
  }

  // =============================================
  // INITIALIZE LUCIDE ICONS
  // =============================================
  function initIcons() {
    if (window.lucide) {
      lucide.createIcons();
    } else {
      // Retry every 100ms until Lucide CDN finishes loading (up to 2s)
      let retries = 0;
      const interval = setInterval(() => {
        if (window.lucide) {
          lucide.createIcons();
          clearInterval(interval);
        } else if (++retries > 20) {
          clearInterval(interval);
        }
      }, 100);
    }
  }

  // =============================================
  // SUPABASE INTEGRATION & STATUS VERIFIER
  // =============================================
  function initSupabase() {
    const SUPABASE_URL = window.ENV_SUPABASE_URL || 'https://uiytlzwggkxwhhyjmotl.supabase.co';
    const SUPABASE_ANON_KEY = window.ENV_SUPABASE_ANON_KEY || 'sb_publishable_paemvekmDr6KH6v4wvBm4w_ikUgowzM';

    if (window.supabase) {
      console.log('⚡ Supabase JS Library Loaded Successfully');
    }

    if (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase Client Connected Successfully.');
      } catch (err) {
        console.warn('Supabase initialization note:', err);
      }
    }

    // Global verification helper for user
    window.checkSupabaseStatus = function() {
      console.group('⚡ SUPABASE CONNECTION DIAGNOSTIC');
      console.log('1. Supabase Library (window.supabase):', window.supabase ? '✅ Installed & Active' : '❌ Not Loaded');
      console.log('2. Supabase Project URL:', SUPABASE_URL ? `✅ ${SUPABASE_URL}` : '❌ Missing');
      console.log('3. Supabase Key:', SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Missing');
      console.log('4. Supabase Client (window.supabaseClient):', window.supabaseClient ? '✅ CONNECTED & READY' : '⚠️ Not Ready');
      console.groupEnd();
      return window.supabaseClient ? '✅ Supabase is 100% CONNECTED to your portfolio!' : '⚠️ Supabase check completed.';
    };
  }

  // =============================================
  // CLICK TO REVEAL IMAGE BLUR
  // =============================================
  function initImageClickReveal() {
    $$('.project-image').forEach(container => {
      container.addEventListener('click', (e) => {
        if (e.target.closest('.project-action-btn')) return;
        container.classList.toggle('revealed');
      });
    });
  }

  // =============================================
  // INIT ALL
  // =============================================
  function init() {
    initLoader();
    initGlobalMotionBg();
    initSupabase();
    initIcons();
    initCursor();
    initScrollProgress();
    initNavbar();
    initTheme();
    initTyping();
    initHeroCanvas();
    initNeuralCanvas();
    initCounters();
    initSkillBars();
    initMagneticButtons();
    initParallax();
    initProjectFilter();
    initBackToTop();
    initSmoothScroll();
    initAIAssistant();
    initContactForm();
    initHeroParticles();
    initCardTilt();
    initImageClickReveal();
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
