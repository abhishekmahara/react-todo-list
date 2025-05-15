import { useState } from 'react';
import './List.css';
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

export const List = () => {
  const [inVal, setInVal] = useState("");
  const [task, setTask] = useState([]);
  const [editId, setEditId] = useState(null); // 👈 Track task being edited

  const handleInputChange = (value) => {
    setInVal(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!inVal.trim()) return;

    if (editId) {
      // Update existing task
      const updatedTasks = task.map((item) =>
        item.id === editId ? { ...item, text: inVal } : item
      );
      setTask(updatedTasks);
      setEditId(null); // Exit edit mode
    } else {
      // Prevent duplicate task
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

    setInVal(""); // Reset input
  };

  const taskComplete = (idToCheck) => {
    setTask((prevTask) =>
      prevTask.map((task) =>
        task.id === idToCheck ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteItem = (idDel) => {
    setTask((prev) => prev.filter((task) => task.id !== idDel));
    if (editId === idDel) {
      setEditId(null);
      setInVal("");
    }
  };

  const handleEdit = (idToEdit) => {
    const editTask = task.find((t) => t.id === idToEdit);
    setInVal(editTask.text);
    setEditId(idToEdit);
  };

  return (
    <section>
      <header>
        <h1>TODO LIST</h1>
      </header>

      <section>
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
          {task.map((curTask) => (
            <li key={curTask.id}>
              <span className={curTask.completed ? "completed" : ""}>
                {curTask.text}
              </span>
              <button className="Edit-button" onClick={() => handleEdit(curTask.id)}>
                <MdEdit />
              </button>
              <button className="Check-button" onClick={() => taskComplete(curTask.id)}>
                <FaCheck />
              </button>
              <button className="del-button" onClick={() => deleteItem(curTask.id)}>
                <MdDelete />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};
