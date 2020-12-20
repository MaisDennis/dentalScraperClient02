import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
function CategoryMenu(props) {
  const [showDropdownFirst, setShowDropDownFirst] = useState(false);
  const [showDropdownSecond, setShowDropDownSecond] = useState(false);
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
  
  const dropDownItemArray = [
    // 'andrews',
    // 'capelozza',
    // 'damon',
    'edgewise',
    'mbt',
    // 'padrao',
    // 'ricketts',
    'roth',
    // 'standard',
    // 'torque',
  ]

  function handleShowDropDownFirst() {
    setShowDropDownFirst(!showDropdownFirst);
  }

  function handleShowDropDownSecond() {
    setShowDropDownSecond(!showDropdownSecond);
  }

  function handleCancelDropDown() {
    
    if (showDropdownFirst ) setShowDropDownFirst(false)
    if (showDropdownSecond ) setShowDropDownSecond(false)
  }

  return (
    <div className="category-container" onClick={handleCancelDropDown}>
      <div className="categories">
        
        <div className="category-menu" onClick={handleShowDropDownFirst}>
          { (props.activeProp === 1) 
            ? <button className="category">bráquete (1 unidade)</button>
            : <button className="category">bráquete (1 unidade)</button>
          }
          <div className="dropdown" style={showDropdownFirst ? { visibility: "visible" } : { visibility: "hidden" }}>
            {
              dropDownItemArray.map((d, index) => (
                <Link 
                  key={index} 
                  className='category-link' 
                  to={`/braquete+${d}`}
                ><button className="dropdown-button">{d}</button></Link>
              ))
            }
          </div>
        </div>
        <div className="category-menu" onClick={handleShowDropDownSecond}>
          { (props.activeProp === 2) 
            ? <button className="category active" autoFocus>bráquete (+ unidades)</button>
            : <button className="category">bráquete (+ unidades)</button>
          }
          <div className="dropdown" style={showDropdownSecond ? { visibility: "visible" } : { visibility: "hidden" }}>
            {
              dropDownItemArray.map((d, index) => (
                <Link 
                  key={index} 
                  className='category-link' 
                  to={`/multi+${d}`}
                ><button className="dropdown-button">{d}</button></Link>
              ))
            }
          </div>
        </div>
        {
          itemsArray.map((i, index) => (
            <Link key={index} className='category-link' to={i}>
              { (props.activeProp === i)  
                ? <button className="category active" autoFocus>{i.slice(1, )}</button>
                : <button className="category">{i.slice(1, )}</button>
              }
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default CategoryMenu
