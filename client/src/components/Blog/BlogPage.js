import React from "react";
import { withRouter } from "react-router-dom";

import { Query } from "react-apollo";
import { GET_BLOG } from "../../queries";
import LikeBlog from "./LikeBlog";
import Spinner from "../Spinner";

const BlogPage = ({ match }) => {
  const { _id } = match.params;
  console.log(_id);
  return (
    <Query query={GET_BLOG} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error)
          return (
            <div className="alert alert-danger" role="alert">
              Error something wrong with the page!
            </div>
          );
        console.log(data);
        return (
          <div
            className="container"
            style={{ marginTop: "40px", marginBottom: "20px" }}
          >
            <div className="row">
              <div className="col-lg-8">
                <h1 className="mt-4">{data.getBlog.title}</h1>
                <p>Article by {data.getBlog.username}</p>
                <hr />
                <p className="font-italic">
                  <i className="fa fa-calendar" aria-hidden="true" />
                  {""} Posted on {data.getBlog.createdDate}
                </p>
                <hr />
                <img
                  className="img-fluid rounded"
                  src={data.getBlog.imageUrl}
                  alt={data.getBlog.title}
                />
                <p>
                  <small>{data.getBlog.description}</small>
                </p>
                <hr />
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.getBlog.body
                  }}
                />
                <hr />
                <LikeBlog _id={_id} />
                <div className="media mb-4 mt-2">
                  <div className="media-body">
                    <h4>Share this story</h4>
                  </div>
                </div>
                <h6>Read our Featured Blog</h6>
                Widgets
              </div>
              {/* column one end here */}
              {/* Sidebar Widgets column */}
              <div className="col-md-4">
                <div className="card my-4">
                  <h4 className="card-header font-italic">
                    {data.getBlog.category}
                  </h4>
                  <div className="card-body">
                    <p className="mb-0">
                      Etiam porta <em>sem malesuada magna</em> mollis euismod.
                      Cras mattis consectetur purus sit amet fermentum. Aenean
                      lacinia bibendum nulla sed consectetur.
                    </p>
                  </div>
                </div>
                <div className="card my-4">
                  <h6 className="card-header">Featured News</h6>
                  <div className="card-body">Widgets</div>
                </div>
                <div className="card my-4">
                  <h6 className="card-header">Today's Date</h6>
                  <div className="card-body">Widgets</div>
                </div>
                {/* Last card ends here */}
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(BlogPage);
