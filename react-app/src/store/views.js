const ADD_TODAY = "feeds/addToday"

const addToday = feed => {
    return {
        type: ADD_TODAY,
        feed
    };
};

export const runAddToday = () => async dispatch => {
    const responseA = await fetch(`/api/feeds/all`);
    if (responseA.ok) {
        const { feeds } = await responseA.json();
        feeds.forEach(async feed => {
            if (feed.sources.length) {
                const responseB = await fetch(`/api/feeds/today`, {
                    method: 'PUT',
                    body: JSON.stringify({feed}),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                if (responseB.ok) {
                    const feed_chunk = await responseB.json()
                    dispatch(addToday(feed_chunk))
                }
            }
        })
    }

    const response = await fetch(`/api/feeds/today`);
    if (response.ok) {
        const data = await response.json();
        dispatch(addToday(data))
        return data
    }
}

const initialState = {
    today: [],
}

const viewsReducer = (state = initialState, action) => {
    let newState
    let today
    switch (action.type) {
        case ADD_TODAY:
            newState = {...state};
            today = [...newState.today]
            today.push(action.feed)
            newState.today = today
            return newState;
        default:
            return state
    }
}


export default viewsReducer
