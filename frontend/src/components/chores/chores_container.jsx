import React from "react";
import { connect } from "react-redux";
import {
  fetchChores,
  fetchChoresForUser,
  updateChore
} from "../../actions/chore_actions";
import { getAcceptedUsers } from "../../actions/user_actions";
import ChoreItem from "./chore_item";
import CreateChoreForm from "./create_chore_form";
import Loader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
import Slide from "react-reveal/Slide";
import "../../styles/components/chores.scss";

class Chores extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, showCreateChoreForm: false };
    this.reassignChores = this.reassignChores.bind(this);
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  reassignChores() {
    this.setState({ loading: true });
    // shuffle array of housemates to randomly assign chores
    let shuffledHousemates = this.shuffle(Object.values(this.props.housemates));
    this.props.chores.forEach((chore, i) => {
      chore.assignedUser =
        shuffledHousemates[i % shuffledHousemates.length]._id;
      this.props.updateChore(chore);
    });

    this.props.fetchChores().then(() => {
      // show loading animation for minimum of 0.8 seconds 
      //    while fetching updated chores list
      setTimeout(() => this.setState({ loading: false }), 800);
    });
  }

  componentDidMount() {
    this.props.getAcceptedUsers(this.props.currentUser.household).then(() => {
      this.props.fetchChores().then(() => this.setState({ loading: false }));
    });
  }

  render() {
    if (!this.props.chores) {
      return null;
    }
    if (this.state.loading) {
      const override = css`
        display: block;
        margin: auto;
        border-color: transparent;
      `;
      return (
        <div>
          <CreateChoreForm show={this.state.showCreateChoreForm} />
          <div className="loading chores-list-container">
            <Loader
              css={override}
              size={50}
              color={"#99E8E8"}
              loading={this.state.loading}
            />
          </div>
        </div>
      );
    }

    if (this.props.chores.length === 0) {
      return (
        <div>
          <div className="no-chores">No Chores Yet</div>
          <CreateChoreForm show={this.state.showCreateChoreForm} />
        </div>
      );
    }
    
    let allChoreItems = this.props.chores.map(chore => {
      return (
        <ChoreItem
          key={chore._id}
          chore={chore}
          housemates={this.props.housemates}
          updateChore={this.props.updateChore}
        />
      );
    });

    return (
      <Slide up>
        <div className="chores-page">
          <CreateChoreForm show={this.state.showCreateChoreForm} />
          <div className="chores-list-container">
            {/* Only allow house admin to reassign all chores */}
            {this.props.currentUser.adminPrivileges ? (
              <button className="bold-btn" onClick={this.reassignChores}>
                Reassign All Chores
              </button>
            ) : null}
            <ol>{allChoreItems}</ol>
          </div>
        </div>
      </Slide>
    );
  }
}

const mapStateToProps = state => {
  return {
    chores: Object.values(state.entities.chores),
    currentUser: state.session.user,
    housemates: state.entities.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChores: () => dispatch(fetchChores()),
    fetchChoresForUser: user => dispatch(fetchChoresForUser(user)),
    updateChore: chore => dispatch(updateChore(chore)),
    getAcceptedUsers: householdId => dispatch(getAcceptedUsers(householdId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chores);
