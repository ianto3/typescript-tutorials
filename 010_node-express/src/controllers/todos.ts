// import {Request, Response, NextFunction} from "express";

// export const createTodo = (req: Request, res: Response, next: NextFunction) => {

// };
import {RequestHandler} from "express";
import {Todo} from "../models/todo";

const TODOS: Todo[] = [];

// Using requestHandler we don't need to specify each parameter's type.
export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text; // Using type casting
    const newTodo = new Todo(String(Math.random()), text );

    TODOS.push(newTodo);
    res.status(201).json({message: "Created the todo.", createdTodo: newTodo})
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.status(201).json({todos: TODOS});
};

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;
    const text = (req.body as {text: string}).text;

    // TODOS.forEach(todo => {
    //     if (todo.id === todoId){
    //         todo.text = text;
    //     }
    // });

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Could not find ToDo.");
    };

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, text);

    res.json({message: "Updated!", updatedTodo: TODOS[todoIndex]});
}

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if(todoIndex < 0){
        throw new Error("Couldn't find the ToDo.")
    };

    const deletedTodo = TODOS.splice(todoIndex, 1);


    res.json({message: "Deleted!", deletedTodo});
}