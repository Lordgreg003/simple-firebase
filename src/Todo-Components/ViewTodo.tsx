import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig"; // Adjust the import path as needed

interface Todo {
  id: string;
  username: string;
  email: string;
  title: string;
  text: string;
}

const ViewTodo = () => {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        const docRef = doc(db, "todos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTodo({ id: docSnap.id, ...docSnap.data() } as Todo);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchTodo();
  }, [id]);

  if (!todo) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Todo Details</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Title</h3>
        <p className="text-gray-700">{todo.title}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Text</h3>
        <p className="text-gray-700">{todo.text}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Username</h3>
        <p className="text-gray-700">{todo.username}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Email</h3>
        <p className="text-gray-700">{todo.email}</p>
      </div>
    </div>
  );
};

export default ViewTodo;
