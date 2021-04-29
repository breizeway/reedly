const ADD_TODAY = "views/addToday"
const ADD_ALL = "views/addAll"

const addToday = feed => {
    return {
        type: ADD_TODAY,
        feed
    };
};

const addAll = feed => {
    return {
        type: ADD_ALL,
        feed
    };
};

export const runAddToday = () => async dispatch => {
    const responseA = await fetch(`/api/feeds/all`);
    const responseAJSON = await responseA.json();
    if (responseA.ok) {
        const { feeds } = responseAJSON
        let userHasSources = false
        for (let feed of feeds) {
            if (feed.sources.length) {
                userHasSources = true
                const responseB = await fetch(`/api/feeds/views/today`, {
                    method: 'PUT',
                    body: JSON.stringify({feed}),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                const feed_chunk = await responseB.json()
                if (responseB.ok) {
                    dispatch(addToday(feed_chunk))
                }
            }
        }
        if (userHasSources) {
            return []
        } else {
            return 'no sources'
        }
    }
    else {
        return responseAJSON
    }
}

export const runAddAll = () => async dispatch => {
    const responseA = await fetch(`/api/feeds/all`);
    const responseAJSON = await responseA.json();
    if (responseA.ok) {
        const { feeds } = responseAJSON
            for (let feed of feeds) {
            if (feed.sources.length) {
                const responseB = await fetch(`/api/feeds/views/all`, {
                    method: 'PUT',
                    body: JSON.stringify({feed}),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                const feed_chunk = await responseB.json()
                if (responseB.ok) {
                    dispatch(addAll(feed_chunk))
                }
                return feed_chunk
            }
        }
        return 'no sources'
    }
    else {
        return responseAJSON
    }
}

const initialState = {
    today: [],
    all: [],
}

const viewsReducer = (state = initialState, action) => {
    let newState
    let today
    let all
    switch (action.type) {
        case ADD_TODAY:
            newState = {...state};
            today = [...newState.today]
            today.push(action.feed)
            newState.today = today
            return newState;
        case ADD_ALL:
            newState = {...state};
            all = [...newState.all]
            all.push(action.feed)
            newState.all = all
            return newState;
        default:
            return state
    }
}


export default viewsReducer
