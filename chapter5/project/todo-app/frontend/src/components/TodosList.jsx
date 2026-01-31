const TodosList = ({ todos, onMarkDone }) => {
  return (
    <>
      <h2>Todo</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.content}
            <button onClick={() => onMarkDone(todo)}>Mark as done</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodosList
