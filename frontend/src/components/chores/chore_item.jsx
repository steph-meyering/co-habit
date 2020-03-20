import React from "react";
import { withRouter } from "react-router-dom";
import UpdateChoreForm from "./update_chore_form";

class ChoreItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    };
    this.closeUpdateForm = this.closeUpdateForm.bind(this)
  }
  closeUpdateForm() {
    this.setState({showUpdateForm: false})
  }
  render() {
    if (this.state.showUpdateForm) {
      return (
        <li>
          <UpdateChoreForm chore={this.props.chore} closeUpdateForm={this.closeUpdateForm} />
        </li>
      );
    }

    return (
      <li>
        <div>
          <div>{this.props.chore.title}</div>
          <div>{this.props.chore.description}</div>
          <div>{this.props.chore.difficulty}</div>
          <div>
            {this.props.chore.assignedUser
              ? this.props.housemates[this.props.chore.assignedUser].name
              : "unassigned"}
          </div>
          <div>{this.props.chore.complete ? "Done!" : ""}</div>
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
{
  /* [this.props.chore.assignedUser].name */
}
