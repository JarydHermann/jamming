import React from 'react';
import './SearchResults.css';
import {TrackList} from './TrackList/TrackList';

export class SearchResults extends React.Component{



render(){
return (
   <div className="SearchResults">
    <h2>Results</h2>
        < TrackList tracks={this.props.searchResults} name={this.props.track.name} artist={this.props.track.artist} album={this.props.track.album} onAdd={this.props.onAdd}/>
    </div>
);

}

}