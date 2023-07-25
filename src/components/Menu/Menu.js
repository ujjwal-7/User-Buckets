import React, { useState, useContext } from 'react';
import { BoardContext } from '../../context/boards';
import BucketCard from '../Cards/BucketCard/BucketCard';
import ButtonModal from '../Modals/BucketModal/ButtonModal';
import './Menu.css';

const Menu = ({isMenuOpen, setMenu}) => {

    const {boards} = useContext(BoardContext);
    const [openModal, setOpenModal] = useState(false);
    
    /*
    if(!isMenuOpen) {
        return null;
    }
    */

    const handleClick = () => {
      setOpenModal(true);
      setMenu(false);
    }

  return (
    
    <>

      {
        isMenuOpen && (<div className='menu'>
        <div className='menu-close-button' onClick={() => setMenu(false)}>
          <i class="material-icons ">close</i>
        </div>
        <h2>Buckets</h2>
        <div className = "new-bucket" onClick={handleClick}>
            <p>Create Bucket</p>
        </div>
        {
            boards.map((board, index) => {
            return <BucketCard key = {board.id} index = {index} boardName = {board.name} isActive = {board.isActive}/>
            })
        }
       
      </div>)
      }
      
      <ButtonModal isOpen = {openModal} setIsOpen = {setOpenModal}/>
    </>
    
  )
}

export default Menu