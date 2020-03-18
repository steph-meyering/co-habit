import React from 'react';

class Household extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <h1>Welcome {this.props.currentUser.name}!</h1>
        <button onClick={this.handleLogout}>Log Out</button>
      </div>
    );
  }
}

export default Household;