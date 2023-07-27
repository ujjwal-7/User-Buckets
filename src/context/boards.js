import React, { createContext, useState } from 'react';
import {useEffect} from 'react';


export const BoardContext = createContext();

export const BoardProvider = ({children}) => {

    const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("boards")) || []);

    const addBoard = (boardName) => {


        const newBoard = {
            
            id: Date.now() + Math.random() * 2,
            name: boardName,
            columns: [
                {
                    name: 'todo',
                    tasks: []
                },
                {
                    name: 'ongoing',
                    tasks: []
                },
                {
                    name: 'completed',
                    tasks: []
                }
            ],
            isActive: true
        }

        const updatedBoard = boards.map((board) => {
            return {
                ...board,
                isActive: false
            }
        })

        setBoards(() => {
            return [newBoard, ...updatedBoard];
        })

    }

    const updateBoard = (index, boardName) => {
        

        const newState = [...boards];
        const board = newState.find((b, i) => i === index);
        
        board.name = boardName;
    
        setBoards(newState)


    }

    const deleteBoard = (index) => {
        
        const updatedBoard = [...boards];
       
        if(index === 0) {
            updatedBoard.splice(index, 1);
            if(updatedBoard.length > 0) {
                updatedBoard[0].isActive = true;
            }
        } else {

            updatedBoard.splice(index, 1);
        }

        setBoards(updatedBoard);

    }

    const activeBoard = (index) => {

        const updatedBoard = [];
        let targetBoard;

        for(let i = 0; i < boards.length; i++) {
            if(i !== index) {
                boards[i].isActive = false;
                updatedBoard.push(boards[i]);  
            } else {
                targetBoard = boards[i];
                targetBoard.isActive = true;
            }
        }

        updatedBoard.unshift(targetBoard);

        
        setBoards(updatedBoard);
    }

    const addTask = (taskName, columnIndex) => {
      
        const updatedBoard = [...boards];
        const board = updatedBoard.find((board) => board.isActive === true);
        const index = Number(columnIndex);

        board?.columns[index]?.tasks.push({name: taskName,
            id: Date.now() + Math.random() * 2 });

        setBoards(updatedBoard)
        
    }

    const updateTask = (taskName, colIndex, prevColIndex, taskIndex) => {

        const updatedBoard = [...boards];
        const board = updatedBoard.find((board) => board.isActive === true);
        const index = Number(colIndex);

        const column = board?.columns.find((col, i) => i === prevColIndex);
        const task = column?.tasks.find((task, i) => i === taskIndex);
        //console.log(task.name)
        task.name = taskName
       
        if(index !== prevColIndex) {

            column?.tasks?.splice(taskIndex, 1);
            board?.columns[index]?.tasks.push(task);

        }

        setBoards(updatedBoard);
   
    }


    const deleteTask = (id, colIndex) => {

        const updatedBoard = [...boards];
        const board = updatedBoard.find((board) => board.isActive === true);
        
        const tasksArray = board?.columns[colIndex]?.tasks;
        let index = -1;
        for(let i = 0; i < tasksArray.length; i++) {
            if(tasksArray[i].id === id) {
                index = i;
                break;
            }
        }



        let removed = board?.columns[colIndex]?.tasks.splice(index, 1);
        console.log(removed);
        
        
        setBoards(updatedBoard);

           
    }

    const dragTask = (colIndex, prevColIndex, taskIndex) => {

        const updatedBoard = [...boards];
        const board = updatedBoard.find((board) => board.isActive === true);
        const task = board?.columns[prevColIndex]?.tasks[taskIndex];
        board?.columns[prevColIndex]?.tasks.splice(taskIndex, 1);
        
        board?.columns[colIndex]?.tasks.push(task);

        setBoards(updatedBoard)

    }

    useEffect(() => {
        localStorage.setItem('boards', JSON.stringify(boards));
    }, [boards])


  return (<BoardContext.Provider value = {{
    boards,
    addBoard,
    deleteBoard,
    updateBoard,
    activeBoard,
    addTask,
    updateTask,
    deleteTask,
    dragTask
  }}>
    {children}
    </BoardContext.Provider>
  );
}

