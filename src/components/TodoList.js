import {useSelector, useDispatch} from 'react-redux'
import {toggle, destroy, selectFilteredTodos} from "../redux/todos/todosSlice"

let filtered = []
function TodoList() {
	const dispatch = useDispatch()
	const filteredTodos = useSelector(selectFilteredTodos)
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
