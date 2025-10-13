export function modifyTeacherNotesPage(): void {
    const weeks = document.querySelector<HTMLElement>('.weeks');
    if (weeks) {
        weeks.classList.add('message-pages');
    }

    const notes = document.querySelectorAll<HTMLElement>('.nav.msg');
    notes.forEach((msg) => {
        msg.classList.add('message');

        if (msg.className.match(/repl_s/)) return;

        const msgHeader = document.createElement('li');
        msgHeader.className = 'message-header';
        msg.insertBefore(msgHeader, msg.children[0]);

        const teacher = msg.querySelector('b');
        const title = msg.querySelector<HTMLElement>('font[style="font-weight:bold"]');
        const time = msg.querySelector<HTMLElement>('font[color="#808080"]');
        if (time) time.innerText = time.innerText.substring(0, time.innerText.length - 3);
        const discipline = msg.querySelector<HTMLElement>(
            'font[title="Показать все сообщения по этой дисциплине"]',
        );

        const mainInfo = document.createElement('div');
        mainInfo.classList.add('message-info', 'main-info');
        const secondaryInfo = document.createElement('div');
        secondaryInfo.classList.add('message-info', 'secondary-info');

        if (teacher) mainInfo.appendChild(teacher);
        if (title) mainInfo.appendChild(title);
        if (time) secondaryInfo.appendChild(time);
        if (discipline) secondaryInfo.appendChild(discipline);
        msgHeader.append(mainInfo, secondaryInfo);

        const brElements = msg.querySelectorAll('li > br');
        [...brElements].slice(0, 3).forEach((br) => br.remove());
        [...brElements].slice(-2).forEach((br) => br.remove());
        const msgBody = msg.querySelectorAll('li')[1];
        if (msgBody) msgBody.innerHTML = msgBody.innerHTML.substring('&nbsp;&nbsp;&nbsp;'.length);

        const answerInput = msg.querySelector<HTMLInputElement>('input[type="button"]');
        if (answerInput) {
            const answerWrapper = document.createElement('li');
            answerWrapper.className = 'answer-wrapper';
            const answerButton = document.createElement('button');

            answerButton.id = answerInput.id;
            answerButton.setAttribute('onclick', answerInput.getAttribute('onclick') || '');
            answerButton.innerText = 'Добавить ответ';
            answerButton.addEventListener('click', () => {
                answerButton.remove();
                answerWrapper.remove();
            });

            answerInput.remove();
            answerWrapper.appendChild(answerButton);
            msg.appendChild(answerWrapper);
        }
    });
}
