import 'whatwg-fetch' // fetch polyfill
import React from 'react'
import { render } from 'react-dom'

import Root from './Root'

import './styles/index.scss'

const root = document.getElementById('root')

render(<Root />, root)