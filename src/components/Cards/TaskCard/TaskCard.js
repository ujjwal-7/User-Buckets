import React, { useContext, useState } from 'react';
import TaskModal from '../../Modals/TaskModal/TaskModal';
import './TaskCard.css';
import { BoardContext } from '../../../context/boards';


const TaskCard = ({task, id, col, taskIndex}) => {

    const {deleteTask} = useContext(BoardContext);
    const [openModal, setOpenModal] = useState(false);

    const handleClick = (id, col) => {
      deleteTask(id, col);
    }

    const handleOnDrag = (e) => {
      e.dataTransfer.setData(
        "text",
        JSON.stringify({ taskIndex, prevColIndex: col })
      );
    };

    let styles = {
      backgroundColor: '#F88379'
    }

    if(col === 1) {
      styles.backgroundColor = '#FFFF5B';
    } else if(col === 2) {
      styles.backgroundColor = '#7FFC7F';
    }

    
  return (

    <>
      <div className='task-card' style={{backgroundColor: styles.backgroundColor}}
      draggable
      onDragStart={handleOnDrag}
    >
        <div className='task'>
          <p>{task}</p>
        </div>
        
        <div className = 'task-actions' onClick={() => setOpenModal(true)}><i class="material-icons">edit</i></div>
        <div className = 'task-actions' onClick={() => handleClick(id, col)}><i class="material-icons">delete</i></div>
      
    </div>
     <TaskModal isOpen = {openModal} setIsOpen = {setOpenModal} type = {"edit"} taskIndex = {taskIndex} colIndex = {col}/>
    </>
    
  )
}

export default TaskCard