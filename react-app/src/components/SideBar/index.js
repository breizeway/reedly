import { useSelector, useDispatch } from 'react-redux';
import { getFeeds } from '../../store/feeds';
import "./SideBar.css"

const SideBar = () => {
    const dispatch = useDispatch();
    const feeds = useSelector(state => state.feeds)
    const feedsArr = Object.values(feeds);

    useEffect(() => {
        dispatch(getFeeds());
    }, [dispatch]);

    return (
        <div className="sidebar"></div>
    )
}

export default SideBar