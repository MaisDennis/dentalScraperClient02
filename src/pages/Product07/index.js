import React, { useState, useEffect } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { FaEye } from 'react-icons/fa';
// -----------------------------------------------------------------------------
import CategoryMenu from '../../components/CategoryMenu';
import sort from '../../utils/sort'
import SubDivision from '../../components/SubDivision';

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
import crrestaurador from '../../items/itemsCremer/cr-restaurador-provisorio.html.json'
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
import spluvas from '../../items/itemsSpeed/sp-luvas.json'
import spluvadeprocedimento from '../../items/itemsSpeed/sp-luvas.json'
import spmatriz from '../../items/itemsSpeed/sp-matriz.json'
import spresina from '../../items/itemsSpeed/sp-resina-dental.json'
import sprestaurador from '../../items/itemsSpeed/sp-restaurador-provisorio.json'
import spsugador from '../../items/itemsSpeed/sp-sugadores.json'
import sptira from '../../items/itemsSpeed/sp-tiras+de+lixa.json'

import onacido from '../../items/itemsOnly/on-condicionadores-acidos.json' // filtrar fosforico
import onagua from '../../items/itemsOnly/on-agua-p-47-autoclave.json'
import onagulha from '../../items/itemsOnly/on-agulhas.json'
import onalgodao from '../../items/itemsOnly/on-agulhas.json' // separar rolete
import onaplicador from '../../items/itemsOnly/on-aplicador.json'
import onanestesico from '../../items/itemsOnly/on-anestesicos.json'
import oncompressa from '../../items/itemsOnly/on-gazes.json'
import oncunha from '../../items/itemsOnly/on-cunha.json'
import onembalagem from '../../items/itemsOnly/on-embalagem-p-47-esterilizac-o.json'
import onfio from '../../items/itemsOnly/on-fio-de-sutura.json'
import onionomero from '../../items/itemsOnly/on-ionomero-de-vidro.json'
import onlencol from '../../items/itemsOnly/on-lencois.json'
import onluvas from '../../items/itemsOnly/on-luvas.json' // OK
import onmatriz from '../../items/itemsOnly/on-matriz.json'
import onresina from '../../items/itemsOnly/on-resina-composta.json'
import onrestaurador from '../../items/itemsOnly/on-restaurador-provisorio.json'
import onsugador from '../../items/itemsOnly/on-sugadores.json'
import ontira from '../../items/itemsOnly/on-tira-p-47-acabamento-e-polimento.json'

import ciacido from '../../items/itemsCia/ci-acido.json' // tem que filtrar acido fosforico
import ciagua from '../../items/itemsCia/_empty.json' //não tem
import ciagulha from '../../items/itemsCia/ci-agulhas.json'
import cialgodao from '../../items/itemsCia/ci-undefined.json' // OK
import ciaplicador from '../../items/itemsCia/ci-aplicador-descartavel.json'
import cianestesico from '../../items/itemsCia/ci-anestesicos.json' // OK
import cicompressa from '../../items/itemsCia/ci-compressa-descartavel.json'
import cicunha from '../../items/itemsCia/ci-cunhas.json'
import ciembalagem from '../../items/itemsCia/ci-embalagem-p-esterilizacao.json'
import cifio from '../../items/itemsCia/ci-fio-de-sutura-agulhado.json'
import ciionomero from '../../items/itemsCia/ci-ionomero-de-vidro.json'
import cilencol from '../../items/itemsCia/ci-lencol-de-borracha-endodontia.json'
import ciluvacirurgica from '../../items/itemsCia/_empty.json' //não tem
import ciluvadeprocedimento from '../../items/itemsCia/_empty.json' // não tem
import cimatriz from '../../items/itemsCia/ci-matriz.json'
import ciresina from '../../items/itemsCia/ci-resina-composta.json'
import cirestaurador from '../../items/itemsCia/_empty.json' // rever
import cisugador from '../../items/itemsCia/ci-sugador-descartavel.json'
import citira from '../../items/itemsCia/ci-tira-de-lixa.json'
// -----------------------------------------------------------------------------
export default function Dashboard(props) {
  let crKey = []; let spKey = []; let onKey = []; let ciKey = [];

  // Filters
  const filteredOnAcido = onacido.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes('fosfórico')
  })

  const filteredOnLuvaDeProcedimento = onluvas.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes('procedimento')
  })

  const filteredOnLuvaCirurgica = onluvas.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes('cirúrgica')
  })

  const filteredCiAcido = ciacido.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes('fosfórico')
  })

  const filteredSpLuvadeProcedimento = spluvas.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes('procedimento')
  })

  const filteredSpLuvaCirurgica = spluvas.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes('cirúrgica')
  })

  const query = () => {
    const matchURL = props.match.url || '/lencol';
    switch (matchURL) {
      case ('/acido+fosforico'): crKey = cracido; spKey = spacido; onKey = filteredOnAcido; ciKey = filteredCiAcido; break;
      case ('/agua-destilada'): crKey = cragua; spKey = spagua;  onKey = onagua; ciKey = ciagua; break;
      case ('/agulha'): crKey = cragulha; spKey = spagulha;  onKey = onagulha; ciKey = ciagulha; break;
      case ('/algodao-rolete'): crKey = cralgodao; spKey = spalgodao;  onKey = onalgodao; ciKey = cialgodao; break;
      case ('/anestesico'): crKey = cranestesico; spKey = spanestesico;  onKey = onanestesico; ciKey = cianestesico; break;
      case ('/cunha'): crKey = crcunha; spKey = spcunha;  onKey = oncunha; ciKey = cicunha; break;
      case ('/embalagem-para-autoclave'): crKey = crembalagem; spKey = spembalagem;  onKey = onembalagem; ciKey = ciembalagem; break;
      case ('/fio-de-sutura'): crKey = crfio; spKey = spfio;  onKey = onfio; ciKey = cifio; break; 
      case ('/gaze'): crKey = crcompressa; spKey = spcompressa;  onKey = oncompressa; ciKey = cicompressa; break;
      case ('/ionomero-de-vidro'): crKey = crionomero; spKey = spionomero;  onKey = onionomero; ciKey = ciionomero; break;
      case ('/lencol-de-borracha'): crKey = crlencol; spKey = splencol;  onKey = onlencol; ciKey = cilencol; break;
      case ('/luva-cirurgica'): crKey = crluvacirurgica; spKey = filteredSpLuvaCirurgica;  onKey = filteredOnLuvaCirurgica; ciKey = ciluvacirurgica; break;
      case ('/luva-de-procedimento'): crKey = crluvadeprocedimento; spKey = filteredSpLuvadeProcedimento;  onKey = filteredOnLuvaDeProcedimento; ciKey = ciluvadeprocedimento; break;
      case ('/matriz'): crKey = crmatriz; spKey = spmatriz;  onKey = onmatriz; ciKey = cimatriz; break;
      case ('/microbrush'): crKey = craplicador; spKey = spaplicador;  onKey = onaplicador; ciKey = ciaplicador; break;
      case ('/resina-dental'): crKey = crresina; spKey = spresina;  onKey = onresina; ciKey = ciresina; break;
      case ('/restaurador-provisorio'): crKey = crrestaurador; spKey = sprestaurador;  onKey = onrestaurador; ciKey = cirestaurador; break;
      case ('/sugador'): crKey = crsugador; spKey = spsugador;  onKey = onsugador; ciKey = cisugador; break;
      case ('/tira'): crKey = crtira; spKey = sptira;  onKey = ontira; ciKey = citira; break;
      default: crKey = cracido; spKey = spacido;  onKey = onacido; ciKey = ciacido;

    }
  }

  query();

  crKey = sort(crKey); 
  spKey = sort(spKey);
  onKey = sort(onKey);
  ciKey = sort(ciKey); 

  const [input, setInput] = useState('');
  const [cremer, setCremer] = useState(crKey);
  const [cremerListDefault] = useState(crKey);
  const [speed, setSpeed] = useState(spKey);
  const [speedListDefault] = useState(spKey);
  const [only, setOnly] = useState(onKey);
  const [onlyListDefault] = useState(onKey);
  const [cia, setCia] = useState(ciKey);
  const [ciaListDefault] = useState(ciKey);

  useEffect(() => {
    setCremer(crKey);
    setSpeed(spKey);
    setOnly(onKey);
    setCia(ciKey);
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
    setInput(input);
    setCremer(filteredCremer);
    setSpeed(filteredSpeed);
    setOnly(filteredOnly);
    setCia(filteredCia);
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
