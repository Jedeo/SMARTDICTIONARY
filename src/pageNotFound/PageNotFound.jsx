import React from "react";


export default function PageNotFound ({errMessage}) {
    console.log(typeof errMessage);
  const key = Object.keys(errMessage)
    console.log(errMessage.message);
    return (
        <h1>{errMessage.message}</h1>
    )
}

