import React, { Component } from "react";

class Event extends Component {
  state = { collapsed: true };
  toggleDetails = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }))
  }

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;

    return (
    <div className="Event">
      <h2 className="summary">{ event.summary }</h2>
      <p className="location">{`Location: ${event.location}`}</p>
      <p className="start">{`${event.start.dateTime}`}</p>
      <button 
        className="details-button"
        onClick={this.toggleDetails}
      >{ collapsed ? 'Show' : 'Hide' }Details
      </button>
      {!collapsed && (
        <div className="details">
          <p className="description">{`Description: ${event.description}`}</p>
        </div>
      )}
    </div>
  )}
}
export default Event;