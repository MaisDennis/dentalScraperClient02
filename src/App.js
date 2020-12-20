import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import Route from './Route'
import './App.css';
import Product01 from './pages/Product01'
import Braquete from './pages/Product05'
import All from './pages/Product07'
import MultiBraquete from './pages/Product09'

function App() {

  const itemsArray = [
    '/acido+fosforico',
    '/agua-destilada',
    '/agulha',        
    '/algodao-rolete',
    '/anestesico',
    '/cunha',
    '/embalagem-para-autoclave',
    '/fio-de-sutura',
    '/gaze',
    '/ionomero-de-vidro',
    '/lencol-de-borracha',
    '/luva-cirurgica',
    '/luva-de-procedimento',
    '/matriz',
    '/microbrush',
    '/resina-dental',
    '/restaurador-provisorio',
    '/sugador',
    '/tira'
  ]

  const dropDownItemMinusPadraoArray = [
    'andrews',
    'capelozza',
    'damon',
    'edgewise',
    'mbt',
    'ricketts',
    'roth',
    'standard',
    'torque',
  ]

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Product01} />
        {
          dropDownItemMinusPadraoArray.map((d, index) => (
            <Route key={index} path={`/braquete+${d}`} exact component={Braquete} />
          ))
        }
        {
          dropDownItemMinusPadraoArray.map((d, index) => (
            <Route key={index} path={`/multi+${d}`} exact component={MultiBraquete} />
          ))
        }
        {
          itemsArray.map((i, index) => (
            <Route key={index} path={i} exact component={All}/>
          ))
        }
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
