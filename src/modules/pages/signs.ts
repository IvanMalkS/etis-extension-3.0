const tooltipElement = document.createElement('div');
tooltipElement.className = 'sign-tooltip';

const tooltipTriangle = createTooltipTriangle();

const tooltipWrapper = document.createElement('div');
tooltipWrapper.className = 'sign-tooltip-wrapper';
tooltipWrapper.append(tooltipElement, tooltipTriangle);

let activeTooltipTarget: HTMLElement | null = null;

/**
 * Создает SVG-элемент для треугольника под тултипом.
 * @returns {SVGSVGElement} Готовый SVG-элемент.
 */
function createTooltipTriangle(): SVGSVGElement {
    const xmlns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(xmlns, 'svg');
    svg.setAttributeNS(null, 'width', '15');
    svg.setAttributeNS(null, 'height', '9');
    svg.setAttributeNS(null, 'viewBox', '0 0 15 9');
    svg.setAttributeNS(null, 'fill', 'none');
    svg.classList.add('sign-tooltip-triangle');

    const path = document.createElementNS(xmlns, 'path');
    path.setAttributeNS(
        null,
        'd',
        'M6.79289 7.79289L0.707107 1.70711C0.0771419 1.07714 0.523308 0 1.41421 0H13.5858C14.4767 0 14.9229 1.07714 14.2929 1.70711L8.20711 7.79289C7.81658 8.18342 7.18342 8.18342 6.79289 7.79289Z',
    );
    path.classList.add('tooltipTriangle');
    svg.appendChild(path);

    return svg;
}

/**
 * Показывает и позиционирует тултип относительно целевого элемента.
 * @param {MouseEvent} event - Событие мыши.
 */
function renderTooltip(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;

    if (activeTooltipTarget === target) return;

    activeTooltipTarget = target;

    const link = target.querySelector('a');
    const tooltipText = link?.dataset.tooltip;

    if (!tooltipText) return;

    tooltipElement.innerText = tooltipText;

    const theme = document.documentElement.getAttribute('theme');
    const trianglePath = tooltipTriangle.querySelector<SVGPathElement>('.tooltipTriangle');
    if (trianglePath) {
        trianglePath.setAttributeNS(null, 'fill', theme === 'dark' ? '#333333' : '#F6F6F6');
    }

    document.body.appendChild(tooltipWrapper);

    const coords = target.getBoundingClientRect();
    const wrapperWidth = tooltipWrapper.offsetWidth;
    const wrapperHeight = tooltipWrapper.offsetHeight;

    const left = coords.left + coords.width / 2 - wrapperWidth / 2;
    let top = coords.top - wrapperHeight;

    if (top < 0) {
        top = coords.top + target.offsetHeight;
        tooltipTriangle.style.transform = 'scale(1, -1)';
        tooltipWrapper.style.flexDirection = 'column-reverse';
    } else {
        tooltipTriangle.style.transform = 'scale(1, 1)';
        tooltipWrapper.style.flexDirection = 'column';
    }

    tooltipWrapper.style.left = `${left}px`;
    tooltipWrapper.style.top = `${top}px`;
}

function removeTooltip(): void {
    activeTooltipTarget = null;
    tooltipWrapper.remove();
}

export function modifySignsPage(): void {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('p_mode') !== 'current') {
        return;
    }

    const signTables = document.querySelectorAll<HTMLTableElement>('table.common');
    if (signTables.length === 0) return;

    signTables.forEach((table) => {
        const themeLinks = table.querySelectorAll<HTMLAnchorElement>('a');

        themeLinks.forEach((link, index) => {
            if (!link.href || !link.href.includes('stu.theme')) {
                return;
            }

            link.dataset.tooltip = link.innerText;

            link.innerHTML = `КТ ${index + 1}`;

            const parentCell = link.parentElement as HTMLTableCellElement | null;
            if (parentCell) {
                parentCell.addEventListener('mouseover', renderTooltip);
                parentCell.addEventListener('mouseout', removeTooltip);
            }
        });
    });

    document.addEventListener('wheel', removeTooltip, { passive: true });
}
