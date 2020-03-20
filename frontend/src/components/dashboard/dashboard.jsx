import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.getHousehold(this.props.currentUser.household);
    this.props.getUsers(this.props.currentUser.household);
  }

  handleLogout() {
    this.props.logout();
  }

  acceptHousemate(user) {
    return e => {
      let newUser = Object.assign({}, user);
      newUser.acceptedIntoHousehold = true;
      this.props.updateUser(newUser);
    }
  }

  denyHousemate(user) {
    return e => {
      this.props.deleteUser(user._id);
    }
  }

  render() {
    if (!this.props.household) return null;
    if (Object.keys(this.props.users).length === 0 && this.props.users.constructor === Object) return null;

    let acceptedHousemates = [];
    let pendingHousemates = [];
    for (let i = 0; i < this.props.users.length; i++) {
      const user = this.props.users[i];
      if (user.acceptedIntoHousehold) {
        acceptedHousemates.push(user);
      } else {
        pendingHousemates.push(user);
      }
    }

    return (
      <div>
        {this.props.currentUser.acceptedIntoHousehold ?
        <>
          <h1>Welcome {this.props.currentUser.name}! Your house, {this.props.household.name}, is waiting for you.</h1>
          <button onClick={this.handleLogout}>Log Out</button>
          <div className="accepted-housemates">
            <h3>Housemates:</h3>
              {acceptedHousemates.map(user => (
                <div key={user._id}>
                  <span>{user.name}</span>
                </div>
              ))}
          </div>
          <div className="pending-housemates">
            {this.props.currentUser.adminPrivileges && pendingHousemates.length > 0 ?
            <>
              <h4>Pending Approval:</h4>
              <div>
                {pendingHousemates.map(user => (
                  <div>
                    <span>{user.name}</span>
                    <button onClick={this.acceptHousemate(user).bind(this)}>Accept</button>
                    <button onClick={this.denyHousemate(user).bind(this)}>Deny</button>
                  </div>
                ))}
              </div>
            </>
            : ""
            }
          </div>
        </>
          :
          <>
          <h1>Welcome {this.props.currentUser.name}! Your request to join {this.props.household.name} is pending.</h1>
          <button onClick={this.handleLogout}>Log Out</button>
          </>
        }
      </div>
    );
  }
}

export default Dashboard;