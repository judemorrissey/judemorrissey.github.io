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
            board: null,
            logs: [],
            pos: [0, 0],
            visibility: 2
        });
    }

    componentDidMount() {
        this.regenerateBoard(15, 15);
    }

    regenerateBoard(xlen, ylen) {
        // board is a 3 dimensional array, where board[x][y][0] will give you the bottom-most entity on coordinate (x, y)
        // first generate a board filled with air
        const board = [];
        let i;
        for (i = 0; i < xlen; i++) {
            const column = [];
            let j;
            for (j = 0; j < ylen; j++) {
                column.push([this.friendlyNameToSymbolMap.air]);
            }
            board.push(column);
        }

        // hero always starts at origin
        board[0][0].push(this.friendlyNameToSymbolMap.hero);

        // exit is always at opposite corner of hero
        board[xlen - 1][ylen - 1].push(this.friendlyNameToSymbolMap.exit);
        // console.log('board is', board)
        return this.setState({
            logs: ['Game started.'],
            pos: [0, 0],
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
            const entities = (board[nx] || [])[ny] || [this.friendlyNameToSymbolMap.wall];
            const destination_cell_entity = entities[entities.length - 1];
            if (destination_cell_entity === this.friendlyNameToSymbolMap.wall) {
                return {
                    logs: prevState.logs.concat([`Tried to move ${displacement}, but there's a wall there.`])
                };
            }
            // move the hero from their current location to the new one
            board[nx][ny].push(board[px][py].pop());
            const newPos = [nx, ny];
            return {
                logs: prevState.logs.concat([`Hero moved ${displacement} from ${prevState.pos} onto ${newPos}`]),
                pos: newPos
            };
        });
    }

    renderViewPortColumn(column) {
        return e('div', {
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            }
        }, ...column.map(entities => {
            return e('div', {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: '1px',
                    borderColor: 'gray',
                    fontSize: '2em',
                    padding: '4px',
                    height: '30px',
                    width: '30px'
                }
            }, entities[entities.length - 1]);
        }));
    }

    renderViewPort(visibility = 2) {
        const {
            pos,
            board
        } = this.state;

        // grab the adjacent rows of where the hero is, then slice out adjacent columns
        const [x, y] = pos;
        const vp_columns = [];
        let i, j;
        for (i = x - visibility; i <= x + visibility; i++) {
            const column = board[i] || [];
            const vp_column = [];
            for (j = y - visibility; j <= y + visibility; j++) {
                const item = column[j] || this.friendlyNameToSymbolMap.wall;
                vp_column.push(item);
            }
            vp_columns.push(vp_column);
        }

        return e('div', {
            style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                padding: '16px',
                height: '150px',
                width: '150px'
            }
        },
        ...vp_columns.map(this.renderViewPortColumn)
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
            e('button', {onClick: this.moveHero.bind(this, [0, 1])}, 'v'),
            e('button', {onClick: this.moveHero.bind(this, [0, -1])}, '^'),
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
            board,
            visibility
        } = this.state;

        if (!board) {
            return e('div', {}, 'Loading…');
        }

        return e('div', {},
            this.renderViewPort(visibility),
            this.renderLegend(),
            this.renderControls(),
            this.renderLog()
        );
    }
}
