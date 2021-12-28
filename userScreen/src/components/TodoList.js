import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toggle, destroy, selectFilteredTodos, getTodosAsync} from "../redux/todos/todosSlice"
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
							onChange={() => dispatch(toggle({id: item.id}))}/>
							<label>{item.title}</label>
							<button onClick={() => dispatch(destroy(item.id))} className="destroy"></button>
						</div>
					</li>
				))
			}
		</ul>
    )
}

export default TodoList
