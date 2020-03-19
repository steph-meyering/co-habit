import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createNewChore } from "../../actions/chore_actions";

class CreateChoreForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      author: this.props.currentUser.id,
      household: this.props.currentUser.household,
      difficulty: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  // componentWillUnmount() {
  //   this.props.clearErrors();
  // }

  update(field) {
    return e => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    let { loading, ...chore } = this.state;
    console.log(chore)
    chore.difficulty = parseInt(chore.difficulty)
    this.props.createNewChore( chore );

    // this.setState({
    //   loading: true
    // });

    // this.props.submitReview(review).then(
    //   () => {
    //     this.props.fetchBook(this.props.bookId);
    //     setTimeout(() => {
    //       this.setState({
    //         review_text: "",
    //         rating: undefined,
    //         book_id: this.props.book.id,
    //         user_id: this.props.user_id,
    //         loading: false
    //       });
    //     }, 1500);
    //   },
    //   err => {
    //     this.setState({
    //       loading: false
    //     });
    //   }
    // );
  }

  // renderErrors() {
  //   return (
  //     <ul className="errors-list">
  //       {this.props.errors.slice(0, 3).map((error, i) => (
  //         <li key={`error-${i}`} className="err">
  //           {/* <FontAwesomeIcon icon={faExclamationCircle} id="error-icon" /> */}
  //           {error}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }

  render() {
    if (this.state.loading) {
      // const override = css`
      //   display: block;
      //   margin: auto;
      //   border-color: white;
      // `;
      return (
        <div className="main-component-container">
          <div className="loading submit-loading">
            {/* <RotateLoader
              css={override}
              size={20}
              color={"#1a7d88"}
              loading={this.state.loading}
            /> */}
          </div>
        </div>
      );
    }

    return (
      <div>
        Add New Chore
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.update("title")}
          />
          <br />
          <label>Description</label>
          <input
            type="text"
            value={this.state.description}
            onChange={this.update("description")}
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
          <button type="submit">Add Chore</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  return {
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => ({
  createNewChore: chore => dispatch(createNewChore(chore))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateChoreForm)
);
