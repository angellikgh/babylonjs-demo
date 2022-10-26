import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import Main from './demos'
import Demo01 from './demos/01'
import Demo02 from './demos/02'

const App: FC = () => {
  return (
    <div className="App flex">
      <div className='p-4 px-6 w-[200px]'>
        <Main />
      </div>
      <div className='grow'>
        <Routes>
          <Route path="/demo01" element={<Demo01 />}></Route>
          <Route path="/demo02" element={<Demo02 />}></Route>

          <Route path="*" element={<Navigate replace to="/demo01" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;