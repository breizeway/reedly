
// This function finds the feed associated with a source
export const rightFeed = (feeds, sourceId) => {
    if (feeds === {}) {
        return
    }

    const feedsArr = Object.values(feeds);

    for (let i = 0; i < feedsArr.length; i++) {
        const feed = feedsArr[i]
        const sources = feed?.sources

        for (let i = 0; i < sources.length; i++) {
            let source = sources[i]

            if (source.id === Number(sourceId)) {
                return feed;
            }
        }
    }

    return false
}
