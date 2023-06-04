import blackKing from "../assets/black-king.png";
import blackBishop from "../assets/black-bishop.png";
import blackKnight from "../assets/black-knight.png";
import blackPawn from "../assets/black-pawn.png";
import blackRook from "../assets/black-rook.png";
import blackQueen from "../assets/black-queen.png";

import blackKingMini from "../assets/black-king_mini.png";
import blackBishopMini from "../assets/black-bishop_mini.png";
import blackKnightMini from "../assets/black-knight_mini.png";
import blackPawnMini from "../assets/black-pawn_mini.png";
import blackRookMini from "../assets/black-rook_mini.png";
import blackQueenMini from "../assets/black-queen_mini.png";

import whiteKing from "../assets/white-king.png";
import whiteBishop from "../assets/white-bishop.png";
import whiteKnight from "../assets/white-knight.png";
import whitePawn from "../assets/white-pawn.png";
import whiteRook from "../assets/white-rook.png";
import whiteQueen from "../assets/white-queen.png";
import {Colors} from "./Colors";

export const images = {
    'black-king': blackKing,
    'black-bishop': blackBishop,
    'black-knight': blackKnight,
    'black-pawn': blackPawn,
    'black-rook': blackRook,
    'black-queen': blackQueen,
    'black-king_mini': blackKingMini,
    'black-bishop_mini': blackBishopMini,
    'black-knight_mini': blackKnightMini,
    'black-pawn_mini': blackPawnMini,
    'black-rook_mini': blackRookMini,
    'black-queen_mini': blackQueenMini,
    'white-king': whiteKing,
    'white-bishop': whiteBishop,
    'white-knight': whiteKnight,
    'white-pawn': whitePawn,
    'white-rook': whiteRook,
    'white-queen': whiteQueen,
}

export function getLogo(figure, mini = false) {
    return images[`${figure?.color}-${figure?.name}${(mini && figure?.color === Colors.BLACK) ? "_mini" : ""}`];
}

export function getChange(color) {
    return Object.keys(images)
        .filter(key => key.includes(color) && !key.includes('_mini') && !key.includes('pawn') && !key.includes('king'))
        .reduce((obj, key) => {
            obj[key] = images[key];
            return obj;
        }, {})
}