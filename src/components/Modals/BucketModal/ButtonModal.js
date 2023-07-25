import React, { useContext, useState } from 'react';
import { BoardContext } from '../../../context/boards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ButtonModal.css';


const ButtonModal = ({isOpen, setIsOpen, type, index}) => {

    const {boards, addBoard, updateBoard} = useContext(BoardContext);
    const [bucketName, setBucketName] = useState(type === "add" ? "" : boards[index]?.name);
    

    if(!isOpen) {
        return null;
    }

    const handleChange = (e) => {
        setBucketName(e.target.value);
        
    }

    const handleSumbit = () => {

        if(bucketName === "") {
            setBucketName("");
            toast.error("Invalid Bucket Name", {
                position: "top-center",
                autoClose: 1200,
            });
            
            return;
        }

        if(type === "add") {
            addBoard(bucketName);
            setBucketName("");
        } else {
            updateBoard(index, bucketName);
        }
           
        setIsOpen(false);
    }

    const handleClose = () => {

        if(type === "add") {
            setBucketName("");
        }
        
        setIsOpen(false);
    }

  return (

    <>
        <div className='overlay'>
            <div className='bucket-modal'>
                {type === "add" ? <h3>Add Bucket Name</h3> : <h3>Edit Bucket</h3>}
                <div className='bucket-name'>
                    <input 
                        type = "text"
                        placeholder='Bucket Name'
                        value={bucketName}
                        onChange={handleChange}
                    ></input>
                </div>

                <div className='bucket-modal-button'>
                    <button className='add-button' onClick={handleSumbit}>Save</button>
                    <button className = 'cancel-button' onClick = {handleClose}>Close</button>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </>
    
        
    

  )
}

export default ButtonModal