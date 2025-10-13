export function modifyTeachersPage(): void {
    const mainContent = document.querySelector<HTMLElement>('div.span9');
    if (!mainContent) return;

    const analyticsLink = mainContent.querySelector<HTMLAnchorElement>('a');
    if (analyticsLink) {
        analyticsLink.className = 'icon-button icon-analytics';
    }

    const descriptions = mainContent.querySelectorAll<HTMLElement>('.teacher_desc');
    descriptions.forEach((desc) => {
        const name = desc.querySelector<HTMLElement>('.teacher_name');
        const nameImg = name?.querySelector('img');
        if (name && nameImg) {
            const btn = document.createElement('a');
            btn.className = 'icon-button2';
            btn.innerText = 'today';
            btn.setAttribute('onclick', nameImg.getAttribute('onclick') || '');
            btn.title = nameImg.title;
            nameImg.remove();
            name.appendChild(btn);
        }

        const chair = desc.querySelector<HTMLElement>('.chair');
        const chairImg = chair?.querySelector('img');
        if (chair && chairImg) {
            const btn = document.createElement('a');
            btn.className = 'icon-button2';
            btn.innerText = 'today';
            btn.setAttribute('onclick', chairImg.getAttribute('onclick') || '');
            btn.title = chairImg.title;
            chairImg.remove();
            chair.appendChild(btn);
        }
    });
}
