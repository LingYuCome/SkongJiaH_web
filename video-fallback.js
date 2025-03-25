// 视频Banner后备图片处理
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('banner-video');
    const fallback = document.getElementById('banner-fallback');
    if (!video || !fallback) return;
    let isVideoPlayable = false;
    function showFallbackImage() {
        fallback.style.display = 'block';
        video.style.display = 'none';
    }
    video.addEventListener('playing', function() {
