import React, { useState, useEffect } from 'react'
import "./DropDownBtn.css"
import ModalWrapper from "../../ModalWrapper"
import UpdateFeedModalLink from "../../UpdateFeedModal/Link/index";
import UpdateFeedModalContent from "../../UpdateFeedModal/Content/index"

function DropDownBtn() {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);


        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            <div className="settings__cog" onClick={openMenu}>
                <i className="fas fa-ellipsis-h"></i>
            </div>
            {showMenu && (
                <div className="dropdown-container">
                    <div>
                        <div className="icon dropdown__cursor">
                            <i className="fas fa-i-cursor"></i>
                        </div>
                        <ModalWrapper
                            modalLink={<UpdateFeedModalLink />}
                            modalContent={"test"}
                        />
                    </div>
                    <div className="delete-container">
                        <div className="icon dropdown__trash">
                            <i className="far fa-trash-alt"></i>
                        </div>
                        <div className="dropdown__section">Delete</div>
                    </div>
                </div>
            )}
        </>
    )
}


export default DropDownBtn
