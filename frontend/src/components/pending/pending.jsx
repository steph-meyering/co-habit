import React from 'react';

class Pending extends React.Component {
  render() {
    return(
      <div className="pending">
        Hello!
        <p>Your request to join this household has been sent and is currently <strong>pending</strong>.</p>
        <p>
          The user who created this household can approve your request by visiting their account's home page. Please contact them in order to use all of CO-HABIT's features. If you entered this household name by mistake, please log out and create a new household.
        </p>
      </div>
    )
  }
}

export default Pending;