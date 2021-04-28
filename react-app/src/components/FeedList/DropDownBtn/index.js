import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import "./DropDownBtn.css"
import Modal from "../../Modal"
import * as modalActions from "../../../store/modal"
import UpdateFeedModal from "../../UpdateFeedModal"
import { deleteFeed } from "../../../store/feeds"


function DropDownBtn() {
    const dispatch = useDispatch()
    const history = useHistory();
    const { feedId } = useParams();
    const [showMenu, setShowMenu] = useState(false);

    const modal = {
        thisVal: `Update/feed/name`,
        val: useSelector(state => state.modal.active),
        set: () => dispatch(modalActions.setActive(modal.thisVal))
    }

    async function deleteOneFeed() {
        let result = window.confirm("Are you sure you want to delete this feed?")

        if (result) {
            await dispatch(deleteFeed(feedId));
            history.push('/');
        }
    }

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
                        <div
                            onClick={modal.set}
                            className="dropdown__section">
                            Rename Feed
                        </div>
                    </div>
                    <div className="delete-container">
                        <div className="icon dropdown__trash">
                            <i className="far fa-trash-alt"></i>
                        </div>
                        <div className="dropdown__section"
                            onClick={deleteOneFeed}
                        >
                        Delete</div>
                    </div>
                </div>
            )}
            {modal.val === modal.thisVal && (
                <Modal content={<UpdateFeedModal />}
                    width="73%" height="100%"
                />
            )}
        </>
    )
}


export default DropDownBtn
