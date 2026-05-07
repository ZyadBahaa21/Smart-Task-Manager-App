 
function buildTaskCardHtml(taskTitle, taskNotes) {
  return `
    <article class="task-card">
      <h2>${taskTitle}</h2>
      <p>${taskNotes}</p>
    </article>
  `;
}

module.exports = {
  buildTaskCardHtml,
};
