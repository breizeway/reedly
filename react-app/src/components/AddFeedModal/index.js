import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddFeedForm from './AddFeedForm.js';

function CreateFeedModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="sidebar__row">
            <div className="sidebar__add-feed sidebar__title" onClick={() => setShowModal(true)}>Create New Feed</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddFeedForm />
                </Modal>
            )}
        </div>
    );
}

export default CreateFeedModal;
