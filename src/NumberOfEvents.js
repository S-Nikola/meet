import React, { Component } from "react";
// import { WarningAlert } from './Alert';

class NumberOfEvents extends Component {
     state = { numberOfEvents: this.props.numberOfEvents || 5 }

    // Function that changes the state of events after an option(number) is selected
    changeNumber = (event)=> {
      const chosenOption = event.target.value;
      this.setState({ numberOfEvents: chosenOption })
      this.props.updateEvents(null, chosenOption); 
    }
  
    render() {
        return (
          <div className="NumberOfEvents">
            <select 
            className="select-number"
            value={this.state.numberOfEvents}
            onChange= { this.changeNumber } 
            
            >
              <option 
              className="option-5"
              value={5}
              >5</option>
              <option 
              className="option-10"
              value={10}
              >10</option>

              <option 
              className="option-20"
              value={20}
              >20</option>
            </select>
            {/* <WarningAlert text={this.state.infoText} id="warning-alert"/> */}
          </div>
        );
      }
}

export default NumberOfEvents;