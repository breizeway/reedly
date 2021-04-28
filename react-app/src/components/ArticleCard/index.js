import React from 'react';
import parseFromHTML from 'html-react-parser'
import { useDispatch, useSelector } from 'react-redux';

import './ArticleCard.css';
import Modal from "../Modal"
import Article from "../Article"
import * as modalActions from "../../store/modal"


const ArticleCard = ({ entry, modalId }) => {
  const dispatch = useDispatch()

  const modal = {
    thisVal: modalId,
    val: useSelector(state => state.modal.active),
    set: () => dispatch(modalActions.setActive(modal.thisVal))
  }

  return (
    <>
      <div
        className='article-card'
        onClick={modal.set}
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
      {modal.val === modal.thisVal && (
        <Modal content={<Article entry={entry}/>} />
      )}
    </>
  )
};

export default ArticleCard;
