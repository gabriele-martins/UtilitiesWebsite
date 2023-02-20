class Task {
  constructor(description) {
    this.description = description;
    this.status = "pending";
  }
}

class TasksLocalStorage {
  constructor(keyName) {
    this.keyName = keyName;
  }

  saveTasks(tasksArray) {
    const stringTasks = JSON.stringify(tasksArray);
    localStorage.setItem(this.keyName, stringTasks);
  }

  getTasks() {
    const stringTasks = localStorage.getItem(this.keyName);
    let tasksLocal;
    if (stringTasks == null) {
      tasksLocal = [];
    } else {
      tasksLocal = JSON.parse(stringTasks);
    }
    return tasksLocal;
  }
}

const form = document.querySelector("#tasks #task-list");
const addButton = document.querySelector("#tasks #add-task #save");
const repository = new TasksLocalStorage("Tasks");
let description = document.querySelector("#description");
let tasks = repository.getTasks();

tasks.forEach((task) => {
  let status = "";
  if (task.status === "checked") {
    status = "checked";
  }

  form.innerHTML += `<div class="task"><input type="checkbox" class="status" name="checkbox" ${status}/><p>${task.description}</p><button id="delete" type="button"><img src="../assets/multiply.svg" alt="trash-icon" /></button></div>`;

  updateDeletes();
  updateStatus();
});

function addTask() {
  let task = new Task(description.value);
  tasks.push(task);
  repository.saveTasks(tasks);

  form.innerHTML += `<div class="task"><input type="checkbox" class="status" name="checkbox" /><p>${description.value}</p><button id="delete" type="button"><img src="../assets/multiply.svg" alt="trash-icon" /></button></div>`;

  updateDeletes();
  updateStatus();
}

function updateDeletes() {
  let deleteButton = document.querySelectorAll("#delete");

  deleteButton.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let div = event.target.parentElement.parentElement;
      let description = div.querySelector("p").innerText;
      form.removeChild(div);
      tasks = tasks.filter((task) => task.description != description);
      repository.saveTasks(tasks);
    });
  });
}

function updateStatus() {
  let statusCheckbox = document.querySelectorAll(".status");

  statusCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("click", (event) => {
      let div = event.target.parentElement;
      console.log(div);
      let description = div.querySelector("p").innerText;
      console.log(description);
      console.log(event.target.checked);
      if (event.target.checked) {
        tasks.find((task) => task.description === description).status =
          "checked";
      } else {
        tasks.find((task) => task.description === description).status =
          "pending";
      }
      repository.saveTasks(tasks);
    });
  });
}

addButton.addEventListener("click", (event) => {
  if (description.value === "") {
    alert("It is not possible to save a task without a description.");
  } else {
    addTask();
  }
});
