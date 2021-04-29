import React from 'react'
import parseFromHTML from 'html-react-parser'

import './Article.css'


const Article = ({ entry }) => {
  return (
    <div className='article'>
      <a href={entry.link} target='_blank'>
        <h1
          className='article__title-link'
        >
          {entry.title}
        </h1>
      </a>
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

export default Article
