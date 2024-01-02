import { API } from 'api/api'
import React, { useEffect, useState } from 'react'

const SketchList: React.FC = () => {
    const { data, isLoading } = API.useSketchGetListQuery()

    return <div>{data?.items?.map((item) => item.title)}</div>
}

export default SketchList
