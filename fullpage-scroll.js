/**
 * 全屏滚动效果脚本
 * 参考欧瑞博网站的滚动设计实现，已移除粒子动画
 */

// 初始化全屏滚动效果
function initFullPageScroll() {
    // 获取所有需要滚动显示的区块
    const sections = document.querySelectorAll('.fullpage-section');
    
    // 滚动监听器，添加动画效果
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-active');
                
                // 为子元素添加依次进入的动画
                const animateItems = entry.target.querySelectorAll('.animate-in');
                animateItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('item-visible');
                    }, 200 * (index + 1));
                });
            }
        });
    }, observerOptions);
    
    // 观察每个区块
    sections.forEach(section => {
        sectionObserver.observe(section);
        
        // 初始状态，移除活跃类
        if (!section.classList.contains('active-on-load')) {
            section.classList.remove('section-active');
        }
        
        // 重置子元素动画状态
        const animateItems = section.querySelectorAll('.animate-in');
        animateItems.forEach(item => {
            item.classList.remove('item-visible');
        });
    });
    
    // 添加滚动指示器
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    for (let i = 0; i < sections.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'scroll-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            sections[i].scrollIntoView({ behavior: 'smooth' });
        });
        scrollIndicator.appendChild(dot);
    }
    document.body.appendChild(scrollIndicator);
    
    // 更新滚动指示器
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const dots = document.querySelectorAll('.scroll-dot');
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 200;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
        });
    });
}

// 当DOM内容加载完成后初始化全屏滚动效果
document.addEventListener('DOMContentLoaded', function() {
    initFullPageScroll();
}); 