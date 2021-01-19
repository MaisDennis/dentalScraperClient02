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
import crtira from '../../items/itemsCremer/cr-tira-de-lixa.html.json'
import sptira from '../../items/itemsSpeed/sp-tiras+de+lixa.json'
import ontira from '../../items/itemsOnly/on-tira-p-47-acabamento-e-polimento.json'
import citira from '../../items/itemsCia/ci-tira-de-lixa.json'
import sutira from '../../items/itemsSurya/su-tiras-de-poliester.html.json'

// -----------------------------------------------------------------------------
export default function Dashboard(props) {
  let crKey = []; let spKey = []; let onKey = []; let ciKey = []; let suKey = [];

  // Filters
  const metalCrTira = filters(crtira, 'aço', 'metálica')
  const nonMetalCrTira = nonFilters(crtira, 'aço', 'metálica')

  const metalCiTira = filters(citira, 'aço', 'metálica')
  const nonMetalCiTira = nonFilters(citira, 'aço', 'metálica')

  const metalOnTira = filters(ontira, 'aço', 'metálica')
  const nonMetalOnTira = nonFilters(ontira, 'aço', 'metálica')

  const metalSpTira = filters(sptira, 'aço', 'metálica')
  const nonMetalSpTira = nonFilters(sptira, 'aço', 'metálica')

  const metalSuTira = filtersSurya(sutira, 'aço')
  const nonMetalSuTira = nonFiltersSurya(sutira, 'aço')

  const query = () => {
    const matchURL = props.match.url || '/lencol';
    switch (matchURL) {
      case ('/tira+metal'): crKey = metalCrTira; spKey = metalSpTira;  onKey = metalOnTira; ciKey = metalCiTira; suKey = metalSuTira; break;
      case ('/tira+poliester'): crKey = nonMetalCrTira; spKey = nonMetalSpTira;  onKey = nonMetalOnTira; ciKey = nonMetalCiTira; suKey = nonMetalSuTira; break;
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
      <CategoryMenu activeProp={4} />
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
