import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateChore, deleteChore } from "../../actions/chore_actions";
import moment from "moment";
class UpdateChoreForm extends React.Component {
  constructor(props) {
    super(props);
    let chore = this.props.chore;
    chore.dueDate = new Date(moment.utc(chore.dueDate[0]))
      .toISOString()
      .substr(0, 10);

    this.state = {
      ...chore
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let chore  = this.state;
    chore.difficulty = parseInt(chore.difficulty);
    chore.dueDate = new Date(chore.dueDate).toISOString().substr(0, 10);
    this.props.updateChore(chore);
    this.props.closeUpdateForm();
  }

  render() {
    return (
      <div className="edit-chore-container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              value={this.state.title}
              onChange={this.update("title")}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              value={this.state.description}
              onChange={this.update("description")}
            />
          </div>
          <div className="small-input">
            <label>Difficulty</label>
            <input
              type="number"
              min="1"
              max="3"
              value={this.state.difficulty}
              onChange={this.update("difficulty")}
            />
          </div>
          <div className="small-input">
            <label>Due Date</label>
            <input
              type="date"
              value={this.state.dueDate}
              onChange={this.update("dueDate")}
            />
          </div>
          {/* <label>Recurring? </label>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="daily"
                checked={this.state.recurring === "daily"}
                onChange={this.update("recurring")}
              />
              Daily
            </label>
            <label>
              <input
                type="radio"
                value="weekly"
                checked={this.state.recurring === "weekly"}
                onChange={this.update("recurring")}
              />
              Every week
            </label>
            <label>
              <input
                type="radio"
                value="biweekly"
                checked={this.state.recurring === "biweekly"}
                onChange={this.update("recurring")}
              />
              Every 2 weeks
            </label>
            <label>
              <input
                type="radio"
                value="never"
                checked={this.state.recurring === "never"}
                onChange={this.update("recurring")}
              />
              Never
            </label>
          </div> */}
          <button type="submit">Update Chore</button>
          <button onClick={() => this.props.deleteChore(this.props.chore._id)}>
            Delete
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    errors: state.errors.chores,
    chore: ownProps.chore
  };
};

const mapDispatchToProps = dispatch => ({
  updateChore: chore => dispatch(updateChore(chore)),
  deleteChore: choreId => dispatch(deleteChore(choreId))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateChoreForm)
);
