import React, { Component } from 'react'; // 'react' is from node_modules/
													 // save that module to the variable React

import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar'; // file extension not required if its js. If it's a file we wrote ourselves we need to include file reference from current relative file
import YTSearch from 'youtube-api-search'; // API package installed to node_modules/ through terminal `npm install --save youtube-api-search`
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash'; // utility for throttling search

const API_KEY = 'AIzaSyBLNG-BIonq5Wj6oUpLtfMSgZuXqWqt-E8'; // youtube api key

// Create a new component. This component should produce some HTML.

// App component is a functional component because it doesn't have a concept of STATE.
// const App = function(props) {
// 	return (
// 		<div>
// 		  <SearchBar />
// 		</div>
// 	);
// }

// class based components use this.props
// function based components receive props as arguments

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			videos: [], 
			selectedVideo: null
		};

		this.videoSearch('shamanism');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

// this function will run immediately upon DOM initialization w/o 
// waiting for YTSearch callback to actually define videos.
// So you need to check within children components if video prop is defined.

// If VideoList runs the function onVideoSelect(), it runs the callback function
// that updates App's state for selectedVideo.
// VideoList has props.onVideoSelect now, which is a function that takes an argument
// of a video, named here `selectedVideo`.
	render() {
		const videoSearch = _.debounce(term => {this.videoSearch(term)}, 300);

		return (
			<div>
			  <SearchBar onSearchTermChange={videoSearch} />
			  <VideoDetail video={this.state.selectedVideo} />
			  <VideoList 
			  	onVideoSelect={ selectedVideo => this.setState({selectedVideo}) } 
			  	videos={this.state.videos} 
			  />
			</div>
		);
	}
}

// App = component class
// <App /> = component instance (because it's used in JSX tags)

// <App /> can be self-closing if it has no child elements (e.g. <App>Hello</App> can't be self-closing)

// Take this component's generated HTML and put it on the page
// (in the DOM).
ReactDOM.render(<App />, document.querySelector('.container'));