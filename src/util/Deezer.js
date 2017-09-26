//Deezer API
const app_id = '253262';
const redirectURL = 'http://localhost:3000/';
const accessURLBase = 'https://connect.deezer.com/oauth/access_token.php';

//Users Access Token
let accessToken = '';

const Deezer = {
getAccessToken(){
    if(accessToken){
        return new Promise(resolve => {
          resolve(accessToken);
        });
    }

const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      // Clears the parameters, allowing a new access token to be pulled when it expires.
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location =  `https://connect.deezer.com/oauth/auth.php?app_id=${app_id}&redirect_uri=${redirectURL}perms=basic_access,email`;
    }





},

search(term){
const accessToken = Spotify.getAccessToken();
    return fetch(`http://api.deezer.com/search?q=track:${term}`, { 
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  ).then(response => { return response.json(); }
  ).then(jsonResponse => { // parsing of the retreived data into json objects.
      if (!jsonResponse.tracks) {
        return [];
      }
/* picking of the json data and assigning to track object. */
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.title,
        length: track.duration,
        image: track.album[0].cover_medium,
        artist: track.artists[0].name,
        album: track.album.title,
        uri: track.uri
      }));
    });
}


savePlaylist(name, trackUris){
if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Deezer.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.deezer.com/user/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.deezer.com/user/me/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.deezer.com/user/me/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }


}







}




export default Deezer;