import { updateOneFeed } from "./feeds"

export const deleteFeedSource = payload => async dispatch => {
    const response = await fetch(`/api/sources/${payload.sourceId}/unfollow/`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json'
        }
    });


    const data = await response.json();
    if (response.ok) {
        dispatch(updateOneFeed(data.feed));
    }
    return data
}
