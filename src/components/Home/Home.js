import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Boards from '../Boards/Boards';
import './Home.css';
import '../../index.css';

const Home = () => {
  return (
    <div className='container'>
      <div className='board-container'>
        <Sidebar/>
        <Boards/>
      </div>

    </div>
  )
}

export default Home