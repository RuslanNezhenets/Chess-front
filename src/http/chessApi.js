import axios from "axios"

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const fetchBoard = async () => {
    const {data} = await $host.get('get_board/' + localStorage.getItem('userId'))
    return data
}

export const canMove = async (selectedCell, cell) => {
    const {data} = await $host.post('can_move/' + localStorage.getItem('userId'), [selectedCell, cell])
    return data
}

export const moveFigure = async (selectedCell, cell) => {
    const {data} = await $host.post('move_figure/' + localStorage.getItem('userId'), [selectedCell, cell])
    return data
}

export const highlight = async (cell, disable = 0) => {
    const {data} = await $host.post('highlight_cells/' + localStorage.getItem('userId') + '/' + disable, [cell])
    return data
}

export const reset = async (time_init) => {
    const {data} = await $host.get('reset/' + localStorage.getItem('userId') + '/' + [time_init])
    return data
}

export const timeEnd = async (color) => {
    const {data} = await $host.post('time_end', [color])
    return data
}

export const promote = async (name) => {
    const {data} = await $host.post('promote/' + localStorage.getItem('userId'), [name])
    return data
}