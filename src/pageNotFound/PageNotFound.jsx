import React from "react";
import "./PageNotFound.css"
import PropTypes from 'prop-types';


export default function PageNotFound ({errMessage}) {
    return (
        <h1 className="error">{errMessage.message || "page not found please try again later"}</h1>
    )
}

PageNotFound.propTypes = {
    errMessage: PropTypes.object
  };