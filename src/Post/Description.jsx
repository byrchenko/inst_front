import React from "react";
import css from "./Description.module.scss";
import {Link} from "react-router-dom";

const Description = ({author, text}) => {
    return (
        <div className={css.description}>
            <Link to={"/" + author}>{author}</Link> {text}
        </div>
    )
}

export default Description;