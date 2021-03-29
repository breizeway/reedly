import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

function ModalWrapper({modalLink, modalContent}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
                {modalLink}
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {modalContent}
                </Modal>
            )}
        </>
    );
}

export default ModalWrapper;
