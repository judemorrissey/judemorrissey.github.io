import * as TransposerLib from '../../lib/transposer.js';
import StepButtons from '../Generics/StepButtons.js';

const e = React.createElement; // (component_name, props, children)
export default class Transposer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chords: [],
            halfStepsDown: 4,
            halfStepsUp: 3
        };
    }

    limit(value) {
        return value < 0 ? 0 : value > 12 ? 12 : value;
    }

    transpose(chords, halfSteps) {
        return TransposerLib.transpose(chords, halfSteps);
    }

    onInputChange = event => {
        const str = event.target.value || '';
        return this.setState({
            chordsStr: str
        });
    }

    onStepDownClick = value => {
        return this.setState(prevState => {
            const newValue = this.limit(prevState.halfStepsDown + value);
            return {
                halfStepsDown: newValue
            };
        });
    }

    onStepUpClick = value => {
        return this.setState(prevState => {
            const newValue = this.limit(prevState.halfStepsUp + value);
            return {
                halfStepsUp: newValue
            };
        });
    }

    renderSteps(chordsStr = '', halfSteps) {
        const trimmed = chordsStr.trim();
        const chords = trimmed ? trimmed.split(' ') : [];
        const transposed = this.transpose(chords, halfSteps);
        return e('span', {}, transposed.join(' '));
    }

    render() {
        const {
            chordsStr,
            halfStepsDown,
            halfStepsUp
        } = this.state;
        return e('div', {className: 'container'},
            e('input', {
                className: 'chordsInput',
                onChange: this.onInputChange,
                type: 'text'
            }),
            e('div', {className: 'transposeDownContainer'},
                e(StepButtons, {
                    className: 'transposeDownButtonsContainer',
                    onMinusClick: () => this.onStepDownClick(-1),
                    onPlusClick: () => this.onStepDownClick(1),
                    value: `${halfStepsDown} half steps down`
                }),
                this.renderSteps(chordsStr, -halfStepsDown)
            ),
            e('div', {className: 'transposeUpContainer'},
                e(StepButtons, {
                    className: 'transposeUpButtonsContainer',
                    onMinusClick: () => this.onStepUpClick(-1),
                    onPlusClick: () => this.onStepUpClick(1),
                    value: `${halfStepsUp} half steps up`
                }),
                this.renderSteps(chordsStr, halfStepsUp)
            )
        );
    }
}
