import React, { Fragment } from "react";
import "./App.css";

import { Query } from "react-apollo";
import { GET_ALL_BLOGS } from "../queries";
import BlogItem from "./Blog/BlogItem";
import Spinner from "./Spinner";

class App extends React.Component {
  render() {
    return (
      <div className="main_container">
        <div className="jumbotron">
          <h5 className="display-4 text-white">Anything</h5>
          <p className="lead text-white">
            Think again for ideas are always bulletproof.
          </p>
        </div>
        <div className="row mb-2">
          <Query query={GET_ALL_BLOGS}>
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
                <Fragment>
                  {data.getAllBlogs.map(blog => (
                    <BlogItem key={blog._id} {...blog} />
                  ))}
                </Fragment>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default App;
