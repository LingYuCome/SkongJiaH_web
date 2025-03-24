// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化滚动动画
    initScrollAnimation();
    // 初始化导航栏效果
    initNavbar();
    // 初始化AI对话
    initAIChat();
    // 初始化表单验证
    initContactForm();
    // 初始化particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#008080'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#008080',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    // 初始化页脚粒子效果
    particlesJS('footer-particles', {
        particles: {
            number: {
                value: 40,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            opacity: {
                value: 0.2,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                resize: true
            }
        },
        retina_detect: true
    });
});

// 页面加载完成后移除预加载动画
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// 滚动动画
function initScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// 导航栏效果
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// AI对话框功能
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('openAIChat');
    const chatModal = document.getElementById('aiChatModal');
    const closeButton = document.getElementById('closeChat');
    const minimizeButton = document.getElementById('minimizeChat');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const quickActions = document.querySelectorAll('.action-btn');

    // 打开对话框
    chatButton.addEventListener('click', () => {
        chatModal.classList.add('active');
    });

    // 关闭对话框
    closeButton.addEventListener('click', () => {
        chatModal.classList.remove('active');
    });

    // 最小化对话框
    minimizeButton.addEventListener('click', () => {
        chatModal.classList.remove('active');
    });

    // 发送消息到AI
    async function sendToAI(message) {
        try {
            // 显示加载动画
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message ai-message';
            typingDiv.innerHTML = `
                <div class="message-content">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('API请求失败');
            }

            const data = await response.json();
            
            // 移除加载动画
            typingDiv.remove();

            // 显示AI回复
            if (data.choices && data.choices[0].message) {
                appendMessage(data.choices[0].message.content, 'ai');
            } else {
                throw new Error('无效的响应数据');
            }

        } catch (error) {
            console.error('发送消息错误:', error);
            appendMessage('抱歉，服务出现了问题，请稍后再试。', 'ai');
        }
    }

    // 发送消息
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        // 显示用户消息
        appendMessage(message, 'user');
        messageInput.value = '';

        // 发送到AI
        await sendToAI(message);
    }

    // 添加消息到对话框
    function appendMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const time = new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${content}</p>
                <div class="message-footer">
                    <small class="message-time">${time}</small>
                </div>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 快速操作按钮
    quickActions.forEach(button => {
        button.addEventListener('click', async () => {
            const question = button.dataset.question;
            appendMessage(question, 'user');
            await sendToAI(question);
        });
    });

    // 回车发送消息
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 点击发送按钮
    document.querySelector('.send-btn').addEventListener('click', sendMessage);
});

// 表单验证和提交
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // 表单验证
        if (!validateForm(data)) return;

        try {
            // 这里替换为实际的API调用
            await mockSubmitForm(data);
            showMessage('success', '消息已成功发送！我们会尽快回复您。');
            form.reset();
        } catch (error) {
            showMessage('error', '发送失败，请稍后重试。');
        }
    });

    function validateForm(data) {
        if (!data.name || data.name.length < 2) {
            showMessage('error', '请输入有效的姓名');
            return false;
        }
        if (!data.email || !isValidEmail(data.email)) {
            showMessage('error', '请输入有效的邮箱地址');
            return false;
        }
        if (!data.message || data.message.length < 10) {
            showMessage('error', '留言内容至少需要10个字符');
            return false;
        }
        return true;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // 模拟表单提交
    async function mockSubmitForm(data) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted:', data);
        return true;
    }

    function showMessage(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
        alertDiv.textContent = message;
        form.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
    }
}

// 滚动动画
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation(); // 初始检查 