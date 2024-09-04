document.addEventListener("DOMContentLoaded", () => {
  // Array of colors for background change
  const colors = [
    "#F0E68C",
    "#FFDAB9",
    "#FFE4B5",
    "#D8BFD8",
    "#B0E0E6",
    "#AFEEEE",
    "#E0FFFF",
    "#98FB98",
    "#FFDEAD",
    "#F5DEB3",
  ];

  let index = 0;

  // Function to change background color with a gradient effect
  const changeBackgroundColor = () => {
    document.body.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length; // Loop back to the start
  };

  // Change color every 2 seconds with a smooth transition
  setInterval(changeBackgroundColor, 2000);
});

let enterButton = document.getElementById("enter");
let askUserButton = document.getElementById("askUser");
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");

function inputLength() {
  return input.value.length;
}

function listLength() {
  return ul.getElementsByTagName("li").length;
}

function createListElement(task) {
  let li = document.createElement("li"); // creates an element "li"
  li.appendChild(document.createTextNode(task)); // makes text from input field the li text

  // Create and add delete button
  let dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("X"));
  dBtn.classList.add("delete-btn"); // Add a class for potential CSS styling
  li.appendChild(dBtn);

  ul.appendChild(li); // adds li to ul
  input.value = ""; // Reset text input field

  // START STRIKETHROUGH
  function crossOut() {
    li.classList.toggle("done");
  }

  li.addEventListener("click", crossOut);
  // END STRIKETHROUGH

  // START DELETE BUTTON FUNCTIONALITY
  dBtn.addEventListener("click", function () {
    ul.removeChild(li); // Remove the list item from the list
  });
  // END DELETE BUTTON FUNCTIONALITY
}

function addTask(task) {
  // Check for duplicate
  let tasks = ul.getElementsByTagName("li");
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].textContent.replace("X", "").trim() === task) {
      alert("Task already exists. Please enter a new task.");
      return false; // Indicates that the task was not added due to duplication
    }
  }
  createListElement(task);
  return true; // Indicates that the task was added successfully
}

function addListAfterClick() {
  if (inputLength() > 0) {
    // makes sure that an empty input field doesn't create a li
    addTask(input.value.trim());
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.which === 13) {
    // this now looks to see if you hit "enter"/"return"
    addTask(input.value.trim());
  }
}

function askUserForTasks() {
  let task;
  do {
    task = prompt("Enter a task:");
    if (task !== null && task.trim() !== "") {
      addTask(task.trim());
    }
  } while (task !== null && task.trim() !== "");
}

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);
askUserButton.addEventListener("click", askUserForTasks);
