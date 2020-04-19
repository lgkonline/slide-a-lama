import React, { Fragment, MouseEvent } from "react";
import { DEBUG } from "../shared/constants";

export interface IGridOverlayProps {
    onHover: (x: number, y: number) => void;
}

export const GridOverlay: React.FC<IGridOverlayProps> = ({ onHover }) => {
    const onMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
        const target = event.currentTarget;

        const coordinates = {
            x: target.dataset.x ? parseInt(target.dataset.x) : 0,
            y: target.dataset.y ? parseInt(target.dataset.y) : 0
        }

        onHover(coordinates.x, coordinates.y);
    };

    return (
        <Fragment>
            {[...Array(5)].map((i: any, x: number) =>
                <Fragment key={x}>
                    {[...Array(5)].map((j: any, y: number) =>
                        <div
                            key={`${x}-${y}`}
                            className={`Grid-item Grid-coordinate Grid-item-${x}-${y} Grid-x-${x} Grid-y-${y}`}
                            data-y-friendly={y + 1}
                            style={DEBUG ? { boxShadow: "inset 0 0 2px" } : {}}
                        >
                            {DEBUG && <span className="text-muted position-absolute">x{x} y{y}</span>}
                        </div>
                    )}

                    <div
                        className={`Grid-item Grid-hoverArea Grid-item-${x}--1 Grid-x-${x} Grid-y--1`}
                        data-x={x}
                        data-y={-1}
                        onMouseEnter={onMouseEnter}
                    />

                    <div
                        className={`Grid-item Grid-hoverArea Grid-item--1-${x} Grid-x--1 Grid-y-${x}`}
                        data-x={-1}
                        data-y={x}
                        onMouseEnter={onMouseEnter}
                    />
                    <div
                        className={`Grid-item Grid-hoverArea Grid-item-5-${x} Grid-x-5 Grid-y-${x}`}
                        data-x={5}
                        data-y={x}
                        onMouseEnter={onMouseEnter}
                    />
                </Fragment>
            )}
        </Fragment>
    );
};