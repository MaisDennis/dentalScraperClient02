import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import Route from './Route'
import './App.css';
import Product01 from './pages/Product01'
import Braquete from './pages/Product05'
import All from './pages/Product07'
import MultiBraquete from './pages/Product09'
import Matriz from './pages/Product10'
import Tira from './pages/Product11'

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
    // '/matriz',
    '/microbrush',
    '/resina-dental',
    '/restaurador-provisorio',
    '/sugador',
    // '/tira
    '/resina-acrilica',
    '/gesso',
    '/cera',
    '/cimento-resinoso',
    '/cimento-provisorio',
    '/cimento-de-zinco',
    '/alginato',
    '/silicone-de-adicao',
    '/silicone-de-condensacao',
    '/pino-de-fibra',
    '/pino-metalico',
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

  const dropDownMetalArray = [
    'metal',
    'poliester',
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
          dropDownMetalArray.map((d, index) => (
            <Route key={index} path={`/matriz+${d}`} exact component={Matriz} />
          ))
        }
        {
          dropDownMetalArray.map((d, index) => (
            <Route key={index} path={`/tira+${d}`} exact component={Tira} />
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
