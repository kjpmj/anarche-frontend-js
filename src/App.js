import React from 'react';
import { Route } from 'react-router-dom';
import SkillsPage from './pages/SkillsPage';

function App() {
  return (
    <>
      <Route component={SkillsPage} path={['/', '/skills']} exact></Route>
    </>
  );
}

export default App;
