import React, { useState } from 'react';
import parseFromHTML from 'html-react-parser'

import './ArticleModalLink.css';


const ArticleModalLink = ({ entry }) => {
  const markAsRead = () => {
    console.log('marked as read :: ', entry.id)
  }

  return (
    <div
      onClick={markAsRead}
      className='article-card'
    >
      <div className='article-card__left'>
        <div
          className='article-card__image'
          style={{backgroundImage: `url(${entry.media_content[0]?.url})`}}
        />
      </div>
      <div className='article-card__right'>
        <div className='article-card__title'>
          {entry.title}
        </div>
        <div className='article-card__summary'>
          {parseFromHTML(entry.summary)}
        </div>
      </div>
    </div>
  )
};

export default ArticleModalLink;
