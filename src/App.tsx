import React, { Fragment } from "react";

import { IItem, IPlayer } from "./shared/types";
import { pad } from "./shared/helpers";
import { TimeLeft } from "./components/TimeLeft";
import { DEBUG } from "./shared/constants";
import { GridOverlay } from "./components/GridOverlay";

const data = {
    items: {
        "7": {
            "name": "7",
            "icon": "🏆",
            "points": 150
        },
        "bar": {
            "name": "bar",
            "icon": "💸",
            "points": 100
        },
        "cherry": {
            "name": "cherry",
            "icon": "🍒",
            "points": 70
        },
        "pear": {
            "name": "pear",
            "icon": "🍐",
            "points": 40
        },
        "plum": {
            "name": "plum",
            "icon": "🍇",
            "points": 30
        },
        "banana": {
            "name": "banana",
            "icon": "🍌",
            "points": 20
        },
        "bell": {
            "name": "bell",
            "icon": "🔔",
            "points": 10
        }
    } as { [key: string]: IItem }
};

const maxLamas = 10;


export interface IAppProps { }
export interface IAppState {
    activeItems: IItem[];
    players: IPlayer[];
    nextItems: IItem[];
    currentPlayerIndex: 0 | 1;
    currentItem: IItem;
}

export class App extends React.Component<IAppProps, IAppState> {
    state = {
        activeItems: [
            Object.assign({ x: 1, y: 0 }, data.items.cherry),
            Object.assign({ x: 1, y: 1 }, data.items.bell),
            Object.assign({ x: 1, y: 2 }, data.items.pear),
            Object.assign({ x: 2, y: 2 }, data.items.pear),
            Object.assign({ x: 4, y: 2 }, data.items.bar),
            Object.assign({ x: 0, y: 3 }, data.items.pear),
            Object.assign({ x: 1, y: 3 }, data.items.cherry),
            Object.assign({ x: 2, y: 3 }, data.items.bell),
            Object.assign({ x: 4, y: 3 }, data.items.bell),
            Object.assign({ x: 0, y: 4 }, data.items.banana),
            Object.assign({ x: 1, y: 4 }, data.items.bell),
            Object.assign({ x: 2, y: 4 }, data.items.pear),
            Object.assign({ x: 3, y: 4 }, data.items.banana),
            Object.assign({ x: 4, y: 4 }, data.items.bell),
        ],
        players: [
            {
                name: "Cassidi",
                points: 0,
                lamas: maxLamas / 2,
                color: "red"
            },
            {
                name: "Butch",
                points: 0,
                lamas: maxLamas / 2,
                color: "blue"
            }
        ] as IPlayer[],
        nextItems: [
            data.items.bar,
            data.items.plum
        ] as IItem[],

        currentPlayerIndex: 0 as 0 | 1,
        currentItem: Object.assign({ x: 5, y: 3 }, data.items.banana)
    };

    constructor(props: IAppProps) {
        super(props);
        this.onTimeUp = this.onTimeUp.bind(this);
        this.makeMove = this.makeMove.bind(this);
    }

    componentDidMount() {
        this.start();
    }

    getNextItem(x: number = 5, y: number = 3) {
        return Object.assign({ x: x, y: y, new: true }, this.state.nextItems[0]);
    }

    start() {
        this.setState({
            currentItem: this.getNextItem()
        });
    }

    onTimeUp() {
        this.setState({ currentPlayerIndex: this.state.currentPlayerIndex === 0 ? 1 : 0 });
        // this.makeMove();
    }

    makeMove() {
        let { currentItem, activeItems } = this.state;

        if (currentItem.x === -1) {
            // Slide from left
        }

        if (currentItem.x === 5) {
            // Slide from right
            activeItems.forEach((item: IItem) => {
                if (item.y === currentItem.y) {
                    // Is in this line

                    if (item.x === 4) {
                        item.x = item.x - 1;
                    }
                }
            });

            const nextItem = this.getNextItem(currentItem.x, currentItem.y);

            currentItem.x = 4;
            activeItems.push(currentItem);
            this.setState({
                currentItem: nextItem,
                activeItems: activeItems
            });
        }

        if (currentItem.y === -1) {
            // Slide from top
        }
    }

    render() {
        const { currentItem } = this.state;

        return (
            <div className={`App ${DEBUG === true ? "DEBUG" : ""}`}>


                <div className="Stats m-1 mb-3">
                    {this.state.players.map((player: IPlayer, index: number) =>
                        <div
                            key={index}
                            className={`Stats-player Stats-player-${player.color} ${(this.state.currentPlayerIndex === index) ? "active" : ""}`}
                        >
                            <div className="Stats-player-name">{player.name}</div>
                            <div className="Stats-player-points">{pad(player.points, 4)}</div>
                        </div>
                    )}
                </div>

                <div className="App-row">
                    <div className="App-side-col">
                        <table className="App-table mx-2">
                            <tbody>
                                {Object.values(data.items).map((item: IItem, index: number) =>
                                    <tr key={index}>
                                        {[...Array(3)].map((i: any, index2: number) =>
                                            <td key={index2}>{item.icon}</td>
                                        )}
                                        <td>{item.points}</td>
                                    </tr>
                                )}

                                <tr>
                                    <td colSpan={3}>4 of a kind</td>
                                    <td>&times;2</td>
                                </tr>

                                <tr>
                                    <td colSpan={3}>5 of a kind</td>
                                    <td>&times;3</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <main className="App-main-col">
                        <div
                            className="Grid mt-5 mb-3"
                            onClick={this.makeMove}
                        >
                            {this.state.activeItems.map((item: IItem, index: number) =>
                                <div key={index} className={`Item Grid-item Grid-item-${item.x}-${item.y} ${item.new === true ? "new" : ""}`}>
                                    {item.icon}
                                </div>
                            )}

                            <div
                                className={`Item Grid-currentItem Grid-item Grid-item-${currentItem.x}-${currentItem.y} Grid-x-${currentItem.x} Grid-y-${currentItem.y}`}
                            >
                                {currentItem.icon}
                            </div>

                            <GridOverlay
                                onHover={(x: number, y: number) => {
                                    let currentItem = this.state.currentItem;
                                    currentItem.x = x;
                                    currentItem.y = y;
                                    this.setState({ currentItem });
                                }}
                            />
                        </div>

                        <div className="TimeLeft mb-3">
                            <div className="TimeLeft-arrow TimeLeft-arrow-red">
                                {this.state.currentPlayerIndex === 0 &&
                                    <span>⬅</span>
                                }
                            </div>

                            {this.state.currentPlayerIndex === 0 ?
                                <Fragment>
                                    <TimeLeft onTimeUp={this.onTimeUp} />
                                </Fragment>
                                :
                                <TimeLeft onTimeUp={this.onTimeUp} />
                            }

                            <div className="TimeLeft-arrow TimeLeft-arrow-blue">
                                {this.state.currentPlayerIndex === 1 &&
                                    <span className="mirror">⬅</span>
                                }
                            </div>
                        </div>
                    </main>

                    <div className="App-side-col">
                        {this.state.nextItems.map((item: IItem, index: number) =>
                            <div key={index} className={`Item`}>
                                {item.icon}
                            </div>
                        )}
                    </div>
                </div>


                <div className="Lamas">
                    {this.state.players.map((player: IPlayer, index: number) =>
                        <div key={index} className={`Lamas-player Lamas-player-${player.color}`}>
                            {[...Array(player.lamas)].map((i: any, index: number) =>
                                <span key={index}
                                    className={`Lamas-llama ${player.color === "red" ? "mirror" : ""}`}
                                    role="img" aria-label="Llama">🦙</span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}