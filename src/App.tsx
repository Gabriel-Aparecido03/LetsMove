import React from 'react';

import { BrowserRouter,Routes,Route} from 'react-router-dom'

import {AuthContextProvider} from './context/AuthContext'

import { Home } from './pages/Home'
import { WorkoutPage } from './pages/WorkkoutPage'
import { MyProfilePage } from './pages/MyProfilePage'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Workout/:id" element={ <WorkoutPage/>} />
            <Route path="/Myprofile/:id" element={<MyProfilePage/>}/>
          </Routes>
      </AuthContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
