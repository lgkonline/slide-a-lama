import React, { Fragment } from "react";

import { IItem, IPlayer, IItemCoordinated, IRow, ColumnArray, IColumn } from "./shared/types";
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
    rows: IRow[];
    players: IPlayer[];
    nextItems: IItem[];
    currentPlayerIndex: 0 | 1;
    currentItem: IItem | null;
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
        rows: [
            { columns: [null, data.items.cherry, null, null, null] as ColumnArray },
            { columns: [null, data.items.bell, null, null, null] as ColumnArray },
            { columns: [null, data.items.pear, data.items.pear, null, data.items.bar] as ColumnArray },
            { columns: [data.items.pear, data.items.cherry, data.items.bell, null, data.items.bell] as ColumnArray },
            { columns: [data.items.banana, data.items.bell, data.items.pear, data.items.banana, data.items.bell] as ColumnArray },
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

    getItemByCoordinates(x: number, y: number, items: IItem[] = this.state.activeItems): IItem | null {
        let i = 0;
        for (i; i < items.length; i++) {
            const item = items[i];
            if (item.x === x && item.y === y) {
                return item;
            }
        }
        return null;
    }

    makeMove_before() {
        let { currentItem, activeItems } = this.state;

        if (currentItem.x === -1) {
            // Slide from left
        }

        if (currentItem.x === 5) {
            // Slide from right

            let keepSlideing = true;

            const thisLine = activeItems.filter((item: IItemCoordinated) => item.y === currentItem.y)
                .sort((a: IItemCoordinated, b: IItemCoordinated) => a.x > b.x ? -1 : 1);
            console.log(thisLine);

            // thisLine.forEach((item: IItemCoordinated, i: number) => {
            //     if (keepSlideing) {
            //         const next = thisLine[i + 1];
            //         keepSlideing = (next && next.x === item.x - 1);

            //         item.x = item.x - 1;
            //     }
            //     activeItems.push(item);
            // });

            activeItems.forEach((item: IItemCoordinated) => {
                if (thisLine.includes(item)) {
                    if (keepSlideing) {
                        item.x = item.x - 1;
                    }
                }
            });

            // activeItems.forEach((item: IItem) => {
            //     if (item.y === currentItem.y) {
            //         // Is in this line

            //         if (keepSlideing && item.x !== undefined) {
            //             const neighbourItem = this.getItemByCoordinates(item.x - 1, item.y, activeItems);
            //             if (!neighbourItem) {
            //                 keepSlideing = false;
            //             }

            //             item.x = item.x - 1;
            //         }

            //     }
            // });

            const nextItem = this.getNextItem(currentItem.x, currentItem.y);

            // currentItem.x = 4;
            // activeItems.push(currentItem);
            this.setState({
                currentItem: nextItem,
                activeItems
            });
        }

        if (currentItem.y === -1) {
            // Slide from top
        }
    }

    // makeMove_after() {
    //     let { rows, currentItem } = this.state;

    //     console.log("make move");

    //     const direction: "left" | "right" | "top" = (currentItem.x === -1) ? "left" : (currentItem.x === 5) ? "right" : "top";

    //     if (direction === "left" || direction === "right") {
    //         let thisColumns = rows[currentItem.y].columns;

    //         if (direction === "right") {
    //             thisColumns.reverse();
    //         }

    //         let keepSliding = true;

    //         thisColumns.forEach((item: IItem | null, index: number) => {
    //             const negIndex = thisColumns.length - index - 1;
    //             const x = direction === "right" ? negIndex : index;
    //             console.log(item, x);

    //             if (keepSliding) {
    //                 keepSliding = (rows[currentItem.y].columns[x - 1] !== null);
    //                 rows[currentItem.y].columns[x] = null;
    //                 rows[currentItem.y].columns[x - 1] = item;
    //             }
    //         });
    //     }

    //     this.setState({ rows });
    // }

    makeMove() {
        let { currentItem, activeItems } = this.state;

        const direction: "left" | "right" | "top" = (currentItem.x === -1) ? "left" : (currentItem.x === 5) ? "right" : "top";

        // turn activeItems to IRow[]
        let rows: IRow[] = new Array<IRow>(5);

        activeItems.forEach((item: IItemCoordinated, index: number) => {
            if (!rows[item.y]) rows[item.y] = { columns: [null, null, null, null] as unknown as ColumnArray };
            rows[item.y].columns[item.x] = Object.assign({ itemIndex: index }, item);
        });

        console.log(rows);

        let keepSliding = true;

        const line = direction === "right" ? rows[currentItem.y].columns.reverse() : rows[currentItem.y].columns;

        line.forEach((column: IColumn | null, index: number) => {
            if (keepSliding && column) {
                keepSliding = (rows[currentItem.y].columns[index + 1] !== null);

                if (direction === "left") {
                    activeItems[column.itemIndex].x++;
                }
                else if (direction === "right") {
                    activeItems[column.itemIndex].x--;
                }
            }

            if (!column) keepSliding = false;
        });

        if (direction === "left") {
            currentItem.x = 0;
        }
        if (direction === "right") {
            currentItem.x = 4;
        }
        activeItems.push(currentItem);

        const nextItem = this.getNextItem(currentItem.x, currentItem.y);

        this.setState({
            currentItem: null,
            activeItems
        }, () => setTimeout(() => {
            this.setState({
                currentItem: nextItem
            });
        }, 500));
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

                            {/* {this.state.rows.map((row: IRow, y: number) =>
                                row.columns.map((item: IItem | null, x: number) =>
                                    item &&
                                    <div key={`${x}-${y}`} className={`Item Grid-item Grid-item-${x}-${y} ${item.new === true ? "new" : ""}`}>
                                        {item.icon}
                                    </div>
                                )
                            )} */}

                            {currentItem &&
                                <div
                                    className={`Item Grid-currentItem Grid-item Grid-item-${currentItem.x}-${currentItem.y} Grid-x-${currentItem.x} Grid-y-${currentItem.y}`}
                                >
                                    {currentItem.icon}
                                </div>
                            }

                            <GridOverlay
                                onHover={(x: number, y: number) => {
                                    let currentItem = this.state.currentItem;
                                    if (currentItem) {
                                        currentItem.x = x;
                                        currentItem.y = y;
                                        this.setState({ currentItem });
                                    }
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