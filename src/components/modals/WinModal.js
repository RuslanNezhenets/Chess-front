import React from 'react';
import {Modal} from 'react-bootstrap';
import {Colors} from "../../models/Colors";

const WinModal = ({show, onHide, board}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{(board.won === Colors.WHITE)
                    ?
                    "Перемога білих!"
                    :
                    (board.won === Colors.BLACK ? "Перемога чорних!" : "Нічия.")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Гру закінчено.
            </Modal.Body>
        </Modal>
    );
};

export default WinModal;
