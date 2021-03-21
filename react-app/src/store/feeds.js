const LOAD_FEEDS = "feeds/LOAD";
const LOAD_FEED = "feed/LOAD"
const ADD_ONE_FEED = "feed/ADD_ONE";

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
    feed,
});

export const getFeeds = () => async dispatch => {
    const response = await fetch('/api/feeds');
    if (response.ok) {
        const { data } = await response.json();
        dispatch(load(data))
    }

    return data
}

export const getOneFeed = (id) => async (dispatch) => {
    const response = await fetch(`/api/feeds/${id}`)

    if (response.ok) {
        const { data } = await response.json();
        dispatch(loadOneFeed(data))
    }

    return data
}

export const postFeed = (feedInfo) => {
    const response = await fetch(`/api/feeds`, {
        method: 'POST',
        body: JSON.stringify(pokemonInfo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    
    if (!response.ok) throw response;
    const { data } = await response.json();
    dispatch(addOneFeed(data));
    return data;
}

const initialState = {};
const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CHARACTERS:
            const allCharacters = {};
            const { characters } = action;
            characters.forEach(char => allCharacters[char.id] = char );
            return allCharacters;
        default:
            return state;
    }
};
export default feedReducer;
