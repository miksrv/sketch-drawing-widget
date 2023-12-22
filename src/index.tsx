import React from 'react'
import ReactDOM from 'react-dom/client'

import Container from './components/container'
import SketchForm from './components/sketch-form'
import './styles/globals.sass'

const root = ReactDOM.createRoot(
    document.getElementById('widget-container') as HTMLElement
)

root.render(
    <React.StrictMode>
        <div className={'wrapper'}>
            <Container title={'Редактор профиля'}>
                <SketchForm />
            </Container>
        </div>
    </React.StrictMode>
)
