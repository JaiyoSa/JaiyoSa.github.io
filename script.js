/* ═══════════════════════════════════════════════════════
   SAGAR GHARTI — PORTFOLIO SCRIPT
   ═══════════════════════════════════════════════════════ */

const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

let siteData = null;
let postsCache = [];

const commands = [
  { label: 'Home',            hint: 'Go to top',               url: 'index.html#top' },
  { label: 'About',           hint: 'Background and skills',   url: 'index.html#about' },
  { label: 'Projects',        hint: 'Interactive gallery',     url: 'index.html#projects' },
  { label: 'Research',        hint: 'Research areas',          url: 'index.html#research' },
  { label: 'Publications',    hint: 'Thesis and papers',       url: 'index.html#publications' },
  { label: 'Blog',            hint: 'Research notes',          url: 'blog.html' },
  { label: 'Contact',         hint: 'Get in touch',            url: 'index.html#contact' },
  { label: 'Download CV',     hint: 'Open PDF',                url: 'assets/cv/Sagar-Gharti-CV.pdf' },
];

window.addEventListener('DOMContentLoaded', init);

async function init() {
  setupTheme();
  setupMenu();
  setupProgressBar();
  setupReveal();
  setupCommandPalette();
  setupFlowCanvas();
  setupTilt();
  setupEditor();
  setupScrollSpy();
  $('#year') && ($('#year').textContent = new Date().getFullYear());

  try {
    siteData = await loadJSON('data/site.json');
    await routePage();
  } catch (err) {
    console.error(err);
    showLoadError(err);
  }
}

async function routePage() {
  const page = document.body.dataset.page || 'home';
  if (page === 'home') {
    renderHome(siteData);
    postsCache = await loadPosts();
    renderBlogPreview(postsCache.slice(0, 3));
  }
  if (page === 'blog') {
    postsCache = await loadPosts();
    renderBlogPage(postsCache);
  }
  if (page === 'post') {
    postsCache = await loadPosts();
    renderPostPage(postsCache);
  }
}

/* ── Data loading ─────────────────────────────────────── */
async function loadJSON(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Could not load ${url}. Make sure you are using the local server, not opening index.html directly.`);
  return res.json();
}
async function loadText(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Could not load ${url}`);
  return res.text();
}

function showLoadError(err) {
  const t = $('#personSummary') || $('#blogList') || $('#postContent');
  if (!t) return;
  t.innerHTML = `<strong>Data did not load.</strong><br>${escapeHTML(err.message)}<br><br>Open using the local server: <code>start-local-windows.bat</code> or <code>start-local-mac-linux.sh</code>`;
}

/* ── Home rendering ───────────────────────────────────── */
function renderHome(data) {
  const { person } = data;
  $('#personName') && ($('#personName').textContent = person.name);
  $('#personSummary') && ($('#personSummary').textContent = person.summary);
  $('#aboutSummary') && ($('#aboutSummary').textContent = person.summary);
  $('#headshot') && ($('#headshot').src = person.headshot);
  $('#cvLink') && ($('#cvLink').href = person.cv);
  $('#emailLink') && ($('#emailLink').href = `mailto:${person.email}`);
  $('#emailLink2') && ($('#emailLink2').href = `mailto:${person.email}`);
  $('#linkedinLink') && ($('#linkedinLink').href = person.linkedin);
  $('#linkedinLink2') && ($('#linkedinLink2').href = person.linkedin);

  renderTyping([
    person.tagline,
    'CFD for flow, heat, and biological transport.',
    'Simulation workflows connecting physics and computation.',
    'Bio-fluid mechanics. Multiphase flow. FSI.',
  ]);

  renderHighlights(data.highlights);
  renderSkills(data.skills);
  renderCoursework(data.coursework);
  renderProjects(data.projects);
  renderExperience(data.experience);
  renderEducation(data.education);
  renderPublications(data.publications);
  setupCopyEmail(person.email);
  setupResearchMap();
}

/* ── Typing animation ─────────────────────────────────── */
function renderTyping(lines) {
  const target = $('#typingText');
  if (!target) return;
  let li = 0, ci = 0, del = false;

  function tick() {
    const line = lines[li];
    target.textContent = line.slice(0, ci);
    if (!del && ci < line.length) { ci++; }
    else if (!del && ci === line.length) { del = true; }
    else if (del && ci > 0) { ci--; }
    else { del = false; li = (li + 1) % lines.length; }
    const speed = del ? 22 : 50;
    const pause = (!del && ci === line.length) ? 2000 : speed;
    setTimeout(tick, pause);
  }
  tick();
}

/* ── Highlights ───────────────────────────────────────── */
function renderHighlights(items = []) {
  const el = $('#highlights');
  if (!el) return;
  el.innerHTML = items.map(item => `
    <div class="stat-card">
      <strong>${escapeHTML(item.value)}</strong>
      <span>${escapeHTML(item.label)}</span>
    </div>
  `).join('');
}

/* ── Skills ───────────────────────────────────────────── */
function renderSkills(groups = []) {
  const el = $('#skills');
  if (!el) return;
  el.innerHTML = groups.map(g => `
    <div class="skill-group">
      <strong>${escapeHTML(g.group)}</strong>
      <div class="tag-row">${g.items.map(i => `<span class="tag">${escapeHTML(i)}</span>`).join('')}</div>
    </div>
  `).join('');
}

/* ── Coursework ───────────────────────────────────────── */
function renderCoursework(items = []) {
  const el = $('#coursework');
  if (!el) return;
  el.innerHTML = items.map(i => `<span class="tag">${escapeHTML(i)}</span>`).join('');
}

/* ── Projects ─────────────────────────────────────────── */
function renderProjects(projects = []) {
  const grid = $('#projectGrid');
  const filters = $('#projectFilters');
  const search = $('#projectSearch');
  if (!grid || !filters) return;

  const allTags = ['All', ...new Set(projects.flatMap(p => p.category))];
  let activeTag = 'All';
  let query = '';

  filters.innerHTML = allTags.map(tag =>
    `<button class="chip ${tag === 'All' ? 'active' : ''}" data-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</button>`
  ).join('');

  function update() {
    const q = query.trim().toLowerCase();
    const filtered = projects.filter(p => {
      const tagMatch = activeTag === 'All' || p.category.includes(activeTag);
      const text = `${p.title} ${p.subtitle} ${p.summary} ${p.tools.join(' ')} ${p.category.join(' ')}`.toLowerCase();
      return tagMatch && text.includes(q);
    });

    grid.innerHTML = filtered.length ? filtered.map(p => `
      <article class="project-card reveal visible" data-project="${p.id}" tabindex="0" role="button" aria-label="Open ${escapeHTML(p.title)}">
        <div class="project-card-img">
          <img src="${p.image}" alt="${escapeHTML(p.title)}" loading="lazy">
          <div class="project-card-overlay"><span>View details →</span></div>
        </div>
        <div class="project-body">
          <div class="tag-row">${p.category.slice(0, 3).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>
          <h3>${escapeHTML(p.title)}</h3>
          <p>${escapeHTML(p.subtitle)}</p>
          <div class="project-meta">
            <span>${escapeHTML(p.status)}</span>
            <span class="project-meta-arrow">→</span>
          </div>
        </div>
      </article>
    `).join('') : '<p style="color:var(--text-dim);padding:2rem 0;">No projects match your search.</p>';

    $$('.project-card', grid).forEach(card => {
      const open = () => openProject(projects.find(p => p.id === card.dataset.project));
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    });
  }

  filters.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    activeTag = btn.dataset.tag;
    $$('.chip', filters).forEach(c => c.classList.toggle('active', c.dataset.tag === activeTag));
    update();
  });

  search?.addEventListener('input', e => { query = e.target.value; update(); });
  update();
}

function renderMediaGallery(project) {
  let mediaHTML = '';
  
  // If project has media array, render gallery
  if (project.media && project.media.length > 0) {
    mediaHTML = '<div class="media-gallery">';
    project.media.forEach(item => {
      if (item.type === 'image') {
        mediaHTML += `
          <div class="media-item">
            <img src="${item.url}" alt="${escapeHTML(item.label)}" />
            <p class="media-label">${escapeHTML(item.label)}</p>
          </div>
        `;
      } else if (item.type === 'video') {
        mediaHTML += `
          <div class="media-item">
            <video controls style="width:100%;border-radius:6px;">
              <source src="${item.url}" type="video/mp4">
              Your browser does not support video.
            </video>
            <p class="media-label">${escapeHTML(item.label)}</p>
          </div>
        `;
      } else if (item.type === 'pdf') {
        mediaHTML += `
          <div class="media-item media-pdf">
            <a href="${item.url}" target="_blank" rel="noreferrer" class="pdf-link">
              <div class="pdf-icon">📄</div>
              <p>${escapeHTML(item.label)}</p>
              <small>Click to open PDF</small>
            </a>
          </div>
        `;
      }
    });
    mediaHTML += '</div>';
  } else if (project.image) {
    // Fallback to single image if no media array
    mediaHTML = `<img src="${project.image}" alt="${escapeHTML(project.title)}">`;
  }
  
  return mediaHTML;
}

function openProject(project) {
  const dialog = $('#projectModal');
  const content = $('#modalContent');
  if (!project || !dialog || !content) return;
  content.innerHTML = `
    <div class="modal-layout">
      ${renderMediaGallery(project)}
      <div class="modal-text">
        <p class="modal-eyebrow">${escapeHTML(project.status)}</p>
        <h2>${escapeHTML(project.title)}</h2>
        <p>${escapeHTML(project.summary)}</p>
        <div class="tag-row">${project.tools.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}</div>
        <h3>Project notes</h3>
        <ul>${project.details.map(d => `<li>${escapeHTML(d)}</li>`).join('')}</ul>
        <h3>Links</h3>
        <div class="modal-links">${project.links.map(l =>
          `<a class="btn btn-outline" href="${l.url}" ${l.url === '#' ? '' : 'target="_blank" rel="noreferrer"'}>${escapeHTML(l.label)}</a>`
        ).join('')}</div>
      </div>
    </div>
  `;
  dialog.showModal ? dialog.showModal() : dialog.setAttribute('open', '');
}

$('#modalClose')?.addEventListener('click', () => $('#projectModal')?.close());
$('#projectModal')?.addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.close(); });

/* ── Experience ───────────────────────────────────────── */
function renderExperience(items = []) {
  const el = $('#experienceTimeline');
  if (!el) return;
  el.innerHTML = items.map(item => `
    <div class="timeline-item reveal visible">
      <span class="timeline-dot"></span>
      <article class="timeline-card">
        <div class="timeline-card-top">
          <h3>${escapeHTML(item.role)}</h3>
          <span class="timeline-period">${escapeHTML(item.period)}</span>
        </div>
        <p class="timeline-org">${escapeHTML(item.organization)} · ${escapeHTML(item.location)}</p>
        <ul>${item.points.map(p => `<li>${escapeHTML(p)}</li>`).join('')}</ul>
      </article>
    </div>
  `).join('');
}

/* ── Education ────────────────────────────────────────── */
function renderEducation(items = []) {
  const el = $('#educationGrid');
  if (!el) return;
  el.innerHTML = items.map(item => `
    <article class="edu-card reveal visible">
      <p class="edu-period">${escapeHTML(item.period)}</p>
      <h3 class="edu-degree">${escapeHTML(item.degree)}</h3>
      <p class="edu-school">${escapeHTML(item.school)}</p>
      <p class="edu-note">${escapeHTML(item.note)}</p>
    </article>
  `).join('');
}

/* ── Publications ─────────────────────────────────────── */
function renderPublications(items = []) {
  const el = $('#publicationList');
  if (!el) return;
  el.innerHTML = items.map(item => `
    <article class="publication-card reveal visible">
      <div>
        <div class="pub-type">${escapeHTML(item.type)}</div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.venue)} · ${escapeHTML(item.year)} · ${escapeHTML(item.status)}</p>
      </div>
      <a class="btn btn-outline" href="${item.url}" ${item.url === '#' ? '' : 'target="_blank" rel="noreferrer"'}>Open link</a>
    </article>
  `).join('');
}

/* ── Research map ─────────────────────────────────────── */
function setupResearchMap() {
  const map = $('#researchMap');
  if (!map) return;
  map.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    $$('.research-node', map).forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
    const tag = btn.dataset.tag;
    history.pushState(null, '', location.pathname + '#projects');
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    const chip = $(`#projectFilters .chip[data-tag="${CSS.escape(tag)}"]`);
    chip?.click();
  });
}

/* ── Blog loading and rendering ───────────────────────── */
async function loadPosts() {
  const list = await loadJSON('posts/posts.json');
  const posts = await Promise.all(list.map(async filename => {
    const text = await loadText(`posts/${filename}`);
    const parsed = parseMarkdownFile(text);
    return { ...parsed.meta, body: parsed.body, filename, slug: filename.replace(/\.md$/, '') };
  }));
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function parseMarkdownFile(text) {
  const front = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!front) return { meta: {}, body: text };
  const meta = {};
  front[1].split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    meta[key] = val;
  });
  meta.tags = (meta.tags || '').split(',').map(t => t.trim()).filter(Boolean);
  return { meta, body: front[2] };
}

function renderBlogPreview(posts) {
  const el = $('#blogPreview');
  if (!el) return;
  el.innerHTML = posts.map(blogCardHTML).join('');
}

function renderBlogPage(posts) {
  const list = $('#blogList');
  const filters = $('#blogFilters');
  const search = $('#blogSearch');
  if (!list || !filters) return;

  const tags = ['All', ...new Set(posts.flatMap(p => p.tags || []))];
  let active = 'All', query = '';
  filters.innerHTML = tags.map(tag =>
    `<button class="chip ${tag === 'All' ? 'active' : ''}" data-tag="${escapeHTML(tag)}">${escapeHTML(tag)}</button>`
  ).join('');

  function update() {
    const q = query.trim().toLowerCase();
    const filtered = posts.filter(p => {
      const tagMatch = active === 'All' || (p.tags || []).includes(active);
      return tagMatch && `${p.title} ${p.excerpt} ${(p.tags || []).join(' ')}`.toLowerCase().includes(q);
    });
    list.innerHTML = filtered.map(blogCardHTML).join('') || '<p style="color:var(--text-dim)">No posts found.</p>';
  }

  filters.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    active = btn.dataset.tag;
    $$('.chip', filters).forEach(c => c.classList.toggle('active', c.dataset.tag === active));
    update();
  });
  search?.addEventListener('input', e => { query = e.target.value; update(); });
  update();
}

function blogCardHTML(post) {
  const cover = post.cover || 'assets/images/blog/blog-placeholder.svg';
  const tags = (post.tags || []).slice(0, 3).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('');
  return `
    <article class="blog-card reveal visible">
      <a href="post.html?post=${encodeURIComponent(post.slug)}">
        <img src="${cover}" alt="${escapeHTML(post.title || 'Blog post')}" loading="lazy">
        <div class="blog-card-body">
          <div class="blog-date">${formatDate(post.date)}</div>
          <h3>${escapeHTML(post.title || 'Untitled post')}</h3>
          <p>${escapeHTML(post.excerpt || '')}</p>
          <div class="tag-row" style="margin-top:.5rem;">${tags}</div>
        </div>
      </a>
    </article>
  `;
}

function renderPostPage(posts) {
  const target = $('#postContent');
  if (!target) return;
  const slug = new URLSearchParams(location.search).get('post') || posts[0]?.slug;
  const post = posts.find(p => p.slug === slug);
  if (!post) {
    target.innerHTML = `<h1>Post not found</h1><p>Go back to the blog page and choose an available post.</p><a class="btn btn-outline" href="blog.html">Back to blog</a>`;
    return;
  }
  document.title = `${post.title} | Sagar Gharti`;
  target.innerHTML = `
    <a class="btn btn-ghost" href="blog.html" style="margin-bottom:1.5rem;display:inline-flex;">← Back to blog</a>
    <h1>${escapeHTML(post.title)}</h1>
    <div class="post-meta">
      <span>${formatDate(post.date)}</span>
      ${(post.tags || []).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}
    </div>
    ${markdownToHTML(post.body)}
  `;
}

function markdownToHTML(md) {
  const lines = md.split('\n');
  let html = '', inList = false, inCode = false, codeBuffer = [];
  const closeList = () => { if (inList) { html += '</ul>'; inList = false; } };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith('```')) {
      if (!inCode) { closeList(); inCode = true; codeBuffer = []; }
      else { html += `<pre><code>${escapeHTML(codeBuffer.join('\n'))}</code></pre>`; inCode = false; }
      continue;
    }
    if (inCode) { codeBuffer.push(raw); continue; }
    if (!line.trim()) { closeList(); continue; }
    if (line.startsWith('# ')) { closeList(); html += `<h1>${inlineMD(line.slice(2))}</h1>`; continue; }
    if (line.startsWith('## ')) { closeList(); html += `<h2>${inlineMD(line.slice(3))}</h2>`; continue; }
    if (line.startsWith('### ')) { closeList(); html += `<h3>${inlineMD(line.slice(4))}</h3>`; continue; }
    if (line.startsWith('- ')) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${inlineMD(line.slice(2))}</li>`;
      continue;
    }
    closeList();
    html += `<p>${inlineMD(line)}</p>`;
  }
  closeList();
  return html;
}

function inlineMD(text) {
  let s = escapeHTML(text);
  s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  return s;
}

function formatDate(v) {
  if (!v) return '';
  return new Date(`${v}T00:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

/* ── Copy email ───────────────────────────────────────── */
function setupCopyEmail(email) {
  const btn = $('#copyEmail');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      btn.textContent = 'Copied ✓';
      setTimeout(() => { btn.textContent = 'Copy email'; }, 1600);
    } catch {
      alert(email);
    }
  });
}

/* ── Theme toggle ─────────────────────────────────────── */
function setupTheme() {
  if (localStorage.getItem('theme') === 'light') document.body.classList.add('light');
  const btn = $('#themeToggle');
  if (!btn) return;
  btn.textContent = document.body.classList.contains('light') ? '○' : '◐';
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const mode = document.body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);
    btn.textContent = mode === 'light' ? '○' : '◐';
  });
}

/* ── Mobile menu ──────────────────────────────────────── */
function setupMenu() {
  const btn = $('#menuButton');
  const nav = $('#navMenu');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) nav.classList.remove('open');
  });
}

/* ── Scroll progress bar ──────────────────────────────── */
function setupProgressBar() {
  const bar = $('#progressBar');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = `${max <= 0 ? 0 : (scrollY / max) * 100}%`;
  };
  addEventListener('scroll', update, { passive: true });
  update();
}

/* ── Scroll spy for nav ───────────────────────────────── */
function setupScrollSpy() {
  const sections = ['about', 'projects', 'research', 'publications', 'blog-preview', 'contact'];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $$('.nav-link').forEach(a => {
          const href = a.getAttribute('href');
          a.classList.toggle('active', href && href.includes(entry.target.id));
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
}

/* ── Scroll reveal ────────────────────────────────────── */
function setupReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  $$('.reveal').forEach(el => observer.observe(el));
}

/* ── 3D tilt on hero card ─────────────────────────────── */
function setupTilt() {
  const card = $('.hero-card');
  if (!card || window.matchMedia('(max-width: 1024px)').matches) return;
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
}

/* ── Flow field canvas ────────────────────────────────── */
function setupFlowCanvas() {
  const canvas = $('#heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [], t = 0, animId;

  // Flow field: superposition of sine/cosine modes — looks like 2D fluid flow
  function flowVelocity(x, y, time) {
    const s = 0.0018;
    const vx = Math.sin(y * s * 1.2 + time * 0.08) * Math.cos(x * s * 0.6)
             + Math.sin(x * s * 0.4 + y * s * 0.3 + time * 0.04) * 0.35;
    const vy = Math.cos(x * s * 1.1 + time * 0.09) * Math.sin(y * s * 0.7)
             + Math.cos(x * s * 0.5 + y * s * 0.55 + time * 0.06) * 0.35;
    return { vx, vy };
  }

  function resize() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    spawnParticles();
  }

  function spawnParticles() {
    const count = Math.min(120, Math.floor(innerWidth * innerHeight / 10000));
    particles = Array.from({ length: count }, () => makeParticle());
  }

  function makeParticle() {
    const alpha = Math.random() * 0.55 + 0.15;
    return {
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      life: Math.random() * 220 + 80,
      maxLife: 0,
      speed: Math.random() * 0.9 + 0.5,
      alpha,
      history: [],
    };
  }

  function resetParticle(p) {
    p.x = Math.random() * innerWidth;
    p.y = Math.random() * innerHeight;
    p.life = Math.random() * 220 + 80;
    p.maxLife = p.life;
    p.history = [];
  }

  const isDark = () => !document.body.classList.contains('light');

  function draw() {
    t += 0.6;

    // Fade tail
    ctx.fillStyle = isDark()
      ? 'rgba(3, 12, 26, 0.06)'
      : 'rgba(240, 245, 255, 0.06)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    particles.forEach(p => {
      const { vx, vy } = flowVelocity(p.x, p.y, t);
      const speed = p.speed;

      p.history.push({ x: p.x, y: p.y });
      if (p.history.length > 18) p.history.shift();

      p.x += vx * speed;
      p.y += vy * speed;
      p.life--;

      // Wrap edges
      if (p.x < -5) p.x = innerWidth + 5;
      if (p.x > innerWidth + 5) p.x = -5;
      if (p.y < -5) p.y = innerHeight + 5;
      if (p.y > innerHeight + 5) p.y = -5;

      if (p.life <= 0) resetParticle(p);

      if (p.history.length > 2) {
        const lifeRatio = p.life / p.maxLife;
        const baseAlpha = p.alpha * Math.min(1, lifeRatio * 3);

        ctx.beginPath();
        ctx.moveTo(p.history[0].x, p.history[0].y);
        for (let i = 1; i < p.history.length; i++) {
          ctx.lineTo(p.history[i].x, p.history[i].y);
        }
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = isDark()
          ? `rgba(0, 206, 255, ${baseAlpha * 0.6})`
          : `rgba(0, 80, 160, ${baseAlpha * 0.4})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
    });

    animId = requestAnimationFrame(draw);
  }

  resize();
  draw();
  addEventListener('resize', resize);

  // Pause when hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else { t = 0; draw(); }
  });
}

/* ── Command palette ──────────────────────────────────── */
function setupCommandPalette() {
  const palette = $('#commandPalette');
  const results = $('#commandResults');
  const input = $('#commandSearch');
  if (!palette || !results || !input) return;

  function render(q = '') {
    const f = commands.filter(c => `${c.label} ${c.hint}`.toLowerCase().includes(q.toLowerCase()));
    results.innerHTML = f.map(c =>
      `<a class="command-item" href="${c.url}"><strong>${c.label}</strong><span>${c.hint}</span></a>`
    ).join('');
  }

  const open = () => { palette.classList.add('open'); palette.setAttribute('aria-hidden', 'false'); input.focus(); render(); };
  const close = () => { palette.classList.remove('open'); palette.setAttribute('aria-hidden', 'true'); };

  $('#commandOpen')?.addEventListener('click', open);
  $('#commandClose')?.addEventListener('click', close);
  input.addEventListener('input', e => render(e.target.value));
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
    if (e.key === 'Escape') close();
  });
  palette.addEventListener('click', e => { if (e.target === palette) close(); });
}

/* ── Blog post / content editor ───────────────────────── */
function setupEditor() {
  const form = $('#postGenerator');
  if (!form) return;
  const today = new Date().toISOString().slice(0, 10);
  form.elements.date.value = today;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const title = data.get('title').trim();
    const date = data.get('date') || today;
    const tags = data.get('tags').trim();
    const excerpt = data.get('excerpt').trim();
    const content = data.get('content').trim() || `# ${title}\n\nWrite your post here.`;
    const slug = `${date}-${slugify(title)}.md`;
    const markdown = `---\ntitle: ${title}\ndate: ${date}\ntags: ${tags}\nexcerpt: ${excerpt}\ncover: assets/images/blog/blog-placeholder.svg\n---\n\n${content}\n`;
    downloadText(slug, markdown);
    alert(`Downloaded ${slug}. Put it in the posts folder and add "${slug}" to posts/posts.json.`);
  });
}

/* ── Utilities ────────────────────────────────────────── */
function escapeHTML(v = '') {
  return String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70) || 'new-post';
}

function downloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/markdown' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
