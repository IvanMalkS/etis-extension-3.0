export function modifyCertificatesPage(): void {
    const mainContent = document.querySelector<HTMLElement>('div.span9');
    if (!mainContent) {
        console.error('ETIS 2.1: Main content container (.span9) not found on certificates page.');
        return;
    }

    const certificateInfo = mainContent.querySelector<HTMLElement>('span[style*="color:#00b050"]');
    if (certificateInfo) {
        certificateInfo.className = 'certificates-info';
    }

    const orderBlocks = mainContent.querySelectorAll<HTMLElement>('.ord-name');
    orderBlocks.forEach((orderBlock) => {
        const imageIcon = orderBlock.querySelector('img');
        if (imageIcon) {
            const buttonIcon = document.createElement('a');
            buttonIcon.className = 'icon-button2';
            buttonIcon.innerText = 'description';

            const onclickAttr = imageIcon.getAttribute('onclick');
            if (onclickAttr) {
                buttonIcon.setAttribute('onclick', onclickAttr);
            }
            buttonIcon.title = imageIcon.title;

            imageIcon.remove();
            orderBlock.prepend(buttonIcon);
            orderBlock.classList.add('flex-row');
        }
    });

    const blueLinks = mainContent.querySelectorAll<HTMLElement>('font[color="blue"]');
    blueLinks.forEach((fontElement) => {
        const imageIcon = mainContent.querySelector<HTMLImageElement>(
            'img[src="/etis/pic/text-2.png"]',
        );
        if (imageIcon) {
            const buttonIcon = document.createElement('a');
            buttonIcon.className = 'icon-button2';
            buttonIcon.innerText = 'description';

            const onclickAttr = imageIcon.getAttribute('onclick');
            if (onclickAttr) {
                buttonIcon.setAttribute('onclick', onclickAttr);
            }
            buttonIcon.title = imageIcon.title;

            imageIcon.remove();
            fontElement.append(buttonIcon);
            fontElement.classList.add('flex-row');
        }
    });
}
