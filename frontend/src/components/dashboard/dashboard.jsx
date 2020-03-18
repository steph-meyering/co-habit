import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.getHousehold(this.props.currentUser.household);
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    if (!this.props.household) return null;
    return (
      <div>
        <h1>Welcome {this.props.currentUser.name}! Your house, {this.props.household.name}, is waiting for you.</h1>
        <button onClick={this.handleLogout}>Log Out</button>
      </div>
    );
  }
}

export default Dashboard;