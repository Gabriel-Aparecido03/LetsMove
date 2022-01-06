import React from 'react';

import { BrowserRouter,Routes,Route} from 'react-router-dom'

import { Home } from './pages/Home'
import { WorkoutPage } from './pages/WorkkoutPage'
import { MyProfilePage } from './pages/MyProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Workout/:id" element={ <WorkoutPage/>} />
          <Route path="/Myprofile/:id" element={<MyProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
