import React from "react";
import { Link } from "react-router-dom";

const BlogItem = ({ _id, imageUrl, category, title }) => {
  return (
    <div className="col-md-4">
      <div className="card-deck mb-4">
        <div className="card bg-dark" style={{ width: "20rem" }}>
          <div className="card-body">
            <img
              className="card-img-top"
              src={imageUrl}
              alt={title}
              style={{ height: "14rem" }}
            />
            <h6 className={category}>{category}</h6>
            <h5 className="card-title mt-2 text-white">{title}</h5>
            <p className="card-text text-white">{title}...</p>
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

export default BlogItem;
