const e = React.createElement; // (component_name, props, children)

export default class StepButtons extends React.Component {
    render() {
        const {
            className = 'container',
            onMinusClick = () => {},
            onPlusClick = () => {},
            value
        } = this.props;
        return e('div', {className},
            e('button', {
                className: 'decrement',
                onClick: onMinusClick
            }, '-'),
            e('button', {
                className: 'increment',
                onClick: onPlusClick
            }, '+'),
            e('span', {className: 'value'}, value)
        );
    }
}
