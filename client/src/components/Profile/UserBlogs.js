import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import {
  GET_USER_BLOGS,
  DELETE_USER_BLOG,
  GET_ALL_BLOGS,
  GET_CURRENT_USER,
  UPDATE_USER_BLOG
} from "../../queries";
import Spinner from "../Spinner";

class UserBlogs extends Component {
  state = {
    _id: "",
    title: "",
    imageUrl: "",
    category: "",
    description: "",
    modal: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDelete = deleteUserBlog => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      deleteUserBlog().then(({ data }) => {
        // console.log(data);
      });
    }
  };

  handleSubmit = (event, updateUserBlog) => {
    event.preventDefault();
    updateUserBlog().then(({ data }) => {
      // console.log(data);
      this.closeModal();
    });
  };

  loadBlog = blog => {
    this.setState({ ...blog, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  render() {
    const { username } = this.props;
    const { modal } = this.state;
    return (
      <Query
        query={GET_USER_BLOGS}
        variables={{
          username
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error)
            return (
              <div className="alert alert-danger" role="alert">
                Error something wrong with the page!
              </div>
            );
          // console.log(data);
          return (
            <div className="card">
              {modal && (
                <EditBlogModal
                  handleSubmit={this.handleSubmit}
                  blog={this.state}
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                />
              )}

              <h6 className="card-header">User Blogs</h6>
              {!data.getUserBlogs.length && (
                <div className="alert alert-info m-2" role="alert">
                  You currently have no blogs!
                </div>
              )}

              {data.getUserBlogs.map(blog => (
                <div className="card-body" key={blog._id}>
                  <p>
                    <strong>Title:</strong> {blog.title}
                  </p>
                  <p>
                    <strong>No.of likes:</strong> {blog.likes}
                  </p>
                  <Link
                    className="btn btn-outline-info m-2"
                    to={`/blog/${blog._id}`}
                  >
                    Read
                  </Link>
                  <Mutation
                    mutation={DELETE_USER_BLOG}
                    variables={{ _id: blog._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_BLOGS },
                      { query: GET_CURRENT_USER }
                    ]}
                    update={(cache, { data: { deleteUserBlog } }) => {
                      const { getUserBlogs } = cache.readQuery({
                        query: GET_USER_BLOGS,
                        variables: { username }
                      });

                      cache.writeQuery({
                        query: GET_USER_BLOGS,
                        variables: { username },
                        data: {
                          getUserBlogs: getUserBlogs.filter(
                            blog => blog._id !== deleteUserBlog._id
                          )
                        }
                      });
                    }}
                  >
                    {(deleteUserBlog, attrs = {}) => (
                      <React.Fragment>
                        <button
                          className="btn btn-outline-warning m-2"
                          onClick={() => this.loadBlog(blog)}
                          data-toggle="modal"
                          data-target="#exampleModalLong"
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-outline-danger m-2"
                          onClick={() => this.handleDelete(deleteUserBlog)}
                        >
                          {attrs.loading ? "Deleting..." : "Delete"}
                        </button>
                      </React.Fragment>
                    )}
                  </Mutation>
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

const EditBlogModal = ({ handleSubmit, blog, handleChange, closeModal }) => (
  <Mutation
    mutation={UPDATE_USER_BLOG}
    variables={{
      _id: blog._id,
      title: blog.title,
      imageUrl: blog.imageUrl,
      category: blog.category,
      description: blog.description
    }}
  >
    {updateUserBlog => (
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={event => handleSubmit(event, updateUserBlog)}>
                <h4 className="modal-title">Edit Blog</h4>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={blog.title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="imageUrl">Blog Image</label>
                  <input
                    type="text"
                    name="imageUrl"
                    onChange={handleChange}
                    value={blog.imageUrl}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category of blog</label>
                  <select
                    name="category"
                    onChange={handleChange}
                    value={blog.category}
                  >
                    <option value="Anime">Anime</option>
                    <option value="Music">Music</option>
                    <option value="Technology">Technology</option>
                    <option value="Travel">Travel</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Blog Description</label>
                  <input
                    type="text"
                    name="description"
                    onChange={handleChange}
                    value={blog.description}
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-outline-primary">
                    Update
                  </button>
                  <button
                    onClick={closeModal}
                    data-dismiss="modal"
                    className="btn btn-outline-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )}
  </Mutation>
);

export default UserBlogs;
