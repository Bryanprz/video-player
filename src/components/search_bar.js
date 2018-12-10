import React, { Component } from 'react';
 // { Component } same as doing `const Component = React.Component`

// below is a function component, as opposed to class component
// class components are used when we need to record internal data within component

// const SearchBar = () => {
// 	return <input /> // React.createElement(...) so requires importing React module
// };

// In General, you want to start out writing functional components
// and evolve up to class component only when you need more funcionality 
// like data storage.


// HANDLING EVENTS
// Handling events in React has 2 steps: (presumes first
// step of knowing what the event is)

// 1. Declare an event handler; a function that runs 
// whenever the event occurs.

// 2. Pass the event handler to the element that we
// want to monitor for events.


// STATE
// State is a plain Javascript object that exists on any 
// component that's a class-based component.

// Each instance of a class-based component has its own copy of state.
// State is only used in class components, not functional components.


class SearchBar extends Component {
	// ALL JS objects call their constructor method
	// upon a new instantiation, just like `initialize` in Ruby.
	// Constructor method reserved for doing some set up in class.
	constructor(props) {
		super(props);
		this.state = { term: '' };
	}
	
 // render() is required for all class-based components
 // render() must always return JSX
 // render() gets called every time state changes (every time setState is called)

 // CONTROLLED COMPONENTS
 // A controlled component (controlled form element) has its value
 // set by state, rather than a normal form element setting state based
 // on input value.

 // CSS: in general, give the top-level DOM element a class name
 // that is the same name as the component. e.g. SearchBar -> search-bar
	render() {
		return ( 
			<div className="search-bar">
				<input 
				value={this.state.term}
				onChange={event => this.onInputChange(event.target.value)} 
				/>
				Value of the input: {this.state.term}
			</div>
		);
	}

// Naming convention for event-handlers: `on` or `handle` + 
// DOM element (`Input`) + Event name (`Change`)
	onInputChange(term) { 
		this.setState({term});
		this.props.onSearchTermChange(term);
	}

}

export default SearchBar;