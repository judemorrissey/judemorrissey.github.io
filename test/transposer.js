import {assert, expect} from 'chai';

import TransposerLib from '../lib/transposer';

describe('transposer lib', function () {

    describe('roots', function () {
        const {roots} = TransposerLib;
        it('represents an octave', function () {
            expect(roots).to.be.an('array').that.has.lengthOf(12);
        });
    });


    describe('#getChordRoot', function() {
        it('normalizes chord roots to uppercase');
    });
});
