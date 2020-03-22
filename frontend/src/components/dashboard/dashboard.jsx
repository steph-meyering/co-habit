import React from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.props.getHousehold(this.props.currentUser.household);
    this.props.getUsers(this.props.currentUser.household);
    this.props.fetchChoresForUser(this.props.currentUser);
    this.props.fetchBills();
    this.props.getEvents(this.props.currentUser.household);
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
      <div className="dashboard">
        <div className="dashboard-welcome">
          <h1>
            Welcome {this.props.currentUser.name}! Your house,{" "}
            {this.props.household.name}, is waiting for you.
          </h1>
        </div>
        <div className="dashboard-mid">
          <div className="housemates">
            <div className="accepted-housemates">
              <h3>Housemates:</h3>
              {acceptedHousemates.map(user => (
                <div key={user._id}>
                  <span>{user.name}</span>
                </div>
              ))}
            </div>
          
            <div className="pending-housemates">
              {this.props.currentUser.adminPrivileges &&
              pendingHousemates.length > 0 ? (
                <>
                  <h4>Pending Approval:</h4>
                  <div>
                    {pendingHousemates.map(user => (
                      <div key={user._id}>
                        <span>{user.name}</span>
                        <button onClick={this.acceptHousemate(user).bind(this)}>
                          Accept
                        </button>
                        <button onClick={this.denyHousemate(user).bind(this)}>
                          Deny
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <Link to="/calendar" className="upcoming-events">
            <h1>Events Today</h1>
            <ul>
              {this.props.events.map(event => (
                <li>
                  <span>{event.title}</span>
                  {/* <span> Due: {moment((new Date(event.dueDate[0]))).format('MMMM Do, YYYY')}</span> */}
                </li>
              ))}
            </ul>
          </Link>
        </div>
        <div className="dashboard-bottom">
          <Link to="/chores" className="dashboard-chores">
            <h1>Your Chores</h1>
            <ul>
              {this.props.chores.map(chore => (
                <li>
                  <span>{chore.title}</span>
                  <span> Due: {moment((new Date(chore.dueDate[0]))).format('MMMM Do, YYYY')}</span>
                </li>
              ))}
            </ul>
          </Link>
          <Link to="/bills" className="dashboard-bills">
            <h1>Your Bills</h1>
            <ul>
              {this.props.bills.map(bill => (
                <li>
                  <span>{bill.title}</span>
                  <span>{bill.amount}</span>
                </li>
              ))}
            </ul>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;