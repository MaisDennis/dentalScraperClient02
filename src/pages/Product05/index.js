import React, { useState, useEffect } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { FaEye } from 'react-icons/fa';
// -----------------------------------------------------------------------------
import SearchBar from '../../components/Searchbar'
import CategoryMenu from '../../components/CategoryMenu'
import sort from '../../utils/sort'
import SubDivision from '../../components/SubDivision';

import cremerData from '../../items/itemsCremer/cr-braquete-reposicao.json'
import speedData from '../../items/itemsSpeed/sp-braquete-reposicao.json'
import onlyData from '../../items/itemsOnly/on-braquete.json'
import ciaData from '../../items/itemsCia/ci-braquete-reposicao.json'

// -----------------------------------------------------------------------------
export default function Dashboard(props) {
  // filter by EdgeWise, MBT, Roth
  const filteredDefaultCremer = cremerData.filter(c => {
    let titleDetail = c.title + c.details
    return titleDetail.toLowerCase().includes(props.match.path.slice(10, ))
  })
  const filteredDefaultSpeed = speedData.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes(props.match.path.slice(10, ))
  })
  const filteredDefaultOnly = onlyData.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes(props.match.path.slice(10, ))
  })
  const filteredDefaultCia = ciaData.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes(props.match.path.slice(10, ))
  })
  
  // Filter by unit
  let unitFilteredCremer = filteredDefaultCremer.filter(c => {
    let titleDetail = c.title + c.details
    return titleDetail.toLowerCase().includes('1 unidade')
  })
  let unitFilteredSpeed = filteredDefaultSpeed.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes('1 unidade')
  })
  let unitFilteredOnly = filteredDefaultOnly.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes(`reposição`)
  })
  console.log(unitFilteredOnly)
  let unitFilteredCia = filteredDefaultCia.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes('')
  })

  // order by price
  unitFilteredCremer = sort(unitFilteredCremer);
  unitFilteredSpeed = sort(unitFilteredSpeed);
  unitFilteredOnly = sort(unitFilteredOnly);
  unitFilteredCia = sort(unitFilteredCia);

  const [input, setInput] = useState('');
  const [ cremer, setCremer ] = useState(unitFilteredCremer);
  const [ cremerListDefault ] = useState(unitFilteredCremer);
  const [ speed, setSpeed ] = useState(unitFilteredSpeed);
  const [ speedListDefault ] = useState(unitFilteredSpeed);
  const [ only, setOnly ] = useState(unitFilteredOnly);
  const [ onlyListDefault ] = useState(unitFilteredOnly);
  const [ cia, setCia ] = useState(unitFilteredCia);
  const [ ciaListDefault ] = useState(unitFilteredCia);

  const [ showDropdown, setShowDropDown ] = useState(false);

  useEffect(() => {
    setCremer(unitFilteredCremer);
    setSpeed(unitFilteredSpeed);
    setOnly(unitFilteredOnly);
    setCia(unitFilteredCia);
    console.log(props.match.path)
  }, [props.match.path])

  const updateInput = async (input) => {
    const filteredCremer = cremerListDefault.filter(c => {
      let titleDetail = c.title + c.details
      // console.log(titleDetail)
      return titleDetail.toLowerCase().includes(input.toLowerCase())
    })
    const filteredSpeed = speedListDefault.filter(s => {
      let titleDetail = s.title + s.brand + s.details
      return titleDetail.toLowerCase().includes(input.toLowerCase())
    })
    const filteredOnly = onlyListDefault.filter(s => {
      let titleDetail = s.title + s.brand + s.details
      return titleDetail.toLowerCase().includes(input.toLowerCase())
    })
    const filteredCia = ciaListDefault.filter(s => {
      let titleDetail = s.title + s.brand + s.details
      return titleDetail.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setCremer(filteredCremer);
    setSpeed(filteredSpeed);
    setOnly(filteredOnly);
    setCia(filteredCia);
  }

  function convertedDate(date) {
    const spTimeZone = 'America/Sao_Paulo'
    const spDate = utcToZonedTime(date, spTimeZone)
    const stringifiedSpDate = JSON.stringify(format(spDate, 'dd/MM/yyyy HH:mm:ssXXX', { timeZone: 'America/Sao_Paulo'}))
    return stringifiedSpDate;
  }

  function handleShowDropDown() {
    setShowDropDown(!showDropdown);
  }
  
  //----------------------------------------------------------------------------
  return (
    <div className="container" onClick={handleShowDropDown}>
      <CategoryMenu activeProp={1}/> 
      <header className="header">
        <div className="search-bar-div">
          <SearchBar input={input} onChange={updateInput} />
        </div>
        <h1 className="logo"><FaEye/>Cyclops Dental</h1>
      </header>    
  
      <div className="videos">
        <SubDivision arrayName={cremer} convertedDate={convertedDate} 
          title={'Dental Cremer'} titlePageLink={'http://www.dentalcremer.com.br/'}
        />
        <SubDivision arrayName={speed} convertedDate={convertedDate} 
          title={'Dental Speed'} titlePageLink={'http://www.dentalspeed.com/'}
        />
        <SubDivision arrayName={only} convertedDate={convertedDate} 
          title={'Only Dental'} titlePageLink={'http://www.onlydental.com.br/'}
        />
        <SubDivision arrayName={cia} convertedDate={convertedDate} 
          title={'Dental & Cia'} titlePageLink={'http://www.dentalecia.com.br/'}
        />
      </div>
    </div>
  );
}
