export function modifyPortfolioPage(): void {
    const mainContent = document.querySelector<HTMLElement>('div.span9');
    if (!mainContent) {
        console.error('ETIS 2.1: Main content container (.span9) not found on portfolio page.');
        return;
    }

    const loadImageIcons = mainContent.querySelectorAll<HTMLImageElement>('img[name="load_doc"]');

    if (loadImageIcons.length === 0) {
        return;
    }

    loadImageIcons.forEach((imageIcon) => {
        const buttonIcon = document.createElement('a');
        buttonIcon.className = 'icon-button2';
        buttonIcon.innerText = 'attach_file';

        copyAttribute(imageIcon, buttonIcon, 'name');
        copyAttribute(imageIcon, buttonIcon, 'data-tab');
        copyAttribute(imageIcon, buttonIcon, 'data-term');
        copyAttribute(imageIcon, buttonIcon, 'data-ttp');
        copyAttribute(imageIcon, buttonIcon, 'data-dis');

        const onclickAttr = imageIcon.getAttribute('onclick');
        if (onclickAttr) {
            buttonIcon.setAttribute('onclick', onclickAttr);
        }

        imageIcon.parentElement?.insertBefore(buttonIcon, imageIcon);

        imageIcon.remove();
    });
}

/**
 * Вспомогательная функция для безопасного копирования атрибута с одного элемента на другой.
 * @param sourceElement - Элемент-источник.
 * @param targetElement - Элемент-получатель.
 * @param attributeName - Имя атрибута для копирования.
 */
function copyAttribute(
    sourceElement: Element,
    targetElement: Element,
    attributeName: string,
): void {
    const attributeValue = sourceElement.getAttribute(attributeName);
    if (attributeValue !== null) {
        targetElement.setAttribute(attributeName, attributeValue);
    }
}
