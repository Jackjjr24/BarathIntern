const taskInput = document.getElementById('taskInput');
const timeInput = document.getElementById('timeInput');
const todoList = document.getElementById('todoList');
const completedList = document.getElementById('completedList');
const dailyRecordsList = document.getElementById('dailyRecordsList');
const incompleteTasksList = document.getElementById('incompleteTasksList');

let timer;

function addTask() {
  const taskText = taskInput.value.trim();
  const deadlineTime = timeInput.value;

  if (!taskText || !deadlineTime) {
    alert('Please fill in both task and deadline fields.');
    return;
  }

  const taskItem = createTaskItem(taskText, deadlineTime);
  todoList.appendChild(taskItem);

  taskInput.value = '';
  timeInput.value = '';

  // Set timer for incomplete tasks
  const deadline = getDeadlineDate(deadlineTime);
  const currentDate = new Date();

  if (deadline > currentDate) {
    const timeDifference = deadline - currentDate;
    timer = setTimeout(() => {
      moveTask(taskItem, todoList, incompleteTasksList);
      recordTask(taskText, 'Incomplete');
    }, timeDifference);
  } else {
    moveTask(taskItem, todoList, completedList);
    recordTask(taskText, 'Completed');
  }
}

function createTaskItem(taskText, deadlineTime) {
  const taskElement = document.createElement('li');
  const deadlineText = ` (Deadline: ${deadlineTime})`;
  taskElement.innerHTML = `${taskText}${deadlineText}`;

  // Create complete button
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Complete';
  completeButton.onclick = function () {
    moveTask(taskElement, todoList, completedList);
    clearTimeout(timer);
    recordTask(taskText, 'Completed');
  };

  // Add button to task element
  taskElement.appendChild(completeButton);

  return taskElement;
}

function moveTask(task, fromList, toList) {
  fromList.removeChild(task);

  // Update task content for completed list
  if (toList === completedList) {
    task.innerHTML = task.textContent.split('(Deadline')[0];
  } else if (toList !== incompleteTasksList) {
    // Add complete button again for incomplete tasks page
    task.appendChild(completeButton.cloneNode(true));
  }

  toList.appendChild(task);
}

function recordTask(taskText, status) {
  const recordItem = document.createElement('li');
  recordItem.textContent = `${taskText} - ${getCurrentDate()} (${status})`;
  dailyRecordsList.appendChild(recordItem);
}

function getDeadlineDate(deadlineTime) {
  const currentDate = new Date();
  const [hours, minutes] = deadlineTime.split(':');
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), parseInt(hours), parseInt(minutes), 0, 0);
}

function getCurrentDate() {
  const currentDate = new Date();
  return currentDate.toLocaleDateString();
}

function showPage(pageId) {
  // Hide all sections
  const sections = document.querySelectorAll('main section');
  sections.forEach(section => section.style.display = 'none');

  // Show the selected section
  document.getElementById(pageId).style.display = 'block';
}
