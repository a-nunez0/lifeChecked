import goals from './goals.mjs';

const goalList = document.getElementById('goal-list');
const termFilter = document.getElementById('term-filter');

function renderGoals(goalArray) {
  goalList.innerHTML = '';
  goalArray.forEach((goal, index) => {
    const li = document.createElement('li');
    li.classList.add('goal-item');
    li.innerHTML = `
      <div class="goal-header" data-index="${index}">
        <h3>${goal.name}</h3>
      </div>
      <div class="goal-details hidden">
        <p><strong>Term:</strong> ${goal.term}</p>
        <p>${goal.description}</p>
      </div>
    `;
    goalList.appendChild(li);
  });

  document.querySelectorAll('.goal-header').forEach(header => {
    header.addEventListener('click', () => {
      const details = header.nextElementSibling;
      details.classList.toggle('hidden');
    });
  });
}

renderGoals(goals);

// Filter
termFilter.addEventListener('change', () => {
  const selectedTerm = termFilter.value;
  if (selectedTerm === 'All') {
    renderGoals(goals);
  } else {
    const filteredGoals = goals.filter(goal => goal.term === selectedTerm);
    renderGoals(filteredGoals);
  }
});

const addBtn = document.getElementById('add-btn');
const modal = document.getElementById('goal-modal');
const closeBtn = document.querySelector('.close-btn');
const goalForm = document.getElementById('goal-form');
const successMsg = document.getElementById('success-msg');

// Show message
addBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  successMsg.classList.add('hidden');
  goalForm.reset();
});

// Close
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  successMsg.classList.add('hidden');
});

// Fake submission
goalForm.addEventListener('submit', (e) => {
  e.preventDefault();

  successMsg.classList.remove('hidden');

  // close form after 2 seconds
  setTimeout(() => {
    successMsg.classList.add('hidden');
    modal.classList.add('hidden');
  }, 2000);
});
