import {createSlice} from "@reduxjs/toolkit"
import {getTodosAsync, addTodoAsync, toggleTodoAsync, removeTodoAsync, getTodosNotCompleted} from "./services"


export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: localStorage.getItem('activeFilter'),
        addNewTodo:{
            isLoading: false,
            error: null,
        }
    },
    reducers:{
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
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
        },
        // clear completed
        [getTodosNotCompleted.fulfilled]: (state, action) =>{
            state.items = action.payload
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


export const {changeActiveFilter} = todosSlice.actions;
export default todosSlice.reducer;