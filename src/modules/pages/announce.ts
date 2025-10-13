export function modifyAnnouncementsPage(): void {
  const messages = document.querySelectorAll<HTMLElement>('.nav.msg');

  messages.forEach(msg => {
    msg.classList.add('message');

    const msgHeader = document.createElement('li');
    msgHeader.className = 'message-header';
    msg.prepend(msgHeader);

    const title = msg.querySelector<HTMLElement>('font[style="font-weight:bold"]');
    const time = msg.querySelector<HTMLElement>('font[color="#808080"]');
    if (time) {
        time.innerText = time.innerText.substring(0, time.innerText.length - 3);
    }

    if (title) msgHeader.appendChild(title);
    else msgHeader.appendChild(document.createElement('font')); 

    if (time) msgHeader.appendChild(time);

    const brElements = msg.querySelectorAll('li > br');
    if (brElements.length >= 2) {
        brElements[0].remove();
        brElements[1].remove();
    }
  });
}