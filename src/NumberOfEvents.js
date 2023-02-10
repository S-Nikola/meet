import React, { Component } from "react";

class NumberOfEvents extends Component {
     state =  { numberOfEvents: 32 }

    optionChanged = (event) => {
      this.setState({numberOfEvents: event.target.value});
    }

    render() {
        return (
          <div className="NumberOfEvents">
            <select 
            className="select-number"
            value={this.state.numberOfEvents}
            onChange= { this.optionChanged } 
            
            >
              <option 
              className="option-32"
              value={this.state.numberOfEvents}
              >32</option>
              <option 
              className="option-64"
              value={64}
              >64</option>

              <option 
              className="option-96"
              value={96}
              >96</option>
            </select>

          </div>
        );
      }
}

export default NumberOfEvents;