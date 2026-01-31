import { useEffect } from "react"
import { useState } from "react"
import todoService from "./services/todos"

import DoneList from "./components/DoneList"
import Footer from "./components/Footer"
import PageHeader from "./components/PageHeader"
import TodoForm from "./components/TodoForm"
import TodosList from "./components/TodosList"

const App = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    todoService
      .getAll()
      .then(todosList => {
        setTodos(todosList)
      })
      .catch(error => console.log("Fetching todos failed", error))
  }, [])

  const handleAddTodo = async todo => {
    const addedTodo = await todoService.create(todo)
    setTodos(todos.concat(addedTodo))
  }

  const handleMarkDone = async todo => {
    const updatedTodo = await todoService.setDone(todo)
    setTodos(todos.map(t => (t.id !== todo.id ? t : updatedTodo)))
  }

  return (
    <>
      <PageHeader />
      <TodoForm addTodo={handleAddTodo} />
      <TodosList
        todos={todos.filter(t => t.done === false)}
        onMarkDone={handleMarkDone}
      />
      <DoneList todos={todos.filter(t => t.done === true)} />
      <Footer />
    </>
  )
}

export default App
