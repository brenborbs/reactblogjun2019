import React from "react";
import { withRouter } from "react-router-dom";

import { ApolloConsumer } from "react-apollo";

const handleSignout = (client, history) => {
  localStorage.setItem("token", "");
  client.resetStore();
  history.push("/");
};

const Signout = ({ history }) => (
  <ApolloConsumer>
    {client => {
      return (
        <button
          className="btn btn-outline-primary btn-sm"
          style={{ marginTop: "6px" }}
          onClick={() => handleSignout(client, history)}
        >
          Signout
        </button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Signout);
