import React from "react";
import UpdateChoreForm from "./update_chore_form";
import moment from "moment";
class ChoreItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false,
      checked: this.props.chore.complete
    };
    this.closeUpdateForm = this.closeUpdateForm.bind(this);
  }

  closeUpdateForm() {
    this.setState({
      showUpdateForm: false,
      checked: this.props.chore.complete
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

    return (
      <li>
        <div>
          <div>{title}</div>
          <div>{description}</div>
          <div>
            {assignedUser
              ? this.props.housemates[assignedUser].name
              : "unassigned"}
          </div>
          <div>{difficulty}</div>
          <div>{recurring}</div>
          <div>Due {moment(dueDate[0]).fromNow()}</div>
          <div>
            <input
              type="checkbox"
              value={this.state.checked}
              // defaultChecked={complete}
              onChange={e => {
                let updatedChore = this.props.chore;
                updatedChore.complete = !this.state.checked;
                this.props.updateChore(updatedChore);
                this.setState({ checked: !this.state.checked });
              }}
            />
            <div>{complete ? "Done!" : "Incomplete"}</div>
          </div>
        </div>
        <div>
          <button onClick={() => this.setState({ showUpdateForm: true })}>
            Edit
          </button>
        </div>
      </li>
    );
  }
}

export default ChoreItem;
