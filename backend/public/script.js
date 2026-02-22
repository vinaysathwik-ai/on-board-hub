const API_URL = window.location.origin + '/api';

/* 
   ==========================================================================
   RIPPLE EFFECT LOGIC
   ==========================================================================
*/
// Ripple Effect replaced by AI Neural Flow for a more professional look

/* 
   ==========================================================================
   3D LOGIN CARD LOGIC
   ==========================================================================
*/
const Login3D = {
    card: null,
    glare: null,

    init() {
        this.card = document.querySelector('.login-card');
        if (!this.card) return;
        this.screen = document.getElementById('login-screen');
        this.glare = this.card.querySelector('.login-card-glare');
        this.button = this.card.querySelector('button');

        this.card.addEventListener('mousemove', (e) => this.handleMove(e));
        this.card.addEventListener('mouseleave', () => this.handleLeave());

        // Update background spotlight
        this.screen.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            this.screen.style.setProperty('--mouse-x', `${x}%`);
            this.screen.style.setProperty('--mouse-y', `${y}%`);
        });

        // Toggle Palette on Card Hover
        this.card.addEventListener('mouseenter', () => {
            this.screen.classList.add('enhanced-palette');
        });
        this.card.addEventListener('mouseleave', () => {
            this.screen.classList.remove('enhanced-palette');
            this.handleLeave(); // Ensure 3D reset also happens
        });
    },

    handleMove(e) {
        const rect = this.card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation (center is 0,0)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Max rotation 15 degrees
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        this.card.style.setProperty('--rx', `${rotateX}deg`);
        this.card.style.setProperty('--ry', `${rotateY}deg`);

        // Update Glare position
        if (this.glare) {
            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            this.card.style.setProperty('--glare-x', `${glareX}%`);
            this.card.style.setProperty('--glare-y', `${glareY}%`);
        }
    },

    handleLeave() {
        this.card.style.setProperty('--rx', `0deg`);
        this.card.style.setProperty('--ry', `0deg`);
    }
};

/* 
   ==========================================================================
   NEURAL BACKGROUND LOGIC
   ==========================================================================
*/
const NeuralBackground = {
    canvas: null,
    ctx: null,
    particles: [],
    mouse: { x: null, y: null, radius: 150 },
    numberOfParticles: 100,

    init() {
        this.canvas = document.getElementById('login-bg-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();

        window.addEventListener('resize', () => this.resize());

        // Track mouse for interactions
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.createParticles();
        this.animate();
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Update all particles with new bounds
        this.particles.forEach(p => {
            p.updateBounds(this.canvas.width, this.canvas.height);
        });
    },

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Check current palette state for color
        const isEnhanced = document.getElementById('login-screen')?.classList.contains('enhanced-palette');
        const particleColor = isEnhanced ? '#a855f7' : '#3b82f6';
        const connectionColor = isEnhanced ? 'rgba(168, 85, 247,' : 'rgba(59, 130, 246,';

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(this.mouse);
            this.particles[i].draw(this.ctx, particleColor);

            // Lines between particles
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = 1 - (distance / 120);
                    this.ctx.strokeStyle = `${connectionColor} ${opacity * 0.4})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        requestAnimationFrame(() => this.animate());
    }
};

class Particle {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.w;
        this.y = Math.random() * this.h;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
    }

    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update(mouse) {
        // Constant movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > this.w) this.vx *= -1;
        if (this.y < 0 || this.y > this.h) this.vy *= -1;

        // Mouse Repulsion
        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            }
        }
    }

    updateBounds(w, h) {
        this.w = w;
        this.h = h;
    }
}

/* 
   ==========================================================================
   AI SECTION BACKGROUND (MODERN FLOW)
   ==========================================================================
*/
const AIBackground = {
    canvas: null,
    ctx: null,
    particles: [],
    mouse: { x: null, y: null, radius: 200 },
    numberOfParticles: 120,

    init() {
        this.canvas = document.getElementById('ai-bg-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();

        window.addEventListener('resize', () => this.resize());

        const aiSection = document.getElementById('ai-assistant');
        aiSection.addEventListener('mousemove', (e) => {
            const rect = aiSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            aiSection.style.setProperty('--mouse-x', `${x}%`);
            aiSection.style.setProperty('--mouse-y', `${y}%`);

            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        // Specific hover for the heading as requested by the user
        const aiHeading = aiSection.querySelector('.ai-heading');
        if (aiHeading) {
            aiHeading.addEventListener('mouseenter', () => {
                aiSection.classList.add('enhanced-palette');
                aiSection.style.transform = 'scale(1.02)';
                aiSection.style.zIndex = '10'; // Bring forward
            });
            aiHeading.addEventListener('mouseleave', () => {
                aiSection.classList.remove('enhanced-palette');
                aiSection.style.transform = 'scale(1)';
                aiSection.style.zIndex = '1';
            });
        }

        this.createParticles();
        this.animate();
    },

    resize() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = this.canvas.parentElement.offsetHeight;
        this.createParticles();
    },

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height));
        }
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const aiSection = document.getElementById('ai-assistant');
        const isEnhanced = aiSection?.classList.contains('enhanced-palette');
        const pColor = isEnhanced ? '#a855f7' : '#3b82f6';
        const lColor = isEnhanced ? 'rgba(168, 85, 247,' : 'rgba(59, 130, 246,';

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update(this.mouse);
            this.particles[i].draw(this.ctx, pColor);

            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const op = 1 - (dist / 150);
                    this.ctx.strokeStyle = `${lColor} ${op * 0.2})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        requestAnimationFrame(() => this.animate());
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    Login3D.init();
    NeuralBackground.init();
    AIBackground.init();

    // Mobile sidebar toggle handling
    const menuBtn = document.getElementById('mobile-menu-button');
    const backdrop = document.getElementById('mobile-backdrop');
    const dashboard = document.getElementById('dashboard-screen');

    function toggleSidebar(open) {
        if (!dashboard) return;
        if (open === undefined) dashboard.classList.toggle('sidebar-open');
        else if (open) dashboard.classList.add('sidebar-open');
        else dashboard.classList.remove('sidebar-open');
        // animate button state
        if (menuBtn) {
            const shouldOpen = dashboard.classList.contains('sidebar-open');
            menuBtn.classList.toggle('open', shouldOpen);
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleSidebar(true); });
    if (backdrop) backdrop.addEventListener('click', () => toggleSidebar(false));

    // Close sidebar when nav link clicked on small screens
    document.querySelectorAll('.nav-links li').forEach(li => {
        li.addEventListener('click', () => {
            if (window.innerWidth <= 768) toggleSidebar(false);
        });
    });

    // Ensure sidebar state clears when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && dashboard && dashboard.classList.contains('sidebar-open')) {
            dashboard.classList.remove('sidebar-open');
            if (menuBtn) menuBtn.classList.remove('open');
        }
    });

    // AI input: make Enter trigger the send and animate arrow press
    const aiInput = document.getElementById('ai-input');
    const aiBtn = document.querySelector('#ai-assistant .chat-input button');
    if (aiInput) {
        aiInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                // visual press
                if (aiBtn) {
                    aiBtn.classList.add('pressed');
                    setTimeout(() => aiBtn.classList.remove('pressed'), 160);
                }
                // call send
                try { askAI(); } catch (err) { console.error(err); }
            }
        });
    }

    // Mentor input enter behavior as well
    const mentorInput = document.getElementById('mentor-input');
    const mentorBtn = document.querySelector('#mentor-chat .chat-input button');
    if (mentorInput) {
        mentorInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (mentorBtn) {
                    mentorBtn.classList.add('pressed');
                    setTimeout(() => mentorBtn.classList.remove('pressed'), 160);
                }
                try { sendMentorMessage(); } catch (err) { console.error(err); }
            }
        });
    }
});

let currentUser = null;
let allModules = []; // Dynamic cache for instant UI updates

// Navigation
function showSection(sectionId) {
    // Update Nav
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));

    // Find nav item by data-target
    const activeLi = document.querySelector(`.nav-links li[data-target="${sectionId}"]`);
    if (activeLi) {
        activeLi.classList.add('active');
    }

    // Update Content
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }

    // Load data if needed
    if (sectionId === 'learning-modules') loadModules();
    if (sectionId === 'progress-tracker') loadProgress();
    if (sectionId === 'mentor-chat') loadMentorMessages();
    if (sectionId === 'faqs') loadFAQs();
    if (sectionId === 'starter-kit') loadTasks();

    // On small screens, close the sidebar after navigation
    try {
        if (window.innerWidth <= 768) {
            const ds = document.getElementById('dashboard-screen');
            if (ds) ds.classList.remove('sidebar-open');
        }
    } catch (e) { }
}

// Auth
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (data.success) {
            currentUser = data.user;
            // For the demo account, ensure modules/tasks appear fresh (incomplete)
            if (currentUser && currentUser.email === 'fresher@company.com') {
                currentUser.completedModules = [];
                // clear any stored starter-kit tasks for this demo user
                try {
                    localStorage.removeItem(`tasks_${currentUser._id}`);
                    localStorage.removeItem('latest_module');
                    localStorage.removeItem('latest_task');
                } catch (e) {
                    // ignore if localStorage not available
                }
            }
            enterDashboard();
        } else {
            alert('Invalid login');
        }

    } catch (err) {
        console.error(err);
        alert('Login failed');
    }
});

async function enterDashboard() {
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');

    loginScreen.classList.add('screen-transition-out');
    await new Promise(resolve => setTimeout(resolve, 800));

    loginScreen.classList.remove('active', 'screen-transition-out');
    loginScreen.classList.add('hidden');

    dashboardScreen.classList.remove('hidden');
    dashboardScreen.classList.add('active', 'screen-transition-in');

    document.getElementById('user-name').textContent = currentUser.username;
    document.getElementById('user-role').textContent = currentUser.role;

    AIBackground.resize();

    // Pre-load modules so loadProgress() always works synchronously
    if (allModules.length === 0) {
        const r = await fetch(`${API_URL}/modules`);
        allModules = await r.json();
    }

    loadTasks();
    loadProgress();
}

// AI Chat
async function askAI() {
    const input = document.getElementById('ai-input');
    const query = input.value;
    if (!query) return;

    // Add User Message
    addMessage('ai-chat-history', query, 'user');
    input.value = '';

    // Show loading
    const loadingId = addMessage('ai-chat-history', 'Thinking...', 'ai');

    try {
        const res = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });

        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();

        // Remove loading
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();

        // Add AI details
        const answerText = data.answer + (data.sources && data.sources.length ? `\n\nSources: ${data.sources.join(', ')}` : '');
        addMessage('ai-chat-history', answerText, 'ai');

    } catch (err) {
        console.error('Chat error:', err);
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) {
            loadingEl.textContent = "Error connecting to AI brain. Please check if the server and AI are running.";
            loadingEl.style.color = "#ef4444";
        }
    }
}

// Mentor Chat
async function loadMentorMessages() {
    if (!currentUser) return;
    const res = await fetch(`${API_URL}/messages/${currentUser._id}`);
    const messages = await res.json();

    const container = document.getElementById('mentor-chat-history');
    container.innerHTML = '';
    messages.forEach(msg => {
        const isMe = msg.sender._id === currentUser._id;
        let type;
        if (isMe) {
            type = 'user';
        } else {
            type = msg.sender.role; // 'mentor' or 'fresher'
        }
        addMessage('mentor-chat-history', msg.content, type);
    });
}

async function sendMentorMessage() {
    const input = document.getElementById('mentor-input');
    const content = input.value;
    if (!content) return;

    // Local echo for instant response feel
    addMessage('mentor-chat-history', content, 'user');
    input.value = '';

    await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId: currentUser._id, content })
    });

    loadMentorMessages();
}

// Helper: Add Message to UI
function addMessage(containerId, text, type) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const div = document.createElement('div');
    const msgId = 'msg-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    div.id = msgId;
    div.className = `message ${type === 'user' ? 'user' : 'ai'} ${type}`;

    // Add prefix for role-based messages
    let prefix = '';
    if (type === 'mentor') {
        prefix = '<span style="display:block; font-size: 0.75rem; font-weight: 700; color: var(--primary); margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 1px;">Mentor</span>';
    } else if (type === 'fresher') {
        prefix = '<span style="display:block; font-size: 0.75rem; font-weight: 700; color: var(--secondary); margin-bottom: 0.25rem; text-transform: uppercase; letter-spacing: 1px;">Student</span>';
    }
    div.innerHTML = `${prefix}${text}`;

    container.appendChild(div);

    // Smooth scroll to bottom
    container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
    });

    return msgId;
}

// Modules - uses checkboxes exactly like Starter Kit
async function loadModules() {
    const container = document.getElementById('modules-list');
    if (!container || !currentUser) return;

    // Only fetch modules list once (it never changes)
    if (allModules.length === 0) {
        const res = await fetch(`${API_URL}/modules`);
        allModules = await res.json();
    }

    // Skip re-render if already built (prevents flicker on section re-visit)
    if (container.children.length === allModules.length) return;

    container.innerHTML = '';

    // Build completed IDs as plain strings for reliable comparison
    const completedIds = currentUser.completedModules.map(m =>
        typeof m === 'object' ? String(m._id || m) : String(m)
    );

    allModules.forEach(mod => {
        const isChecked = completedIds.includes(String(mod._id));
        const div = document.createElement('div');
        div.className = `module-card ${isChecked ? 'completed' : ''}`;

        div.innerHTML = `
            <div>
                <h3>${mod.title}</h3>
                <p>${mod.description}</p>
                <div class="module-progress-container">
                    <div class="module-progress-bar" style="width: ${isChecked ? '100%' : '0%'}"></div>
                </div>
            </div>
            <label class="module-checkbox-label">
                <input type="checkbox"
                    ${isChecked ? 'checked' : ''}
                    onchange="toggleModule(this, '${mod._id}', '${mod.title}')"
                >
                <span>${isChecked ? 'Completed ✓' : 'Mark as Complete'}</span>
            </label>
        `;
        container.appendChild(div);
    });
}

// Exact same pattern as toggleTask() in Starter Kit
async function toggleModule(checkbox, moduleId, moduleTitle) {
    const card = checkbox.closest('.module-card');
    const bar = card.querySelector('.module-progress-bar');
    const label = card.querySelector('.module-checkbox-label span');

    if (checkbox.checked) {
        // 1. Instant visual update
        card.classList.add('completed');
        bar.style.width = '100%';
        label.textContent = 'Completed ✓';
        localStorage.setItem('latest_module', moduleTitle);

        // 2. Optimistic state update → instant percentage change
        if (!currentUser.completedModules.some(m => String(typeof m === 'object' ? m._id : m) === String(moduleId))) {
            currentUser.completedModules = [...currentUser.completedModules, moduleId];
        }
        loadProgress(); // Fires instantly with updated count

        // 3. Sync backend in background
        const res = await fetch(`${API_URL}/modules/complete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser._id, moduleId })
        });
        currentUser = await res.json(); // Finalize with server truth
    } else {
        // 1. Instant visual update
        card.classList.remove('completed');
        bar.style.width = '0%';
        label.textContent = 'Mark as Complete';

        // 2. Optimistic state update → instant percentage change
        currentUser.completedModules = currentUser.completedModules.filter(
            m => String(typeof m === 'object' ? m._id : m) !== String(moduleId)
        );
        loadProgress(); // Fires instantly with reduced count

        // 3. Sync backend in background
        const res = await fetch(`${API_URL}/modules/uncomplete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser._id, moduleId })
        });
        currentUser = await res.json(); // Finalize with server truth
    }
}

// Progress & Tasks
function loadProgress() {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser._id}`) || '{}');
    const totalTasks = 8;
    const completedTasks = Object.values(savedTasks).filter(v => v).length;

    // Use cached allModules if available, else use hardcoded count from stat card
    const totalModules = allModules.length || 4; // fallback to 4 if not loaded yet
    const completedModules = currentUser.completedModules.length;

    const totalPoints = totalModules + totalTasks;
    const earnedPoints = completedModules + completedTasks;
    const overallPercent = totalPoints === 0 ? 0 : Math.round((earnedPoints / totalPoints) * 100);
    const modContribution = totalPoints === 0 ? 0 : Math.round((completedModules / totalPoints) * 100);

    document.getElementById('progress-text').textContent = `${overallPercent}%`;

    const progressCircle = document.getElementById('progress-circle');
    if (progressCircle) {
        progressCircle.style.setProperty('--mod-p', `${modContribution}%`);
        progressCircle.style.setProperty('--total-p', `${overallPercent}%`);
    }

    const ttModP = document.getElementById('tt-mod-p');
    const ttTaskP = document.getElementById('tt-task-p');
    const modPercent = totalModules === 0 ? 0 : Math.round((completedModules / totalModules) * 100);
    const taskPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    if (ttModP) ttModP.textContent = `${modPercent}%`;
    if (ttTaskP) ttTaskP.textContent = `${taskPercent}%`;

    const ttModAction = document.getElementById('tt-mod-action');
    const ttTaskAction = document.getElementById('tt-task-action');
    if (ttModAction) ttModAction.textContent = `Latest: ${localStorage.getItem('latest_module') || 'None'}`;
    if (ttTaskAction) ttTaskAction.textContent = `Latest: ${localStorage.getItem('latest_task') || 'None'}`;

    const statModules = document.getElementById('stat-modules');
    const statTasks = document.getElementById('stat-tasks');
    if (statModules) statModules.textContent = `${completedModules}/${totalModules}`;
    if (statTasks) statTasks.textContent = `${completedTasks}/${totalTasks}`;

    // Tooltip hover logic
    const circle = document.getElementById('progress-circle');
    const ttMod = document.getElementById('tooltip-mod');
    const ttTask = document.getElementById('tooltip-task');
    if (circle && ttMod && ttTask) {
        circle.onmousemove = (e) => {
            const rect = circle.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            let angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI) + 90;
            if (angle < 0) angle += 360;
            const modP = parseFloat(circle.style.getPropertyValue('--mod-p')) || 0;
            const totalP = parseFloat(circle.style.getPropertyValue('--total-p')) || 0;
            ttMod.classList.remove('show');
            ttTask.classList.remove('show');
            const modLimit = (modP / 100) * 360;
            const totalLimit = (totalP / 100) * 360;
            if (angle <= modLimit && modLimit > 0) {
                ttMod.classList.add('show');
            } else if (angle <= totalLimit && totalLimit > modLimit) {
                ttTask.classList.add('show');
            }
        };
        circle.onmouseleave = () => {
            ttMod.classList.remove('show');
            ttTask.classList.remove('show');
        };
    }
}


function toggleTask(checkbox, taskId) {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser._id}`) || '{}');
    savedTasks[taskId] = checkbox.checked;

    // Track latest task name
    if (checkbox.checked) {
        const taskLabel = checkbox.parentElement.querySelector('span')?.textContent;
        if (taskLabel) localStorage.setItem('latest_task', taskLabel);
    }

    localStorage.setItem(`tasks_${currentUser._id}`, JSON.stringify(savedTasks));
    loadProgress();
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${currentUser._id}`) || '{}');
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    checkboxes.forEach(cb => {
        const match = cb.getAttribute('onchange')?.match(/'([^']+)'/);
        if (match && match[1]) {
            const taskId = match[1];
            if (savedTasks[taskId]) {
                cb.checked = true;
            }
        }
    });
}

// FAQs
async function loadFAQs() {
    const res = await fetch(`${API_URL}/faqs`);
    const faqs = await res.json();
    const container = document.getElementById('faq-list');
    container.innerHTML = '';

    faqs.forEach(faq => {
        const div = document.createElement('div');
        div.className = 'faq-item';
        // Make clickable
        div.style.cursor = 'pointer';
        div.title = "Click to ask AI";
        div.onclick = () => {
            // Go to AI tab
            showSection('ai-assistant');
            // Fill input
            const input = document.getElementById('ai-input');
            input.value = faq.question;
            // Trigger ask
            askAI();
        };

        div.innerHTML = `<h3>${faq.question}</h3><p>${faq.answer}</p>`;
        container.appendChild(div);
    });
}
