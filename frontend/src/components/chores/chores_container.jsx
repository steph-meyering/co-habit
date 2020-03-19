import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchChores,
  fetchChoresForUser,
  createNewChore,
  updateChore
} from "../../actions/chore_actions";
import ChoreItem from "./chore_item";

class Chores extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, showCreateChoreForm: false };
  }

  componentDidMount() {
    this.props.fetchChores().then(res => {
      console.log(res);
      this.setState({ loading: false });
    });
  }

  render() {
    if (this.props.loading) {
      return <div>loading...</div>;
    }

    if (this.props.chores.length === 0) {
      return <div>No Chores Yet</div>;
    }
    let allChoreItems = this.props.chores.map(chore => {
      return <ChoreItem key={chore._id} chore={chore} updateChore={this.props.updateChore} />;
    });

    return (
      <div>
        <h2>All Household Chores</h2>
        <div>{allChoreItems}</div>
        <h2>Your Assigned Chores</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chores: Object.values(state.entities.chores),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChores: () => dispatch(fetchChores()),
    fetchChoresForUser: user => dispatch(fetchChoresForUser(user)),
    createNewChore: chore => dispatch(createNewChore(chore))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chores);
