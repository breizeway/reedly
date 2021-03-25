import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddFeedForm from './AddFeedForm.js';

function CreateFeedModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create a new feed</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddFeedForm />
        </Modal>
      )}
    </>
  );
}

export default CreateFeedModal;
