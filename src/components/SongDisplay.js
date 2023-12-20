import {getNotesForChord, interpreteChord, NOTES, notesTitleAlt} from "../data/Chords";
import "./SongDisplay.css";
import classNames from "classnames";

const SongDisplay = ({song}) => {

    const chordPosX = {
        1: [300],
        2: [150,250],
        3: [100,200,300],
        4: [75,150,225,300],
    }

    const getX = (i,k=0,nrChords=1) => {
        return chordPosX[nrChords][k] + ((i % 4) * 300);
    };
    const getY = (i) => {
        return 80 + (Math.floor(i / 4)) * 100;
    }
    const getChordX = (x) => {
        return x - 20;
    };
    const getChordY = (y, nrNotes) => {
        return y - 20 - (20 * (nrNotes - 3));
    };
    const getNoteX = (x) => {
        return x;
    };
    const getNoteY = (y, i) => {
        return y + 55 - (i + 1) * 20;
    };
    const getNoteNotation = (note, prefer = []) => {
        const preferIndexes = prefer.map(p => NOTES[p]);
        const noteIndex = NOTES[note];
        if (preferIndexes.includes(noteIndex)) {
            for (const n of Object.entries(NOTES).filter(([,v]) => v === noteIndex).map(([k,]) => k)) {
                if (prefer.includes(n)) return n;
            }
        }
        return note;
    }

    const isThird = (chord, note) => {
        const notes = getNotesForChord(interpreteChord(chord));
        return notes && note === notes[1];
    };

    const isSeptant = (chord, note) => {
        const notes = getNotesForChord(interpreteChord(chord));
        return note === notes[3];
    };

    const getNotes = (chord) => {
        if (Array.isArray(chord)) {
            // if passing an array here, just take the first chord, if you want a specific one, you should iterate yourself
            chord = chord[0];
        }
        const chordObj = interpreteChord(chord);
        const notesNew = getNotesForChord(chordObj);
        if (!notesNew) return [];
        return notesNew.sort((a,b) => {
            return (NOTES[a] < NOTES[b] ? -1 : (NOTES[a] > NOTES[b] ? 1 : 0));
        });
    }

    const getExtraNotes = (chord) => {
        if (Array.isArray(chord)) {
            // if passing an array here, just take the first chord, if you want a specific one, you should iterate yourself
            chord = chord[0];
        }
        const chordObj = interpreteChord(chord);
        if (! chordObj) return [];
        const nine = chordObj?.extra?.nine;
        const thirtheen = chordObj?.extra?.thirtheen;
        if (!nine && !thirtheen) return [];
        return ['','',nine?nine:thirtheen]; // todo determine correct position
    }

    const printLines = (i) => {
        if (i % 4 === 0) {
            return <>
                <line x1="0" y1={getNoteY(getY(i) - 6, 0)} x2="1300" y2={getNoteY(getY(i) - 6, 0)} className="barLine"/>
                <line x1="0" y1={getNoteY(getY(i) - 6, 1)} x2="1300" y2={getNoteY(getY(i) - 6, 1)} className="barLine"/>
                <line x1="0" y1={getNoteY(getY(i) - 6, 2)} x2="1300" y2={getNoteY(getY(i) - 6, 2)} className="barLine"/>
                <line x1="0" y1={getNoteY(getY(i) - 6, 3)} x2="1300" y2={getNoteY(getY(i) - 6, 3)} className="barLine"/>
                <line x1={50} y1={getY(i) - 10 - 20} x2={50} y2={getY(i) + 30} className="measureLine"/>
            </>;
        }
        return <></>;
    }

    const printChordInMeasure = (measure, i, c, k) => {
        const x = getChordX(getX(i,k,measure.length));
        const y = getChordY(getY(i),getNotes(c).length);
        return <>
            <text className="chord" x={x} y={y}>{c}</text>
            {getNotes(c).map((note, j) => (
                <text key={`${i}_${k}_${j}`} className={classNames("note", { third: isThird(c, note), septant: isSeptant(c, note)})}
                      x={getNoteX(getX(i,k,measure.length), j)} y={getNoteY(getY(i),j)}>{getNoteNotation(note,song.prefer)}
                    <title>{notesTitleAlt[note]}</title>
                </text>
            ))}
            <line x1={getX(i) + 50} y1={getY(i) - 10 - 20*(getNotes(measure[0]).length-3)} x2={getX(i) + 50} y2={getY(i)+30} className="measureLine"/>
            {getExtraNotes(c).map((note, j) => (
                <text key={`${i}_${k}_extra${j}`} className={classNames("note", { extra: true } )}
                      x={getNoteX(getX(i,k,measure.length)+25, j)} y={getNoteY(getY(i)-10,j)}>{getNoteNotation(note,song.prefer)}
                    <title>{notesTitleAlt[note]}</title>
                </text>
            ))}
        </>;
    }

    const printMeasureNotes = (measure, i) => {
        if (Array.isArray(measure)) {
            return <>
                {measure.map((c, k) => printChordInMeasure(measure, i, c, k))}
            </>
        } else {
            return <>
                <text className="chord" x={getChordX(getX(i)-100)} y={getChordY(getY(i),getNotes(measure).length)}>{measure}</text>
                {getNotes(measure).map((note, j) => (
                    <text key={`${i}_${j}`} className={classNames("note", { third: isThird(measure, note), septant: isSeptant(measure, note)})}
                          x={getNoteX(getX(i) - 100, j)} y={getNoteY(getY(i), j)}>{getNoteNotation(note, song.prefer)}
                        <title>{notesTitleAlt[note]}</title>
                    </text>
                ))}
                <line x1={getX(i) + 50} y1={getY(i) - 10 - 20*(getNotes(measure).length-3)} x2={getX(i) + 50} y2={getY(i)+30} className="measureLine"/>
                {getExtraNotes(measure).map((note, j) => (
                    <text key={`${i}_extra${j}`} className={classNames("note", { extra: true } )} x={getNoteX(getX(i)-75, j)} y={getNoteY(getY(i)-10,j)}>{getNoteNotation(note,song.prefer)}
                        <title>{notesTitleAlt[note]}</title>
                    </text>
                ))}
            </>;
        }
    };

    const printMeasure = (measure, i) => {
        return <>
            {printLines(i)}
            {printMeasureNotes(measure, i)}
        </>;
    }

    return <svg xmlns="http://www.w3.org/2000/svg">
        {song?.chords.map(printMeasure)}
    </svg>;
}

export default SongDisplay;