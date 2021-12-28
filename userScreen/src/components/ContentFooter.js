import { useSelector, useDispatch } from "react-redux";
import { changeActiveFilter, clearCompleted, selectTodos, selectActiveFilter } from "../redux/todos/todosSlice"
function ContentFooter() {
    const dispatch = useDispatch()

    const items = useSelector(selectTodos)
    const itemsLeft = items.filter((item) => !item.completed).length

    const activeFilter = useSelector(selectActiveFilter)

    return (
        <footer className="footer">
            <span className="todo-count">
                <b>{itemsLeft > 0 ? `${itemsLeft} Not Completed` : ""} </b>
            </span>

            <ul className="filters">
                <li>
                    <a className={activeFilter === "all" ? "selected" : ""}
                       onClick={() => dispatch(changeActiveFilter("all"))}>All</a>
                </li>
                <li>
                    <a className={activeFilter === "active" ? "selected" : ""}
                       onClick={() => dispatch(changeActiveFilter("active"))}>Active</a>
                </li>
                <li>
                    <a className={activeFilter === "completed" ? "selected" : ""}
                       onClick={() => dispatch(changeActiveFilter("completed"))}>Completed</a>
                </li>
            </ul>

            <button className="clear-completed"
                    onClick={() => dispatch(clearCompleted())}>
                Clear completed
            </button>
        </footer>
    )
}

export default ContentFooter
