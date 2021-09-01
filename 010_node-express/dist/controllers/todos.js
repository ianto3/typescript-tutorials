"use strict";
// import {Request, Response, NextFunction} from "express";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
// Using requestHandler we don't need to specify each parameter's type.
const createTodo = (req, res, next) => {
    const text = req.body.text; // Using type casting
    const newTodo = new todo_1.Todo(String(Math.random()), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.status(201).json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const text = req.body.text;
    // TODOS.forEach(todo => {
    //     if (todo.id === todoId){
    //         todo.text = text;
    //     }
    // });
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Could not find ToDo.");
    }
    ;
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, text);
    res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Couldn't find the ToDo.");
    }
    ;
    const deletedTodo = TODOS.splice(todoIndex, 1);
    res.json({ message: "Deleted!", deletedTodo });
};
exports.deleteTodo = deleteTodo;
