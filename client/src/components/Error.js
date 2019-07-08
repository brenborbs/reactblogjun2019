import React from "react";

const Error = ({ error }) => (
  <div className="alert alert-danger" role="alert">
    {error.message}
  </div>
);

export default Error;
