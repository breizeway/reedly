import { updateOneFeed } from "./feeds"

const LOAD_FOLLOWS = "sources/FOLLOW/LOAD"
const FOLLOW = "sources/FOLLOW"
const UNFOLLOW = "source/UNFOLLOW"


const load = (follows) => {
    return {
        type: LOAD_FOLLOWS,
        payload: follows
    }
}

const addFollow = (sourceId) => {
    return {
        type: FOLLOW,
        payload: sourceId
    }
}

const removeFollow = (follow) => {
    return {
        type: UNFOLLOW,
        payload: follow
    }
}

export const getAllFollows = () => async dispatch => {
    console.log("hitting get all follows route!!");
    const response = await fetch(`/api/sources/follows/all/`)

    if (response.ok) {
        const data = await response.json();
        dispatch(load(data.follows))
    }
}


export const unfollowSource = payload => async dispatch => {
    const response = await fetch(`/api/sources/${payload.sourceId}/unfollow/`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json'
        }
    });



    if (response.ok) {
        const data = await response.json();
        dispatch(updateOneFeed(data.feed));
        dispatch(removeFollow(data.sourceId));
        return data
    }
}

export const followSource = payload => async dispatch => {
    console.log("hitting update feed source", payload);
    const response = await fetch(`/api/sources/${payload.source.id}/follow/`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json'
        }

    })

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(updateOneFeed(data.feed));
        dispatch(addFollow(data.sourceId));
        return data;
    }
}




const initialState = {};
const followsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_FOLLOWS:
            newState = {};
            action.payload.forEach(follow => {
                newState[follow.sourceId] = follow
            })
            return newState
        case FOLLOW:
            newState = { ...state }
            const newFollow = {}
            newFollow.sourceId = action.payload
            newState[action.payload] = newFollow
            return newState;
        case UNFOLLOW: {
            newState = { ...state }
            delete newState[action.payload]
            return newState;
        }
        default:
            return state;
    }
};


export default followsReducer;
