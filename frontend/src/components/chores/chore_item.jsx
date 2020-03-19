import React from "react";
import { withRouter } from "react-router-dom";

class ChoreItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.chore.title}</div>;
  }
}


export default ChoreItem;