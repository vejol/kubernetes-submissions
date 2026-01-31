import { useState } from "react"

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState("")

  const onSubmit = async event => {
    event.preventDefault()
    addTodo(todo)
    setTodo("")
  }

  return (
    <form onSubmit={onSubmit}>
      <input value={todo} onChange={e => setTodo(e.target.value)} />
      <button type="submit">Create todo</button>
    </form>
  )
}

export default TodoForm
