import {useState, useRef} from "react";
import "./App.css";
import SongSelector from "./components/SongSelector";
import SongDisplay from "./components/SongDisplay";
import PianoDisplay from "./components/PianoDisplay";
import {SONGS} from "./data/Songs";
import {useEventListener} from "./effects/useEventListener";

function App() {

    const [app, setApp] = useState('songDisplay');
    const [selectedSong, setSelectedSong] = useState();
    const ref = useRef();

    const handleChange = (value) => {
        if (value) {
            setSelectedSong(SONGS.find(song => song.title === value));
        } else {
            setSelectedSong(undefined);
        }
    }

    const handleKeyPress = (event) => {
        ref.current.handleKeyPressed(event.key);
    }

    useEventListener('keydown', handleKeyPress);

    const displayApp = () => {
        if (app === 'songDisplay') {
            return <SongDisplay song={selectedSong}/>;
        } else {
            return <PianoDisplay/>;
        }
    }

    const toggleApp = () => {
        if (app === 'songDisplay') setApp('pianoDisplay');
        else setApp('songDisplay');
    }

    return (
        <div className="App">
            <header className="App-header">
                <SongSelector songs={SONGS} onChange={handleChange} ref={ref}/>
                <button className="App-btn" onClick={toggleApp}>app</button>
            </header>
            {displayApp()}
        </div>
    );
}

export default App;
