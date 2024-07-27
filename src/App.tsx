import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoForm } from "./Todo-Components/index";
import { List } from "./Todo-Components/index";
import { ViewTodo } from "./Todo-Components/index";
import { EditTodo } from "./Todo-Components/index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/form" element={<TodoForm />} />
        <Route path="/edit/:id" element={<EditTodo />} />
        <Route path="/view/:id" element={<ViewTodo />} />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
