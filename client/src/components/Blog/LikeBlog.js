import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LIKE_BLOG, GET_BLOG, UNLIKE_BLOG } from "../../queries";

import withSession from "../WithSession";

class LikeBlog extends Component {
  state = {
    liked: false,
    username: ""
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { _id } = this.props;
      const prevLiked =
        favorites.findIndex(favorite => favorite._id === _id) > -1;
      this.setState({
        liked: prevLiked,
        username
      });
    }
  }

  handleClick = (likeBlog, unlikeBlog) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked
      }),
      () => this.handleLike(likeBlog, unlikeBlog)
    );
  };

  handleLike = (likeBlog, unlikeBlog) => {
    if (this.state.liked) {
      likeBlog().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    } else {
      // unlike Blog mutation
      unlikeBlog().then(async ({ data }) => {
        // console.log(data);
        await this.props.refetch();
      });
    }
  };

  updateLike = (cache, { data: { likeBlog } }) => {
    const { _id } = this.props;
    const { getBlog } = cache.readQuery({
      query: GET_BLOG,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_BLOG,
      variables: { _id },
      data: {
        getBlog: { ...getBlog, likes: likeBlog.likes + 1 }
      }
    });
  };

  updateUnlike = (cache, { data: { unlikeBlog } }) => {
    const { _id } = this.props;
    const { getBlog } = cache.readQuery({
      query: GET_BLOG,
      variables: { _id }
    });

    cache.writeQuery({
      query: GET_BLOG,
      variables: { _id },
      data: {
        getBlog: { ...getBlog, likes: unlikeBlog.likes - 1 }
      }
    });
  };

  render() {
    const { liked, username } = this.state;
    const { _id } = this.props;
    return (
      <Mutation
        mutation={UNLIKE_BLOG}
        variables={{ _id, username }}
        update={this.updateUnlike}
      >
        {unlikeBlog => (
          <Mutation
            mutation={LIKE_BLOG}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeBlog =>
              username && (
                <button
                  className="btn btn-outline-success"
                  onClick={() => this.handleClick(likeBlog, unlikeBlog)}
                >
                  {liked ? "Unlike" : "Like"}
                </button>
              )
            }
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default withSession(LikeBlog);
