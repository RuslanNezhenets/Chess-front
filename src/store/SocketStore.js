import io from "socket.io-client"
import {v4 as uuid} from 'uuid'

export default class SocketStore {
    constructor() {
        let userId = localStorage.getItem('userId')
        if (!userId) {
            userId = uuid()
            localStorage.setItem('userId', userId)
        }
        this._socket = io(process.env.REACT_APP_API_URL, {query: {userId}})
    }

    get socket() {
        return this._socket
    }
}