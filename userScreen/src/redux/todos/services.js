import { createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const { data } = await axios('http://localhost:7000/todos')
    return data
}) 

export const addTodoAsync  = createAsyncThunk('todos/addTodoAsync', async (todo) => {
    const { data } = await axios.post('http://localhost:7000/todos', todo)
    return data
})

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({id, data}) => {
    const res = await axios.patch(`http://localhost:7000/todos/${id}`, data)
    return res.data
})

export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async (id) => {
    await axios.delete(`http://localhost:7000/todos/${id}`)
    return id
})