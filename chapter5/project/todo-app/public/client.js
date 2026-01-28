const todos = []

const getTodos = () => {
  fetch(`/todos`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error while fetching todos")
      }
      return response.json()
    })
    .then(data => {
      todos.push(...data)
      redrawTodos()
    })
    .catch(error => {
      console.error("Error while fetching todos from server:", error)
    })
}

const redrawTodos = () => {
  const ul = document.createElement("ul")
  ul.setAttribute("class", "todos")

  todos.forEach(todo => {
    const li = document.createElement("li")
    li.appendChild(document.createTextNode(todo.content))
    ul.appendChild(li)
  })
  const todosElement = document.getElementById("todos_list")

  if (todosElement.hasChildNodes()) {
    todosElement.removeChild(todosElement.childNodes[0])
  }
  todosElement.appendChild(ul)
}

const addTodo = todo => {
  fetch(`/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error while creating new todo")
      }
      return response.json()
    })
    .then(data => {
      todos.push(data)
      redrawTodos()
    })
    .catch(error => {
      console.error("Error while creating new todo:", error)
    })
}

document.addEventListener("DOMContentLoaded", () => {
  getTodos()

  const form = document.getElementById("todos_form")
  form.onsubmit = e => {
    e.preventDefault()

    const input = document.getElementById("content")
    const todo = {
      content: input.value,
    }

    addTodo(todo)
    input.value = ""
  }
})
