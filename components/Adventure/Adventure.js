const e = React.createElement; // (component_name, props, children)
export default class Transposer extends React.Component {
    constructor(props) {
        super(props);
        this.friendlyNameToSymbolMap = {
            air: ' ',
            hero: '@',
            exit: 'O',
            wall: '#'
        };
        this.symbolToLegendTextMap = {
            '@': 'is your hero',
            O: 'marks the exit',
            '#': 'is unpassable'
        };
        this.state = Object.assign({}, {
            logs: [],
            pos: [1, 1],
            board: null
        });
    }

    componentDidMount() {
        this.regenerateBoard(15, 15);
    }

    regenerateBoard(l, w) {
        // first, build a 2 dim array of size l x w, with the edges marked as walls
        const dims = [l, w];
        const board = [];
        let i;
        for (i = 0; i < l; i++) {
            const row = [];
            let j;
            for (j = 0; j < w; j++) {
                if (i === 0 || i === dims[0] - 1 || j === 0 || j === dims[1] - 1) {
                    row.push(this.friendlyNameToSymbolMap.wall);
                    continue;
                }
                row.push(this.friendlyNameToSymbolMap.air);
            }
            board.push(row);
        }

        // hero always starts at origin + (1, 1)
        board[1][1] = this.friendlyNameToSymbolMap.hero;

        // exit is always at opposite corner of hero
        board[l - 2][w - 2] = this.friendlyNameToSymbolMap.exit;
        // console.log('board is', board)
        return this.setState({
            logs: ['Game started.'],
            pos: [1, 1],
            board
        });
    }

    moveHero(displacement) {
        const [dx, dy] = displacement;
        return this.setState(prevState => {
            const [px, py] = prevState.pos;
            const nx = px + dx;
            const ny = py + dy;
            const board = prevState.board;
            if (board[nx][ny] === this.friendlyNameToSymbolMap.wall) {
                return {
                    logs: prevState.logs.concat([`Tried to move ${displacement}, but there's a wall there.`])
                };
            }
            const newPos = [nx, ny];
            board[py][px] = this.friendlyNameToSymbolMap.air;
            board[ny][nx] = this.friendlyNameToSymbolMap.hero;
            return {
                logs: prevState.logs.concat([`Hero moved ${displacement} from ${prevState.pos} onto ${newPos}`]),
                pos: newPos
            };
        });
    }

    renderViewPortRow(row) {
        return e('div', {
            style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }
        }, ...row.map(symbol => {
            return e('div', {
                style: {
                    borderWidth: '1px',
                    borderColor: 'lightGray',
                    fontSize: 32,
                    padding: '4px',
                    height: '30px',
                    width: '30px'
                }
            }, symbol);
        }));
    }

    renderViewPort() {
        const {
            pos,
            board
        } = this.state;

        // grab the adjacent rows of where the hero is, then slice out adjacent columns
        const [x, y] = pos;
        const top = board[y + 1].slice(x - 1, x + 2);
        const middle = board[y].slice(x - 1, x + 2);
        const bottom = board[y - 1].slice(x - 1, x + 2);

        return e('div', {
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                padding: '16px',
                height: '150px',
                width: '150px'
            }
        },
        this.renderViewPortRow(top),
        this.renderViewPortRow(middle),
        this.renderViewPortRow(bottom)
        );
    }

    renderLegend() {
        return e('div', {className: 'legendContainer'},
            ...Object.keys(this.symbolToLegendTextMap).map(symbol => e('div', {}, `${symbol} ${this.symbolToLegendTextMap[symbol]}`))
        );
    }

    renderControls() {
        return e('div', {className: 'controlsContainer'},
            e('button', {onClick: this.moveHero.bind(this, [-1, 0])}, '<'),
            e('button', {onClick: this.moveHero.bind(this, [0, -1])}, 'v'),
            e('button', {onClick: this.moveHero.bind(this, [0, 1])}, '^'),
            e('button', {onClick: this.moveHero.bind(this, [1, 0])}, '>')
        );
    }

    renderLog() {
        const logs = this.state.logs;
        return e('div', {className: 'logContainer'},
            ...logs.slice(-5).reverse().map((log, i) => {
                return e('div', {
                    style: {
                        backgroundColor: i % 2 !== 0 ? 'lightGray' : 'white'
                    }
                }, log);
            })
        );
    }

    render() {
        const {
            board
        } = this.state;

        if (!board) {
            return e('div', {}, 'Loading…');
        }

        return e('div', {},
            this.renderViewPort(),
            this.renderLegend(),
            this.renderControls(),
            this.renderLog()
        );
    }
}
