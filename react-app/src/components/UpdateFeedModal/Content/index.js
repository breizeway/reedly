import React from "react"
import "./UpdateFeedModalContent.css"

function UpdateFeedModalContent() {

    return (
        <div className="form-container">
            <div className="form-container__header">Create New Feed</div>
            <div className="form-container__subheader">A private collection of trusted sources you want to read</div>
            <form>
                <div className="form-container__input-fields">
                    <div className='form-container__label'>Title</div>
                    <input
                        type="text"
                        required
                        placeholder="Title"
                    />
                </div>
                <div className="form__btn">
                    <button type="submit" id="signup-btn">Save</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateFeedModalContent;
