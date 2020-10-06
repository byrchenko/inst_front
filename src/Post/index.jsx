import React from "react";
import css from "./index.module.scss";
import {Link} from "react-router-dom";
import {ReactComponent as Like} from "../_svg/like.svg";
import {ReactComponent as NotLike} from "../_svg/not-like.svg";
import {ReactComponent as Comment} from "../_svg/comment.svg";
import {ReactComponent as Share} from "../_svg/share.svg";
import {ReactComponent as Save} from "../_svg/save.svg";
import {ReactComponent as UnSave} from "../_svg/unsave.svg";
import {ReactComponent as More} from "../_svg/more.svg";
import Description from "./Description";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {USER_ID} from "../App";

const Post = ({id, author, images, likes, likesCount: postLikesCount, saved, description, comments: postComments}) => {
    const [isLiked, setIsLiked] = React.useState(() => likes.includes(USER_ID));
    const [isSaved, setIsSaved] = React.useState(saved);
    const [likesCount, setLikesCount] = React.useState(likes.length);
    const [comments, setComments] = React.useState(postComments);

    function toggleLike() {
        let request;

        if (!isLiked) {
            // request for add like
            request = fetch("http://localhost:3002/posts/addLike/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user: USER_ID, post: id})
            })

            setLikesCount(prev => prev + 1);
            setIsLiked(prev => !prev);
        } else {
            request = fetch("http://localhost:3002/posts/removeLike/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user: USER_ID, post: id})
            })

            setLikesCount(prev => prev - 1);
            setIsLiked(prev => !prev);
        }

        request
            .then(res => {
                if (res) {
                    console.log("success liked")
                }
            })
            .catch(() => {
                setLikesCount(postLikesCount);
                setIsLiked(likes.includes(author.id));
            })
    }

    return (
        <div className={css.index}>
            <header className={css.header}>
                <div className={css.left}>
                    <Link to={"/" + author.name} className={css.image}>
                        <img src={author.image} alt={author.name}/>
                    </Link>

                    <Link to={"/" + author.name} className={css.author}>
                        {author.name}
                    </Link>
                </div>

                <div className={css.right}>
                    <button>
                        <More/>
                    </button>
                </div>
            </header>

            <div className={css.media}>
                {images.length > 1
                    ? (
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            swipeable={true}
                            emulateTouch={true}
                        >
                            {
                                images.map(img => {
                                    return <div key={img.url}><img src={img.url} alt={img.title}/></div>
                                })
                            }
                        </Carousel>
                    )
                    : <img src={images[0].url} alt={images[0].title}/>
                }
            </div>

            <div className={css.bottom}>
                <div className={css.buttons}>
                    <div className={css.left}>
                        <button onClick={toggleLike}>
                            {
                                isLiked
                                    ? <NotLike className={css.anim}/>
                                    : <Like className={css.anim} width={24} height={24}/>
                            }
                        </button>

                        <button>
                            <Comment/>
                        </button>

                        <button>
                            <Share/>
                        </button>
                    </div>

                    <div className={css.right}>
                        <button onClick={() => setIsSaved((prev) => {
                            return !prev
                        })}>
                            {
                                isSaved
                                    ? <UnSave/>
                                    : <Save/>
                            }

                        </button>
                    </div>
                </div>

                <button className={css.likes}>
                    <span>{likesCount}</span> отметок "Нравится"
                </button>

                {description && <Description author={author.name} text={description}/>}

                <div className={css.comments}>
                    {comments.map(item => (
                        <div className={css.comment}>
                            <a href={"/" + item.author.name} className={css.user}>{item.author.name}</a> {item.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post;