import React, { useContext, useState } from 'react';
import { BoardContext } from '../../context/boards';
import BucketCard from '../Cards/BucketCard/BucketCard';
import ButtonModal from '../Modals/BucketModal/ButtonModal';
import './Sidebar.css';

const Sidebar = () => {
  const {boards} = useContext(BoardContext);
  const [openModal, setOpenModal] = useState(false);
  
  openModal ? document.body.style.overflow = 'hidden' : document.body.style.removeProperty('overflow');

  return (

    <>

      <div className='sidebar'>
        <h2>Buckets</h2>

        <div className = "add-bucket" onClick={() => setOpenModal(true)}>
          <p>Create Bucket</p>
        </div>

        <div className='buckets'>
        {
          boards.map((board, index) => {
            return <BucketCard key = {board.id} index = {index} boardName = {board.name} isActive = {board.isActive}/>
          })
        }
        </div>
      </div>
      <ButtonModal isOpen = {openModal} setIsOpen = {setOpenModal} type={"add"}/>
    </> 
  )
}

export default Sidebar