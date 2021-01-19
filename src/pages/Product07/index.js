import React, { useState, useEffect } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { FaEye } from 'react-icons/fa';
// -----------------------------------------------------------------------------
import CategoryMenu from '../../components/CategoryMenu';
import sort from '../../utils/sort';
import sortSurya from '../../utils/sortSurya';
import sortOnly from '../../utils/sortOnly'
import filters from '../../utils/filters';
import filtersSurya from '../../utils/filtersSurya'
import nonFilters from '../../utils/nonFilters';
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
import crresinaacrilica from '../../items/itemsCremer/cr-resina-acrilica.html.json'
import cralginato from '../../items/itemsCremer/cr-alginato.html.json'
import crgesso from '../../items/itemsCremer/cr-gesso.html.json'
import crcera from '../../items/itemsCremer/cr-cera.html.json'
import crsiliconedeadicao from '../../items/itemsCremer/cr-silicone-de-adicao.html.json'
import crsiliconedecondensacao from '../../items/itemsCremer/cr-silicone-de-condensacao.html.json'
import crpinodefibra from '../../items/itemsCremer/cr-pino-de-fibra.html.json'
import crpinometalico from '../../items/itemsCremer/cr-pino-metalico.html.json'
import crcimentoresinoso from '../../items/itemsCremer/cr-cimento-resinoso.html.json'
import crcimentoprovisorio from '../../items/itemsCremer/cr-cimento-provisorio.html.json'
import crcimentodezinco from '../../items/itemsCremer/cr-cimento-fosfato-de-zinco.html.json'

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
import spmatriz from '../../items/itemsSpeed/sp-matriz.json'
import spresina from '../../items/itemsSpeed/sp-resina-dental.json'
import sprestaurador from '../../items/itemsSpeed/sp-restaurador-provisorio.json'
import spsugador from '../../items/itemsSpeed/sp-sugadores.json'
import sptira from '../../items/itemsSpeed/sp-tiras+de+lixa.json'
import spresinaacrilica from '../../items/itemsSpeed/sp-resina-acrilica-protese.json'
import spalginato from '../../items/itemsSpeed/sp-alginatos.json'
import spgesso from '../../items/itemsSpeed/sp-gesso-protese.json'
import spcera from '../../items/itemsSpeed/sp-cera.json'
import spsiliconedeadicao from '../../items/itemsSpeed/sp-silicone-de-adicao.json'
import spsiliconedecondensacao from '../../items/itemsSpeed/sp-silicone-de-condensacao.json'
import sppino from '../../items/itemsSpeed/sp-pino-e-nucleo.json' // separar
import spcimentos from '../../items/itemsSpeed/sp-cimento.json' // separar

import onacido from '../../items/itemsOnly/on-condicionadores-acidos.json' // filtrar fosforico
import onagua from '../../items/itemsOnly/on-agua-p-47-autoclave.json'
import onagulha from '../../items/itemsOnly/on-agulhas.json'
import onalgodao from '../../items/itemsOnly/on-algodoes.json' // separar rolete
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
import cialgodao from '../../items/itemsCia/ci-algodao.json' // OK
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
import ciresinaacrilica from '../../items/itemsCia/ci-resina-acrilica.json'
import cialginato from '../../items/itemsCia/ci-alginato-moldagem.json'
import cigesso from '../../items/itemsCia/ci-gesso.json'
import cicera from '../../items/itemsCia/ci-ceras.json'
import cisiliconedeadicao from '../../items/itemsCia/ci-silicone-de-adicao.json'
import cisiliconedecondensacao from '../../items/itemsCia/ci-silicone-de-condensacao.json'
import cipinodefibra from '../../items/itemsCia/ci-pino-fibra-de-vidro.json'
import cipinometalico from '../../items/itemsCia/ci-pino-metalico.json'
import cicimentoresinoso from '../../items/itemsCia/ci-cimento-resinoso.json'
import cicimentoprovisorio from '../../items/itemsCia/ci-cimento-provisorio.json'
import cicimentodezinco from '../../items/itemsCia/ci-cimento-fosfato-de-zinco.json'


import suacido from '../../items/itemsSurya/su-acidos.html.json'
import suagua from '../../items/itemsSurya/su-esterilizacao.html.json'
import suagulha from '../../items/itemsSurya/su-agulhas-gengivais.html.json'
import sualgodao from '../../items/itemsSurya/su-algodoes.html.json'
import suaplicador from '../../items/itemsSurya/su-pinceis-microaplicadores.html.json'
import suanestesico from '../../items/itemsSurya/su-anestesicos.html.json'
import sucompressa from '../../items/itemsSurya/su-gazes.html.json'
import sucunha from '../../items/itemsSurya/su-cunha.html.json'
import suembalagem from '../../items/itemsSurya/_empty.json'
import sufio from '../../items/itemsSurya/su-fio-de-sutura.json'
import suionomero from '../../items/itemsSurya/su-ionomeros.json'
import sulencol from '../../items/itemsSurya/su-lencol-de-borracha.html.json'
import suluvacirurgica from '../../items/itemsSurya/su-luvas-cirurgicas-estereis.html.json'
import suluvadeprocedimento from '../../items/itemsSurya/su-luva-de-procedimento.json'
import sumatriz from '../../items/itemsSurya/su-matriz.json'
import suresina from '../../items/itemsSurya/su-resinas.json'
import surestaurador from '../../items/itemsSurya/su-obturadores-restauradores.html.json'
import susugador from '../../items/itemsSurya/su-sugadores-cirurgicos-plasticos.html.json'
import sutira from '../../items/itemsSurya/su-tiras-de-poliester.html.json'
import suresinaacrilica from '../../items/itemsSurya/su-resina-acrilica.json'
import sualginatosilicones from '../../items/itemsSurya/su-alginato-silicones.json' // separar
import sugesso from '../../items/itemsSurya/su-gesso.json'
import sucera from '../../items/itemsSurya/su-cera.json'
import supinodefibra from '../../items/itemsSurya/su-pino-de-fibra.json'
import supinometalico from '../../items/itemsSurya/_empty.json'
import sucimentoresinoso from '../../items/itemsSurya/su-cimentos-resinosos.html.json'
import sucimentoprovisorio from '../../items/itemsSurya/_empty.json'
import sucimentodezinco from '../../items/itemsSurya/_empty.json'


// -----------------------------------------------------------------------------
export default function Dashboard(props) {
  let crKey = []; let spKey = []; let onKey = []; let ciKey = []; let suKey = [];
  
  // Filters
  const filteredOnAcido = filters(onacido, 'fosfórico')
  const filteredCiAcido = filters(ciacido, 'fosfórico')
  const filteredSuAcido = filtersSurya(suacido, 'fosforico')

  const filteredOnLuvaDeProcedimento = filters(onluvas, 'procedimento')
  const filteredSpLuvadeProcedimento = filters(spluvas, 'procedimento')
  const nonFilteredCrLuvadeProcedimento = nonFilters(crluvadeprocedimento, 'sobre')

  const filteredOnLuvaCirurgica = filters(onluvas, 'cirúrgica')
  const filteredSpLuvaCirurgica = filters(spluvas, 'cirúrgica')

  const filteredSpAplicador = filters(spaplicador, 'micro')
  const nonFilteredCrAplicador = nonFilters(craplicador, 'pincel')
  const nonNonFilteredCrAplicador = nonFilters(nonFilteredCrAplicador, 'cálcio')
  const nonFilteredOnAplicador = nonFilters(onaplicador, 'hidróxido')

  const nonFilteredCrMatriz = nonFilters(crmatriz, 'anel')

  const nonFilteredSpAgulha = nonFilters(spagulha, 'irrigação')

  const filteredSuAgua = filtersSurya(suagua, 'agua')

  const filteredSuAlgodao = filtersSurya(sualgodao, 'rolete')

  const filteredSpPinoDeFibra = filters(sppino, 'fibra')
  const filteredSpPinoMetalico = filters(sppino, 'metálico')

  const filteredSpCimentoResinoso = filters(spcimentos, 'resinoso')
  const filteredSpCimentoProvisorio = filters(spcimentos, 'provisório')
  const filteredSpCimentoDeZinco = filters(spcimentos, 'zinco')

  const filteredSuAlginato =  filtersSurya(sualginatosilicones, 'alginato')
  const filteredSuSiliconeDeAdicao = filtersSurya(sualginatosilicones, 'adicao')
  const filteredSuSiliconeDeCondensacao = filtersSurya(sualginatosilicones, 'condensacao')
  
  const query = () => {
    const matchURL = props.match.url || '/lencol';
    switch (matchURL) {
      case ('/acido+fosforico'): crKey = cracido; spKey = spacido; onKey = filteredOnAcido; ciKey = filteredCiAcido; suKey = filteredSuAcido; break;
      case ('/agua-destilada'): crKey = cragua; spKey = spagua; onKey = onagua; ciKey = ciagua; suKey = filteredSuAgua; break;
      case ('/agulha'): crKey = cragulha; spKey = nonFilteredSpAgulha; onKey = onagulha; ciKey = ciagulha; suKey = suagulha; break;
      case ('/algodao-rolete'): crKey = cralgodao; spKey = spalgodao; onKey = onalgodao; ciKey = cialgodao; suKey = filteredSuAlgodao; break;
      case ('/anestesico'): crKey = cranestesico; spKey = spanestesico; onKey = onanestesico; ciKey = cianestesico; suKey = suanestesico; break;
      case ('/cunha'): crKey = crcunha; spKey = spcunha; onKey = oncunha; ciKey = cicunha; suKey = sucunha; break;
      case ('/embalagem-para-autoclave'): crKey = crembalagem; spKey = spembalagem; onKey = onembalagem; ciKey = ciembalagem; suKey = suembalagem; break;
      case ('/fio-de-sutura'): crKey = crfio; spKey = spfio; onKey = onfio; ciKey = cifio; suKey = sufio; break;
      case ('/gaze'): crKey = crcompressa; spKey = spcompressa; onKey = oncompressa; ciKey = cicompressa; suKey = sucompressa; break;
      case ('/ionomero-de-vidro'): crKey = crionomero; spKey = spionomero; onKey = onionomero; ciKey = ciionomero; suKey = suionomero; break;
      case ('/lencol-de-borracha'): crKey = crlencol; spKey = splencol; onKey = onlencol; ciKey = cilencol; suKey = sulencol; break;
      case ('/luva-cirurgica'): crKey = crluvacirurgica; spKey = filteredSpLuvaCirurgica; onKey = filteredOnLuvaCirurgica; ciKey = ciluvacirurgica; suKey = suluvacirurgica; break;
      case ('/luva-de-procedimento'): crKey = nonFilteredCrLuvadeProcedimento; spKey = filteredSpLuvadeProcedimento; onKey = filteredOnLuvaDeProcedimento; ciKey = ciluvadeprocedimento; suKey = suluvadeprocedimento; break;
      case ('/matriz'): crKey = nonFilteredCrMatriz; spKey = spmatriz; onKey = onmatriz; ciKey = cimatriz; suKey = sumatriz; break;
      case ('/microbrush'): crKey = nonNonFilteredCrAplicador; spKey = filteredSpAplicador; onKey = nonFilteredOnAplicador; ciKey = ciaplicador; suKey = suaplicador; break;
      case ('/resina-dental'): crKey = crresina; spKey = spresina; onKey = onresina; ciKey = ciresina; suKey = suresina; break;
      case ('/restaurador-provisorio'): crKey = crrestaurador; spKey = sprestaurador; onKey = onrestaurador; ciKey = cirestaurador; suKey = surestaurador; break;
      case ('/sugador'): crKey = crsugador; spKey = spsugador; onKey = onsugador; ciKey = cisugador; suKey = susugador; break;
      
      case ('/resina-acrilica'): crKey = crresinaacrilica; spKey = spresinaacrilica; onKey = ontira; ciKey = ciresinaacrilica; suKey = suresinaacrilica; break;

      case ('/gesso'): crKey = crgesso; spKey = spgesso; onKey = ontira; ciKey = cigesso; suKey = sugesso; break;
      case ('/cera'): crKey = crcera; spKey = spcera; onKey = ontira; ciKey = cicera; suKey = sucera; break;
      case ('/alginato'): crKey = cralginato; spKey = spalginato; onKey = onsugador; ciKey = cialginato; suKey = filteredSuAlginato; break;
      case ('/silicone-de-adicao'): crKey = cisiliconedeadicao; spKey = cisiliconedeadicao; onKey = onsugador; ciKey = cisiliconedeadicao; suKey = filteredSuSiliconeDeAdicao; break;
      case ('/silicone-de-condensacao'): crKey = crsiliconedecondensacao; spKey = spsiliconedecondensacao; onKey = onsugador; ciKey = cisiliconedecondensacao; suKey = filteredSuSiliconeDeCondensacao; break;
      case ('/alginato'): crKey = cralginato; spKey = spalginato; onKey = onsugador; ciKey = cialginato; suKey = filteredSuAlginato; break;

      case ('/pino-de-fibra'): crKey = crpinodefibra; spKey = filteredSpPinoDeFibra; onKey = ontira; ciKey = cipinodefibra; suKey = supinodefibra; break;
      case ('/pino-metalico'): crKey = crpinometalico; spKey = filteredSpPinoMetalico; onKey = ontira; ciKey = cipinometalico; suKey = supinometalico; break;
      case ('/cimento-resinoso'): crKey = crcimentoresinoso; spKey = filteredSpCimentoResinoso; onKey = ontira; ciKey = cicimentoresinoso; suKey = sucimentoresinoso; break;
      case ('/cimento-provisorio'): crKey = crcimentoprovisorio; spKey = filteredSpCimentoProvisorio; onKey = ontira; ciKey = cicimentoprovisorio; suKey = sucimentoprovisorio; break;
      case ('/cimento-de-zinco'): crKey = crcimentodezinco; spKey = filteredSpCimentoDeZinco; onKey = ontira; ciKey = cicimentodezinco; suKey = sucimentodezinco; break;
      default: crKey = cracido; spKey = spacido; onKey = onacido; ciKey = ciacido; suKey = suacido;
    }
  }
  
  query();
  console.log(cialginato)
  console.log(cralginato)
  console.log(spalginato)


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
  // const [only, setOnly] = useState(onKey);
  const [onlyListDefault] = useState(onKey);
  const [cia, setCia] = useState(ciKey);
  const [ciaListDefault] = useState(ciKey);
  const [surya, setSurya] = useState(suKey);
  const [suryaListDefault] = useState(suKey);

  useEffect(() => {
    setCremer(crKey);
    setSpeed(spKey);
    // setOnly(onKey);
    setCia(ciKey);
    setSurya(suKey);
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
      let titleDetail = s.title
      return titleDetail.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setCremer(filteredCremer);
    setSpeed(filteredSpeed);
    // setOnly(filteredOnly);
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
      <CategoryMenu activeProp={props.match.url} />
      <header className="header">
        <div className="search-bar-div">
          <SearchBar input={input} onChange={updateInput} />
        </div>
        <h1 className="logo"><FaEye />Cyclops</h1>
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
