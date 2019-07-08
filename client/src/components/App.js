import React from "react";
import "./App.css";

import { Query } from "react-apollo";
import { GET_ALL_BLOGS } from "../queries";

function App() {
  return (
    <div className="App">
      <h1>Home</h1>
      <Query query={GET_ALL_BLOGS}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;
          console.log(data);

          return <p>Blogs</p>;
        }}
      </Query>
    </div>
  );
}

export default App;
