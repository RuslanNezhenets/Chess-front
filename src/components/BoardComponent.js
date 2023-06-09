import React, {useContext, useEffect, useState} from 'react'
import CellComponent from "./CellComponent"
import {canMove, fetchBoard, highlight, moveFigure} from "../http/chessApi"
import TransformModal from "./modals/TransformModal"
import {Context} from "../index"

const BoardComponent = ({board, setBoard, currentPlayer, stopGame}) => {
        const [selectedCell, setSelectedCell] = useState(null)
        const [showTransformModal, setShowTransformModal] = useState(false)
        const {socket} = useContext(Context)

        function click(cell) {
            if (board.state !== 2 && board.state !== 3) {
                if (selectedCell && selectedCell !== cell) {
                    canMove(selectedCell, cell).then(async (data) => {
                        if (data[0]) {
                            moveFigure(selectedCell, cell).then(data => {
                                if (data[0] === 1) updateBoard()
                                if (selectedCell.figure.name === "pawn" && (cell.y === 7 || cell.y === 0)) {
                                    setShowTransformModal(true)
                                }
                            })
                            setSelectedCell(null)
                        } else if (cell.figure?.color === currentPlayer) setSelectedCell(cell)
                        else setSelectedCell(null)
                    })
                } else if (cell.figure?.color === currentPlayer) setSelectedCell(cell)
                else setSelectedCell(null)
            }
        }

        useEffect(() => {
            highlightCells()
        }, [selectedCell])

        function highlightCells() {
            if (selectedCell) highlight(selectedCell).then(() => updateBoard(true))
            else highlight(selectedCell, 1).then(() => updateBoard(true))
        }

        function updateBoard(single = false) {
            if(single) fetchBoard().then(data => setBoard(data))
            else socket.socket.emit('board_update')
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
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                history={board.history}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        );
    }
;

export default BoardComponent;