import {assert, expect} from 'chai';

import * as TransposerLib from '../lib/transposer';

describe('transposer lib', function () {

    describe('roots', function () {
        it('represents an octave', function () {
            const roots = TransposerLib.getRoots();
            expect(roots).to.be.an('array').that.has.lengthOf(12);
        });

        it('returns a fresh copy on every invocation', function () {
            const roots1 = TransposerLib.getRoots();
            const roots2 = TransposerLib.getRoots();
            expect(roots1).to.not.equal(roots2);
        });
    });

    describe('#getChordRoot', function () {
        it('normalizes chord roots to uppercase', function () {
            const chordRoot = TransposerLib.getChordRoot('cdimb5');
            expect(chordRoot).to.be.string('C');
        });

        it('recognizes "#" as a sharp accidental', function () {
            const chordRoot = TransposerLib.getChordRoot('G#m7');
            expect(chordRoot).to.be.string('G#');
        });

        it('recognizes a succeeding "b" as a flat accidental', function () {
            const chordRoot = TransposerLib.getChordRoot('Bbaug');
            expect(chordRoot).to.be.string('Bb');
        });

        it('returns "?" for invalid chord roots', function () {
            const chordRoot = TransposerLib.getChordRoot('lol');
            expect(chordRoot).to.be.string('?');
        });

        it('condenses an invalid chord root and its accidental into a single "?"', function () {
            const chordRoot1 = TransposerLib.getChordRoot('w#derp');
            expect(chordRoot1).to.be.string('?');

            const chordRoot2 = TransposerLib.getChordRoot('qb7');
            expect(chordRoot2).to.be.string('?');
        });
    });

    describe('#getChordFlavor', function () {
        it('returns anything to the right of a chord root without an accidental', function () {
            const flavor = TransposerLib.getChordFlavor('CasdfASDFasdf');
            expect(flavor).to.be.string('asdfASDFasdf');
        });

        it('returns anything to the right of an accidental', function () {
            const flavor1 = TransposerLib.getChordFlavor('BbderpHERPmerp');
            expect(flavor1).to.be.string('derpHERPmerp');

            const flavor2 = TransposerLib.getChordFlavor('F#lolololololLOLlol');
            expect(flavor2).to.be.string('lolololololLOLlol');

            const flavor3 = TransposerLib.getChordFlavor('Q#troll');
            expect(flavor3).to.be.string('troll');

            const flavor4 = TransposerLib.getChordFlavor('HBr');
            expect(flavor4).to.be.string('Br');
        });
    });

    describe('#transpose', function () {
        it('can accept a single chord as a string, and returns a string', function () {
            const transposed = TransposerLib.transpose('Cm', 4);
            expect(transposed).to.be.string('Em');
        });

        it('can accept multiple chords as an array of strings, and returns an array', function () {
            const transposed = TransposerLib.transpose(['Cdimb5', 'FMm7', 'G'], 4);
            expect(transposed).to.eql(['Edimb5', 'AMm7', 'B']);
        });

        it('does not transpose chords with invalid roots', function () {
            const transposed = TransposerLib.transpose(['z', 'x', 'y', 'lol']);
            expect(transposed).to.eql(['?', '?', '?', '?ol']);
        });
    });
});
