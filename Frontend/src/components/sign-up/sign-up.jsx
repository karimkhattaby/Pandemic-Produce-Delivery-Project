/**
 * @class Signup class handling all of the signup logic
 */

/**
 * @libraries
 */
import React from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase";

/**
 * @components
 */
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

/**
 * @styles
 */
import "./sign-up.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      //TODO: might want to show a message instead of alert
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Storing the
      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (errr) {
      //TODO: similar here, might want to show another more helpful error message
      switch (err.code) {
        case "auth/weak-passwod":
          alert("password too weak, try again!");
        case "auth/invalid-email":
          alert("the email you typed in is invalid, try again!");
        case "auth/email-already-in-use":
          alert(
            "the email you typed in has already been registered, try another one"
          );
        default:
          alert("an error occurred");
      }
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
