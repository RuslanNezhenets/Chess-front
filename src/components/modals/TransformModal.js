import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {getChange} from "../../models/Logos";
import {promote} from "../../http/chessApi";

const TransformModal = ({show, onHide, updateBoard}) => {
    const [figures, setFigures] = useState([])

    const handleClick = (key) => {
        onHide(false)
        promote(key.split("-")[1]).then(() => updateBoard())
    }

    useEffect(() => {
        setFigures(getChange('white'))
    }, [])

    return (
        <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Оберіть фігуру</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Object.entries(figures).map(([key, figure], index) =>
                    <img key={index} src={figure} alt="" onClick={() => handleClick(key)}/>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default TransformModal;
