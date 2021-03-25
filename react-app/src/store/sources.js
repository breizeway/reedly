const ADD_SOURCE = "session/addSource"

const addSource = source => {
    return {
        type: ADD_SOURCE,
        source
    }
}

export const add = sourceId => async dispatch => {
  const response = await fetch(`/api/sources/${sourceId}`)
  if (response.ok) {
    const data = await response.json();
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
        default:
          return state;
    }
}

export default sourceReducer
