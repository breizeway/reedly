import React from 'react'
import parseFromHTML from 'html-react-parser'

import './ArticleModalContent.css'


const ArticelModalContent = ({ entry }) => {
  return (
    <div className='article'>
      <h1 className='article__title'>{entry.title}</h1>
      <h1 className='article__subtitle'>{entry.subtitle}</h1>
      <h4 className='article__author'>{entry.author}</h4>
      <div className='article__content'>
        {parseFromHTML(
          entry.content ?
          entry.content[0].value :
          entry.summary
        )}
      </div>
    </div>
  )
}

export default ArticelModalContent
