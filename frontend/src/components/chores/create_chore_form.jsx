import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createNewChore } from "../../actions/chore_actions";

class CreateChoreForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      review_text: "",
      rating: undefined,
      book_id: this.props.book.id,
      user_id: this.props.user_id,
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetRating = this.resetRating.bind(this);
  }

  componentDidMount() {
    this.props.fetchBook(this.props.bookId);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  resetRating() {
    this.setState({
      rating: undefined
    });
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
    let { loading, ...review } = this.state;
    review.rating = parseInt(review.rating);

    this.setState({
      loading: true
    });

    this.props.submitReview(review).then(
      () => {
        this.props.fetchBook(this.props.bookId);
        setTimeout(() => {
          this.setState({
            review_text: "",
            rating: undefined,
            book_id: this.props.book.id,
            user_id: this.props.user_id,
            loading: false
          });
        }, 1500);
      },
      err => {
        this.setState({
          loading: false
        });
      }
    );
  }

  renderErrors() {
    return (
      <ul className="errors-list">
        {this.props.errors.slice(0, 3).map((error, i) => (
          <li key={`error-${i}`} className="err">
            <FontAwesomeIcon icon={faExclamationCircle} id="error-icon" />
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    let resetBtn = null;

    if (this.state.loading) {
      const override = css`
        display: block;
        margin: auto;
        border-color: white;
      `;
      return (
        <div className="main-component-container">
          <div className="loading submit-loading">
            <RotateLoader
              css={override}
              size={20}
              color={"#1a7d88"}
              loading={this.state.loading}
            />
          </div>
        </div>
      );
    }

    if (this.state.rating !== undefined) {
      resetBtn = (
        <button className="rating-reset-button" onClick={this.resetRating}>
          Clear Rating
        </button>
      );
    }

    let allReviews = null;
    let reviewForm = null;

    if (this.props.book.reviews) {
      if (!this.props.book.reviewAuthorIds.includes(this.props.user_id)) {
        reviewForm = (
          <div className="review-form-container">
            <div className="errors-container">{this.renderErrors()}</div>
            <form className="review-form">
              <div className="form-row">
                <div className="rating-label">What did you think?</div>
                <div className="rating-container">
                  <Rating
                    initialRating={this.state.rating}
                    value={this.state.rating}
                    emptySymbol={
                      <img
                        src={window.starEmptyURL}
                        id="form-rating-star"
                        className="icon"
                      />
                    }
                    fullSymbol={
                      <img
                        src={window.starFullURL}
                        id="form-rating-star"
                        className="icon"
                      />
                    }
                    onClick={rate => this.setState({ rating: [rate] })}
                  />
                  {resetBtn}
                </div>
              </div>
              <div className="rating-label review-label">Write a Review?</div>
              <textarea
                id="review-input"
                placeholder="Tell us what you liked about the book!"
                value={this.state.review_text}
                onChange={this.update("review_text")}
                className="upload-input"
              />
              <div className="review-btn-container">
                <button
                  onClick={this.handleSubmit}
                  type="submit"
                  className="post-review-btn submit-btn"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        );
      }
    }

    return (
      <div className="reviews-contain">
        {reviewForm}
        <div>
          <h2 className="reviews-header">Reader Reviews</h2>
          <ul className="reveiws-list">
            <ReviewsList user_id={this.props.user_id} book={this.props.book} />
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const bookId = parseInt(match.params.id);
  return {
    bookId,
    book: state.entities.books[bookId],
    user_id: state.session.id,
    errors: state.errors.reviews
    // ,
    // reviews: Object.values(state.entities.books[bookId].reviews)
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBook: bookId => dispatch(fetchBook(bookId)),
  submitReview: review => dispatch(createReview(review)),
  clearErrors: () => dispatch(clearReviewsErrors())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateChoreForm)
);
