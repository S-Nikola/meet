import React, { Component } from "react";
import { WarningAlert } from './Alert';

class NumberOfEvents extends Component {
     state = { numberOfEvents: this.props.numberOfEvents || 20}

    // Function that changes the state of events after an option(number) is selected
    changeNumber = (event)=> {
      const chosenOption = event.target.value;
     if (chosenOption > 20) {
      this.setState({
        infoText: 'You want more than 20? Ok, if you say so. Here you go, enjoy!',
        numberOfEvents: chosenOption,
      });
    } else {
      return this.setState({
        numberOfEvents: chosenOption,
        infoText:''
      });
    }
    this.props.updateNumberOfEvents(chosenOption);
    }
  
    // componentDidMount() {
    //   this.setState({ numberOfEvents: this.props.numberOfEvents });
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
              className="option-20"
              value={20}
              >20</option>
              <option 
              className="option-30"
              value={30}
              >30</option>

              <option 
              className="option-40"
              value={40}
              >40</option>
            </select>
            <WarningAlert text={this.state.infoText} />
          </div>
        );
      }
}

export default NumberOfEvents;