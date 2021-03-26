const SELECTED_FEED = "sidebar/selected-feed"

export const load = (selectedFeed) => {
    return {
        type: SELECTED_FEED,
        payload: selectedFeed
    };
};


const initialState = {};
const sidebarReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SELECTED_FEED:
            newState = {}
            newState['selected'] = action.payload;
            return newState
        default:
            return state;
    }
}

export default sidebarReducer;
