const RECEIVE_CHARACTERS = "RECEIVE_CHARACTERS";
const RECEIVE_CHARACTER = "RECEIVE_CHARACTER";

// An action is an object with a key of type
const addCharacters = (characters) => {
    return {
        type: RECEIVE_CHARACTERS,
        characters
    };-
};
const addCharacter = (character) => {
    return {
        type: RECEIVE_CHARACTER,
        character
    };
};
export const getCharacters = () => async dispatch => {
    const response = await fetch('/api/characters');
    if (response.ok) {
        const { data } = await response.json();
        dispatch(addCharacters(data))
    }
}
const initialState = {};
const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CHARACTERS:
            const allCharacters = {};
            const { characters } = action;
            characters.forEach(char => allCharacters[char.id] = char );
            return allCharacters;
        default:
            return state;
    }
};
export default feedReducer;