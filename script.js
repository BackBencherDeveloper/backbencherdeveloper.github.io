const countValue=document.getElementById("countvalue");
var taskListArray=[];
let taskCount=taskListArray.length;
var isLocalDataPressent=localStorage.getItem("todoTaskList");
if (isLocalDataPressent!==null){
    taskListArray=JSON.parse(isLocalDataPressent);
    taskCount=taskListArray.length
    renderTaskList();
}
function saveTask() {
    event.preventDefault();
    let newTaskInput = document.getElementById("taskinput").value;
    let pattern = /^[a-zA-Z0-9][a-zA-Z0-9\s]{1,}$/;
    if (pattern.test(newTaskInput) && newTaskInput.length>=3) {
        var todoObj = {
            taskId: taskListArray.length + 1,
            taskName: newTaskInput
        }
        taskListArray.push(todoObj);
        localStorage.setItem("todoTaskList", JSON.stringify(taskListArray));
        renderTaskList();
    } else {
        alert("Input should not start from any special symbol and should have atleast 3 characters");
    }
}

function renderTaskList(){
    taskCount=taskListArray.length
    var lengthofarray=taskListArray.length
    document.getElementById("myTaskList").innerHTML="";
    for(var index=0;index<lengthofarray ; index++){
        
        var dynamicLi=document.createElement("li");
        dynamicLi.classList.add("task");
        dynamicLi.style.listStyle = "none";
        var myLabel=document.createElement("label");
        var myPara=document.createElement("p");
        myPara.textContent=taskListArray[index].taskName;
        myLabel.appendChild(myPara);
        dynamicLi.appendChild(myLabel);

        var myDiv=document.createElement("div");
        myDiv.classList.add("settings");

        var taskCheckbox = document.createElement("input");
        taskCheckbox.classList.add("Check-box");
        taskCheckbox.type = "checkbox";
        taskCheckbox.classList.add("task-checkbox");
        taskCheckbox.addEventListener("change",checKBoxUtility);
        taskCheckbox.taskId=taskListArray[index].taskId;
        dynamicLi.taskId=taskListArray[index].taskId;
        if (taskListArray[index].completed) {
            taskCheckbox.checked = true;
            dynamicLi.style.backgroundColor = "lightblue";
            

        }else{
            taskCheckbox.checked = false;
        }
        if (taskCheckbox.checked==true){
            taskCount-=1
        }
        var editIcon=document.createElement("i");
        editIcon.classList.add("fa-regular");
        editIcon.classList.add("fa-pen-to-square");
        editIcon.classList.add("fa-2xl");
        editIcon.classList.add("edit");
        editIcon.addEventListener("click",editTask);
        editIcon.taskId=taskListArray[index].taskId;
        
        
        var deleteIcon=document.createElement("i");    
        deleteIcon.classList.add("fa-solid");
        deleteIcon.classList.add("fa-delete-left");
        deleteIcon.classList.add("fa-2xl");
        deleteIcon.classList.add("delete");
        deleteIcon.addEventListener("click",deleteTask);
        deleteIcon.taskId=taskListArray[index].taskId

        

        myDiv.appendChild(taskCheckbox);
        myDiv.appendChild(editIcon);
        myDiv.appendChild(deleteIcon);
        dynamicLi.appendChild(myDiv);
        document.getElementById("myTaskList").appendChild(dynamicLi);
    }
    countValue.innerText=taskCount;
}
function deleteTask(event){
    var index= taskListArray.findIndex(m=>m.taskId==event.target.taskId);
    taskListArray.splice(index,1);
    localStorage.setItem("todoTaskList",JSON.stringify(taskListArray));
    renderTaskList();
}
function editTask(event) {
    // Get the task element
    var taskElement = event.target.parentElement.parentElement;
    var taskId = event.target.taskId;
    
    // Find the task object
    var taskIndex = taskListArray.findIndex(m => m.taskId == taskId);
    var task = taskListArray[taskIndex];

    // Create an input field for editing
    var inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = task.taskName;
    inputField.classList.add("editInput");

    // Replace the task name with the input field
    var label = taskElement.querySelector("label");
    label.textContent = ""; // Clear the label content
    label.appendChild(inputField);

    // Add an event listener to save the edited task on Enter key press
    inputField.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            var editedTaskName = inputField.value.trim();
            let pattern = /^[a-zA-Z0-9][a-zA-Z0-9\s]{1,}$/;
            // Check if the edited task name is valid (at least 2 characters)
            if (pattern.test(editedTaskName) && editedTaskName.length >= 3) {
                task.taskName = editedTaskName;
                localStorage.setItem("todoTaskList", JSON.stringify(taskListArray));
                renderTaskList();
            } else {
                alert("Input should not start from any special symbol and should have atleast 3 characters");
            }
        }
    });

    // Focus on the input field for editing
    inputField.focus();
}
function checKBoxUtility(event) {
    var taskId = event.target.parentElement.parentElement.querySelector(".edit").taskId;
    var taskIndex = taskListArray.findIndex(m => m.taskId == taskId);
    taskListArray[taskIndex].completed = event.target.checked;

    // Update the background color based on checkbox state
    var taskElement = event.target.parentElement.parentElement;
    if (event.target.checked) {
        taskElement.style.backgroundColor = "lightblue";
    } else {
        taskElement.style.backgroundColor = "violet";
    }
    if (event.target.checked) {
        taskElement.classList.remove("hover-effect");
    } else {
        taskElement.classList.add("hover-effect");
    }

    localStorage.setItem("todoTaskList", JSON.stringify(taskListArray));
    renderTaskList()
}
function removeAll(){
    taskListArray.splice(0);
    localStorage.setItem("todoTaskList",JSON.stringify(taskListArray));
    renderTaskList()
}
