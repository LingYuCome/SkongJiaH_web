/**\n * ����ҳ�����Ӷ�������\n * Ϊÿ��ȫ������ҳ��������ӱ���Ч��\n */


// ��DOM���ݼ�����ɺ��ʼ������Ч��
document.addEventListener('DOMContentLoaded', function() {
    initSectionParticles();
});


// ��ʼ�������ֵ�����Ч��
function initSectionParticles() {
    // ��ȡ������Ҫ������ӵĲ���
    const sections = document.querySelectorAll('.fullpage-section');

    // Ϊÿ��section����������������û�У�
    sections.forEach((section, index) => {
        // �����������������Ĳ��֣�����banner
        if (section.querySelector('.particles-container') || 
            section.querySelector('.banner-particles') ||
            section.querySelector('#particles-js')) {
            return;
        }

        // ������������
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.id = particles-section-;
        
        // ����������ʽ
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '1';
        particlesContainer.style.pointerEvents = 'none';

