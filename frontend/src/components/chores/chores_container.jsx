import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchChores,
  fetchChoresForUser,
  createNewChore,
  updateChore
} from "../../actions/chore_actions";

class Chores extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetchChoresForUser(this.props.currentUser);
  }

  render() {
    return (
      <div>
        <h2>All Household Chores</h2>
        <h2>Your Assigned Chores</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chores: state.chores,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChores: () => dispatch(fetchChores()),
    fetchChoresForUser: user => dispatch(fetchChoresForUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chores);
