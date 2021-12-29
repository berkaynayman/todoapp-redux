import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
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

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: "all",
        addNewTodo:{
            isLoading: false,
            error: null,
        }
    },
    reducers:{
        /*
        destroy: (state, action) => {
            const id = action.payload
            const filtered = state.items.filter((item) => item.id !== id)
            state.items = [...filtered]
        },*/
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter((item) => item.completed == false)
            state.items = filtered
        }

    },
    extraReducers:{
        // get todos
        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoading = false
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        },
        // add todo
        [addTodoAsync.pending]: (state, action) => {
            state.addNewTodo.isLoading = true
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload)
            state.addNewTodo.isLoading = false
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodo.isLoading = false
            state.addNewTodo.error   = action.error.message
        },
        // toggle todo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            const {id, completed} = action.payload
            const index = state.items.findIndex(item => item.id === id)
            state.items[index].completed = completed
        },
        // remove todo
        [removeTodoAsync.fulfilled]: (state, action) => {
            const id = action.payload
            const index = state.items.findIndex(item => item.id === id)
            state.items.splice(index, 1)
            console.log(action.payload);
        }
    }
})

export const selectTodos = (state) => state.todos.items
export const selectFilteredTodos = (state) => {
    if(state.todos.activeFilter === "all"){
        return state.todos.items
    }
    return state.todos.items.filter((todo) => 
        state.todos.activeFilter === "active" ? todo.completed == false : todo.completed == true
    )
}
export const selectActiveFilter = (state) => state.todos.activeFilter


export const {changeActiveFilter, clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;