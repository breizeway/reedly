import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Modal.css'
import { removeActive } from '../../store/modal'

const Modal = ({ content, width='73%', height='100%', position="absolute", right="0px"}) => {
    const dispatch = useDispatch()

    const modalVisible = {
        val: useSelector(state => state.modal.active),
        rmv: () => dispatch(removeActive(modalVisible.val)),
    }

    const closeModal = () => {
        modalVisible.rmv()
    }

    useEffect(() => {
        const initialInput = document.querySelector('.modal-focus')
        initialInput && initialInput.focus()
    }, [])

    return modalVisible.val && (
        <div className='modal'>
            <div
                className='modal__background'
                onClick={closeModal}
            >
                <div
                    className='modal__card'
                    onClick={e => e.stopPropagation()}
                    style={{width, height, position, right}}
                >
                    <div className='modal__content'>
                        {content}
                    </div>
                    <div
                        className='modal__close'
                        onClick={closeModal}
                    >
                        <div className='modal__close-upper' />
                        <div className='modal__close-icon'>
                            <i className='fas fa-times' />
                        </div>
                        <div className='modal__close-lower' />
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Modal
