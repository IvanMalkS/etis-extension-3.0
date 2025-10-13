export function modifyLoginPage(): void {
    const loginForm = document.querySelector<HTMLFormElement>('#form');
    if (!loginForm) {
        return;
    }

    const page = window.location.pathname.split('/').pop() || '';

    if (!document.querySelector('.login-container')) {
        document.body.innerHTML = `<div class="login-container">${document.body.innerHTML}</div>`;
    }

    const loginContainer = document.querySelector<HTMLElement>('.login-container');
    const formInContainer = loginContainer?.querySelector<HTMLFormElement>('#form');
    const loginItems = formInContainer?.querySelector<HTMLElement>('.items');

    if (!loginContainer || !formInContainer || !loginItems) {
        console.error('ETIS 2.1: Failed to find login elements after wrapping body.');
        return;
    }

    const loginActions = document.createElement('div');
    loginActions.className = 'login-actions';
    loginItems.appendChild(loginActions);

    if (page !== 'stu_email_pkg.send_r_email') {
        document.querySelector('div.choose')?.remove();

        if (!formInContainer.querySelector('.psu-logo')) {
            const psuLogo = document.createElement('div');
            psuLogo.className = 'psu-logo';
            formInContainer.prepend(psuLogo);
        }

        const forgotPasswordLink = loginItems.querySelector<HTMLAnchorElement>('a');
        if (forgotPasswordLink) {
            forgotPasswordLink.className = 'forgot-password';
            loginActions.appendChild(forgotPasswordLink);
        }
    }

    const submitButton = document.getElementById('sbmt');
    if (submitButton) {
        loginActions.appendChild(submitButton);
    }

    const items = loginItems.querySelectorAll<HTMLElement>('div.item');
    items.forEach((item) => {
        const errorMessage = item.querySelector('div.error_message');
        if (errorMessage) {
            loginContainer.prepend(errorMessage);
            item.remove();
        }

        const input = item.querySelector('input');
        if (input) {
            input.placeholder = ' ';
        }

        const label = item.querySelector('label');
        if (label) {
            item.appendChild(label);
        }
    });

    if (page !== 'stu_email_pkg.send_r_email') {
        const infoStr = loginItems.textContent?.split('\n').slice(-3)[0].trim() || '';
        const loginFooter = document.querySelector<HTMLElement>('div.header_message');
        if (loginFooter) {
            loginFooter.className = 'footer';
            loginFooter.innerHTML = `<p>${loginFooter.innerHTML}</p><p>${infoStr}</p>`;
            loginContainer.appendChild(loginFooter);
        }
    }
}
