import React, { useContext } from 'react'
import { useState } from 'react';
import './TaskModal.css';
import { BoardContext } from '../../../context/boards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getTaskName = (type, board, taskIndex, colIndex) => {

    if(type === "add") {
        return "";
    } else if(type === "edit") {
        const tempTasks = board?.columns[colIndex]?.tasks;

        let temp = tempTasks.find((task, i) => {
            return i === taskIndex;
        });

        return temp?.name
    }
    
    
}

const getColumn = (colIndex) => {

   return colIndex.toString();
}

const TaskModal = ({isOpen, setIsOpen, type, taskIndex, colIndex}) => {

    const {addTask, updateTask, boards} = useContext(BoardContext);
    const board = boards.find((board) => board.isActive === true);


    const [taskName, setTaskName] = useState(getTaskName(type, board, taskIndex, colIndex));
    const [selectedOption, setSelectedOption] = useState(type === "add" ? "" : getColumn(colIndex));
    
    if(!isOpen) {
        return null;
    }

    const handleChange = (e) => {
        setTaskName(e.target.value);
        
    }

    function handleSelectChange(e) {

        setSelectedOption(e.target.value)
    }

    const handleSumbit = () => {

        if(taskName === "") {

            setTaskName("");
    
            toast.error("Invalid Task Name", {
                position: "top-center",
                autoClose: 1200
            });
            
            return;
        }

        if(selectedOption === "") {

            setSelectedOption("");
            toast.error("Choose a column", {
                position: "top-center",
                autoClose: 1200
            });
            return;
        }

        if(type === "add") {
            addTask(taskName, selectedOption);
            setTaskName("");
            setSelectedOption("");
        } else {
            updateTask(taskName, selectedOption, colIndex, taskIndex);
        }
        
        
        setIsOpen(false);
    }

    const handleClose = () => {

        if(type === "add") {
            setTaskName("");
            setSelectedOption("");
        }
        
        setIsOpen(false);
        
    }

  return (
    <div className='overlay'>

        {
            boards.length ? 
            (<div className='task-modal'>
                {type === "add" ? <h3>Add New Task</h3> : <h3>Edit Task</h3>}
                <div className='task-name'>
                    <input 
                        type = "text"
                        placeholder='Enter Task'
                        value={taskName}
                        onChange={handleChange}
                    ></input>
                </div>

                <div className='task-status'>
                    <select value={selectedOption} onChange = {handleSelectChange}>

                        <option value="" disabled>Pick a choice</option>
                        <option value="0">Todo</option>
                        <option value="1">On Going</option>
                        <option value="2">Completed</option>
                    </select>
                </div>

                <div className='task-modal-button'>
                    <button className='add-button' onClick={handleSumbit}>Save</button>
                    <button className = 'cancel-button' onClick = {handleClose}>Close</button>
                </div>
            </div>) : 
            (
                <div className='task-modal'>
                    <h3>There is no bucket to add task !</h3>
                    <div id='task-modal-button'>
                        <button className = 'cancel-button' onClick = {handleClose}>Close</button>
                    </div>
                </div>
            )
        }
        
        <ToastContainer/>
    </div>

  )
}

export default TaskModal