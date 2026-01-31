import axios from "axios"

const baseUrl = "/todos"

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const create = async content => {
  const newTodo = {
    content,
    done: false,
  }

  const result = await axios.post(baseUrl, newTodo)
  return result.data
}

const setDone = async todo => {
  const updatedTodo = { ...todo, done: true }
  const result = await axios.put(`${baseUrl}/${updatedTodo.id}`, updatedTodo)
  return result.data
}

export default { create, getAll, setDone }
