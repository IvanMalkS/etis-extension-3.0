import { CLASSES, SELECTORS, PAGES } from '../constants';

export function modifyLoginPage(): void {
    const loginForm = document.querySelector<HTMLFormElement>(SELECTORS.login.form);
    if (!loginForm) {
        return;
    }

    const page = window.location.pathname.split('/').pop() || '';

    if (!document.querySelector(SELECTORS.login.container)) {
        document.body.innerHTML = `<div class="${CLASSES.pages.login.container}">${document.body.innerHTML}</div>`;
    }

    const loginContainer = document.querySelector<HTMLElement>(SELECTORS.login.container);
    const formInContainer = loginContainer?.querySelector<HTMLFormElement>(SELECTORS.login.form);
    const loginItems = formInContainer?.querySelector<HTMLElement>(SELECTORS.login.items);

    if (!loginContainer || !formInContainer || !loginItems) {
        console.error('ETIS 3.0: Failed to find login elements after wrapping body.');
        return;
    }

    const loginActions = document.createElement('div');
    loginActions.className = CLASSES.pages.login.loginActions;
    loginItems.appendChild(loginActions);

    if (page !== PAGES.sendREmail) {
        document.querySelector(SELECTORS.login.optionalChoose)?.remove();

        if (!formInContainer.querySelector(`.${CLASSES.pages.login.psuLogo}`)) {
            const psuLogo = document.createElement('div');
            psuLogo.className = CLASSES.pages.login.psuLogo;
            formInContainer.prepend(psuLogo);
        }

        const forgotPasswordLink = loginItems.querySelector<HTMLAnchorElement>('a');
        if (forgotPasswordLink) {
            forgotPasswordLink.className = CLASSES.pages.login.forgotPassword;
            loginActions.appendChild(forgotPasswordLink);
        }
    }

    const submitButton = document.getElementById(SELECTORS.login.submitButton);
    if (submitButton) {
        loginActions.appendChild(submitButton);
    }

    const items = loginItems.querySelectorAll<HTMLElement>(`div.${CLASSES.pages.announce.item}`);
    items.forEach((item) => {
        const errorMessage = item.querySelector(SELECTORS.login.errorMessage);
        if (errorMessage) {
            loginContainer.prepend(errorMessage);
            item.remove();
        }

        const input = item.querySelector(SELECTORS.common.input);
        if (input) {
            input.placeholder = ' ';
        }

        const label = item.querySelector(SELECTORS.common.label);
        if (label) {
            item.appendChild(label);
        }
    });

    if (page !== PAGES.sendREmail) {
        const infoStr = loginItems.textContent?.split('\n').slice(-3)[0].trim() || '';
        const loginFooter = document.querySelector<HTMLElement>(SELECTORS.login.headerMessage);
        if (loginFooter) {
            loginFooter.className = CLASSES.pages.login.footer;
            loginFooter.innerHTML = `<p>${loginFooter.innerHTML}</p><p>${infoStr}</p>`;
            loginContainer.appendChild(loginFooter);
        }
    }
}
