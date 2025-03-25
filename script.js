/**
 * 页面加载完成后的初始化函数
 * 当DOM内容加载完成后执行，初始化网站的各项功能
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化视频播放检测功能 - 确保只在视频无法播放时显示后备图片
    initVideoBannerFallback();
    // 初始化滚动动画效果 - 实现页面元素随滚动出现的动画
    initScrollAnimation();
    // 初始化导航栏交互效果 - 实现导航栏随滚动变化和平滑滚动
    initNavbar();
    // 初始化房型选择模块 - 实现不同房型的选择和展示
    initHouseTypeTabs();
    // 初始化微信二维码弹窗功能
    initWechatModal();
    // 初始化全屏滚动效果
    initFullPageScroll();
    // 初始化产品中心下拉菜单
    initProductCategorySwitch();
    // 初始化移动端导航栏
    initMobileNavigation();
});

/**
 * 视频Banner后备图片处理
 * 检测视频是否能够播放，只有在视频无法播放时才显示后备图片
 */
function initVideoBannerFallback() {
    const video = document.getElementById('banner-video');
    const fallback = document.getElementById('banner-fallback');
    
    if (!video || !fallback) return; // 如果元素不存在，直接返回
    
    // 检查视频是否可以播放
    let isVideoPlayable = false;
    
    // 视频加载成功并开始播放
    video.addEventListener('playing', function() {
        isVideoPlayable = true;
        fallback.style.display = 'none'; // 确保后备图片隐藏
        console.log('视频成功播放，隐藏后备图片');
    });
    
    // 视频遇到错误
    video.addEventListener('error', function() {
        showFallbackImage();
        console.log('视频播放错误，显示后备图片');
    });
    
    // 视频格式不支持等情况
    video.addEventListener('stalled', function() {
        if (!isVideoPlayable) {
            showFallbackImage();
            console.log('视频加载停滞，显示后备图片');
        }
    });
    
    // 设置超时检测，如果5秒内视频没有播放，显示后备图片
    setTimeout(function() {
        if (!isVideoPlayable && video.readyState < 3) { // readyState < 3 表示视频还没有足够数据开始播放
            showFallbackImage();
            console.log('视频加载超时，显示后备图片');
        }
    }, 5000);
    
    // 显示后备图片的函数
    function showFallbackImage() {
        fallback.style.display = 'block';
        video.style.display = 'none'; // 隐藏视频元素
    }
}

/**
 * 页面资源加载完成后移除预加载动画
 * 当所有资源（图片、样式等）加载完成后执行，移除加载动画
 */
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out'); // 添加淡出效果
    setTimeout(() => {
        preloader.style.display = 'none'; // 500ms后完全隐藏预加载动画
    }, 500);
});

/**
 * 初始化滚动动画效果
 */
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

/**
 * 初始化导航栏效果
 */
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

/**
 * 初始化particles.js效果
 * 此函数已不再使用，保留为空函数以避免可能的引用错误
 */
function initParticles() {
    // 此函数已被禁用，网站不再使用粒子动画效果
    console.log('粒子动画功能已被禁用');
}

/**
 * 初始化房型选择模块
 */
function initHouseTypeTabs() {
    // 获取所有设备项
    const deviceItems = document.querySelectorAll('.device-item');
    
    // 为设备项添加悬停效果
    deviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 128, 255, 0.1)';
            
            // 图标旋转效果
            const icon = this.querySelector('.device-icon');
            if (icon) {
                icon.style.transform = 'rotate(15deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            // 恢复图标
            const icon = this.querySelector('.device-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
    
    // 初始化Bootstrap选项卡
    const tabEls = document.querySelectorAll('#houseTypeTabs button[data-bs-toggle="pill"]');
    tabEls.forEach(tabEl => {
        tabEl.addEventListener('shown.bs.tab', event => {
            // 当选项卡显示时，触发动画
            const targetId = event.target.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetId);
            if (targetPane) {
                const image = targetPane.querySelector('.house-type-image');
                if (image) {
                    // 重置动画
                    image.classList.remove('slide-up');
                    void image.offsetWidth; // 触发重绘
                    image.classList.add('slide-up');
                }
            }
        });
    });
}

/**
 * 初始化微信二维码弹窗功能
 */
function initWechatModal() {
    // 获取所有微信图标和带有wechat-link类的元素
    const wechatIcons = document.querySelectorAll('.fa-weixin');
    const wechatLinks = document.querySelectorAll('.wechat-link');
    
    // 处理点击事件的函数
    const handleWechatClick = function(e) {
        e.preventDefault(); // 阻止默认行为
        
        // 使用Bootstrap的Modal API打开弹窗
        const wechatModal = new bootstrap.Modal(document.getElementById('wechatModal'));
        wechatModal.show();
        
        // 添加动画效果
        const qrCode = document.querySelector('.wechat-qr');
        if (qrCode) {
            qrCode.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
                qrCode.classList.remove('animate__animated', 'animate__fadeIn');
            }, 1000);
        }
        
        // 为电话图标添加动画效果
        const phoneIcon = document.querySelector('.contact-icon .fa-phone-alt');
        if (phoneIcon) {
            phoneIcon.classList.add('animate__animated', 'animate__heartBeat');
            setTimeout(() => {
                phoneIcon.classList.remove('animate__animated', 'animate__heartBeat');
            }, 1000);
        }
    };
    
    // 为所有微信图标添加点击事件（包括文本内的图标）
    wechatIcons.forEach(icon => {
        // 如果图标是链接的一部分，则为父元素添加点击事件
        if (icon.parentElement.tagName === 'A' || icon.parentElement.tagName === 'P') {
            icon.parentElement.addEventListener('click', handleWechatClick);
            icon.parentElement.style.cursor = 'pointer'; // 添加手型光标样式
            
            // 添加鼠标悬停效果
            icon.parentElement.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            icon.parentElement.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        } else {
            // 直接为图标添加点击事件
            icon.addEventListener('click', handleWechatClick);
            icon.style.cursor = 'pointer'; // 添加手型光标样式
            
            // 添加鼠标悬停效果
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.display = 'inline-block';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        }
    });
    
    // 为所有带有wechat-link类的元素添加点击事件
    wechatLinks.forEach(link => {
        link.addEventListener('click', handleWechatClick);
        
        // 添加鼠标悬停效果
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * 初始化全屏滚动效果
 * 参考欧瑞博网站的滚动设计
 */
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

/**
 * 处理产品中心下拉菜单中的分类切换
 * 实现鼠标悬停在分类上时切换显示对应产品内容
 */
function initProductCategorySwitch() {
    const categoryItems = document.querySelectorAll('.product-category-list li');
    if (!categoryItems.length) return;
    
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // 移除所有选中状态
            categoryItems.forEach(cat => cat.classList.remove('active'));
            // 添加当前项的选中状态
            this.classList.add('active');
            
            // 隐藏所有产品内容
            document.querySelectorAll('.product-category-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // 获取当前分类ID并显示对应内容
            const categoryId = this.getAttribute('data-category');
            if (categoryId) {
                const targetContent = document.querySelector(`.product-category-content[data-category="${categoryId}"]`);
                if (targetContent) {
                    targetContent.style.display = 'block';
                    
                    // 重新触发动画
                    const items = targetContent.querySelectorAll('.product-item');
                    items.forEach(item => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    });
                }
            }
        });
    });
}

/**
 * 处理在移动设备上导航栏的行为
 * 确保在移动设备上正确显示产品中心下拉菜单
 */
function initMobileNavigation() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const megaDropdown = document.querySelector('.mega-dropdown');
    
    if (!navbarToggler || !megaDropdown) return;
    
    // 在移动设备上点击产品中心
    const dropdownToggle = megaDropdown.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                e.stopPropagation();
                
                const megaMenu = megaDropdown.querySelector('.mega-dropdown-menu');
                if (megaMenu) {
                    if (megaMenu.style.display === 'block') {
                        megaMenu.style.display = 'none';
                    } else {
                        megaMenu.style.display = 'block';
                    }
                }
            }
        });
        
        // 处理产品中心链接的点击事件
        // 在桌面端，点击"产品中心"文字时跳转到产品页面
        dropdownToggle.addEventListener('mousedown', function(e) {
            // 记录点击开始的时间
            this.clickStartTime = new Date().getTime();
        });
        
        dropdownToggle.addEventListener('mouseup', function(e) {
            // 如果是快速点击（不是长按），且在桌面端
            if (new Date().getTime() - this.clickStartTime < 200 && window.innerWidth >= 992) {
                window.location.href = this.getAttribute('href');
            }
        });
    }
    
    // 在窗口大小变化时处理
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            const megaMenu = megaDropdown.querySelector('.mega-dropdown-menu');
            if (megaMenu) {
                megaMenu.style.display = '';
            }
        }
    });
}