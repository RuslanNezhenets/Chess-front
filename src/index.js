import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SocketStore from "./store/SocketStore"

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Context.Provider value={{
        socket: new SocketStore()
    }}>
        <App/>
    </Context.Provider>
)