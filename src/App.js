import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './containers/HomePage'
import Pokemon from './containers/Pokemon';
import Types from './containers/Types';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <div>
     <HashRouter>
     <Switch>
       <Route path="/"  component={HomePage} exact/>
       <Route path="/pokemon/:id"  component={Pokemon}/>
       <Route path="/types/:type"  component={Types}/>
     </Switch>
     </HashRouter>
    </div>
  );
}

export default App;
