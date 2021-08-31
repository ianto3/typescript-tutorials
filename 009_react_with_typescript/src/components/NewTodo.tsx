import React, {useRef} from 'react'
import "./NewTodo.css";

interface NewTodoProps {
    onAddTodo: (todoText: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({onAddTodo}) => {
    const textInput = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (ev: React.FormEvent) => {
        ev.preventDefault();
        const enteredText = textInput.current!.value;
        onAddTodo(enteredText);
    }

    return (
        <form onSubmit={todoSubmitHandler}>
            <div className="form-control">
                <label htmlFor="todo-text">Todo Text</label>
                <input type="text" id="todo-text" ref={textInput} />
            </div>
            <button type="submit">Add Todo</button>
        </form>
    )
}

export default NewTodo
