import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaWhatsapp } from 'react-icons/fa'
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
function CategoryMenu(props) {
  const [showDropDownBraqUnit, setShowDropDownBraqUnit] = useState(false);
  const [showDropDownBraqMulti, setShowDropDownBraqMulti] = useState(false);
  const [showDropDownMatriz, setShowDropDownMatriz] = useState(false);
  const [showDropDownTira, setShowDropDownTira] = useState(false);
  const [showDropDownCont, setShowDropDownCont] = useState(false);
  const [showDropDownEst, setShowDropDownEst] = useState(false);
  const [showDropDownProt, setShowDropDownProt] = useState(false);
  const [showDropDownMold, setShowDropDownMold] = useState(false);

  const [toggleContact, setToggleContact] = useState();

  const dropDownBraqArray = [
    'edgewise',
    'mbt',
    'roth',
  ]

  const dropDownContArray = [
    { ext: '/acido+fosforico', name: 'Ácido Fosfórico' },
    { ext: '/anestesico', name: 'Anestésico' },
    { ext: '/agua-destilada', name: 'Água Destilada' },
    { ext: '/cera', name: 'Cera' },
    { ext: '/embalagem-para-autoclave', name: 'Embalagem para autoclave' },
    { ext: '/fio-de-sutura', name: 'Fio de Sutura' },
    { ext: '/gaze', name: 'Gaze' },
    { ext: '/gesso', name: 'Gesso' },
    { ext: '/lencol-de-borracha', name: 'Lençol de borracha' },
    { ext: '/luva-cirurgica', name: 'Luva cirúrgica' },
    { ext: '/luva-de-procedimento', name: 'Luva de procedimento' },
    { ext: '/restaurador-provisorio', name: 'Restaurador provisório' },
    { ext: '/algodao-rolete', name: 'Rolete de algodão' },
    { ext: '/sugador', name: 'Sugador' },
  ]

  const dropDownEstArray = [
    { ext: '/cunha', name: 'Cunha' }, 
    { ext: '/microbrush', name: 'Microbrush' },
    { ext: '/pino-de-fibra', name: 'Pino de Fibra' },
    { ext: '/pino-metalico', name: 'Pino metálico' },
    { ext: '/resina-dental', name: 'Resina Composta' },
  ]

  const dropDownProtArray = [
    
    
    
    { ext: '/cimento-resinoso', name: 'Cimento Resinoso' },
    { ext: '/cimento-provisorio', name: 'Cimento Provisório' },
    { ext: '/cimento-de-zinco', name: 'Cimento de Zinco' },
    { ext: '/ionomero-de-vidro', name: 'Ionômero de vidro' },
    { ext: '/resina-acrilica', name: 'Resina Acrílica' }, 
  ]

  const dropDownMoldArray = [
    { ext: '/alginato', name: 'Alginato' },
    { ext: '/silicone-de-adicao', name: 'Silicone de Adição' },
    { ext: '/silicone-de-condensacao', name: 'Silicone de Condensação' },
  ]

  const dropDownMetalArray = [
    'metal',
    'poliester',
  ]

  function handleCancelDropDown() {
    if (showDropDownBraqUnit) setShowDropDownBraqUnit(false)
    if (showDropDownBraqMulti) setShowDropDownBraqMulti(false)
    if (showDropDownMatriz) setShowDropDownMatriz(false)
    if (showDropDownTira) setShowDropDownTira(false)
    if (showDropDownCont) setShowDropDownCont(false)
    if (showDropDownEst) setShowDropDownEst(false)
    if (showDropDownProt) setShowDropDownProt(false)
    if (showDropDownMold) setShowDropDownMold(false)
  }

  function propsReceiverCont(active) {
    let activeKey = null;
    let item = null;
    for (item of dropDownContArray) {
      if(item.ext === active) activeKey = 5 
    }
    return activeKey
  }

  function propsReceiverEst(active) {
    let activeKey = null;
    let item = null;
    for (item of dropDownEstArray) {
      if(item.ext === active) activeKey = 6
    }
    return activeKey
  }

  function handleContact() {
    setToggleContact(!toggleContact)
  }
  // ---------------------------------------------------------------------------
  return (
    <div className="category-container" onClick={handleCancelDropDown}>
      <div className="categories">

        <div className="category-menu" onClick={setShowDropDownBraqUnit}>
          {(props.activeProp === 1)
            ? <button className="category active" autoFocus>Bráquete (1 unidade)</button>
            : <button className="category">Bráquete (1 unidade)</button>
          }
          <div className="dropdown" style={showDropDownBraqUnit ? { visibility: "visible" } : { visibility: "hidden" }}>
            {
              dropDownBraqArray.map((d, index) => (
                <Link
                  key={index}
                  className='category-link'
                  to={`/braquete+${d}`}
                ><button className="dropdown-button">{d}</button></Link>
              ))
            }
          </div>
        </div>
        <div className="category-menu" onClick={setShowDropDownBraqMulti}>
          {(props.activeProp === 2)
            ? <button className="category active" autoFocus>Bráquete (+ unidades)</button>
            : <button className="category">Bráquete (+ unidades)</button>
          }
          <div className="dropdown" style={showDropDownBraqMulti ? { visibility: "visible" } : { visibility: "hidden" }}>
            {
              dropDownBraqArray.map((d, index) => (
                <Link
                  key={index}
                  className='category-link'
                  to={`/multi+${d}`}
                ><button className="dropdown-button">{d}</button></Link>
              ))
            }
          </div>
        </div>
        <div className="category-menu" onClick={setShowDropDownMatriz}>
          {(props.activeProp === 3)
            ? <button className="category active" autoFocus>Matriz</button>
            : <button className="category">Matriz</button>
          }
          <div className="dropdown" style={showDropDownMatriz ? { visibility: "visible" } : { visibility: "hidden" }}>
            {
              dropDownMetalArray.map((d, index) => (
                <Link
                  key={index}
                  className='category-link'
                  to={`/matriz+${d}`}
                ><button className="dropdown-button">{d}</button></Link>
              ))
            }
          </div>
        </div>
        <div className="category-menu" onClick={setShowDropDownTira}>
          {(props.activeProp === 4)
            ? <button className="category active" autoFocus>Tira de lixa</button>
            : <button className="category">Tira de lixa</button>
          }
          <div className="dropdown" style={showDropDownTira ? { visibility: "visible" } : { visibility: "hidden" }}>
            {
              dropDownMetalArray.map((d, index) => (
                <Link
                  key={index}
                  className='category-link'
                  to={`/tira+${d}`}
                ><button className="dropdown-button">{d}</button></Link>
              ))
            }
          </div>
        </div>
        <div className="category-menu" onClick={setShowDropDownCont}>
          {(propsReceiverCont(props.activeProp) === 5)
            ? <button className="category active" autoFocus>Uso Contínuo</button>
            : <button className="category">Uso Contínuo</button>
          }
          <div className="dropdown" style={showDropDownCont ? { visibility: "visible" } : { visibility: "hidden" }}>
            {
              dropDownContArray.map((c, index) => (
                <Link
                  key={index}
                  className='category-link'
                  to={c.ext}
                ><button className="dropdown-button">{c.name}</button></Link>
              ))
            }
          </div>
        </div>
        <div className="category-menu" onClick={setShowDropDownEst}>
          {(propsReceiverEst(props.activeProp) === 6)
            ? <button className="category active" autoFocus>Dentística</button>
            : <button className="category">Dentística</button>
          }
          <div className="dropdown" style={showDropDownEst ? { visibility: "visible" } : { visibility: "hidden" }}>
            {
              dropDownEstArray.map((e, index) => (
                <Link
                  key={index}
                  className='category-link'
                  to={e.ext}
                ><button className="dropdown-button">{e.name}</button></Link>
              ))
            }
          </div>
        </div>
        <div className="category-menu" onClick={setShowDropDownProt}>
          {(propsReceiverEst(props.activeProp) === 7)
            ? <button className="category active" autoFocus>Prótese</button>
            : <button className="category">Prótese</button>
          }
          <div className="dropdown" style={showDropDownProt ? { visibility: "visible" } : { visibility: "hidden" }}>
            {
              dropDownProtArray.map((p, index) => (
                <Link
                  key={index}
                  className='category-link'
                  to={p.ext}
                ><button className="dropdown-button">{p.name}</button></Link>
              ))
            }
          </div>
        </div>
        <div className="category-menu" onClick={setShowDropDownMold}>
          {(propsReceiverEst(props.activeProp) === 8)
            ? <button className="category active" autoFocus>Moldagem</button>
            : <button className="category">Moldagem</button>
          }
          <div className="dropdown" style={showDropDownMold ? { visibility: "visible" } : { visibility: "hidden" }}>
            {
              dropDownMoldArray.map((m, index) => (
                <Link
                  key={index}
                  className='category-link'
                  to={m.ext}
                ><button className="dropdown-button">{m.name}</button></Link>
              ))
            }
          </div>
        </div>
        {/* {
          itemsArray.map((i, index) => (
            <Link key={index} className='category-link' to={i.ext}>
              { (props.activeProp === i.ext)
                ? <button className="category active" autoFocus>{i.name}</button>
                : <button className="category">{i.name}</button>
              }
            </Link>
          ))
        } */}
        <div className="contact-div">
          <div className="contact-inner-div">
            <button 
              className="contact-button"
              onClick={() => setToggleContact(!toggleContact)}
            >Contate-nos</button>
            { toggleContact && (
              <div className="contact-drop-div">
                Dúvidas, Perguntas e Sugestões sempre bem-vindas!
                <br/><a
                  className="contact-link"
                  href='https://api.whatsapp.com/send?phone=5511983495853' 
                  title="contact" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="link-div">
                  <FaWhatsapp size={18}/>
                  <span className="link-span">
                  Whatsapp: (11) 9 8349 5853
                  </span>
                  
                  </div>
                </a>
                  Equipe Cyclops Dental
                  
                  
              </div>
            )

            }
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default CategoryMenu
