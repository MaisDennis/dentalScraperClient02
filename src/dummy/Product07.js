import React, { useState, useEffect } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { FaEye } from 'react-icons/fa';
// -----------------------------------------------------------------------------
import SearchBar from '../../components/Searchbar'
import cracido from '../../items/itemsCremer/cr-acido.html.json'
import cragua from '../../items/itemsCremer/cr-agua-destilada.html.json'
import cragulha from '../../items/itemsCremer/cr-agulha-gengival.html.json'
import cralgodao from '../../items/itemsCremer/cr-rolo-dental.html.json'
import craplicador from '../../items/itemsCremer/cr-aplicadores.json'
import cranestesico from '../../items/itemsCremer/cr-anestesico.html.json'
import crcompressa from '../../items/itemsCremer/cr-compressa-descartavel.html.json'
import crcunha from '../../items/itemsCremer/cr-cunha.html.json'
import crembalagem from '../../items/itemsCremer/cr-embalagem-para-esterilizacao.html.json'
import crfio from '../../items/itemsCremer/cr-fio-de-sutura-agulhado.html.json'
import crionomero from '../../items/itemsCremer/cr-ionomero-de-vidro.html.json'
import crlencol from '../../items/itemsCremer/cr-lencol-de-borracha-para-endodontia.html.json'
import crluvacirurgica from '../../items/itemsCremer/cr-luva-cirurgica-esteril.html.json'
import crluvadeprocedimento from '../../items/itemsCremer/cr-luva-de-procedimento.html.json'
import crmatriz from '../../items/itemsCremer/cr-matriz.html.json'
import crresina from '../../items/itemsCremer/cr-resina-composta.json'
import crrestaurador from '../../items/itemsCremer/cr-restaurador-provisorio.json'
import crsugador from '../../items/itemsCremer/cr-sugador-descartavel.html.json'
import crtira from '../../items/itemsCremer/cr-tira-de-lixa.html.json'

import spacido from '../../items/itemsSpeed/sp-acidos+fosforicos.json'
import spagua from '../../items/itemsSpeed/sp-agua-p-autoclave.json'
import spagulha from '../../items/itemsSpeed/sp-agulhas.json'
import spalgodao from '../../items/itemsSpeed/sp-rolete.json'
import spaplicador from '../../items/itemsSpeed/sp-aplicador.json'
import spanestesico from '../../items/itemsSpeed/sp-anestesicos.json'
import spcompressa from '../../items/itemsSpeed/sp-compressa-de-gaze.json'
import spcunha from '../../items/itemsSpeed/sp-cunha.json'
import spembalagem from '../../items/itemsSpeed/sp-embalagem-p-esterilizacao.json'
import spfio from '../../items/itemsSpeed/sp-fio+sutura.json'
import spionomero from '../../items/itemsSpeed/sp-ionomero-de-vidro.json'
import splencol from '../../items/itemsSpeed/sp-lencois.json'
import spluvacirurgica from '../../items/itemsSpeed/sp-luva-cirurgica.json'
import spluvadeprocedimento from '../../items/itemsSpeed/sp-luvas.json'
import spmatriz from '../../items/itemsSpeed/sp-matriz.json'
import spresina from '../../items/itemsSpeed/sp-resina-dental.json'
import sprestaurador from '../../items/itemsSpeed/sp-restaurador-provisorio.json'
import spsugador from '../../items/itemsSpeed/sp-sugadores.json'
import sptira from '../../items/itemsSpeed/sp-tiras+de+lixa.json'

import videoplus from '../../assets/video-plus.svg';
import apps from '../../assets/apps.svg';
import bell from '../../assets/bell.svg';
import CategoryMenu from '../../components/CategoryMenu';
import sort from '../../utils/sort'
import SubDivision from '../../components/SubDivision';
// -----------------------------------------------------------------------------
export default function Dashboard(props) {
  let crKey = []; let spKey = [];

  const query = () => {
    const matchURL = props.match.url || '/lencol';
    switch (matchURL) {
      case ('/acido+fosforico'): crKey = cracido; spKey = spacido; break;
      case ('/agua-destilada'): crKey = cragua; spKey = spagua; break;
      case ('/agulha'): crKey = cragulha; spKey = spagulha; break;
      case ('/algodao-rolete'): crKey = cralgodao; spKey = spalgodao; break;
      case ('/anestesico'): crKey = cranestesico; spKey = spanestesico; break;
      case ('/cunha'): crKey = crcunha; spKey = spcunha; break;
      case ('/embalagem-para-autoclave'): crKey = crembalagem; spKey = spembalagem; break;
      case ('/fio-de-sutura'): crKey = crfio; spKey = spfio; break;
      case ('/gaze'): crKey = crcompressa; spKey = spcompressa; break;
      case ('/ionomero-de-vidro'): crKey = crionomero; spKey = spionomero; break;
      case ('/lencol-de-borracha'): crKey = crlencol; spKey = splencol; break;
      case ('/luva-cirurgica'): crKey = crluvacirurgica; spKey = spluvacirurgica; break;
      case ('/luva-de-procedimento'): crKey = crluvadeprocedimento; spKey = spluvadeprocedimento; break;
      case ('/matriz'): crKey = crmatriz; spKey = spmatriz; break;
      case ('/microbrush'): crKey = craplicador; spKey = spaplicador; break;
      case ('/resina-dental'): crKey = crresina; spKey = spresina; break;
      case ('/restaurador-provisorio'): crKey = crrestaurador; spKey = sprestaurador; break;
      case ('/sugador'): crKey = crsugador; spKey = spsugador; break;
      case ('/tira'): crKey = crtira; spKey = sptira; break;
      default: crKey = cracido; spKey = spacido;

    }
  }

  query();

  // crKey.map(a => {
  //   if (a.price) {
  //     a.parsedPrice = (parseFloat(a.price.replace('.', '').replace(',', '.').slice(2,)))
  //   }
  //   return a;
  // })
  // spKey.map(a => {
  //   if (a.price) {
  //     a.parsedPrice = (parseFloat(a.price.replace('.', '').replace(',', '.').slice(3,)))
  //   }
  //   return a;
  // })

  // crKey.sort(compare);
  // spKey.sort(compare);

  // function compare(a, b) {
  //   if (a.parsedPrice > b.parsedPrice) {
  //     return 1;
  //   }
  //   if (a.parsedPrice < b.parsedPrice) {
  //     return -1;
  //   }
  //   return 0;
  // }

  crKey = sort(crKey); 
  spKey = sort(spKey); 

  const [input, setInput] = useState('');
  const [cremer, setCremer] = useState(crKey);
  const [cremerListDefault] = useState(crKey);
  const [speed, setSpeed] = useState(spKey);
  const [speedListDefault] = useState(spKey);

  useEffect(() => {
    setCremer(crKey);
    setSpeed(spKey);
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
    setInput(input);
    setCremer(filteredCremer);
    setSpeed(filteredSpeed);
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
      <CategoryMenu activeProp={props.match.url} />
      <header className="header">
        <div className="search-bar-div">
          <SearchBar input={input} onChange={updateInput} />
        </div>
        <a href="http://www.google.com"><h1 className="logo"><FaEye/>Cyclops Dental</h1></a>
      </header>

      

      <div className="videos">
        
        {/* <div className="videos-sub-div">
          
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
                      Atualizada: {convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(1, 11)} às {
                        convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(12, -10)}
                    </label>
                  </div>
                </article>
              )
            }
          </section>
        </div> */}
        <SubDivision arrayName={cremer} convertedDate={convertedDate} title={'Dental Cremer'}/>
        {/* <div className="videos-sub-div">
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
                      Atualizada: {convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(1, 11)} às {
                        convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(12, -10)}
                    </label>
                  </div>
                </article>
              )
            }
          </section>
        </div> */}
        <SubDivision arrayName={speed} convertedDate={ convertedDate} title={'Dental Speed'}/>
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
                      Atualizada: {convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(1, 11)} às {
                        convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(12, -10)}
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
                      Atualizada: {convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(1, 11)} às {
                        convertedDate(JSON.parse(i.time.stringifiedTimeData)).slice(12, -10)}
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
