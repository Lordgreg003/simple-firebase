import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig"; // Adjust the import path as needed

const EditTodo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<any | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const docRef = doc(db, "todos", id || "");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const todoData = docSnap.data();
          setTodo(todoData);
          setUsername(todoData.username);
          setEmail(todoData.email);
          setTitle(todoData.title);
          setText(todoData.text);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching todo: ", error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "todos", id || "");
      await updateDoc(docRef, {
        username,
        email,
        title,
        text,
      });
      alert("Todo updated successfully!");
      navigate("/"); // Redirect to the list or home page
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
    >
      <h2 className="text-3xl font-bold mb-4">Edit Todo</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="text" className="block text-gray-700">
          Text
        </label>
        <textarea
          id="text"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Update Todo
      </button>
    </form>
  );
};

export default EditTodo;
