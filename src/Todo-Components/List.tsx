import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseconfig"; // Adjust the import path as needed
import { Link, useNavigate } from "react-router-dom";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const todosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodos(todos.filter((todo) => todo.id !== id));
      alert("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Todos</h2>
        <Link
          to="/form"
          className="inline-block bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Create
        </Link>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="mb-2 p-4 border border-gray-300 rounded-md"
          >
            <h3 className="text-xl font-semibold">{todo.title}</h3>
            <p className="text-gray-700">{todo.text}</p>
            <div className="flex space-x-2 mt-2">
              <Link
                to={`/view/${todo.id}`}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                View Todo
              </Link>
              <Link
                to={`/edit/${todo.id}`}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
