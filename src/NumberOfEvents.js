import React, { Component } from "react";

class NumberOfEvents extends Component {
     state =  { numberOfEvents: 32 }

    changeNumber = (value) => {
      this.setState({ numberOfEvents: value });
      this.props.updateEvents(value);
    };
  
    componentDidMount() {
      this.setState({ numberOfEvents: this.props.numberOfEvents || 32 });
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