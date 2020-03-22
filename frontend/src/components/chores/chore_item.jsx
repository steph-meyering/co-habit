import React from "react";
import UpdateChoreForm from "./update_chore_form";
import moment from "moment";
class ChoreItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false,
      showDetails: false,
      checked: this.props.chore.complete
    };
    this.closeUpdateForm = this.closeUpdateForm.bind(this);
    this.updateRecurring = this.updateRecurring.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  updateRecurring() {
    let {
      title,
      description,
      assignedUser,
      difficulty,
      recurring,
      dueDate,
      complete
    } = this.props.chore;

    let now = moment.utc();
    let firstDuedate = moment.utc(this.props.chore.dueDate[0]);

    if (recurring !== "never" && firstDuedate.isBefore(now) && complete) {
      let updatedChore = this.props.chore;
      let nextDate;
      let numDueDates = dueDate.length;
      // space due dates based on recurring input
      switch (recurring) {
        case "daily":
          nextDate = moment.utc(dueDate[numDueDates - 1]).add(1, "day");

          break;
        case "weekly":
          nextDate = moment.utc(dueDate[numDueDates - 1]).add(7, "days");
          break;
        case "biweekly":
          nextDate = moment.utc(dueDate[numDueDates - 1]).add(14, "days");
          break;
        default:
          nextDate = moment.utc(dueDate[numDueDates - 1]).add(7, "days");
          break;
      }

      // add second due date if chore is recurring
      if (!(updatedChore.dueDate instanceof Array))
        updatedChore.dueDate = [updatedChore.dueDate];
      updatedChore.dueDate.push(nextDate._d.toISOString().substr(0, 10));
      // delete old due date if complete

      updatedChore.dueDate.shift();
      updatedChore.complete = false;
      this.props.updateChore(updatedChore);
      this.setState({
        checked: false
      });
    }
  }

  closeUpdateForm() {
    this.setState({
      showUpdateForm: false
    });
  }

  toggleDetails() {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  render() {
    if (this.state.showUpdateForm) {
      return (
        <li>
          <UpdateChoreForm
            chore={this.props.chore}
            closeUpdateForm={this.closeUpdateForm}
          />
        </li>
      );
    }

    let {
      title,
      description,
      assignedUser,
      difficulty,
      recurring,
      dueDate,
      complete
    } = this.props.chore;

    let now = moment.utc();
    let firstDuedate = moment.utc(dueDate[0]);

    if (recurring !== "never" && firstDuedate.isBefore(now) && complete) {
      this.updateRecurring();
    }

    return (
      <li className="chores-list-item">
        <div className="chore-item-main">
          <div
            className="checkbox-container"
            onClick={e => {
              e.preventDefault();
              let updatedChore = this.props.chore;
              updatedChore.complete = !this.state.checked;
              this.props.updateChore(updatedChore);
              this.setState({ checked: !this.state.checked });
            }}
          >
            <input
              type="checkbox"
              value={this.state.checked}
              checked={this.state.checked}
            />

            <label className="label-cbx">
              <span></span>
              {title}
            </label>
          </div>
          <div>{firstDuedate.isBefore(now) && !complete ? "OVERDUE" : ""}</div>
          <div>
            {assignedUser
              ? this.props.housemates[assignedUser].name
              : "unassigned"}
          </div>
        </div>
        {this.state.showDetails ? (
          <div className="chore-details">
            <button
              onClick={this.toggleDetails}
              className="details-chore light"
            >
              Hide Details
            </button>
            <div>{description}</div>
            <div>Difficulty: {difficulty}</div>
            <div>{recurring}</div>
            <div>Due {firstDuedate.fromNow()}</div>
            <div>{this.state.checked ? "Done!" : "Incomplete"}</div>
          </div>
        ) : (
          <div className="chore-details">
            <button
              onClick={this.toggleDetails}
              className="details-chore light"
            >
              Show Details
            </button>
          </div>
        )}
        <div>
          <button
            onClick={() => this.setState({ showUpdateForm: true })}
            className="edit-chore light"
          >
            Edit
          </button>
        </div>
      </li>
    );
  }
}

export default ChoreItem;
