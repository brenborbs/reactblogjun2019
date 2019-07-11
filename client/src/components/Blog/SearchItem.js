import React from "react";
import { Link } from "react-router-dom";

const SearchItem = ({ _id, title, likes, imageUrl }) => {
  return (
    <div className="col-md-6 mt-3">
      <div className="card-deck mb-4">
        <div className="card bg-dark" style={{ width: "25rem" }}>
          <div className="card-body">
            <img
              className="card-img-top"
              src={imageUrl}
              alt={title}
              style={{ height: "16rem" }}
            />
            <h5 className="card-title mt-2 text-white">{title}</h5>
            <p className="card-text text-white">Likes: {likes}</p>
            <div>
              <Link className="btn btn-outline-light" to={`/blog/${_id}`}>
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
