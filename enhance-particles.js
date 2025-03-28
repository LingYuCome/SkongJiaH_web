/**
 * 删除所有粒子动画
 * 此文件用于彻底禁用网站中的所有粒子动画效果
 */

// 当DOM内容加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 移除所有粒子动画
    removeAllParticles();
});

// 移除所有粒子动画的函数
function removeAllParticles() {
    console.log('正在删除所有粒子动画...');
    
    // 1. 通过CSS隐藏所有粒子容器
    const style = document.createElement('style');
    style.textContent = `
        /* 隐藏所有粒子容器和画布 */
        .particles-container,
        #particles-js,
        #solutions-particles,
        #footer-particles,
        .banner-particles,
        canvas.particles-js-canvas-el,
        [id^="particles-section-"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            width: 0 !important;
            position: absolute !important;
            pointer-events: none !important;
            z-index: -9999 !important;
        }
    `;
    document.head.appendChild(style);
    
    // 2. 移除所有粒子容器
    const allContainers = document.querySelectorAll('.particles-container, #particles-js, #solutions-particles, #footer-particles, .banner-particles, [id^="particles-section-"]');
    allContainers.forEach(container => {
        if (container && container.parentNode) {
            container.parentNode.removeChild(container);
            console.log(`移除了粒子容器: ${container.id || '未命名容器'}`);
        }
    });
    
    // 3. 移除所有粒子画布
    const allCanvases = document.querySelectorAll('canvas.particles-js-canvas-el');
    allCanvases.forEach(canvas => {
        if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
            console.log('移除了粒子画布');
        }
    });
    
    // 4. 如果存在全局粒子对象，尝试清理
    if (window.pJSDom && Array.isArray(window.pJSDom)) {
        // 清空粒子对象数组
        window.pJSDom = [];
        console.log('已清理粒子JS对象');
    }
    
    console.log('所有粒子动画已成功删除');
}
