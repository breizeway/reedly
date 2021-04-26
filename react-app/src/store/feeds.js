const LOAD_FEEDS = "feeds/LOAD";
const LOAD_FEED = "feed/LOAD"
const ADD_ONE_FEED = "feed/ADD_ONE";
const ADD_SOURCE_TO_FEED = "feed/ADD_SOURCE_TO_FEED";

// An action is an object with a key of type
const load = feeds => {
    return {
        type: LOAD_FEEDS,
        feeds
    };
};

// const load = feeds => {
//     return {
//         type: LOAD_FEEDS,
//         feeds
//     };
// };

const loadOneFeed = (feed) => {
    return {
        type: LOAD_FEED,
        feed
    };
};

const addOneFeed = (feed) => ({
    type: ADD_ONE_FEED,
    payload: feed,
});

export const getFeeds = () => async dispatch => {
    const response = await fetch('/api/feeds/');
    if (response.ok) {
        const data = await response.json();
        dispatch(load(data.feeds))
        return data
    }
}

export const getOneFeed = (id) => async (dispatch) => {
    const response = await fetch(`/api/feeds/${id}`)

    if (response.ok) {
        const { data } = await response.json();
        dispatch(loadOneFeed(data))
        return data
    }
}

export const postFeed = (feedInfo) => async (dispatch) => {
    console.log("from POSTFEED in store", feedInfo)
    const response = await fetch(`/api/feeds/`, {
        method: 'POST',
        body: JSON.stringify(feedInfo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    if (!response.ok) throw response;
    const data = await response.json();
    console.log("data from within post feed after response.ok", data)
    dispatch(addOneFeed(data));
    return data;
}

const initialState = {};
const feedReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_FEEDS:
            const allFeeds = {};
            const { feeds } = action;
            feeds.forEach(feed => allFeeds[feed.id] = feed );
            return allFeeds;
        case ADD_ONE_FEED: {
                console.log("action.payload inside of ADD_ONE_FEED reducer", action.payload)
                newState = Object.assign({}, state, { [action.payload.id]: action.payload })
                return newState;
            }
        default:
            return state;
    }
};
export default feedReducer;
