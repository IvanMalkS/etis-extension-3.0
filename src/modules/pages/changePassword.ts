export function modifyChangePasswordPage(): void {
    const mainContent = document.querySelector<HTMLElement>('div.span9');
    if (!mainContent) {
        console.error(
            'ETIS 2.1: Main content container (.span9) not found on change password page.',
        );
        return;
    }

    const form = mainContent.querySelector<HTMLFormElement>('.form');
    if (!form) return;

    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'items';

    const labels = Array.from(form.querySelectorAll('label'));
    const inputs = Array.from(form.querySelectorAll('input'));

    if (labels.length === 0 || labels.length !== inputs.length) {
        console.error(
            'ETIS 2.1: Mismatch between labels and inputs on change password page, aborting modification.',
        );
        return;
    }

    inputs.forEach((input, index) => {
        input.placeholder = ' ';

        const label = labels[index];

        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'item';

        itemWrapper.appendChild(input);
        itemWrapper.appendChild(label);

        itemsContainer.appendChild(itemWrapper);
    });

    const title = mainContent.querySelector('h3');

    form.innerHTML = '';

    if (title) {
        form.appendChild(title);
    }
    form.appendChild(itemsContainer);
}
