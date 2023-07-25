import React from 'react';
import { BoardContext } from '../../context/boards';
import './Boards.css';
import { useContext } from 'react';
import TaskCard from '../Cards/TaskCard/TaskCard';

const Boards = () => {

  const {boards, dragTask} = useContext(BoardContext);


  if(boards.length === 0) {

    return <div className='empty'>

              <h1>Make a bucket!</h1>
          </div>
  }

  const board = boards.find((board) => board.isActive === true);
  const columns = board?.columns;

  const todo = columns[0].tasks;
  const onGoing = columns[1].tasks;
  const completed = columns[2].tasks;

  const handleOnDrop = (colIndex, prevColIndex, taskIndex) => {

    

    if (colIndex !== prevColIndex) {
      
      dragTask(colIndex, prevColIndex, taskIndex)
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };
  


  return (
    <div className='boards'>
            
            
            <div className='task-list'
              onDrop={(e) => {

                const { prevColIndex, taskIndex } = JSON.parse(
                  e.dataTransfer.getData("text")
                );
                handleOnDrop(0, prevColIndex, taskIndex)
              }}
              onDragOver={handleOnDragOver}
            >
              <h2>Todo</h2>
              
              {
                todo.map((task, index) => {
                  return <TaskCard key = {task.id} task = {task.name} id = {task.id} col = {0} taskIndex = {index}/>
                })
              }

             
              
            </div>

            <div className='task-list'
              onDrop={(e) => {

                const { prevColIndex, taskIndex } = JSON.parse(
                  e.dataTransfer.getData("text")
                );
                handleOnDrop(1, prevColIndex, taskIndex)
              }}
              onDragOver={handleOnDragOver}
            >
              <h2>Ongoing</h2>

              {
                onGoing.map((task, index) => {
                  return <TaskCard key = {task.id} task = {task.name} id = {task.id} col = {1} taskIndex = {index}/>
                })
              }

              
              
            </div>

            <div className='task-list'
              onDrop={(e) => {

                const { prevColIndex, taskIndex } = JSON.parse(
                  e.dataTransfer.getData("text")
                );
                handleOnDrop(2, prevColIndex, taskIndex)
              }}
              onDragOver={handleOnDragOver}
            >
              <h2>Completed</h2>

              {
                 completed.map((task, index) => {
                  return <TaskCard key = {task.id} task = {task.name} id = {task.id} col = {2} taskIndex = {index}/>
                }) 
              }

             
              
            </div>

            
        </div>
  )
}

export default Boards