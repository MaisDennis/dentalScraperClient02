import React, { useState, useEffect } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { FaEye } from 'react-icons/fa';
// -----------------------------------------------------------------------------
import CategoryMenu from '../../components/CategoryMenu';
import sort from '../../utils/sort';
import sortSurya from '../../utils/sortSurya';
import sortOnly from '../../utils/sortOnly'
import filters from '../../utils/filters';
import nonFilters from '../../utils/nonFilters';
import filtersSurya from '../../utils/filtersSurya';
import nonFiltersSurya from '../../utils/nonFiltersSurya';
import SubDivision from '../../components/SubDivision';
import SearchBar from '../../components/Searchbar'
import crmatriz from '../../items/itemsCremer/cr-matriz.html.json'
import spmatriz from '../../items/itemsSpeed/sp-matriz.json'
import onmatriz from '../../items/itemsOnly/on-matriz.json'
import cimatriz from '../../items/itemsCia/ci-matriz.json'
import sumatriz from '../../items/itemsSurya/su-matriz.json'

// -----------------------------------------------------------------------------
export default function Dashboard(props) {
  let crKey = []; let spKey = []; let onKey = []; let ciKey = []; let suKey = [];

  // Filters
  const nonFilteredCrMatriz = nonFilters(crmatriz, 'anel')
  const metalCrMatriz = filters(nonFilteredCrMatriz, 'aço', 'metálica')
  const nonMetalCrMatriz = nonFilters(nonFilteredCrMatriz, 'aço', 'metálica')

  const metalCiMatriz = filters(cimatriz, 'aço', 'metálica')
  const nonMetalCiMatriz = nonFilters(cimatriz, 'aço', 'metálica')

  const metalOnMatriz = filters(onmatriz, 'aço', 'metálica')
  const nonMetalOnMatriz = nonFilters(onmatriz, 'aço', 'metálica')

  const metalSpMatriz = filters(spmatriz, 'aço', 'metálica')
  const nonMetalSpMatriz = nonFilters(spmatriz, 'aço', 'metálica')

  const metalSuMatriz = filtersSurya(sumatriz, 'aco')
  const nonMetalSuMatriz = nonFiltersSurya(sumatriz, 'aco')

  const query = () => {
    const matchURL = props.match.url || '/lencol';
    switch (matchURL) {
      case ('/matriz+metal'): crKey = metalCrMatriz; spKey = metalSpMatriz;  onKey = metalOnMatriz; ciKey = metalCiMatriz; suKey = metalSuMatriz; break;
      case ('/matriz+poliester'): crKey = nonMetalCrMatriz; spKey = nonMetalSpMatriz;  onKey = nonMetalOnMatriz; ciKey = nonMetalCiMatriz; suKey = nonMetalSuMatriz; break;
    }
  }

  query();

  crKey = sort(crKey); 
  spKey = sort(spKey);
  onKey = sort(onKey);
  ciKey = sort(ciKey);
  suKey = sortSurya(suKey); 

  const [input, setInput] = useState('');
  const [cremer, setCremer] = useState(crKey);
  const [cremerListDefault] = useState(crKey);
  const [speed, setSpeed] = useState(spKey);
  const [speedListDefault] = useState(spKey);
  const [only, setOnly] = useState(onKey);
  const [onlyListDefault] = useState(onKey);
  const [cia, setCia] = useState(ciKey);
  const [ciaListDefault] = useState(ciKey);
  const [surya, setSurya] = useState(suKey);
  const [suryaListDefault] = useState(suKey);

  useEffect(() => {
    setCremer(crKey);
    setSpeed(spKey);
    setOnly(onKey);
    setCia(ciKey);
    setSurya(suKey)
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
      let titleDetail = s.title + s.brand
      return titleDetail.toLowerCase().includes(input.toLowerCase())
    })
    const filteredCia = ciaListDefault.filter(s => {
      let titleDetail = s.title
      return titleDetail.toLowerCase().includes(input.toLowerCase())
    })
    const filteredSurya = suryaListDefault.filter(s => {
      let titleDetail = s.title + s.brand + s.details
      return titleDetail.toLowerCase().includes(input.toLowerCase())
    })
      setInput(input);
    setCremer(filteredCremer);
    setSpeed(filteredSpeed);
    setOnly(filteredOnly);
    setCia(filteredCia);
    setSurya(filteredSurya);
  }

  function convertedDate(date) {
    const spTimeZone = 'America/Sao_Paulo'
    const spDate = utcToZonedTime(date, spTimeZone)
    const stringifiedSpDate = JSON.stringify(format(spDate, 'dd/MM/yyyy HH:mm:ssXXX', { timeZone: 'America/Sao_Paulo' }))
    return stringifiedSpDate;
  }
  //----------------------------------------------------------------------------
  return (
    <div className="container">
      <CategoryMenu activeProp={3} />
      <header className="header">
        <div className="search-bar-div">
          <SearchBar input={input} onChange={updateInput} />
        </div>
        <h1 className="logo"><FaEye/>Cyclops Dental</h1>
      </header>

      <div className="videos">
        <SubDivision arrayName={cremer} convertedDate={convertedDate} 
          title={'dentalcremer.com.br'} titlePageLink={'http://www.dentalcremer.com.br/'}
        />
        <SubDivision arrayName={speed} convertedDate={convertedDate} 
          title={'dentalspeed.com'} titlePageLink={'http://www.dentalspeed.com/'}
        />
        <SubDivision arrayName={surya} convertedDate={convertedDate} 
          title={'suryadental.com.br'} titlePageLink={'http://www.suryadental.com.br/'}
        />
        {/* <SubDivision arrayName={only} convertedDate={convertedDate} 
          title={'onlydental.com.br'} titlePageLink={'http://www.onlydental.com.br/'}
        /> */}
        <SubDivision arrayName={cia} convertedDate={convertedDate} 
          title={'dentalecia.com.br'} titlePageLink={'http://www.dentalecia.com.br/'}
        />
      </div>    
    </div>
  );
}
