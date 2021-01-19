import React, { useState, useEffect } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { FaEye } from 'react-icons/fa';
// -----------------------------------------------------------------------------
import SearchBar from '../../components/Searchbar'
import CategoryMenu from '../../components/CategoryMenu'
import sort from '../../utils/sort'
import sortSurya from '../../utils/sortSurya'
import sortOnly from '../../utils/sortOnly'
import SubDivision from '../../components/SubDivision';
import cremerData from '../../items/itemsCremer/cr-braquete-reposicao.json'
import speedData from '../../items/itemsSpeed/sp-braquete-reposicao.json'
import onlyData from '../../items/itemsOnly/on-braquete.json'
import ciaData from '../../items/itemsCia/ci-braquete-reposicao.json'
import suryaData from '../../items/itemsSurya/su-braquete-reposicao.json'
// -----------------------------------------------------------------------------
export default function Dashboard(props) {
  // filter by EdgeWise, MBT, Roth
  const filteredDefaultCremer = cremerData.filter(c => {
    let titleDetail = c.title + c.details
    return titleDetail.toLowerCase().includes(props.match.path.slice(7, ))
  })
  const filteredDefaultSpeed = speedData.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes(props.match.path.slice(7, ))
  })
  const filteredDefaultOnly = onlyData.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes(props.match.path.slice(7, ))
  })
  const filteredDefaultCia = ciaData.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes(props.match.path.slice(7, ))
  })
  const filteredDefaultSurya = suryaData.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes(props.match.path.slice(7, ))
  })

  // Filter by multi unit
  let multiUnitFilteredCremer = filteredDefaultCremer.filter(c => {
    let titleDetail = c.title + c.details
    return !titleDetail.toLowerCase().includes('1 unidade')
  })
  let multiUnitFilteredSpeed = filteredDefaultSpeed.filter(s => {
    let titleDetail = s.title + s.details
    return !titleDetail.toLowerCase().includes('1 unidade')
  })
  let multiUnitFilteredOnly = filteredDefaultOnly.filter(s => {
    let titleDetail = s.title + s.details
    return !titleDetail.toLowerCase().includes('reposição')
  })
  let multiUnitFilteredCia = filteredDefaultCia.filter(s => {
    let titleDetail = s.title + s.details
    return !titleDetail.toLowerCase().includes('reposição')
  })
  let multiUnitFilteredSurya = filteredDefaultSurya.filter(s => {
    let titleDetail = s.title + s.details
    return (titleDetail.toLowerCase().includes('kit') || titleDetail.toLowerCase().includes('cartela'))
  })

  // order by price
  multiUnitFilteredCremer = sort(multiUnitFilteredCremer);
  multiUnitFilteredSpeed = sort(multiUnitFilteredSpeed);
  multiUnitFilteredOnly = sortOnly(multiUnitFilteredOnly);
  multiUnitFilteredCia = sort(multiUnitFilteredCia);
  multiUnitFilteredSurya = sortSurya(multiUnitFilteredSurya);

  const [input, setInput] = useState('');
  const [ cremer, setCremer ] = useState(multiUnitFilteredCremer);
  const [ cremerListDefault ] = useState(multiUnitFilteredCremer);
  const [ speed, setSpeed ] = useState(multiUnitFilteredSpeed);
  const [ speedListDefault ] = useState(multiUnitFilteredSpeed);
  const [ only, setOnly ] = useState(multiUnitFilteredOnly);
  const [ onlyListDefault ] = useState(multiUnitFilteredOnly);
  const [ cia, setCia ] = useState(multiUnitFilteredCia);
  const [ ciaListDefault ] = useState(multiUnitFilteredCia);
  const [ surya, setSurya ] = useState(multiUnitFilteredSurya);
  const [ suryaListDefault ] = useState(multiUnitFilteredSurya);
  const [ showDropdown, setShowDropDown ] = useState(false);

  useEffect(() => {
    setCremer(multiUnitFilteredCremer);
    setSpeed(multiUnitFilteredSpeed);
    setOnly(multiUnitFilteredOnly);
    setCia(multiUnitFilteredCia);
    setSurya(multiUnitFilteredSurya);
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
    const stringifiedSpDate = JSON.stringify(format(spDate, 'dd/MM/yyyy HH:mm:ssXXX', { timeZone: 'America/Sao_Paulo'}))
    return stringifiedSpDate;
  }

  function handleShowDropDown() {
    setShowDropDown(!showDropdown);
  }
  
  //----------------------------------------------------------------------------
  return (
    <div className="container" onClick={handleShowDropDown}>
      <CategoryMenu activeProp={2}/> 
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
