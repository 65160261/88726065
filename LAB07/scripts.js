document.addEventListener("DOMContentLoaded",function() {
    const todoList = document.getElementById("todo-list");
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");

    let todos = []; //สร้าง Array สำหรับเก็บข้อมูล
    // เป็นฟังก์ชันที่ใช้เก็บข้อมูลที่ผู้ใช้ป้อนเข้ามา หากไม่มีการป้อนข้อมูลจะไม่แสดงข้อมูลว่าง หากมีการป้อนข้อมูลจะมีการนำขึ้นมาแสดงโดยเรียงลำดับจากข้อมูลที่ป้อนมาก่อน เรียงไปยังข้อมูลที่ป้อนมาล่าสุด
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            const todoItem = {
                text: todoText,
                completed: false,
            };
            todos.push(todoItem);
            renderTodoList();
            todoInput.value = "";
        }
    }
    // เป็นฟังก์ชันใช้สำหรับลบข้อมูล Todo ที่ผู้ใช้ไม่ต้องการแล้ว ออกจาก Array
    function deleteTodo(index) {
        todos.splice(index,1);
        renderTodoList();
    }
    // ฟังก์ชันการตรวจสอบ การเสร็จสิ้น/ยกเลิกรายการ Todo
    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        renderTodoList();
    }
    // ฟังก์ชันแสดงรายการ Todo บนหน้าเว็บ 
    function renderTodoList() {
        console.log(todos);
        todoList.innerHTML = "";

        for(let i = 0; i < todos.length; i++) {
            const todoItem = todos[i];
            const listItem = document.createElement("li");
            listItem.textContent = todoItem.text;
            if(todoItem.completed) {
                listItem.classList.add("completed");
            }
            // ปุ่มสำหรับลบรายการ Todo ที่ไม่ต้องการแล้ว
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "ลบ";
            deleteButton.addEventListener("click", () => deleteTodo(i));
            // ปุ่มสำหรับตรวจสอบรายการสำเร็จ/ยกเลิก
            const completeButton = document.createElement("button");
            completeButton.textContent = todoItem.completed ? "ยกเลิก" : "เสร็จ";
            completeButton.addEventListener("click", () => toggleComplete(i));
            listItem.appendChild(completeButton);
            listItem.appendChild(deleteButton);
            todoList.appendChild(listItem);
        }
    }
    // การเพิ่มปุ่มกด เพิ่ม
    addButton.addEventListener("click", addTodo);
    // การยันยืนการกด enter ในการ input ข้อมูล
    todoInput.addEventListener("keypress", function(event) {
        if(event.key === "Enter") {
            addTodo();
        }
    });
    // แสดงรายการ Todo 
    renderTodoList();
});