const LOAD_FEEDS = "feeds/LOAD";
const LOAD_FEED = "feed/LOAD"
const ADD_ONE_FEED = "feed/ADD_ONE";
const UPDATE_FEED = "feed/UPDATE";
const REMOVE_FEED = "feed/DELETE"
const ADD_SOURCE_TO_FEED = "feed/addSourceToFeed";

// An action is an object with a key of type
const load = feeds => {
    return {
        type: LOAD_FEEDS,
        feeds
    };
};

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

export const updateOneFeed = (feed) => ({
    type: UPDATE_FEED,
    payload: feed
})

const removeOneFeed = (feedId) => ({
    type: REMOVE_FEED,
    payload: feedId
})

export const addSourceToFeed = source => {
    return {
        type: ADD_SOURCE_TO_FEED,
        source
    };
};

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
    const response = await fetch(`/api/feeds/`, {
        method: 'POST',
        body: JSON.stringify(feedInfo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    if (!response.ok) throw response;
    const data = await response.json();
    dispatch(addOneFeed(data));
    return data;
}

export const updateFeed = (payload) => async (dispatch) => {
    const response = await fetch(`/api/feeds/${payload.feed_id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (!response.ok) throw response;
    const data = await response.json();
    dispatch(updateOneFeed(data.feed));
    return data
}

export const deleteFeed = (feedId) => async (dispatch) => {
    const response = await fetch(`/api/feeds/${feedId}`, {
        method: "DELETE",
        body: JSON.stringify("hi"),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    })
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(removeOneFeed(data.feed.id))
        return data
    }
}

const initialState = {};
const feedReducer = (state = initialState, action) => {
    let newState
    let feeds
    let source
    switch (action.type) {
        case LOAD_FEEDS:
            const allFeeds = {};
            feeds = action.feeds;
            feeds.forEach(feed => allFeeds[feed.id] = feed );
            return allFeeds;
        case ADD_ONE_FEED: {
                newState = Object.assign({}, state, { [action.payload.id]: action.payload })
                return newState;
            }
        case UPDATE_FEED: {
            console.log("hitting this route"); 
            newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case REMOVE_FEED: {
            newState = { ...state }
            delete newState[action.payload]
            return newState;
        }
        case ADD_SOURCE_TO_FEED: {
                newState = Object.assign({}, state)
                source = action.source.db_data
                feeds = source.feeds

                feeds.forEach((feedId) => {
                    newState[feedId].sources.push(source)
                })
                return newState;
            }
        default:
            return state;
    }
};
export default feedReducer;
