import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { signIn } from '../actions/auth';
import API from '../api';

export default class LogIn extends React.Component {
  constructor() {
    super();
    this.state = { disableLogin: true };
  }

  componentDidMount() {
    API
      .Auth
      .clientId()
      .then( ({ token }) => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        const auth2 = gapi.auth2.init({
          client_id: token, // eslint-disable-line camelcase
          cookie_policy: 'single_host_origin', // eslint-disable-line camelcase
        });
        auth2.attachClickHandler(this.refs.button.getDOMNode(), {}, googleUser => {
          this.props.dispatch(signIn(googleUser));
        });
        this.setState({ disableLogin: false });
      })
      .catch( err => console.log(err) );
  }

  render() {
    return (
      <Button disabled={this.state.disableLogin} id='login' bsStyle='primary' ref='button'>
        <i className='fa fa-google'></i> Sign In
      </Button>
    );
  }
}
