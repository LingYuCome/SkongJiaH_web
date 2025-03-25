// 当页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能
    setupSmoothScroll();
    
    // 产品过滤功能
    setupProductFilter();
    
    // 加载更多按钮功能
    setupLoadMoreButton();
    
    // 产品分类导航高亮
    setupCategoryHighlight();
});

// 平滑滚动到锚点
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // 更新URL，但不滚动（已经手动滚动了）
            history.pushState(null, null, targetId);
        });
    });
}

// 产品过滤功能
function setupProductFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前按钮添加active类
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // 这里可以根据筛选值过滤产品卡片
            // 如果有真实数据，可以通过AJAX加载产品
            console.log('筛选产品:', filterValue);
            
            // 模拟筛选效果
            simulateProductFilter(filterValue);
        });
    });
}

// 模拟产品筛选效果
function simulateProductFilter(filterValue) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    // 添加加载效果
    productGrid.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">加载中...</span></div></div>';
    
    // 模拟加载延迟
    setTimeout(() => {
        // 恢复原始内容或根据筛选条件显示不同内容
        productGrid.innerHTML = ''; // 清空当前内容
        
        // 根据不同筛选条件显示不同的产品
        let numProducts = 8; // 默认显示数量
        
        if (filterValue === 'new') {
            numProducts = 4; // 新品数量少
        } else if (filterValue === 'hot') {
            numProducts = 6; // 热门数量适中
        }
        
        // 创建产品卡片
        for (let i = 0; i < numProducts; i++) {
            const isNew = filterValue === 'new' || (Math.random() > 0.7 && filterValue === 'all');
            const isHot = filterValue === 'hot' || (Math.random() > 0.7 && filterValue === 'all');
            
            const card = createProductCard({
                image: `./image/product-${i % 5 + 1}.jpg`,
                title: `智能产品 ${i + 1}`,
                description: '智能家居产品描述信息',
                features: ['特性1', '特性2', '特性3'],
                isNew: isNew,
                isHot: isHot
            });
            
            productGrid.appendChild(card);
        }
    }, 800);
}

// 创建产品卡片元素
function createProductCard(product) {
    const cardCol = document.createElement('div');
    cardCol.className = 'col-md-6 col-lg-3';
    
    // 构建卡片HTML
    cardCol.innerHTML = `
        <div class="product-card">
            ${product.isNew ? '<div class="product-badge">新品</div>' : ''}
            ${product.isHot ? '<div class="product-badge hot">热销</div>' : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-overlay">
                    <a href="#" class="btn btn-primary btn-sm">查看详情</a>
                </div>
            </div>
            <div class="product-content">
                <h4>${product.title}</h4>
                <p>${product.description}</p>
                <div class="product-features">
                    ${product.features.map(feature => `<span class="badge bg-primary">${feature}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    return cardCol;
}

// 加载更多按钮功能
function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', function() {
        // 显示加载动画
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> 加载中...';
        this.disabled = true;
        
        // 模拟加载延迟
        setTimeout(() => {
            const productGrid = document.querySelector('.product-grid');
            if (!productGrid) return;
            
            // 添加4个新产品
            for (let i = 0; i < 4; i++) {
                const card = createProductCard({
                    image: `./image/product-${(i % 5) + 1}.jpg`,
                    title: `智能产品 ${Math.floor(Math.random() * 100)}`,
                    description: '智能家居产品描述信息',
                    features: ['特性1', '特性2', '特性3'],
                    isNew: Math.random() > 0.7,
                    isHot: Math.random() > 0.7
                });
                
                productGrid.appendChild(card);
            }
            
            // 恢复按钮状态
            this.innerHTML = '加载更多 <i class="fas fa-spinner ms-2"></i>';
            this.disabled = false;
            
            // 如果达到最大数量，可以禁用按钮
            const productCount = productGrid.querySelectorAll('.product-card').length;
            if (productCount >= 20) {
                this.innerHTML = '已加载全部';
                this.disabled = true;
            }
        }, 1000);
    });
}

// 根据滚动位置高亮产品分类导航
function setupCategoryHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.product-category-nav .nav-link');
    
    if (!sections.length || !navLinks.length) return;
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
} 