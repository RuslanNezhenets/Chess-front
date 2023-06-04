import React, {useEffect, useState} from 'react';
import CellComponent from "./CellComponent";
import {canMove, fetchBoard, highlight, moveFigure} from "../http/chessApi";
import TransformModal from "./modals/TransformModal";

const BoardComponent = ({board, setBoard, currentPlayer, stopGame}) => {
        const [selectedCell, setSelectedCell] = useState(null)
        const [showTransformModal, setShowTransformModal] = useState(false)

        function click(cell) {
            if (board.state !== 2 && board.state !== 3) {
                if (selectedCell && selectedCell !== cell) {
                    canMove(selectedCell, cell).then(async (data) => {
                        if (data[0]) {
                            moveFigure(selectedCell, cell, null).then(data => {
                                if (data[0] === 1) updateBoard()
                                if (selectedCell.figure.name === "pawn" && (cell.y === 7 || cell.y === 0)) {
                                    setShowTransformModal(true)
                                }
                            })
                            setSelectedCell(null);
                        } else {
                            if (cell.figure?.color === currentPlayer) setSelectedCell(cell);
                        }
                    });
                } else {
                    if (cell.figure?.color === currentPlayer) setSelectedCell(cell);
                }
            }
        }


        useEffect(() => {
            highlightCells()
        }, [selectedCell])

        function highlightCells() {
            if (selectedCell)
                highlight(selectedCell).then(() => updateBoard())
        }

        function updateBoard() {
            fetchBoard().then(data => {
                setBoard(data)
                if (data.state === 2 || data.state === 3)
                    stopGame()
            })
        }

        return (
            <div className="board">
                <TransformModal
                    show={showTransformModal}
                    onHide={() => setShowTransformModal(false)}
                    updateBoard={updateBoard}
                />
                {board?.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row?.map(cell =>
                            <CellComponent
                                key={cell.id}
                                cell={cell}
                                click={click}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>
                        )}
                    </React.Fragment>
                )}
            </div>
        );
    }
;

export default BoardComponent;