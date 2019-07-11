import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CKEditor from "react-ckeditor-component";
import { Mutation } from "react-apollo";
import { ADD_BLOG, GET_ALL_BLOGS, GET_USER_BLOGS } from "../../queries";
import Error from "../Error";
import withAuth from "../withAuth";

const initialState = {
  title: "",
  imageUrl: "",
  body: "",
  category: "Anime",
  description: "",
  username: ""
};

class AddBlog extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleEditorChange = event => {
    const newContent = event.editor.getData();
    this.setState({ body: newContent });
  };

  handleSubmit = (event, addBlog) => {
    event.preventDefault();
    addBlog().then(({ data }) => {
      console.log(data);
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { title, imageUrl, category, description, body } = this.state;
    const isInvalid = !title || !imageUrl || !category || !description || !body;
    return isInvalid;
  };

  updateCache = (cache, { data: { addBlog } }) => {
    const { getAllBlogs } = cache.readQuery({ query: GET_ALL_BLOGS });

    cache.writeQuery({
      query: GET_ALL_BLOGS,
      data: {
        getAllBlogs: [addBlog, ...getAllBlogs]
      }
    });
  };

  render() {
    const {
      title,
      imageUrl,
      category,
      description,
      body,
      username
    } = this.state;

    return (
      <Mutation
        mutation={ADD_BLOG}
        variables={{ title, imageUrl, category, description, body, username }}
        refetchQueries={() => [
          { query: GET_USER_BLOGS, variables: { username } }
        ]}
        update={this.updateCache}
      >
        {(addBlog, { data, loading, error }) => {
          return (
            <div className="main_container">
              <div
                className="col-md-10"
                style={{
                  backgroundColor: "lightgray",
                  padding: "20px",
                  borderRadius: "5px"
                }}
              >
                <h2>Create New Blog</h2>
                <form onSubmit={event => this.handleSubmit(event, addBlog)}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Blog title"
                      onChange={this.handleChange}
                      value={title}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      placeholder="Short summary"
                      onChange={this.handleChange}
                      value={description}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <input
                      type="text"
                      name="imageUrl"
                      className="form-control"
                      placeholder="Blog image"
                      onChange={this.handleChange}
                      value={imageUrl}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Select">Select Category</label>
                    <select
                      className="form-control"
                      onChange={this.handleChange}
                      value={category}
                      name="category"
                    >
                      <option value="Anime">Anime</option>
                      <option value="Technology">Technology</option>
                      <option value="Music">Music</option>
                      <option value="Travel">Travel</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <CKEditor
                      name="body"
                      content={body}
                      events={{ change: this.handleEditorChange }}
                    />
                    {/* <textarea
                      type="text"
                      name="body"
                      rows="12"
                      className="form-control"
                      placeholder="Body"
                      onChange={this.handleChange}
                      value={body}
                    /> */}
                  </div>

                  <button
                    disabled={loading || this.validateForm()}
                    type="submit"
                    className="btn btn-outline-danger"
                  >
                    Submit
                  </button>
                  {error && <Error error={error} style={{ margin: "5px" }} />}
                  {/* form inputs end here */}
                </form>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session.getCurrentUser)(withRouter(AddBlog));
