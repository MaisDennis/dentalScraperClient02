import React from 'react'

function nonFilters(original, notTheWord, anotherWord) {
  const filteredOriginal = original.filter(s => {
    let titleDetail = s.title
    return !titleDetail.toLowerCase().includes(notTheWord) && !titleDetail.toLowerCase().includes(anotherWord)
  })
  return filteredOriginal
}

export default nonFilters
