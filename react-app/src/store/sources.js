const ADD_SOURCE = "session/addSource"
const LOAD_SOURCES = "sources/load"


const load = sources => {
    return {
        type: LOAD_SOURCES,
        sources
    };
};

const addSource = source => {
    return {
        type: ADD_SOURCE,
        source
    }
}

export const getSources = (feedId) => async (dispatch) => {
    const response = await fetch(`/api/feeds/${Number(feedId)}`);

    if (response.ok) {
        const data = await response.json();
        console.log(data); 
        dispatch(load(data.sources))
        return data
    }
}

export const add = sourceId => async dispatch => {
  const response = await fetch(`/api/sources/${sourceId}`)
  if (response.ok) {
    const all = await response.json(); // get both standardized and raw rss feed
    console.log('   :::RAW:::   ', all.raw); // show for development
    const data = all.standardized
    data.id = sourceId
    dispatch(addSource(data))
    return data
  }
}

const initialState = null

const sourceReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case ADD_SOURCE:
          newState = {...state}
          newState[action.source.id] = {feed: action.source.feed, entries: action.source.entries}
          return newState
        case LOAD_SOURCES:
            newState = {};
            action.sources.forEach((source, idx) => {
                newState[idx] = source
            })
            return newState;
        default:
          return state;
    }
}

export default sourceReducer
