import React from 'react';
import { Link } from 'react-router-dom';
import parseFromHTML from 'html-react-parser'

import './ArticleCard.css';


const ArticleCard = ({ entry, sourceId }) => {
  const markAsRead = () => {
    console.log('marked as read :: ', entry.id)
  }

  return (
    <Link
      to={`/sources/${sourceId}/articles/:article_id`}
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
    </Link>
  )
};

export default ArticleCard;
