import React from 'react'

function filters(original, filterWord) {
  const filteredOriginal = original.filter(s => {
    let titleDetail = s.title + s.details
    return titleDetail.toLowerCase().includes(filterWord)
  })
  return filteredOriginal
}

export default filters
