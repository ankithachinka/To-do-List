const addTasks = document.querySelector(".add-tasks");
      const list = document.querySelector(".tasks");
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      function addTask(event) {
        event.preventDefault();
        const text = this.querySelector("[name=task]").value;
        const newTask = { text, done: false };
        tasks.push(newTask);
        populateList(tasks, list);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        this.reset();
      }

      function populateList(tasks = [], list) {
        if (tasks.length === 0) {
          list.innerHTML = `<li style="justify-content:center;">No tasks yet. Add one!</li>`;
          return;
        }

        list.innerHTML = tasks
          .map((task, i) => {
            return `
          <li>
            <input type="checkbox" data-index="${i}" id="task${i}" ${task.done ? "checked" : ""}/>
            <label for="task${i}">${task.text}</label>
            <button class="delete" data-index="${i}">❌</button>
          </li>
          `;
          })
          .join("");
      }

      function deleteTask(e) {
        if (!e.target.matches("button.delete")) return;
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        populateList(tasks, list);
      }

      function toggleDone(e) {
        if (!e.target.matches("input[type='checkbox']")) return;
        const index = e.target.dataset.index;
        tasks[index].done = !tasks[index].done;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        populateList(tasks, list);
      }

      addTasks.addEventListener("submit", addTask);
      list.addEventListener("click", toggleDone);
      list.addEventListener("click", deleteTask);
      populateList(tasks, list);