![](./frontend/public/logo.png)

CO-HABIT is an all-in-one housemates app. It enables housemates to automatically assign chores, split shared bills, and notify each other of upcoming events all through their house dashboard.

[LIVE SITE](http://cohabit.herokuapp.com/)

## Features

House admin can accept/deny new requests to join their household

![](https://media.giphy.com/media/YPOxhkALuGeTvQlFI0/giphy.gif)

Chores list with auto-assignment

![](https://media.giphy.com/media/XcdaYoxBH9kS2Kug1r/giphy.gif)

Bills tracker

![](https://media.giphy.com/media/L0NP9OSV0mbYBs5jz3/giphy.gif)

Drag & drop events calendar

![](https://media.giphy.com/media/f74j3Nef8l82LmGJB8/giphy.gif)


## Technologies

**MERN Stack**

Backend: Node.js, Express.js, MongoDB

Frontend: React.js, Redux.js

**Packages**

- Passport-JWT
- Validator
- BCryptJS
- Moment
- React Big Calendar
- React Minimal Pie Chart
- React Reveal
- React Spinners

## Code Snippets

One of the useful features of CO-HABIT is that chores are both automatically assigned and added to the calendar. 

The househould admin can click a button that reassigns all chores. The following code ensures that the workload is evenly distributed among accepted members of their household:

``` js
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
    // show loading animation while fetching updated chores list
    this.setState({ loading: false });
  });
}

shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
```

The current user's chores are shown alongside other household events on the calendar, but chores and events do not have the same functionality. For instance, household event dates can change, but chore due dates cannot be edited on the calendar page. In order to render both chores and events on the calendar, chores are converted into event-like objects in the calendar container:

```javascript
let chores = Object.values(state.entities.chores);
let dueDateEvents = [];

// iterate though all chores and create an event-like object that
//  the calendar will be able to render
for (let i = 0; i < chores.length; i++) {
  // Create shallow copy of chore
  const chore = Object.assign({}, chores[i]);
  for (let j = 0; j < chore.dueDate.length; j++) {
    let ddate = chore.dueDate[j];
    // Use moment library to add 8 hours to the chore's due date to comply with
    //  calendar's time requirements
    ddate = moment(new Date(ddate)).add(8, "hours").toDate();
    let dueDateEvent = {
      allDay: true,
      _id: chore._id,
      title: chore.title,
      description: chore.description,
      start: ddate,
      end: ddate,
      author: chore.assignedUser,
      household: chore.household,
      assignedUser: chore.assignedUser
    };
   dueDateEvents.push(dueDateEvent);
  }
}

// Join chores and events so the render function can iterate through
//  all at the same time and treat them the same way
let allEvents = Object.values(state.entities.events).concat(dueDateEvents);
```

To optimize re-rendering and prevent choppy transitions while moving calendar events, events are managed in the local state of the calendar component. The events component's state is set only after both chores and events have been fetched from the database:

```javascript
this.props
  .getEvents(this.props.currentUser.household)
  .then(() =>
    this.props
      .fetchChores()
      .then(() => this.setState({ events: this.props.events }))
  );
```

Then, whenever a calendar item is moved, local state is updated first to instantaneuously show a smooth visual change of the calendar event being moved:
```javascript
const newEvents = [...events];

//replace old event with new updated event
newEvents.splice(eventIdx, 1, updatedEvent);

this.setState({
  events: newEvents
});
```

After this initial component re-render, the updated date information is stored to the database so it is persisted across sessions for all members of the household:

```javascript
this.props.updateEvent(updatedEvent);
```

## Developers

* [Sara Sampson](https://github.com/sara-ls)
* [Steven Davies](https://github.com/s-davies)
* [Stephane Meyering](https://github.com/steph-meyering)

