const ADD_SOURCE = "session/addSource"
const LOAD_SOURCES = "sources/load"


const load = data => {
    return {
        type: LOAD_SOURCES,
        data
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
        dispatch(load(data))
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

export const addNew = (sourceUrl, feedId) => async dispatch => {
  const response = await fetch(`/api/sources/new`, {
    method: 'POST',
    body: JSON.stringify({source_url: sourceUrl, feed_id: feedId}),
    headers: {
      'content-type': 'application/json'
    }
  })
  if (response.ok) {
    const all = await response.json(); // get both standardized and raw rss feed
    console.log('   :::RAW:::   ', all.raw); // show for development
    const data = all.standardized
    data.id = all.id
    dispatch(addSource(data))
    return data
  }
}

const initialState = null

const sourceReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case ADD_SOURCE:
            newState = { ...state }
            newState[action.source.id] = { feed: action.source.feed, entries: action.source.entries }
            return newState
        case LOAD_SOURCES:
            newState = {};
            let sources = {}
            let sourcesInfo = {}
            action.data.sources.forEach((source, idx) => {
                sources[idx] = source
            })

            action.data.sources_info.forEach((source, idx) => {
                sourcesInfo[idx] = source
            });
            newState = {sources, sourcesInfo}
            return newState;
        default:
            return state;
    }
}

export default sourceReducer
