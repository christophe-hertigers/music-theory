import {useState} from 'react';
//import "./PianoDisplay.css"; // need to make it more specific
import classNames from "classnames";

const PianoOctave = ({octave, selectedNotes}) => {
    const offset = (octave - 1) * 840;

    return <>
        <rect data-note={"C"+octave} className={classNames("white-key", { selected:selectedNotes.includes("C"+octave) })} width="120" height="360" x={offset} y="100"/>
        <rect data-note={"D"+octave} className={classNames("white-key", { selected:selectedNotes.includes("D"+octave) })} width="120" height="360" x={offset+120} y="100"/>
        <rect data-note={"E"+octave} className={classNames("white-key", { selected:selectedNotes.includes("E"+octave) })} width="120" height="360" x={offset+240} y="100"/>
        <rect data-note={"F"+octave} className={classNames("white-key", { selected:selectedNotes.includes("F"+octave) })} width="120" height="360" x={offset+360} y="100"/>
        <rect data-note={"G"+octave} className={classNames("white-key", { selected:selectedNotes.includes("G"+octave) })} width="120" height="360" x={offset+480} y="100"/>
        <rect data-note={"A"+octave} className={classNames("white-key", { selected:selectedNotes.includes("A"+octave) })} width="120" height="360" x={offset+600} y="100"/>
        <rect data-note={"B"+octave} className={classNames("white-key", { selected:selectedNotes.includes("B"+octave) })} width="120" height="360" x={offset+720} y="100"/>

        <rect data-note={"C#"+octave} className={classNames("black-key", { selected:selectedNotes.includes("C#"+octave) })} width="70" height="220" x={offset+75} y="100"/>
        <rect data-note={"D#"+octave} className={classNames("black-key", { selected:selectedNotes.includes("D#"+octave) })} width="70" height="220" x={offset+215} y="100"/>
        <rect data-note={"F#"+octave} className={classNames("black-key", { selected:selectedNotes.includes("F#"+octave) })} width="70" height="220" x={offset+425} y="100"/>
        <rect data-note={"G#"+octave} className={classNames("black-key", { selected:selectedNotes.includes("G#"+octave) })} width="70" height="220" x={offset+565} y="100"/>
        <rect data-note={"A#"+octave} className={classNames("black-key", { selected:selectedNotes.includes("A#"+octave) })} width="70" height="220" x={offset+705} y="100"/>

        <text data-note={"C"+octave} className={classNames({ selected:selectedNotes.includes("C"+octave)})} x={offset+40} y={440}>C</text>
        <text data-note={"D"+octave} className={classNames({ selected:selectedNotes.includes("D"+octave)})} x={offset+160} y={440}>D</text>
        <text data-note={"E"+octave} className={classNames({ selected:selectedNotes.includes("E"+octave)})} x={offset+280} y={440}>E</text>
        <text data-note={"F"+octave} className={classNames({ selected:selectedNotes.includes("F"+octave)})} x={offset+400} y={440}>F</text>
        <text data-note={"G"+octave} className={classNames({ selected:selectedNotes.includes("G"+octave)})} x={offset+520} y={440}>G</text>
        <text data-note={"A"+octave} className={classNames({ selected:selectedNotes.includes("A"+octave)})} x={offset+640} y={440}>A</text>
        <text data-note={"B"+octave} className={classNames({ selected:selectedNotes.includes("B"+octave)})} x={offset+760} y={440}>B</text>

        <text data-note={"C#"+octave} className={classNames("black-key-text", { selected:selectedNotes.includes("C#"+octave)})} x={offset+80} y={300}>C#</text>
        <text data-note={"D#"+octave} className={classNames("black-key-text", { selected:selectedNotes.includes("D#"+octave)})} x={offset+220} y={300}>D#</text>
        <text data-note={"F#"+octave} className={classNames("black-key-text", { selected:selectedNotes.includes("F#"+octave)})} x={offset+430} y={300}>F#</text>
        <text data-note={"G#"+octave} className={classNames("black-key-text", { selected:selectedNotes.includes("G#"+octave)})} x={offset+570} y={300}>G#</text>
        <text data-note={"A#"+octave} className={classNames("black-key-text", { selected:selectedNotes.includes("A#"+octave)})} x={offset+710} y={300}>A#</text>

    </>;
}

const PianoDisplay = () => {

    const [selectedNotes, setSelectedNotes] = useState([]);

    const handleClick = (event) => {
        const note = event.target.attributes["data-note"]?.value;
        if (note) {
            if (selectedNotes.includes(note)) {
                setSelectedNotes(selectedNotes.filter(v => v !== note));
            } else {
                setSelectedNotes([...selectedNotes, note]);
            }
        }
    }

    return <svg xmlns="http://www.w3.org/2000/svg" onClick={handleClick}>
        <PianoOctave octave={1} selectedNotes={selectedNotes}/>
        <PianoOctave octave={2} selectedNotes={selectedNotes}/>
    </svg>;
}

export default PianoDisplay;

