export function modifyTimetablePage(): void {
    const mainContent = document.querySelector<HTMLElement>('div.span9');
  if (!mainContent) {
    console.error('ETIS 2.1: Main content container (.span9) not found on timetable page.');
    return;
  }

  const buttonbar = document.createElement('div');
  buttonbar.className = 'timetable-buttonbar';

  mainContent.prepend(buttonbar);

  const consultations = mainContent.querySelector('div.consultations');
  if (consultations) {
    consultations.classList.add('timetable-btn');
    buttonbar.appendChild(consultations);
  } else {
    const oldConsultations = mainContent.querySelector('div:nth-child(6)');
    if (oldConsultations) {
      oldConsultations.className = 'timetable-btn consultations';
      buttonbar.appendChild(oldConsultations);
    }
  }
  
  const feedbackLink = mainContent.querySelector<HTMLAnchorElement>('a.estimate_tt');
  if (feedbackLink) {
    feedbackLink.className = 'timetable-btn icon-button icon-feedback';
    feedbackLink.innerText = 'Оставить отзыв';
    buttonbar.appendChild(feedbackLink);
  }
  
  const todayLink = mainContent.querySelector<HTMLAnchorElement>('a[href*="p_what=1"]');
  if (todayLink) {
    todayLink.className = 'timetable-btn icon-button icon-today';
    buttonbar.appendChild(todayLink);
  }

  const pairs = mainContent.querySelectorAll<HTMLTableRowElement>("div.day > table > tbody > tr");
  pairs.forEach(pair => {
   const teacherSpan = pair.querySelector<HTMLElement>('span.teacher');
    
    if (teacherSpan) {
     const pairTeacherCell = document.createElement('td');
      pairTeacherCell.className = 'pair_teacher';
      pairTeacherCell.innerHTML = teacherSpan.innerHTML;
      
      pair.appendChild(pairTeacherCell);
      
      pair.querySelector('td.pair_jour')?.remove();
      
      teacherSpan.remove();
    }
  });
}