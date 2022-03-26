var eAddTodo = document.querySelector(".todo-list__fotter span");
var eCloseTodo = document.querySelector(".todo-list__input span");
var eTodoInput = document.querySelector(".todo-list__input");

eAddTodo.onclick = function () {
    eTodoInput.classList.add("todo-list__input--active");
}

eCloseTodo.onclick = function () {
    eTodoInput.classList.remove("todo-list__input--active");
}