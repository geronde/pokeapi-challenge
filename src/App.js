import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './containers/HomePage'
import Pokemon from './containers/Pokemon';
import Types from './containers/Types';

function App() {
  return (
    <div>
     <BrowserRouter basename="pokeapi-challenge">
     <Switch>
       <Route path="/"  component={HomePage} exact/>
       <Route path="/pokemon/:id"  component={Pokemon}/>
       <Route path="/types/:type"  component={Types}/>
     </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
