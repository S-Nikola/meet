import React, { Component } from "react";

class NumberOfEvents extends Component {
     state =  { eventCount: 32 }

    // optionChanged = (event) => {
    //   this.setState({eventCount: event.target.value});
    // }

    handleOptionChanged = (event)=> {
      const optionChanged=event.target.value;
        this.props.updateEvents(null, optionChanged);
        this.setState({
          eventCount: optionChanged
        })
    }

    render() {
        return (
          <div className="NumberOfEvents">
            <select 
            className="select-number"
            value={this.state.eventCount}
            onChange= { this.handleOptionChanged } 
            
            >
              <option 
              className="option-32"
              value={this.state.eventCount}
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