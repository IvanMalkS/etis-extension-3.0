export function modifyChangeEmailPage(): void {
    const mainContent = document.querySelector<HTMLElement>('div.span9');
    if (!mainContent) {
        console.error('ETIS 2.1: Main content container (.span9) not found on change email page.');
        return;
    }

    const form = mainContent.querySelector<HTMLFormElement>('.form');
    const infoBlock = mainContent.querySelector<HTMLElement>('div:not(.form)');
    const title = mainContent.querySelector('h3');

    if (!form || !infoBlock) return;

    infoBlock.className = 'form-info';

    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'items';

    const emailLabel = form.querySelector('label');
    const emailInput = form.querySelector<HTMLInputElement>('#email');

    if (!emailInput || !emailLabel) {
        console.error('ETIS 2.1: Email input or label not found on change email page.');
        return;
    }

    emailInput.placeholder = ' ';

    const itemWrapper = document.createElement('div');
    itemWrapper.className = 'item';

    itemWrapper.appendChild(emailInput);
    itemWrapper.appendChild(emailLabel);

    itemsContainer.appendChild(itemWrapper);

    form.innerHTML = '';

    if (title) {
        form.appendChild(title);
    }

    form.appendChild(infoBlock);
    form.appendChild(itemsContainer);
}
