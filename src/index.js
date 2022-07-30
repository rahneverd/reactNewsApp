require('file-loader?name=[name].[ext]!./index.html')
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.scss'

// const appElement = document.getElementById('app')

// ReactDOM.render(<App />, appElement)
const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<App />) 