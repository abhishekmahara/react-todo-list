import { useEffect, useState } from 'react';
import './List.css';
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export const List = () => {
  const todoKey = "reactTodo";

  // Initialize task state from localStorage
 const [task, setTask] = useState(() => {

    const rawTodo = localStorage.getItem(todoKey);
    return rawTodo ? JSON.parse(rawTodo) : [];
 
});


  // Input value state
  const [inVal, setInVal] = useState("");

  // Edit task id state
  const [editId, setEditId] = useState(null);

  // DateTime state
  const [dateTime, setDatetime] = useState("");

  // Handle input change
  const handleInputChange = (value) => {
    setInVal(value);
  };

  // Handle form submit (add or update)
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!inVal.trim()) return;

    if (editId) {
      const updatedTasks = task.map((item) =>
        item.id === editId ? { ...item, text: inVal } : item
      );
      setTask(updatedTasks);
      setEditId(null);
    } else {
      if (task.some((t) => t.text === inVal)) {
        setInVal("");
        return;
      }
      const newTask = {
        id: Date.now(),
        text: inVal,
        completed: false,
      };
      setTask((prev) => [...prev, newTask]);
    }

    setInVal("");
  };

  // Toggle task complete
  const taskComplete = (idToCheck) => {
    setTask((prevTask) =>
      prevTask.map((task) =>
        task.id === idToCheck ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteItem = (idDel) => {
    setTask((prev) => prev.filter((task) => task.id !== idDel));
    if (editId === idDel) {
      setEditId(null);
      setInVal("");
    }
  };

  // Handle edit task
  const handleEdit = (idToEdit) => {
    const editTask = task.find((t) => t.id === idToEdit);
    setInVal(editTask.text);
    setEditId(idToEdit);
  };

  // Clear all tasks
  const handleClearData = () => {
    setTask([]);
  };

  // Update date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDatetime(`${formattedDate} - ${formattedTime}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Save tasks to localStorage when task changes
  useEffect(() => {
    localStorage.setItem(todoKey, JSON.stringify(task));
  }, [task]);

  return (
    <section>
      <header>
        <h1>TODO LIST</h1>
        <h2 className='date'>{dateTime}</h2>
      </header>

      <section>
        {/* Form */}
        <form onSubmit={handleFormSubmit}>
          <div>
            <input
              type="text"
              className="todo-input"
              autoComplete="off"
              value={inVal}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter a task"
            />
          </div>
          <div>
            <button type="submit" className="todo-btn">
              {editId ? "Update" : <IoMdAdd />}
            </button>
          </div>
        </form>
      </section>

      <section className="unOrderedList">
        <ul>
          {/* Task list */}
          {task.map((curTask) => (
            <li key={curTask.id}>
              {/* Task text */}
              <span className={curTask.completed ? "completed" : ""}>
                {curTask.text}
              </span>
              {/* Edit button */}
              <button className="Edit-button" onClick={() => handleEdit(curTask.id)}>
                <MdEdit />
              </button>
              {/* Complete toggle button */}
              <button className="Check-button" onClick={() => taskComplete(curTask.id)}>
                <FaCheck />
              </button>
              {/* Delete button */}
              <button className="del-button" onClick={() => deleteItem(curTask.id)}>
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Clear all button */}
      {task.length > 0 && (
        <section>
          <button className="clear-btn" onClick={handleClearData}>
            Clear All
          </button>
        </section>
      )}
    </section>
  );
};
