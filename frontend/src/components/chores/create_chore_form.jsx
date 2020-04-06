import React from "react";
import { connect } from "react-redux";
import { createNewChore } from "../../actions/chore_actions";
import moment from "moment";
import Fade from "react-reveal/Fade";

class CreateChoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      author: this.props.currentUser.id,
      household: this.props.currentUser.household,
      difficulty: 1,
      recurring: "weekly",
      // Set default due date to 1 week from now
      dueDate: new Date(moment().add(7, "days")).toISOString().substr(0, 10),
      show: this.props.show,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  update(field) {
    return (e) => {
      if (field === "recurring") console.log(e.currentTarget.value);
      this.setState({
        [field]: e.currentTarget.value,
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let { loading, show, ...chore } = this.state;
    chore.difficulty = parseInt(chore.difficulty);
    // Convert date to format readable by mongoose
    chore.dueDate = new Date(chore.dueDate).toISOString().substr(0, 10);
    this.props.createNewChore(chore).then(() =>
      this.setState({
        title: "",
        description: "",
        author: this.props.currentUser.id,
        household: this.props.currentUser.household,
        difficulty: 1,
        recurring: "weekly",
        dueDate: new Date(moment().add(7, "days")).toISOString().substr(0, 10),
      })
    );
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render() {
    if (!this.state.show) {
      return (
        <div>
          <button className="bold-btn" onClick={this.toggleShow}>
            Add New Chore
          </button>
        </div>
      );
    }

    return (
      <Fade>
        <form id="create-chore" onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.update("title")}
            placeholder="Title"
          />
          <br />
          <label>Description</label>
          <input
            type="text"
            value={this.state.description}
            onChange={this.update("description")}
            placeholder="Description"
          />
          <br />
          <label>Difficulty</label>
          <input
            type="number"
            min="1"
            max="3"
            value={this.state.difficulty}
            onChange={this.update("difficulty")}
          />
          <br />
          <label>Due Date</label>
          <input
            type="date"
            value={this.state.dueDate}
            onChange={this.update("dueDate")}
          />
          <br />
          <label>Repeat? </label>
          <select
            id="recurring"
            name="recurring"
            onChange={this.update("recurring")}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Every week</option>
            <option value="biweekly">Every 2 weeks</option>
            <option value="never">Never</option>
          </select>
          <br />
          <button className="bold-btn" type="submit">
            Add New Chore
          </button>
          <button className="light" onClick={this.toggleShow}>
            Cancel
          </button>
        </form>
      </Fade>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.user,
    errors: state.errors.chores,
    show: ownProps.show,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createNewChore: (chore) => dispatch(createNewChore(chore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateChoreForm);
