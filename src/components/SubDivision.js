import React, { useState, useEffect } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { FaEye } from 'react-icons/fa';
// -----------------------------------------------------------------------------

function SubDivision({ arrayName, convertedDate, title, titlePageLink }) {
   
  return (
    <div className="videos-sub-div">
      
      <h2 className="video-section-title">
        <a href={titlePageLink} className="video-link" style={{textDecoration: 'none', color: '#999'}}>{title}</a>
            {/* <button className="video-section-title-close">&times;</button> */}
      </h2>
      <div className="video-sub-y-scroll-div">
      <section className="video-section">
        {
          arrayName.map((i) => 
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
    </div>
  )
}

export default SubDivision
