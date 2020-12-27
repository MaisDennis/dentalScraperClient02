import React from 'react'

function nonFilters(original, notTheWord) {
  const filteredOriginal = original.filter(s => {
    let titleDetail = s.title + s.details
    return !titleDetail.toLowerCase().includes(notTheWord)
  })
  return filteredOriginal
}

export default nonFilters
