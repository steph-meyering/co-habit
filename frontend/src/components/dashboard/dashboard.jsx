import React from "react";
import moment from "moment";
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
    };
  }

  denyHousemate(user) {
    return e => {
      this.props.deleteUser(user._id);
    };
  }

  render() {
    if (!this.props.household) return null;
    if (
      Object.keys(this.props.users).length === 0 &&
      this.props.users.constructor === Object
    )
      return null;

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
      "#031a6b"
    ];

    return (
      <div className="dashboard">
        <div className="dashboard-welcome">
          <h1>
            Welcome, {this.props.currentUser.name}! <br/>This is your{" "}
            {this.props.household.name} home dashboard.
          </h1>
        </div>
        <div className="housemates">
          <h3>Your housemates</h3>
          <div className="accepted-housemates">
            {acceptedHousemates.map((user, idx) => (
              <div key={user._id}>
                <span style={{ color: colors[idx] }}>{user.name}</span>
              </div>
            ))}
          </div>

          <div className="pending-housemates">
            {this.props.currentUser.adminPrivileges &&
            pendingHousemates.length > 0 ? (
              <>
                <h4>Pending Approval</h4>
                <div>
                  {pendingHousemates.map(user => (
                    <div className="pending-user" key={user._id}>
                      <span style={{ color:  "#849ca5" }}>{user.name}</span>
                      <button
                        id="accept-btn"
                        onClick={this.acceptHousemate(user).bind(this)}
                      >
                        Accept
                      </button>
                      <button
                        id="deny-btn"
                        onClick={this.denyHousemate(user).bind(this)}
                      >
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
        <div className="dashboard-bottom">
          <div className="action-icons-div">
            <i className="fas fa-calendar-alt"></i>
            <i className="fas fa-broom"></i>
            <i className="fas fa-file-invoice-dollar"></i>
          </div>
          <div className="action-text-div">
            <p>
              Schedule house events and upcoming chores by selecting the
              calendar tab.
            </p>
            <p>
              Add and randomly assign recurring chores by selecting the chores
              tab.
            </p>
            <p>
              Track and manage household expenses by selecting the bills tab.
            </p>
          </div>
          <div className="action-items-div">
            <Link to="/calendar" className="upcoming-events">
              <h1>Events Today</h1>
              <ul>
                {this.props.events.map(event => (
                  <li key={event._id}>
                    <span>{event.title}: </span>
                    {event.start ? (
                      event.start.toLocaleString("default", {
                        hour: "numeric",
                        minute: "numeric"
                      }) ===
                        event.end.toLocaleString("default", {
                          hour: "numeric",
                          minute: "numeric"
                        }) ||
                      event.start.toLocaleString("default", {
                        weekday: "long",
                        month: "long",
                        day: "numeric"
                      }) !==
                        event.end.toLocaleString("default", {
                          weekday: "long",
                          month: "long",
                          day: "numeric"
                        }) ? (
                        <span>All Day</span>
                      ) : (
                        <span>
                          {event.start.toLocaleString("default", {
                            hour: "numeric",
                            minute: "numeric"
                          })}{" "}
                          -{" "}
                          {event.end.toLocaleString("default", {
                            hour: "numeric",
                            minute: "numeric"
                          })}
                        </span>
                      )
                    ) : (
                      ""
                    )}
                    {event.dueDate ? <span>All Day</span> : ""}
                  </li>
                ))}
              </ul>
            </Link>
            <Link to="/chores" className="dashboard-chores">
              <h1>Your Chores</h1>
              <ul>
                {this.props.chores.map(chore => (
                  <li key={chore._id}>
                    <span>{chore.title}: </span>
                    <span>
                      {moment(new Date(chore.dueDate[0])).format(
                        "MMMM D, YYYY"
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Link>
            <Link to="/bills" className="dashboard-bills">
              <h1>Your Bills</h1>
              <ul>
                {this.props.bills.map(bill => (
                  <li key={bill._id}>
                    <span>{bill.title}: </span>
                    <span>${bill.amount}</span>
                  </li>
                ))}
              </ul>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
