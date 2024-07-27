// firestoreService.ts
import { db } from "./firebaseconfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Todo } from "./types";

const todosCollection = collection(db, "todos");

export const addTodo = async (todo: Omit<Todo, "id">) => {
  try {
    await addDoc(todosCollection, todo);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getTodos = async (userId: string): Promise<Todo[]> => {
  const snapshot = await getDocs(todosCollection);
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Todo) }))
    .filter((todo) => todo.userId === userId);
};

export const getTodoById = async (id: string): Promise<Todo | null> => {
  const todoDoc = doc(db, "todos", id);
  const docSnap = await getDoc(todoDoc);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...(docSnap.data() as Todo) };
  } else {
    console.log("No such document!");
    return null;
  }
};

export const updateTodo = async (id: string, updatedTodo: Partial<Todo>) => {
  const todoDoc = doc(db, "todos", id);
  try {
    await updateDoc(todoDoc, updatedTodo);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const deleteTodo = async (id: string) => {
  const todoDoc = doc(db, "todos", id);
  try {
    await deleteDoc(todoDoc);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
