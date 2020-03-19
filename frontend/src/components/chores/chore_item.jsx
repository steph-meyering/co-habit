import React from "react";
import { withRouter } from "react-router-dom";

class ChoreItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        <div>{this.props.chore.title}</div>
        <div>{this.props.chore.description}</div>
        <div>{this.props.chore.difficulty}</div>
        <div>{this.props.chore.assignedUser ? this.props.chore.assignedUser.name : "unassigned" }</div>
        <div>{this.props.chore.complete ? "Done!" : "" }</div>
      </li>
    );
  }
}

export default ChoreItem;
