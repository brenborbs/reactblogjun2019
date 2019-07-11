import React from "react";
import { Link } from "react-router-dom";

const formatDate = date => {
  const newDate = new Date(date).toLocaleDateString("en-PH");
  const newTime = new Date(date).toLocaleTimeString("en-PH");
  return `${newDate} at ${newTime} `;
};

const UserInfo = ({ session }) => {
  return (
    <div className="card">
      <h6 className="card-header">User Information</h6>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Username: {session.getCurrentUser.username}
          </li>
          <li className="list-group-item">
            Email: {session.getCurrentUser.email}
          </li>
          <li className="list-group-item">
            Join Date: {formatDate(session.getCurrentUser.joinDate)}
          </li>
          <div style={{ padding: "20px" }}>
            <h6>Your most favorite blogs</h6>
            {session.getCurrentUser.favorites.map(favorite => (
              <li key={favorite._id}>
                <Link to={`/blog/${favorite._id}`}>
                  <p>{favorite.title}</p>
                </Link>
              </li>
            ))}
            {!session.getCurrentUser.favorites.length && (
              <div className="alert alert-primary" role="alert">
                No favorites currently. You can add some!
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default UserInfo;
