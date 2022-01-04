import React from 'react';

import { BrowserRouter,Routes,Route} from 'react-router-dom'

import { Home } from './pages/Home'
import { WorkoutPage } from './pages/WorkkoutPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/workout" element={ <WorkoutPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
