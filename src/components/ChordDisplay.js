import {useState, useRef} from "react";
import {getNotesForChord, interpreteChord, NOTES, notesTitleAlt} from "../data/Chords";
import "./ChordDisplay.css";
import classNames from "classnames";

const ChordDisplay = () => {

    const [chord, setChord] = useState();

    const displayChord = () => {
        if (!chord) return {
            chord: "",
            chordObj: {},
            notes: []
        };

        const chordObj = interpreteChord(chord);
        const notes = getNotesForChord(chordObj);

        return {
            chord,
            chordObj: chordObj ?? {},
            notes: notes ?? [],
        };
    }

    return <div>
        <input onChange={(event) => setChord(event.target.value)}/>
        <h1 className="title">{displayChord().chord}</h1>
        <p className="title">{JSON.stringify(displayChord().chordObj)}</p>
        <p className="title">{displayChord().notes.map(n => (<span className="note">{n}</span>))}</p>
    </div>;
}

export default ChordDisplay;