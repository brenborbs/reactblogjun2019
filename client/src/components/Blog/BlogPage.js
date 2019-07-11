import React from "react";
import { withRouter } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
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
        if (loading)
          return (
            <div className="main_container">
              <Spinner />
            </div>
          );
        if (error)
          return (
            <div style={{ minHeight: "90vh" }}>
              Error something wrong with the page!
            </div>
          );
        console.log(data);
        return (
          <div
            className="container"
            style={{
              marginTop: "40px",
              marginBottom: "20px"
            }}
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
                    <div className="Demo__container">
                      <div className="Demo__some-network">
                        <FacebookShareButton
                          url={`https://anything/blog/`}
                          quote=""
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon size={32} round={false} />
                        </FacebookShareButton>
                        <FacebookShareCount
                          url={`https://anything/blog/`}
                          className="Demo__some-network__share-count"
                        >
                          {count => count}
                        </FacebookShareCount>
                      </div>
                      <div className="Demo__some-network">
                        <TwitterShareButton
                          url={`https://anything/blog/`}
                          quote=""
                          className="Demo__some-network__share-button"
                        >
                          <TwitterIcon size={32} round={false} />
                        </TwitterShareButton>
                      </div>
                      <div className="Demo__some-network">
                        <LinkedinShareButton
                          url={`https://anything/blog/`}
                          windowWidth={750}
                          windowHeight={600}
                          className="Demo__some-network__share-button"
                        >
                          <LinkedinIcon size={32} round={false} />
                        </LinkedinShareButton>
                      </div>
                      <div className="Demo__some-network">
                        <EmailShareButton
                          url={`https://anything/blog/`}
                          subject=""
                          body="body"
                          className="Demo__some-network__share-button"
                        >
                          <EmailIcon size={32} round={false} />
                        </EmailShareButton>
                      </div>
                      <div className="Demo__some-network">
                        <WhatsappShareButton
                          url={`https://anything/blog/`}
                          title=""
                          separator=":: "
                          className="Demo__some-network__share-button"
                        >
                          <WhatsappIcon size={32} round={false} />
                        </WhatsappShareButton>

                        <div className="Demo__some-network__share-count">
                          &nbsp;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h6>Read our Featured Blog</h6>
                Widgets
              </div>
              {/* column one end here */}
              {/* Sidebar Widgets column */}
              <div className="col-md-4">
                <div className="card my-4">
                  <h4 className="card-header font-italic text-white">
                    {data.getBlog.category}
                  </h4>
                  <div className="card-body">
                    <p className="mb-0 text-white">
                      Etiam porta <em>sem malesuada magna</em> mollis euismod.
                      Cras mattis consectetur purus sit amet fermentum. Aenean
                      lacinia bibendum nulla sed consectetur.
                    </p>
                  </div>
                </div>
                <div className="card my-4">
                  <h6 className="card-header text-white">Featured News</h6>
                  <div className="card-body text-white">Widgets</div>
                </div>
                <div className="card my-4">
                  <h6 className="card-header text-white">Today's Date</h6>
                  <div className="card-body text-white">Widgets</div>
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
