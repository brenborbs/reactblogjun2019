import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import Error from "../Error";
import { SIGNIN_USER } from "../../queries";

const initialState = {
  username: "",
  password: ""
};

class Signin extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({ data }) => {
      // console.log(data);
      localStorage.setItem("token", data.signinUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="signin_box">
        <div className="container" style={{ margin: "40px" }}>
          <div className="signin_wrapper">
            <h2>Log In</h2>

            <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
              {(signinUser, { data, loading, error }) => {
                return (
                  <form
                    onSubmit={event => this.handleSubmit(event, signinUser)}
                  >
                    <div className="form-group">
                      <label htmlFor="InputUsername">Username</label>
                      <input
                        type="text"
                        name="username"
                        className="form-control form-control-lg"
                        placeholder="Enter username"
                        value={username}
                        onChange={this.handleChange}
                      />

                      <label htmlFor="InputPassword">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        value={password}
                        onChange={this.handleChange}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading || this.validateForm()}
                      className="btn btn-outline-dark"
                    >
                      Submit
                    </button>
                    <div className="error_wrapper">
                      {error && <Error error={error} />}
                    </div>
                    <div className="register_link">
                      <p>
                        Do you have an account? If not, you can register{" "}
                        <Link to="/signup" style={{ color: "purple" }}>
                          here
                        </Link>
                      </p>
                    </div>
                  </form>
                );
              }}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
