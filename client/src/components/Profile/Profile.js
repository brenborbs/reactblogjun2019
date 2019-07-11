import React from "react";
import UserInfo from "./UserInfo";
import UserBlogs from "./UserBlogs";
import withAuth from "../withAuth";

const Profile = ({ session }) => {
  return (
    <div className="main_container">
      <div className="row">
        <div className="col-6 col-md-4">
          <UserInfo session={session} />
        </div>
        <div className="col-12 col-md-8">
          <UserBlogs username={session.getCurrentUser.username} />
        </div>
      </div>
    </div>
  );
};

export default withAuth(session => session && session.getCurrentUser)(Profile);
