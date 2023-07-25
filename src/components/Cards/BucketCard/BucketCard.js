import React, { useContext, useState } from 'react';
import { BoardContext } from '../../../context/boards';
import ButtonModal from '../../Modals/BucketModal/ButtonModal';
import './BucketCard.css';

const BucketCard = ({index, boardName,  isActive}) => {

  const {deleteBoard, activeBoard} = useContext(BoardContext);
  const [openModal, setOpenModal] = useState(false);


  const handleDelete = (index) => {

    deleteBoard(index);
  }

  
  const handleActive = (index) => {
    activeBoard(index);
  }

  const styles = {
    backgroundColor: isActive? "#7171C0" : "white",
    color: isActive ? "white" : "black"
  }

  return (

    <>
      <div style = {{backgroundColor: styles.backgroundColor, color : styles.color}} className='bucket-card'>
      
        <div className = 'bucket' onClick={() => handleActive(index)}>
          <p>{boardName}</p>
        </div>
          
        <div className = 'bucket-actions' onClick={() => setOpenModal(true)}><i className="material-icons">edit</i></div>
        <div className = 'bucket-actions' onClick={() => handleDelete(index)}><i className="material-icons">delete</i></div>

      </div>

      <ButtonModal isOpen = {openModal} setIsOpen = {setOpenModal} type = {"edit"} index = {index}/>
      
    </>
    
  )
}

export default BucketCard