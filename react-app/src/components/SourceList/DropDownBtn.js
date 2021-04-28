import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import "./SourceList.css"
import { deleteFeedSource } from "../../store/feed_details"


function DropDownBtn({ feed }) {
    const dispatch = useDispatch()
    const history = useHistory();
    const sourceId = useParams().id
    const [showMenu, setShowMenu] = useState(false);

    async function deleteOneSource() {
        let result = window.confirm("Are you sure you want to unfollow this source?")

        const payload = {
            sourceId: sourceId,
            feed: feed
        }

        if (result) {
            await dispatch(deleteFeedSource(payload));
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
                    <div className="delete-container">
                        <div className="icon dropdown__trash">
                            <i className="far fa-trash-alt"></i>
                        </div>
                        <div className="dropdown__section"
                            onClick={deleteOneSource}
                        >
                            Unfollow
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default DropDownBtn
