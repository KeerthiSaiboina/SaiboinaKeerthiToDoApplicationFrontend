import "./styles.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = (task) => {
    axios
      .post("http://localhost:5000/api/tasks", task)
      .then((response) => setTasks([...tasks, response.data]));
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)));
  };

  const toggleComplete = (id) => {
    axios
      .patch(`http://localhost:5000/api/tasks/${id}`)
      .then((response) =>
        setTasks(tasks.map((task) => (task._id === id ? response.data : task)))
      );
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
