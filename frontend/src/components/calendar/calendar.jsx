import React from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Fade from "react-reveal/Fade";
const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

class HouseholdCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      infoModalCls: "event-modal",
      infoModalTitle: "",
      infoModalDescription: "",
      infoModalStart: "",
      infoModalEnd: "",
      infoModalId: "",
      infoModalColor: "",
      infoModalUser: "",
      formModalCls: "event-modal",
      title: "",
      description: "",
      slotsLength: 0,
      start: "",
      end: "",
      colors: ""
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);
  }

  componentDidMount() {
    this.props.getUsers(this.props.currentUser.household);
    //make sure to set state for events after both events and event-like
    //chores have been loaded
    this.props
      .getEvents(this.props.currentUser.household)
      .then(() =>
        this.props
          .fetchChores()
          .then(() => this.setState({ events: this.props.events }))
      );
  }
  //destructure move event object
  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    let allDay = event.allDay;
    //set allDay variable to show whether calendar should show event as all day
    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }
    //fix glitch in calendar where 00:00:00 as start and end for two days apart
    //only shows up as spanning one day on the calendar
    end =
      end.getHours() === 0 && end.getMinutes() === 0
        ? moment(end)
            .add(1, "seconds")
            .toDate()
        : end;
    //spread event data and add new start, end, and allDay
    const updatedEvent = { ...event, start, end, allDay };
    //make sure the event doesn't jump before updating the database by setting
    //state
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });
    //update the event and reset events state
    this.props.updateEvent(updatedEvent).then(() => {
      this.setState({
        events: this.props.events
      });
    });
  }
  //destructure resize event object
  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state;
    const idx = events.indexOf(event);
    //fix glitch in calendar where 00:00:00 as start and end for two days apart
    //only shows up as spanning one day on the calendar
    end =
      end.getHours() === 0 && end.getMinutes() === 0 && end.getSeconds() === 0
        ? moment(end)
            .subtract(1, "seconds")
            .toDate()
        : end;

    const updatedEvent = { ...event, start, end };
    //make sure the event doesn't jump before updating the database by setting
    //state
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });
    //update the event and reset events state
    this.props.updateEvent(updatedEvent).then(() => {
      this.setState({
        events: this.props.events
      });
    });

  };

  newEvent(event) {
    let dayWrapper = moment(this.state.end);
    //fix glitch in calendar where 00:00:00 as start and end for two days apart
    //only shows up as spanning one day on the calendar
    dayWrapper = dayWrapper.add(1, "seconds");
    //prevent default form behavior
    event.preventDefault();
    //create newEvent object and set it's end time as 00:00:01 if it's currently 00:00:00
    let newEv = {
      title: this.state.title,
      description: this.state.description,
      allDay: this.state.slotsLength === 1,
      start: this.state.start,
      end:
        this.state.end.getHours() === 0 && this.state.end.getMinutes() === 0
          ? dayWrapper.toDate()
          : this.state.end,
      author: this.props.currentUser.id,
      household: this.props.currentUser.household
    };
    //create event and save it to the databse, then clear new event modal
    this.props.createEvent(newEv).then(() => {
      this.setState({
        events: this.props.events,
        formModalCls: "event-modal",
        title: "",
        description: ""
      });
    });
  }

  handleDelete() {
    //delete event and clear event info modal
    this.props.deleteEvent(this.state.infoModalId).then(() => {
      this.setState({
        events: this.props.events,
        infoModalCls: "event-modal",
        infoModalTitle: "",
        infoModalDescription: "",
        infoModalStart: "",
        infoModalEnd: "",
        infoModalId: "",
        infoModalColor: "",
        infoModalChore: false,
        infoModalUser: ""
      });
    });
  }

  showEventInfo(event) {
    //show event modal by toggling class in state and show either assigned user 
    //or event author based on whether it is a chore or event
    if (this.state.infoModalCls === "event-modal") {
      this.setState({
        infoModalCls: "event-modal show-modal",
        infoModalTitle: event.title,
        infoModalDescription: event.description,
        infoModalStart: event.start,
        infoModalEnd: event.end,
        infoModalId: event._id,
        infoModalColor: event.color,
        infoModalChore: !!event.assignedUser,
        infoModalUser: event.assignedUser || event.author
      });
    }
  }

  hideEventInfo(e) {
    //clear event info modal and hide when either the X or event modal backdrop
    //are clicked
    if (
      e.target.className === "event-modal show-modal" ||
      e.target.className === "event-close-modal"
    ) {
      this.setState({
        infoModalCls: "event-modal",
        infoModalTitle: "",
        infoModalDescription: "",
        infoModalStart: "",
        infoModalEnd: "",
        infoModalId: "",
        infoModalColor: "",
        infoModalChore: false,
        infoModalUser: ""
    })
    }
  }

  showFormInfo(event) {
    //toggle event info modal class to show with info from that was just set in
    //the state
    if (this.state.formModalCls === "event-modal") {
      this.setState({
        formModalCls: "event-modal show-modal",
        slotsLength: event.slots.length,
        start: event.start,
        end: event.end
      });
    }
  }

  hideFormInfo(e) {
    //toggle off new event form and clear fields
    if (
      e.target.className === "event-modal show-modal" ||
      e.target.className === "event-close-modal"
    ) {
      this.setState({
        formModalCls: "event-modal",
        title: "",
        description: ""
      });
    }
  }

  update(field) {
    //set input value dynamically based on the field passed in
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  eventStyleGetter(event, start, end, isSelected) {
    //style calendar event items

    //if the event doesn't have an assigned color because there are so many
    //housemates, give default background color
    var backgroundColor = event.color ? event.color : "#D2FDFF";
    let fontWeight;
    let boxShadow;
    if (event.assignedUser === this.props.currentUser.id) {
      fontWeight = "900";
      boxShadow = "0px 0px 10px 2px gray";
    } else if (event.author === this.props.currentUser.id) {
      fontWeight = "900";
      boxShadow = "0px 0px 5px 2px gray";
    } else {
      fontWeight = "400";
    }
    var style = {
      backgroundColor: backgroundColor,
      fontWeight: fontWeight,
      border: "0px",
      boxShadow: boxShadow,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      display: "block"
    };
    return {
      style: style
    };
  }

  render() {
    return (
      // fade in page using react reveal
      <Fade>
      <div className="calendar">
        {/* use react-big-calendar component */}
        <DragAndDropCalendar
          selectable
          localizer={localizer}
          events={this.state.events}
          onEventDrop={this.moveEvent}
          resizable
          popup
          onEventResize={this.resizeEvent}
          onSelectSlot={this.showFormInfo.bind(this)}
          onSelectEvent={this.showEventInfo.bind(this)}
          defaultView={Views.MONTH}
          defaultDate={new Date()}
          eventPropGetter={this.eventStyleGetter.bind(this)}
        />
        {/* view event form */}
        <div
          onClick={this.hideEventInfo.bind(this)}
          className={this.state.infoModalCls}
        >
          <div className="event-div-box">
            <div
              onClick={this.hideEventInfo.bind(this)}
              className="event-close-modal"
            >
              X
            </div>
            <div className="event-banner">
              <h1>{this.state.infoModalTitle}</h1>
            </div>
            <div className="event-info-box">
              <div className="event-info-time">
                <span>
                  {this.state.infoModalStart.toLocaleString("default", {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                  })}
                  {this.state.infoModalStart.toLocaleString("default", {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                  }) ===
                  this.state.infoModalEnd.toLocaleString("default", {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                  })
                    ? ""
                    : ` - ${this.state.infoModalEnd.toLocaleString("default", {
                        weekday: "long",
                        month: "long",
                        day: "numeric"
                      })}`}
                </span>
                {this.state.infoModalStart.toLocaleString("default", {
                  hour: "numeric",
                  minute: "numeric"
                }) ===
                  this.state.infoModalEnd.toLocaleString("default", {
                    hour: "numeric",
                    minute: "numeric"
                  }) ||
                this.state.infoModalStart.toLocaleString("default", {
                  weekday: "long",
                  month: "long",
                  day: "numeric"
                }) !==
                  this.state.infoModalEnd.toLocaleString("default", {
                    weekday: "long",
                    month: "long",
                    day: "numeric"
                  }) ? (
                  <span>All Day</span>
                ) : (
                  <span>
                    {this.state.infoModalStart.toLocaleString("default", {
                      hour: "numeric",
                      minute: "numeric"
                    })}{" "}
                    -{" "}
                    {this.state.infoModalEnd.toLocaleString("default", {
                      hour: "numeric",
                      minute: "numeric"
                    })}
                  </span>
                )}
              </div>
              <p>{this.state.infoModalDescription}</p>
              {this.state.infoModalChore ? (
                ""
              ) : (
                <button
                  id="event-delete-button"
                  onClick={this.handleDelete.bind(this)}
                >
                  Delete Event
                </button>
              )}
            </div>
          </div>
        </div>
        {/* create event form */}
        <div
          onClick={this.hideFormInfo.bind(this)}
          className={this.state.formModalCls}
        >
          <div className="event-div-box">
            <div
              onClick={this.hideFormInfo.bind(this)}
              className="event-close-modal"
            >
              X
            </div>
            <div className="event-banner">
              <h1>Create a new event</h1>
            </div>
            <form onSubmit={this.newEvent.bind(this)}>
              <input
                type="text"
                value={this.state.title}
                onChange={this.update("title")}
                placeholder="Title"
              />
              <input
                type="text"
                value={this.state.description}
                onChange={this.update("description")}
                placeholder="Description"
              />

              <button>Create Event</button>
            </form>
          </div>
        </div>
      </div></Fade>
    );
  }
}

export default HouseholdCalendar;
