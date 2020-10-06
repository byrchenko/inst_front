import React from "react";
import css from "./index.module.scss";
import Post from "../Post";
import InfiniteScroll from 'react-infinite-scroller';

const Feed = () => {
    const limit = 2;
    const [offset, setOffset] = React.useState(0);
    const [hasMore, setHasMore] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [showLikes, setShowLikes] = React.useState(false);

    React.useEffect(() => {
        console.log("fetching posts")

        fetch(`http://localhost:3002/posts?offset=${offset}&limit=${limit}`)
            .then(res =>  res.json())
            .then(parsed => {
                if (parsed.length < limit) {
                    setHasMore(false);
                }

                setData(prev => [...prev, ...parsed]);
                setLoading(false);
            })
    }, [offset])

    if (error) return <div>Error</div>;

    if (!data || !data.length) return <div>Nothing found</div>

    return (
        <div className={loading ? css.loading : css.index}>
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={page => {
                    setLoading(true);
                    setOffset(page * limit)
                }}
                hasMore={!loading && hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
                treshhold={100}
            >
                {data.map(item => (
                    <Post
                        {...item}
                        key={item.id}
                    />
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default Feed;