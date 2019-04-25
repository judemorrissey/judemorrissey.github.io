// an array of arrays of valid chord roots for every halfstep, where the first string is the preferred representation
// [['A'], ['Bb', 'A#'], ...]
const roots = 'A,Bb/A#,B/Cb,C/B#,C#/Db,D,Eb/D#,E,F,F#/Gb,G,Ab/G#'.split(',').map(x => x.split('/'));
const getRoots = function () {
    return roots.slice();
};

const splitChord = function (chord) {
    const matches = chord.match(/^(\w[#b]?)([\w\d]*)$/);
    if (!matches) {return ['?'];}
    const [, rootNote, flavor] = matches;
    let normalizedRoot = rootNote[0].toUpperCase() + rootNote.slice(1);
    if (!getRoots().some(x => x.some(c => c === normalizedRoot))) {
        normalizedRoot = '?';
    }
    return [normalizedRoot, flavor];
};

const getChordRoot = function (chord) {
    return splitChord(chord)[0];
};

const getChordFlavor = function (chord) {
    return splitChord(chord)[1];
};

const transpose = function (chords, halfSteps) {
    if (!(chords instanceof Array)) {
        const [chordRoot, flavor] = splitChord(chords);
        if (chordRoot === '?') {
            return chordRoot + flavor;
        }
        const index = getRoots().findIndex(x => x.indexOf(chordRoot) !== -1);
        return getRoots().splice((index + halfSteps) % roots.length, 1).shift().slice().shift() + flavor;
    }
    return chords.map(chord => transpose(chord, halfSteps));
};

export {
    getRoots, splitChord, getChordRoot, getChordFlavor, transpose
};
