import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import Error from "../Error";
import { SIGNUP_USER } from "../../queries";

const initialState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: ""
};

class Signup extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(async ({ data }) => {
      // console.log(data);
      localStorage.setItem("token", data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push("/");
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;
    return isInvalid;
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <div className="signin_box">
        <div className="container" style={{ margin: "40px" }}>
          <div className="signin_wrapper">
            <h2>Create a new account</h2>
            <p id="emailHelp" className="form-text">
              It is always free.
            </p>
            <Mutation
              mutation={SIGNUP_USER}
              variables={{ username, email, password }}
            >
              {(signupUser, { data, loading, error }) => {
                return (
                  <form
                    onSubmit={event => this.handleSubmit(event, signupUser)}
                  >
                    <div className="form-group text-white">
                      <label htmlFor="InputUsername ">Username</label>
                      <input
                        type="text"
                        name="username"
                        className="form-control form-control-lg"
                        placeholder="Enter username"
                        value={username}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="InputEmail ">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="Enter email"
                        value={email}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="InputPassword ">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        value={password}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="InputPasswordConfirmation ">
                        Password Confirmation
                      </label>
                      <input
                        type="password"
                        name="passwordConfirmation"
                        className="form-control form-control-lg"
                        placeholder="Password confirmation"
                        value={passwordConfirmation}
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

export default withRouter(Signup);
