import { useState } from 'react';
import './List.css';
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";


 export const List=()=> {

  const [inVal ,setInVal] =  useState("") ;
  const [task, setTask] = useState([]);
  console.log("thisis task", task);
  

  const handleInputChange  =(value) =>{
    setInVal(value);
  };

  const handleFormSubmit = (event) =>{
    event.preventDefault();

    if(!inVal) return;

    if(task.some(t => t.text === inVal)) {
      setInVal("");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inVal,
      completed:false
    }

    setTask((preTask)=> [...preTask,newTask]) ;
    setInVal("");
  };
  
  const taskComplete =(idToCheck)=>{
    setTask((preTask)=> preTask.map((task)=> task.id === idToCheck ? {...task, completed: !task.completed} : task))
  }
  const deleteItem =(idDel)=>{
    setTask((preTask)=> preTask.filter(task => task.id !== idDel))
  }

  return ( 
   <section>
    <header>
      <h1>TODO LIST</h1>
    </header>
    <section>
      <form onSubmit={handleFormSubmit} >
        <div>
          <input type="text" className='todo-input' autoComplete='off'  value={inVal} onChange={(event) => handleInputChange(event.target.value) } />
        </div>
        <div>
          <button type='submit' className='todo-btn'> <IoMdAdd /> </button>
        </div>
      </form>
    </section>
    <section className='unOrderedList'>
    <ul>
  { 
    task.map((curTask, index) => {
      return (
        <li key={index}>
          <span className={curTask.completed ? 'completed' : ''}>{curTask.text}</span>
          <button className='Check-button' onClick={()=>taskComplete(curTask.id)}><FaCheck /></button>
          <button className='del-button' onClick={()=>deleteItem(curTask.id)}><MdDelete /></button>
        </li>
      );
    })
  }
</ul>

    </section>
   </section>
  )
}

