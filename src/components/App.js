import React from 'react';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import GoogleLogin from 'react-google-login';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
    }
    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })

        this.setState({
            videos: response.data.items
        })
        console.log("this is the response",response);
    };
    handleVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    };

    responseGoogleF=(response)=>{
        console.log(response);
        console.log(response.profileObj); 
    };

    responseGoogleS=(response)=>{
        console.log(response);
        console.log(response.profileObj);
        var content = document.getElementById("content");
        var btn = document.getElementById("sign-in-btn");
        console.log(content);
        console.log(btn);
        if (content.style.display !== "none") {
            content.style.display = "none";
            btn.style.display = "blocked";
        }
        else {          
            content.style.display = "block";
            btn.style.display = "none";
        }
    }
    
    render() {
        return (
            <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
            />
            <h1 style={{textAlign: 'center'}}>
                YouTube: Authenticate & Search
            </h1>
            <p style={{textAlign:'center', fontSize:'20px'}}>A React app, with Google authentication, that let's you search for YouTube videos/channels.</p>
            <div id="sign-in-btn" className='ui-container' style={{display: 'blocked', textAlign: 'center'}} >
                <GoogleLogin
                clientId= "" //paste your client id here
                buttonText="Sign in with Google here..."
                onSuccess={this.responseGoogleS}
                onFailure={this.responseGoogleF}
                className='login-btn'
                />
            </div>
            <div className='ui container' id="content" style={{marginTop: '1px', display:'none'}}>
                <SearchBar handleFormSubmit={this.handleSubmit}/>
                <div className='ui-grid'>
                    <div className="row">
                        <div className="col 6">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="col 6">
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default App;