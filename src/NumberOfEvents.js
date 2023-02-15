import React, { Component } from "react";

class NumberOfEvents extends Component {
     state = { numberOfEvents: this.props.numberOfEvents}

    changeNumber = (value) => {
      this.setState({ numberOfEvents: value });
      this.props.updateNumberOfEvents(value);
    };
  
    componentDidMount() {
      this.setState({ numberOfEvents: this.props.numberOfEvents || 5 });
    }  

    //-------OLD functions
    // optionChanged = (event) => {
    //   this.setState({eventCount: event.target.value});
    // }

    // handleOptionChanged = (event)=> {
    //   const optionChanged=event.target.value;
    //     // this.props.updateEvents(null, optionChanged);
    //     this.setState({
    //       numberOfEvents: optionChanged
    //     })
    // }

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
              value={this.state.numberOfEvents}
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

          </div>
        );
      }
}

export default NumberOfEvents;