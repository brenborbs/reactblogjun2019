import React, { Fragment } from "react";
import "./App.css";

import { Query } from "react-apollo";
import { GET_ALL_BLOGS } from "../queries";
import BlogItem from "./Blog/BlogItem";

function App() {
  return (
    <div className="main_container">
      <div className="row mb-2">
        <Query query={GET_ALL_BLOGS}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <div>Error</div>;
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

export default App;
