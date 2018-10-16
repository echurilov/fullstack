import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearErrors();
    console.log(this.state);
    this.props.processForm(this.state);
  }

  handleDemo(e) {
    e.preventDefault();
    const demoUser = { email: 'athena@pantheon.io', password: 'pallas'};
    this.props.processForm(demoUser)
  }

  renderErrors(type) {
    let errorList = [];
    Object.entries(this.props.errors).map((entry) => {
      errorList = errorList.concat(Object.entries(entry[1]))
    })
    return(
      <ul className="error-list">
        {errorList.map((error) => {
          if (type === error[0]) {return(
            error[1]&&error[1].map((err,index) => {
              if (err.charAt(0) === err.charAt(0).toUpperCase()){
                return(<li key={error[0] + index + Date.now()}>
                  {err}
                </li>)
              } else {
                return(<li key={error[0] + index + Date.now()}>
                  {error[0]} {err}
                </li>)
              }
            })
          )}
        }
      )}
      </ul>
    )
  }

  renderError(type) {
    let errorList = [];
    let errorItem = "";
    Object.entries(this.props.errors).map((entry) => {
      errorList = errorList.concat(Object.entries(entry[1]))
    })
    errorList.forEach((error) => {
      if (type === error[0] && error[1] != null) {
        errorItem = <span className="error-item"> - {error[1][0]}</span>
      }
    })
    return(errorItem);
  }

  render() {
  console.log(this.props.errors);
  const emailError = this.props.errors.userErrors.email || this.props.errors.sessionErrors.email ? "error" : "";
  const usernameError = this.props.errors.userErrors.username || this.props.errors.sessionErrors.username ? "error" : "";
  const passwordError = this.props.errors.userErrors.password || this.props.errors.sessionErrors.password ? "error" : "";

    return(
      <div className="login-page">
        <div>
          <Link className="logo" to={'/'}>
            <div className="logo-img"></div>
            <div className="logo-txt"></div>
          </Link>
        </div>
        <div className="login-form-container">
          <form className="login-form-box">
            <h1>Welcome back!</h1>
            <h2>We're so excited to see you again!</h2>
            <section className="login-form">
              <section className={`login-field ${emailError}`}>
                <label htmlFor="email" className="form-label">Email</label>
                {this.renderError('email')}
                <input
                  id="email"
                  className="login-input"
                  type="email"
                  value={this.state.email}
                  onChange={this.update('email')}
                  />
              </section>
              <section className={`login-field ${passwordError}`}>
                <label htmlFor="password" className="form-label">Password</label>
                {this.renderError('password')}
                <input
                  id="password"
                  className="login-input"
                  type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  />
              </section>
              <span className="link"><button className="link-button" onClick={this.handleDemo}>Or log in as Demo User</button></span>
              <br/>
              <button
                className="button-login"
                type="submit"
                onClick={this.handleSubmit}>
                Login
              </button>
              <span className="login-text">Need an account?</span> <span className="link">
              <Link to={'/register'}>Register</Link></span>
            </section>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
