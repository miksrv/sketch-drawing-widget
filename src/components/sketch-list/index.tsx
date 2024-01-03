import { API } from 'api/api'
import { editSketch } from 'api/applicationSlice'
import { useAppDispatch } from 'api/hooks'
import React from 'react'

import styles from './styles.module.sass'

const SketchList: React.FC = () => {
    const dispatch = useAppDispatch()
    const { data } = API.useSketchGetListQuery()

    const handleEditSketch = (id?: string) => {
        const findSketch = data?.items?.find((item) => item.id === id)

        dispatch(editSketch(findSketch))
    }

    return (
        <div className={styles.section}>
            {!data?.items?.length && (
                <div className={styles.empty}>{'Список пуст'}</div>
            )}
            {data?.items?.map((item) => (
                <button
                    key={item.id}
                    className={styles.item}
                    onClick={() => handleEditSketch(item.id)}
                >
                    <h4>{item.title || ''}</h4>
                    <img
                        alt={''}
                        src={`${process.env.REACT_APP_API_HOST}/data/${item.id}.png`}
                    />
                </button>
            ))}
        </div>
    )
}

export default SketchList
