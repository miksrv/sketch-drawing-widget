import { store } from 'api/store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import Container from './components/container'
import SketchForm from './components/sketch-form'
import SketchList from './components/sketch-list'

const root = ReactDOM.createRoot(
    document.getElementById('widget-container') as HTMLElement
)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <div className={'wrapper'}>
                <Container title={'Редактирование'}>
                    <SketchForm />
                </Container>

                <Container title={'Список'}>
                    <SketchList />
                </Container>
            </div>
        </Provider>
    </React.StrictMode>
)
