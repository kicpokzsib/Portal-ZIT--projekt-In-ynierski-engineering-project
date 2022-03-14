import React from "react";

function Banner(props) {
  return (
    <div className="page-content">
      <div className="banner">
        <div className="container">
          <div className="banner-text">
            <h1 className="text-light">{props.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Banner;
