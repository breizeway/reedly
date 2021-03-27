const SELECTED = "sidebar/selected"

export const load = (selected) => {
    return {
        type: SELECTED,
        payload: selected
    };
};


const initialState = {};
const sidebarReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SELECTED:
            newState = {}
            newState['selected'] = action.payload;
            return newState
        default:
            return state;
    }
}

export default sidebarReducer;
