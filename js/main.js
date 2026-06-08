/**
 * theick.io – Check Recent Instagram Followers
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {

    /* =========================================
       THEME TOGGLE
       ========================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const iconSun = document.querySelector('.icon-sun');
    const iconMoon = document.querySelector('.icon-moon');

    function updateThemeIcons() {
        const isDark = root.getAttribute('data-theme') === 'dark';
        if (iconSun) iconSun.style.display = isDark ? 'block' : 'none';
        if (iconMoon) iconMoon.style.display = isDark ? 'none' : 'block';
    }

    updateThemeIcons();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcons();
        });
    }

    /* =========================================
       DOWNLOAD BUTTON – AD INTERCEPT LOGIC
       (Matches the microsite ad-click pattern)
       ========================================= */
    const adLink = 'https://theick.io/download';  // Replace with real ad/download URL

    document.querySelectorAll('.xai-dl-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            const isDlPage = btn.getAttribute('data-is-dl-page') === 'true';
            const storageKey = isDlPage ? 'xai_ad_clicked_dl' : 'xai_ad_clicked_home';
            const clicked = localStorage.getItem(storageKey);

            if (!clicked) {
                localStorage.setItem(storageKey, '1');
                window.location.href = adLink;
            } else {
                window.location.href = adLink;
            }
        });
    });

    /* =========================================
       FLOATING WHATSAPP BUTTON
       ========================================= */
    const waBtn = document.getElementById('floating-wa-btn');
    if (waBtn) {
        waBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const url = window.location.href;
            const title = document.title;
            const text = encodeURIComponent('👇 ' + title + '\n' + url);
            window.open('https://api.whatsapp.com/send?text=' + text, '_blank');
        });
    }

    /* =========================================
       SCROLL ANIMATIONS (Intersection Observer)
       ========================================= */
    const animatedEls = document.querySelectorAll(
        '.feature-card, .step-card, .stat-card, .review-card, .update-card, .rating-card, .changelog-card, .dev-card'
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    animatedEls.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });

    /* =========================================
       RATING BAR ANIMATION (on visible)
       ========================================= */
    const ratingFills = document.querySelectorAll('.rating-bar-fill');
    const ratingObs = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const targetWidth = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = targetWidth;
                    }, 100);
                    ratingObs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    ratingFills.forEach((el) => ratingObs.observe(el));

    /* =========================================
       STAT BAR ANIMATION
       ========================================= */
    const statBars = document.querySelectorAll('.stat-bar');
    const statObs = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const targetWidth = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = targetWidth;
                    }, 100);
                    statObs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    statBars.forEach((el) => statObs.observe(el));

    /* =========================================
       SMOOTH ANCHOR SCROLLING
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            if (href.startsWith('#') && !this.classList.contains('xai-dl-btn') && this.id !== 'floating-wa-btn') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    /* =========================================
       LIVE FEED ANIMATION (cyclic blinking)
       ========================================= */
    const feedItems = document.querySelectorAll('.feed-item');
    if (feedItems.length > 0) {
        let idx = 0;
        setInterval(() => {
            feedItems.forEach((el) => el.style.opacity = '0.6');
            feedItems[idx % feedItems.length].style.opacity = '1';
            idx++;
        }, 2500);
    }

    /* =========================================
       HEADER SCROLL SHADOW
       ========================================= */
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
            } else {
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

});
