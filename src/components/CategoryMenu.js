import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
function CategoryMenu(props) {
  const [showDropdownFirst, setShowDropDownFirst] = useState(false);
  const [showDropdownSecond, setShowDropDownSecond] = useState(false);
  const itemsArray = [
    {ext: '/acido+fosforico', name: 'Ácido Fosfórico'},
    {ext:'/agua-destilada', name: 'Água Destilada'},
    {ext:'/agulha', name: 'Agulha Gengival'},
    {ext:'/algodao-rolete', name: 'Rolete de algodão'},
    {ext:'/anestesico', name: 'Anestésico'},
    {ext:'/cunha', name: 'Cunha'},
    {ext:'/embalagem-para-autoclave', name: 'Embalagem para autoclave'},
    {ext:'/fio-de-sutura', name: 'Fio de Sutura'},
    {ext:'/gaze', name: 'Gaze'},
    {ext:'/ionomero-de-vidro', name: 'Ionômero de vidro'},
    {ext:'/lencol-de-borracha', name: 'Lençol de borracha'},
    {ext:'/luva-cirurgica', name: 'Luva cirúrgica'},
    {ext:'/luva-de-procedimento', name: 'Luva de procedimento'},
    {ext:'/matriz', name: 'Matriz'},
    {ext:'/microbrush', name: 'Microbrush'},
    {ext:'/resina-dental', name: 'Resina Composta'},
    {ext:'/restaurador-provisorio', name: 'Restaurador provisório'},
    {ext:'/sugador', name: 'Sugaddor'},
    {ext:'/tira', name: 'Tira de lixa'}
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
            <Link key={index} className='category-link' to={i.ext}>
              { (props.activeProp === i.ext)  
                ? <button className="category active" autoFocus>{i.name}</button>
                : <button className="category">{i.name}</button>
              }
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default CategoryMenu
