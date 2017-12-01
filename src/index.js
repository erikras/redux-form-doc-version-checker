import React from 'react'
import ReactDOM from 'react-dom'
import DocCheck from './DocCheck'

const dest = document.createElement('div')
document.body.appendChild(dest)
ReactDOM.render(<DocCheck />, dest)
