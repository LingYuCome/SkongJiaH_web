/**\n * 滑动页面粒子动画配置\n * 为每个全屏滚动页面添加粒子背景效果\n */


// 当DOM内容加载完成后初始化粒子效果
document.addEventListener('DOMContentLoaded', function() {
    initSectionParticles();
});


// 初始化各部分的粒子效果
function initSectionParticles() {
    // 获取所有需要添加粒子的部分
    const sections = document.querySelectorAll('.fullpage-section');

    // 为每个section添加粒子容器（如果没有）
    sections.forEach((section, index) => {
        // 跳过已有粒子容器的部分，例如banner
        if (section.querySelector('.particles-container') || 
            section.querySelector('.banner-particles') ||
            section.querySelector('#particles-js')) {
            return;
        }

        // 创建粒子容器
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.id = particles-section-;
        
        // 设置容器样式
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '1';
        particlesContainer.style.pointerEvents = 'none';

