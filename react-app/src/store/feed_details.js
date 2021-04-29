import { updateOneFeed } from "./feeds"

export const deleteFeedSource = payload => async dispatch => {
    const response = await fetch(`/api/sources/${payload.sourceId}/unfollow/`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json'
        }
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(updateOneFeed(data.feed));
        return data
    }
}

export const updateFeedSource = payload => async dispatch => {
    console.log("hitting update feed source", payload);
    const response = await fetch(`/api/sources/${payload.source.id}/follow/`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json'
        }

    })

    if (response.ok) {
        const data = await response.json();
        dispatch(updateOneFeed(data.feed));
        return data;
    }
}
