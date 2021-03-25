import React from 'react';

import './ArticleCard.css';

const ArticleCard = ({ entry }) => {
  return (
    <div className='article-card'>
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
      </div>
    </div>
  )
};

export default ArticleCard;
