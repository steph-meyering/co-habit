import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

class HouseholdCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      infoModalCls: "event-modal",
      infoModalTitle: "",
      infoModalDescription: "",
      infoModalStart: "",
      infoModalEnd: "",
      infoModalId: "",
      infoModalColor: "",
      formModalCls: "event-modal",
      title: "",
      description: "",
      slotsLength: 0,
      start: "",
      end: "",
      colors: ""
    }

    this.moveEvent = this.moveEvent.bind(this)
    this.newEvent = this.newEvent.bind(this)
  }

  componentDidMount() {
    this.props.getUsers(this.props.currentUser.household);
    this.props.getEvents(this.props.currentUser.household)
      .then(() => this.props.fetchChores()
      .then(() => this.setState({events: this.props.events})));
  }

  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }
    end = end.getHours() === 0 && end.getMinutes() === 0 ?
      moment(end).add(1, "seconds").toDate() : end;
    
    const updatedEvent = { ...event, start, end, allDay }
    //make sure the event doesn't jump before updating the database
    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })
    //update the event
    this.props.updateEvent(updatedEvent).then(() => {
        this.setState({
          events: this.props.events,
        });
      });

  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state
    const idx = events.indexOf(event)
    end = end.getHours() === 0 && end.getMinutes() === 0 && end.getSeconds() === 0? 
    moment(end).subtract(1, "seconds").toDate() : end;
    // const nextEvents = events.map(existingEvent => {
    //   return existingEvent._id === event._id
    //     ? { ...existingEvent, start, end }
    //     : existingEvent
    // })
    const updatedEvent = { ...event, start, end}
    //make sure the event doesn't jump before updating the database
    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

    this.props.updateEvent(updatedEvent).then(() => {
      this.setState({
        events: this.props.events,
      });
    });

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  newEvent(event) {
    let dayWrapper = moment(this.state.end);
    dayWrapper = dayWrapper.add(1, "seconds");
    event.preventDefault();
    // let idList = this.state.events.map(a => a.id)
    // let newId = Math.max(...idList) + 1
    let hour = {
      // id: newId,
      title: this.state.title,
      description: this.state.description,
      allDay: this.state.slotsLength === 1,
      start: this.state.start,
      end: this.state.end.getHours() === 0 && this.state.end.getMinutes() === 0 ? dayWrapper.toDate() : this.state.end,
      author: this.props.currentUser.id,
      household: this.props.currentUser.household
    }
    this.props.createEvent(hour).then(() => {
      this.setState({
        events: this.props.events,
        formModalCls: "event-modal",
        title: "",
        description: "",
      });
    });
  }

  handleDelete() {
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
      });
    });
  }

  showEventInfo(event) {
    if (this.state.infoModalCls === "event-modal") {
      this.setState({
        infoModalCls: "event-modal show-modal",
        infoModalTitle: event.title,
        infoModalDescription: event.description,
        infoModalStart: event.start,
        infoModalEnd: event.end,
        infoModalId: event._id,
        infoModalColor: event.color
      });
    }
    
  }

  hideEventInfo(e) {
    if (e.target.className === "event-modal show-modal" ||
      e.target.className === "event-close-modal") {
      this.setState({ 
        infoModalCls: "event-modal",
        infoModalTitle: "",
        infoModalDescription: "",
        infoModalStart: "",
        infoModalEnd: "",
        infoModalId: "",
        infoModalColor: "",
    })
    }
  }

  showFormInfo(event) {
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
    if (e.target.className === "event-modal show-modal" ||
      e.target.className === "event-close-modal") {
      this.setState({
        formModalCls: "event-modal",
        title: "",
        description: "",
      })
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  eventStyleGetter(event, start, end, isSelected) {
    var backgroundColor = event.color ? event.color : "#D2FDFF";
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  }

  render() {
    
    return (
      <div className="calendar">
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
          // onDragStart={console.log}
          defaultView={Views.MONTH}
          defaultDate={new Date()}
          eventPropGetter={(this.eventStyleGetter)}
        />
        {/* view event form */}
        <div onClick={this.hideEventInfo.bind(this)} className={this.state.infoModalCls}>
          <div className='event-div-box'>
            <div className="event-banner">
              <h1>{this.state.infoModalTitle}</h1>
              <div onClick={this.hideEventInfo.bind(this)} className="event-close-modal">X</div>
            </div>
              <p>{this.state.infoModalDescription}</p>
              <div>
              <h3>Date: {this.state.infoModalStart.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric' })}{this.state.infoModalStart.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric' }) === this.state.infoModalEnd.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric' }) ? "" : ` - ${this.state.infoModalEnd.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric' })}`}</h3>
              {this.state.infoModalStart.toLocaleString('default', { hour: 'numeric', minute: 'numeric' }) === this.state.infoModalEnd.toLocaleString('default', { hour: 'numeric', minute: 'numeric' }) || 
              this.state.infoModalStart.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric' }) !== this.state.infoModalEnd.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric' })
              ? <h4>Time: All Day</h4> :
                <h4>Time: {this.state.infoModalStart.toLocaleString('default', { hour: 'numeric', minute: 'numeric' })} - {this.state.infoModalEnd.toLocaleString('default', { hour: 'numeric', minute: 'numeric' })}</h4>}
              {this.state.infoModalColor === undefined ? "" : <button onClick={this.handleDelete.bind(this)}>Delete Event</button> }
              </div>
          </div>
        </div>
        {/* create event form */}
        <div onClick={this.hideFormInfo.bind(this)} className={this.state.formModalCls}>
          <div className='event-div-box'>
            <div className="event-banner">
              <h1>Create a new event</h1>
              <div onClick={this.hideFormInfo.bind(this)} className="event-close-modal">X</div>
            </div>
            <form onSubmit={this.newEvent.bind(this)}>
              <input 
                type="text" 
                value={this.state.title}
                onChange={this.update('title')}
                placeholder="Title"/>
              <input
                type="text"
                value={this.state.description}
                onChange={this.update('description')}
                placeholder="Description" />
                <input type="submit" value="Create Event"/>
            </form>
          </div>
        </div>
      </div>

    )
  }
}

export default HouseholdCalendar
