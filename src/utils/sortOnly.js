import React from 'react'

function sort(key) {
  key.map(a => {
    if (a.dividedPrice) {
      (a.parsedPrice = 
        (parseFloat(
          a.price
          .replace(/\r?\n|\r/g, "")
          .trim()
          .replace('.','')
          .replace(',','.')
          .slice(0, -10)
          .split('$')[1]
        ) *
        parseFloat(
          a.price
          // .replace(/\r?\n|\r/g, "")
          // .trim()
          // .replace('.','')
          // .replace(',','.')
          // .slice(0, 1)
          .split("x")[0]
        ))
      )
    }
    return a;
  })


  key.sort(compare);

  function compare(a, b) {
    if (a.parsedPrice > b.parsedPrice) {
      return 1;
    }
    if (a.parsedPrice < b.parsedPrice) {
      return -1;
    }
    return 0;
  }   return (key)
}

export default sort
