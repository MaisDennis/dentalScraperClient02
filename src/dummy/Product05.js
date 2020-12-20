import React, { useState, useEffect } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { FaEye } from 'react-icons/fa';
// -----------------------------------------------------------------------------
import SearchBar from '../../components/Searchbar'
import cremerData from '../../items/itemsCremer/cr-braquetes-reposicao.json'
import speedData from '../../items/itemsSpeed/sp-braquetes-reposicao.json'
import videoplus from '../../assets/video-plus.svg';
import apps from '../../assets/apps.svg';
import bell from '../../assets/bell.svg';
import CategoryMenu from '../../components/CategoryMenu'
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
  
  // Filter by unit
  const unitFilteredCremer = filteredDefaultCremer.filter(c => {
    let titleDetail = c.title + c.details
    return titleDetail.toLowerCase().includes('1 unidade')
  })
  const unitFilterSpeed = filteredDefaultSpeed.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes('1 unidade')
  })

  // order by price
  unitFilteredCremer.map(a => {
    if (a.price) {
      a.parsedPrice = (parseFloat(a.price.replace('.','').replace(',','.').slice(2, )))
    }
    return a;
   })
  unitFilterSpeed.map(a => {
    if (a.price) {
      a.parsedPrice = (parseFloat(a.price.replace('.','').replace(',','.').slice(3, )))
    }
    return a;
  })

  unitFilteredCremer.sort(compare);
  unitFilterSpeed.sort(compare);
 
  function compare (a, b) {
    if(a.parsedPrice > b.parsedPrice) {
      return 1;
    }
    if (a.parsedPrice < b.parsedPrice) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    setCremer(unitFilteredCremer);
    setSpeed(unitFilterSpeed);
  }, [props.match.path])

  const [input, setInput] = useState('');
  const [ cremer, setCremer ] = useState(unitFilteredCremer);
  const [ cremerListDefault ] = useState(unitFilteredCremer);
  const [ speed, setSpeed ] = useState(unitFilterSpeed);
  const [ speedListDefault ] = useState(unitFilterSpeed);
  const [ showDropdown, setShowDropDown ] = useState(false);

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
    setInput(input);
    setCremer(filteredCremer);
    setSpeed(filteredSpeed);
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
      <header className="header">
        <a href="http://www.google.com"><h1 className="logo"><FaEye/>Cyclops Dental</h1></a>
        <div className="search-bar-div">
          <SearchBar input={input} onChange={updateInput}/>
        </div>
        <div className="menu-icons">
          <a href="http://www.google.com"><img src={videoplus} alt="Upload Video" /></a>
          <a href="http://www.google.com"><img src={apps} alt="Apps" /></a>
          <a href="http://www.google.com"><img src={bell} alt="Notifications" /></a>
          <a href="http://www.google.com">
            <img className="menu-channel-icon" src="http:///unsplash.it/36/36?gravity=center" alt="Your Channel" />
          </a>
        </div>
      </header>

      <CategoryMenu activeProp={1}/> 
  
      <div className="videos">
        <div className="videos-sub-div">
          <h2 className="video-section-title">Dental Cremer
            <button className="video-section-title-close">&times;</button>
          </h2>
          <section className="video-section">
            {
              cremer.map((i) =>
                <article key={`${i.title}&${i.href}`} className="video-container">
                  <a href={i.href} className="thumbnail" data-duration={i.price ? i.price : 'n/a'} target="_blank" rel="noreferrer">
                    <h3 className="thumbnail-title">{i.title ? i.title : 'n/a'}</h3>
                    <img className="thumbnail-image" 
                      src={i.img ? i.img : 'http://unsplash.it/250/150?gravity=center'} alt="Imagem do produto"
                    />
                  </a>
                  <div className="video-bottom-section">
                      <label className="quote-description">{i.details ? i.details : 'n/a'}</label>
                      <label className="quote-label-today">
                        Atualizada: {convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(1,11)} às {
                        convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(12,-10)}
                      </label>
                  </div>
                </article>
              )
            }
          </section>
        </div>
        <div className="videos-sub-div">
          <h2 className="video-section-title">Dental Speed
            <button className="video-section-title-close">&times;</button>
          </h2>
          <section className="video-section">
            {
              speed.map((i) =>
                <article key={`${i.title}&${i.href}`} className="video-container">
                  <a href={i.href} className="thumbnail" data-duration={i.price ? i.price : 'n/a'} target="_blank" rel="noreferrer">
                    <h3 className="thumbnail-title">{i.title ? i.title : 'n/a'} {i.brand ? i.brand : 'n/a'}</h3>
                    <img className="thumbnail-image" 
                      src={i.img ? i.img : 'http://unsplash.it/250/150?gravity=center'} alt="Imagem do produto" 
                    />
                  </a>
                  <div className="video-bottom-section">
                      <label className="quote-description">{i.details ? i.details : 'n/a'}</label>
                      <label className="quote-label-today">
                        Atualizada: {convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(1,11)} às {
                        convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(12,-10)}
                      </label>
                  </div>
                </article>
              )
            }
          </section>
        </div>
      </div>
    </div>
  );
}
