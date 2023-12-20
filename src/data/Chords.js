// C  C#  D  D#  E  F  F#  G   G#   A  A#  B
// do do# re re# mi fa fa# sol sol# la la# si
export const NOTES = {
    'C':0, 'C#':1, 'Db':1, 'D':2, 'D#':3, 'Eb':3, 'E':4, 'F':5, 'F#':6, 'Gb':6, 'G':7, 'G#':8, 'Ab':8, 'A':9, 'A#':10, 'Bb':10, 'B':11
}
export const notesTitleAlt = {
    'C':'do', 'C#':'do #', 'Db':'re b', 'D':'re', 'D#':'re #', 'Eb':'mi b', 'E':'mi', 'F':'fa', 'F#':'fa #', 'Gb':'sol b', 'G':'sol', 'G#':'sol #', 'Ab':'la b', 'A':'la', 'A#':'la #', 'Bb':'si b', 'B':'si'
}

export const extraNotes = {
    "A7":     { "nine": 'Bb' },
    "B7":     { "nine": 'C' },
    "E7":     { "nine": 'F' },
    "F#7":    { "nine": 'G' },
    "D-7":    { "thirtheen": 'B' },
}

const getRoot = (chord) => {
    if (Array.isArray(chord)) {
        // if passing an array here, just take the first chord, if you want a specific one, you should iterate yourself
        console.log(`getRoot :: passed array of chords ${chord} while expecting a single chord!`);
        chord = chord[0];
    }
    let root = chord.substring(0,2);
    if (root in NOTES) {
        return root;
    }
    root = chord.substring(0,1);
    if (root in NOTES) {
        return root;
    }
    console.log(`finding root for ${chord} -> NOT FOUND`);
    return undefined;
}

const getInterval = (root, interval) => {
    const result = [];
    const rootIndex = NOTES[root];
    for (const int of interval) {
        const i = (rootIndex + int) % 12;
        const e = Object.entries(NOTES).find(([,value]) => value === i);
        if (e) result.push(e[0]);
    }
    return result;
}

const types = {
    'DOMINANT': {
        name: 'DOMINANT',
        suffix: '7',
        getNotes: root => {
            return getInterval(root, [0, 4, 7, 10]);
        },
    },
    'MAJOR': {
        name: 'MAJOR',
        suffix: 'Maj7',
        getNotes: root => {
            return getInterval(root, [0, 4, 7, 11]);
        },
    },
    'MINOR': {
        name: 'MINOR',
        suffix: '-7',
        getNotes: root => {
            return getInterval(root, [0, 3, 7, 10]);
        },
    },
    'DIMINISHED': {
        name: 'DIMINISHED',
        suffix: 'o',
        getNotes: root => {
            return getInterval(root, [0, 3, 6, 9]);
        },
    },
    'HALF-DIMINISHED': {
        name: 'HALF-DIMINISHED',
        suffix: 'ø7',
        getNotes: root => {
            return getInterval(root, [0, 3, 6, 10]);
        },
    },
    'MAJOR-SIXTH': {
        name: 'MAJOR-SIXTH',
        suffix: '6',
        getNotes: root => {
            return getInterval(root, [0, 4, 7, 9]);
        },
    },
    'MINOR-SIXTH': {
        name: 'MINOR-SIXTH',
        suffix: '-6',
        getNotes: root => {
            return getInterval(root, [0, 3, 7, 9]);
        },
    },
}

const getType = (chord, root) => {
    if (Array.isArray(chord)) {
        // if passing an array here, just take the first chord, if you want a specific one, you should iterate yourself
        console.log(`getType :: passed array of chords ${chord} while expecting a single chord!`);
        chord = chord[0];
    }
    let remaining = chord.replace(root,'');
    for (const [_,value] of Object.entries(types)) {
        if (remaining.startsWith(value.suffix)) {
            return value;
        }
    }
    console.log(`finding type for ${chord} -> NOT FOUND`);
    return undefined;
}

const getSuffix = (chord, root, type) => {
    if (Array.isArray(chord)) {
        // if passing an array here, just take the first chord, if you want a specific one, you should iterate yourself
        console.log(`getSuffix :: passed array of chords ${chord} while expecting a single chord!`);
        chord = chord[0];
    }
    let remaining = chord.replace(root,'');
    for (const [key,] of Object.entries(types)) {
        if (type === key) {
            remaining = remaining.replace(key, '');
        }
    }
    return remaining !== '' ? remaining : undefined;
}

const getExtraNotes = (chord) => {
    if (Array.isArray(chord)) {
        // if passing an array here, just take the first chord, if you want a specific one, you should iterate yourself
        console.log(`getExtraNotes :: passed array of chords ${chord} while expecting a single chord!`);
        chord = chord[0];
    }
    if (extraNotes[chord]) {
        return extraNotes[chord];
    }
    return {};
}

export const interpreteChord = (chord) => {
    const root = getRoot(chord);
    const type = getType(chord,root);
    const suffix = getSuffix(chord,root,type);
    const extra = getExtraNotes(chord);
    return { root, type, suffix, extra };
}

export const getNotesForChord = (chordObj) => {
    if (chordObj && chordObj.type) {
        return chordObj.type.getNotes(chordObj.root);
    }
}
