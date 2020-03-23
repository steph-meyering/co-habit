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

    const colors = [
      "#88C9C9",
      "#7AD3B7",
      "#297373",
      "#506C84",
      "#afe0ce",
      "#edffff",
      "#849ca5",
      "#904e55",
      "#031a6b",
    ];

    return (
      <div className="dashboard">
        <div className="dashboard-welcome">
          <h1>
            Welcome {this.props.currentUser.name}! Your house,{" "}
            {this.props.household.name}, is waiting for you.
          </h1>
        </div>
          <div className="housemates">
              <h3>Housemates:</h3>
            <div className="accepted-housemates">
              {acceptedHousemates.map((user, idx) => (
                <div key={user._id}>
                  <span style={{backgroundColor: colors[idx]}}>{user.name}</span>
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
          <div className="upcoming-events-div">
            <Link to="/calendar" className="upcoming-events">
              <h1>Events Today</h1>
              <ul>
                {this.props.events.map(event => (
                  <li key={event._id}>
                    <span>{event.title}</span>
                    {/* <span> Due: {moment((new Date(event.dueDate[0]))).format('MMMM Do, YYYY')}</span> */}
                  </li>
                ))}
              </ul>
            </Link>
            <p>Schedule house events and upcoming chores by selecting the calendar tab.</p>
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="chores-div">
            <Link to="/chores" className="dashboard-chores">
              <h1>Your Chores</h1>
              <ul>
                {this.props.chores.map(chore => (
                  <li key={chore._id}>
                    <span>{chore.title}</span>
                    <span> Due: {moment((new Date(chore.dueDate[0]))).format('MMMM Do, YYYY')}</span>
                  </li>
                ))}
              </ul>
            </Link>
            <p>Add and randomly assign recurring chores by selecting the chores tab.</p>
            <i className="fas fa-broom"></i>
          </div>
          <div className="bills-div">
            <Link to="/bills" className="dashboard-bills">
              <h1>Your Bills</h1>
              <ul>
                {this.props.bills.map(bill => (
                  <li key={bill._id}>
                    <span>{bill.title}</span>
                    <span>{bill.amount}</span>
                  </li>
                ))}
              </ul>
            </Link>
            <p>Add and randomly assign recurring chores by selecting the chores tab.</p>
            <i className="fas fa-file-invoice-dollar"></i>
          </div>
      </div>
    );
  }
}

export default Dashboard;