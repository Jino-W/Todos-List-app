import React from "react";

function Error(props) {
    return(
        <div>
            {props.touched && props.message && <span>{props.message}</span>}
        </div>
    )
};

export default Error;