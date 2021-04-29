import * as feedActions from './feeds'

const ADD_SOURCE = "session/addSource"
const LOAD_SOURCES = "sources/load"
const POPULATE_SOURCES = "sources/populateSources"
const SET_DEFAULT_FEED = "sources/setDefaultFeed"

export const setDefaultFeed = feedId => {
    return {
        type: SET_DEFAULT_FEED,
        feedId
    };
};

const populateSources = sources => {
    return {
        type: POPULATE_SOURCES,
        sources
    };
};

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


export const runPopulateSources = sourceIds => async dispatch => {
    const response = await fetch(`/api/sources/`, {
        method: 'PUT',
        body: JSON.stringify({
            ids: sourceIds
            }),
        headers: {
            'content-type': 'application/json'
        }
    })
    const { sources } = await response.json(); // get both standardized and raw rss feed
    if (response.ok) {
      dispatch(populateSources(sources))
    }
    return sources
}


export const getSources = (feedId) => async (dispatch) => {
    const response = await fetch(`/api/feeds/${Number(feedId)}`);

    const data = await response.json();
    if (response.ok) {
        dispatch(load(data))
    }
    return data
}

export const add = sourceId => async dispatch => {
    const response = await fetch(`/api/sources/${sourceId}`)
    const all = await response.json(); // get both standardized and raw rss feed
    if (response.ok) {
        const data = all.standardized
        data.id = sourceId
        dispatch(addSource(data))
        return data
    }
    return all
}

export const addNew = (sourceUrl, feedId) => async dispatch => {
  const response = await fetch(`/api/sources/new`, {
    method: 'POST',
    body: JSON.stringify({source_url: sourceUrl, feed_id: feedId}),
    headers: {
      'content-type': 'application/json'
    }
  })
  const all = await response.json(); // get both standardized and raw rss feed
  if (response.ok) {
    const data = all.standardized
    data.id = all.id
    dispatch(addSource(data))
    dispatch(feedActions.addSourceToFeed(all))
    return data
  }
  return all
}

const initialState = {
    all: {},
    defaultFeed: 'default',
}

const sourceReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_DEFAULT_FEED:
            newState = { ...state }
            newState.defaultFeed = action.feedId
            return newState
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
        case POPULATE_SOURCES:
            newState = {...state}
            action.sources.forEach(source => {
                newState.all[source.id] = source
            })
            return newState
        default:
            return state;
    }
}

export default sourceReducer
