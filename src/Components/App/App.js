import React, { Component } from 'react';
/*import logo from './logo.svg'; */
import './App.css';
//Importing relevant components//
import {SearchBar} from './SearchBar/SearchBar.js';
import {SearchResults} from './SearchResults/SearchResults.js';
import {Playlist} from './Playlist/Playlist';
import {Deezer} from './util/Deezer'

class App extends Component {
constructor(props){
super(props);
 this.state = {
      searchResults: [],
      playListName: 'New PlayList',
      playListTracks: []
    };

this.addTrack = this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
this.updatePlayListName = this.updatePlayListName.bind(this);
this.savePlayList =this.savePlayList.bind(this);
this.search = this.search.bind(this);
}

//Adding Track Method
addTrack(track) {
  let tracks = this.state.playListTracks;
    if (!tracks.includes(track)) {
       tracks.push(track);
       this.setState({playListTracks: tracks});
    }
  }

//Removing Track Method 
removeTrack(track){
  let tracks = this.state.playListTracks;
  tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
  this.setState({playListTracks :tracks});
}

//Renaming Playlist Method
updatePlayListName(name){
    this.setState({ playlistName: name})
}

//Save PLaylist to Spotify Method
savePlayList() {
  const trackURIs = this.state.playListTracks.map(track => track.uri);
    Deezer.savePlayList(this.state.playListName, trackURIs).then(() => {
      this.setState({playListName: 'New Playlist', playListTracks: []});
    });
    }

search(term) {
    Deezer.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }




  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        < SearchBar onSearch={this.search}/>
      <div className="App-playlist">
        < SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack}/>
        < Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.onRemove} onNameChange={this.updatePlayListName} onSave={this.savePlayList}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
