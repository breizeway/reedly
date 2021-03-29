const ALL_LOAD_FEEDS = "feeds/all/LOAD"

const loadFeeds = data => {
    return {
        type: ALL_LOAD_FEEDS,
        data
    };
};



export const getAllFeeds = () => async dispatch => {
    console.log('hitting this!!!')
    const response = await fetch(`/api/feeds/all`);


    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(loadFeeds(data))
        return data
    }
}


const initialState = {}

const allReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case ALL_LOAD_FEEDS:
            newState = {};
            let sources = {}
            let sourcesInfo = {}
            action.data.sources.forEach((source, idx) => {
                sources[idx] = source
            })

            action.data.sources_info.forEach((source, idx) => {
                sourcesInfo[idx] = source
            });
            newState = { sources, sourcesInfo }
            return newState;
        default:
            return state
    }
}


export default allReducer
