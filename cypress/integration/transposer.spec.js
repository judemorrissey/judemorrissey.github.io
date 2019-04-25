describe('transposer app', function () {
    before(function () {
        cy.visit('http://localhost:8080');
        cy.get('a.switcher:contains("Transposer")').click();
        cy.get('input[type="text"].chordsInput').as('input');
    });

    describe('input form', function () {
        it('allows typing of whatever value', function () {
            cy.get('@input')
                .type('dafjskdfjalksdfjaslkdfjasdkf adjsf akdjf aldksfj aldksfja dfasdlkfja ldfskjasdf')
                .clear()
                .type('A Bb B C C# D Eb E F F# G Ab')
                .clear()
                .type('abcdefghijklmnopqrstuvwxyz')
                .clear()
                .type('œ∑´®†¥¨ˆøπ“åß∂ƒ©˙∆˚¬…Ω≈ç√∫˜µ≤≥¡™£¢∞§¶•ªº–Œ„´‰ˇÁ¨ˆØ∏⁄€‹›ﬁﬂ‡°·‚ÅÍÎÏ˝ÓÔÒÚ¸˛Ç◊ı˜Â¯')
                .clear();
        });
    });

    const testStepButtons = function () {
        const getNum = function (text) {
            const matches = text.match(/^(\d+?)\s/);
            expect(matches).to.not.be.empty;
            const [, num] = matches;
            return parseInt(num);
        };
        cy.get('@value').invoke('text').then(text => {
            const orig_num = getNum(text);
            cy.get('@stepDown').click();
            cy.get('@value').invoke('text').then(text => {
                const new_num = getNum(text);
                expect(new_num).to.be.eql(orig_num - 1);
                cy.get('@stepUp').click();
                cy.get('@value').invoke('text').then(text => {
                    const new_num = getNum(text);
                    expect(new_num).to.be.eql(orig_num);
                });
            });
        });
    };

    describe('step up buttons', function () {
        before(function () {
            cy.get('div.transposeUpContainer').as('transposeUp');
            cy.get('@transposeUp').within(() => {
                cy.get('button.decrement').as('stepDown');
                cy.get('button.increment').as('stepUp');
                cy.get('span.value').as('value');
            });
        });

        it('increments or decrements the displayed number accordingly', testStepButtons);
    });

    describe('step down buttons', function () {
        before(function () {
            cy.get('div.transposeDownContainer').as('transposeDown');
            cy.get('@transposeDown').within(() => {
                cy.get('button.decrement').as('stepDown');
                cy.get('button.increment').as('stepUp');
                cy.get('span.value').as('value');
            });
        });

        it('increments or decrements the displayed number accordingly', testStepButtons);
    });

});
