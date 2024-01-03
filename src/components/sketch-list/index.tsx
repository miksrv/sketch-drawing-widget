import { API } from 'api/api'
import React, { useEffect, useState } from 'react'

import styles from './styles.module.sass'

const SketchList: React.FC = () => {
    const { data, isLoading } = API.useSketchGetListQuery()

    return (
        <div className={styles.section}>
            {!data?.items?.length && (
                <div className={styles.empty}>{'Список пуст'}</div>
            )}
            {data?.items?.map((item) => (
                <div
                    key={item.id}
                    className={styles.item}
                >
                    <h4>{item.title || ''}</h4>
                    <img
                        alt={''}
                        src={`${process.env.REACT_APP_API_HOST}/data/${item.id}.png`}
                    />
                </div>
            ))}
        </div>
    )
}

export default SketchList
