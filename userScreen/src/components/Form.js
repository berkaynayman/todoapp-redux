import { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {addTodoAsync} from "../redux/todos/todosSlice"
import Loading from "./Loading"
import Error from "./Error"


function Form() {
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!title) return
        await dispatch(addTodoAsync({title}))
        setTitle("")
    }

    const addNewTodoLoading = useSelector((state) => state.todos.addNewTodoLoading)
    const error             = useSelector((state) => state.todos.addNewTodoError)

    
    return (
        <>
            { error && <Error message={error} /> }
            
            <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center"}}>
                <input disabled={addNewTodoLoading} value={title} onChange={(e) => setTitle(e.target.value)} className="new-todo" placeholder="What needs to be done?" autoFocus />
                    { addNewTodoLoading && <Loading /> }
            </form>
        </>
    )
}

export default Form
