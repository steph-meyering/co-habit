import React from "react";
import UpdateChoreForm from "./update_chore_form";
import moment from "moment";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
class ChoreItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false,
      showDetails: false,
      checked: this.props.chore.complete
    };
    this.toggleShowForm = this.toggleShowForm.bind(this);
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

    let now = moment.utc().add(1, "days");
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

  toggleShowForm() {
    this.setState({
      showUpdateForm: !this.state.showUpdateForm,
      showDetails: false
    });
  }

  toggleDetails() {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  render() {
    let {
      title,
      description,
      assignedUser,
      difficulty,
      recurring,
      dueDate,
      complete
    } = this.props.chore;

    let now = moment.utc().subtract(1, "days");
    let firstDuedate = moment.utc(dueDate[0]);

    if (recurring !== "never" && firstDuedate.isBefore(now) && complete) {
      this.updateRecurring();
    }

    let bgdColor =
      this.state.showUpdateForm || this.state.showDetails
        ? "shaded"
        : "transparent";

    return (
      <Slide up>
        <li className={`chores-list-item ${bgdColor}`}>
          <div className="chore-row">
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
            <div>
              {assignedUser
                ? this.props.housemates[assignedUser].name
                : "unassigned"}
            </div>
            <div className="red">
              {firstDuedate.isBefore(now) && !complete ? " OVERDUE " : ""}
            </div>
            <div>Due {firstDuedate.from(now)}</div>
            <div className="toggle-btns">
              <div>
                {this.state.showUpdateForm ? (
                  <>
                    <button
                      onClick={this.toggleShowForm}
                      className="edit-chore light"
                    >
                      X
                    </button>
                  </>
                ) : (
                  <>
                    {this.state.showDetails ? (
                      <button
                        onClick={this.toggleDetails}
                        className="details-chore light"
                      >
                        Hide Details
                      </button>
                    ) : (
                      <button
                        onClick={this.toggleDetails}
                        className="details-chore light"
                      >
                        Show Details
                      </button>
                    )}
                    <button
                      onClick={this.toggleShowForm}
                      className="edit-chore light"
                      id="edit-chore"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="below chore-row">
            {this.state.showUpdateForm ? (
              <UpdateChoreForm
                chore={this.props.chore}
                closeUpdateForm={this.toggleShowForm}
              />
            ) : null}
            {this.state.showDetails ? (
              <Fade>
                <div>{description}</div>
                <div>Difficulty: {difficulty}</div>
                <div>Repeat: {recurring}</div>
                <div>{this.state.checked ? "Done!" : "Incomplete"}</div>
              </Fade>
            ) : null}
          </div>
        </li>
      </Slide>
    );
  }
}

export default ChoreItem;
