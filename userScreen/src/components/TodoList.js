import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {selectFilteredTodos} from "../redux/todos/todosSlice"
import {getTodosAsync, toggleTodoAsync, removeTodoAsync} from "../redux/todos/services"
import Loading from './Loading'
import Error from './Error'

let filtered = []
function TodoList() {
	const dispatch = useDispatch()
	const filteredTodos = useSelector(selectFilteredTodos)

	const isLoading = useSelector((state) => state.todos.isLoading)
	const error 	= useSelector((state) => state.todos.error)

	useEffect(() =>{
		dispatch(getTodosAsync())
	}, [])

	const handleDestroy = async (id) => {
		await dispatch(removeTodoAsync(id))
	}

	const handleToggle = async (id, completed) => {
		await dispatch(toggleTodoAsync({id, data: {completed}}))
	}

	if(error) {
		return <Error message={error}/>
	}
	if (isLoading) {
		return <Loading />
	}

    return (
        <ul className="todo-list">
			{
				filteredTodos.map(item => (
					<li key={item.id} className={item.completed ? 'completed' : ''}>
						<div className="view">
							<input className="toggle" type="checkbox"
							checked={item.completed}
							onChange={() => handleToggle(item.id, !item.completed)}/>
							<label>{item.title}</label>
							<button onClick={() => handleDestroy(item.id)} className="destroy"></button>
						</div>
					</li>
				))
			}
		</ul>
    )
}

export default TodoList
