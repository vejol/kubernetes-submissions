const DoneList = ({ todos }) => {
  return (
    <>
      <h2>Done</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </>
  )
}

export default DoneList
