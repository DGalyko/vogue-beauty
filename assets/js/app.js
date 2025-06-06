const setMargin = () => {
    const container = document.querySelector('.container');
    const block = document.querySelector('.main__description_right');

    if (container && block) {
        const containerStyles = getComputedStyle(container);
        const marginRight = containerStyles.marginRight;
        block.style.right = marginRight;
    }
};

setMargin();

window.addEventListener('resize', setMargin);

const setList = () => {
    const isDesktop = () => window.innerWidth >= 1024;
    const getPadding = () => isDesktop() ? '40px 0' : '18px 0';
    const getTitlePaddingTop = () => isDesktop() ? '40px' : '18px';

    document.querySelectorAll('.list__title').forEach(title => {
        title.addEventListener('click', () => {
            const item = title.parentElement;
            const body = item.querySelector('.list__body');
            const isExpanded = item.classList.contains('active');

            document.querySelectorAll('.list__item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.list__body').style.cssText = 'max-height: 0; padding: 0;';
                const t = i.querySelector('.list__title');
                t.classList.remove('active');
                t.style.paddingTop = '';
            });

            if (isExpanded) return;

            item.classList.add('active');
            body.style.padding = getPadding();

            requestAnimationFrame(() => {
                body.style.maxHeight = body.scrollHeight + 'px';
            });

            setTimeout(() => {
                const offset = 10;
                const titleTop = title.getBoundingClientRect().top + window.scrollY + offset;
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                const scrollToY = Math.min(titleTop, maxScroll);

                window.scrollTo({
                    top: scrollToY,
                    behavior: 'smooth'
                });
            }, 550);

            title.classList.add('active');
            title.style.paddingTop = getTitlePaddingTop();
        });
    });
};

setList();




