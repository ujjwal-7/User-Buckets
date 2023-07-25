import React from 'react';
import { useState } from 'react';
import TaskModal from '../Modals/TaskModal/TaskModal';
import Menu from '../Menu/Menu';
import './Navbar.css';
import '../../index.css';

const Navbar = () => {

  const [openModal, setOpenModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  openModal ? document.body.style.overflow = 'hidden' : document.body.style.removeProperty('overflow');

  return (

    <div className='navbar'>
       <div className='container main-nav'>
            <h2>User Buckets</h2>
            
            <div className='nav-button' >
              <div className='add-task-button' onClick={() => setOpenModal(true)}>
                <p>+ <span>Add </span>Task</p>
              </div>
              <div className='menu-icon' onClick={() => setShowMenu(true)}>
                <i className="material-icons">menu</i>
              </div>
              
            </div>
            
       </div>

       <TaskModal isOpen = {openModal} setIsOpen = {setOpenModal} type = {"add"}/>
       <Menu isMenuOpen = {showMenu} setMenu = {setShowMenu}/>
    </div>
  )
}

export default Navbar