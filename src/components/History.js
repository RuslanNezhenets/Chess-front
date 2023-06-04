import React from 'react';
import {Table} from "react-bootstrap";
import {getLogo} from "../models/Logos";

const History = ({history}) => {
    const Letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
    const Numbers = [1, 2, 3, 4, 5, 6, 7, 8]
    const GameStates = ["", "+", "#", "="]
    const SpecialMoves = ["", "0-0", "0-0-0", "e.p."]

    function showTurn(turn) {
        if (turn.special === 1 || turn.special === 2)
            return SpecialMoves[turn.special]
        else {
            let output = ""
            output += Letters[turn.from[0]] + Numbers[turn.from[1]]
            if (turn.take)
                output += "x"
            else
                output += "-"
            output += Letters[turn.to[0]] + Numbers[turn.to[1]]
            output += SpecialMoves[turn.special]
            output += GameStates[turn.state]
            return output
        }
    }

    return (
        <div className="history">
            <Table striped variant="dark">
                <tbody>
                {history?.map((row, index) =>
                    <tr key={index}>
                        <td style={{width: '10%'}}>{index + 1}.</td>
                        {row.map((turn, i) =>
                            <td style={{width: '45%'}} key={i}>
                                {(turn.figure.name !== "pawn" && turn.special !== 1 && turn.special !== 2) &&
                                    < img
                                        className="history-img"
                                        src={getLogo(turn.figure, true)}
                                        alt={turn.figure.name}
                                    />
                                }
                                {showTurn(turn)}
                            </td>
                        )}
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    );
};

export default History;