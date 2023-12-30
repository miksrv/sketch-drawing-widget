import * as THREE from 'three'
import { OrbitControls, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Point2D } from 'functions/types'
import React, { useEffect, useRef, useState } from 'react'

import imageTexture from './metal-texture.jpg'

interface Sketch3DViewerProps {
    firstPoints?: boolean
    lastPoints?: boolean
    sketch?: Point2D[]
}

const height = 2
const depth = 100

function computeAngleBetweenVectors(vector1: any, vector2: any) {
    const dotProduct = vector1.dot(vector2)
    const magnitude1 = vector1.length()
    const magnitude2 = vector2.length()
    return Math.acos(dotProduct / (magnitude1 * magnitude2))
}

const Sketch3DViewer: React.FC<Sketch3DViewerProps> = ({
    firstPoints,
    lastPoints,
    sketch
}) => {
    const ref = useRef<any>()
    const groupRef = useRef<any>()

    const [geometries, setGeometries] = useState<any>()
    const [centerX, setCenterX] = useState<any>()
    const [centerY, setCenterY] = useState<any>()
    const [cameraDistance, setCameraDistance] = useState<any>()
    const [rectangles, setRectangles] = useState<any>()
    const [texture, setTexture] = useState(null)

    useEffect(() => {
        const loadTexture = async () => {
            const loader = new THREE.TextureLoader()
            const loadedTexture: any = await new Promise((resolve) => {
                loader.load(imageTexture, (texture) => {
                    resolve(texture)
                })
            })

            setTexture(loadedTexture)
        }

        loadTexture()
    }, [])

    useEffect(() => {
        const points2D = sketch || []

        // Вычислите среднюю позицию объектов
        const geometries = points2D.map(({ x, y }) => ({ x, y, z: height }))
        setGeometries(geometries)

        // Находим минимальные и максимальные значения по осям X и Y
        const minX = Math.min(...points2D.map((point) => point.x))
        const maxX = Math.max(...points2D.map((point) => point.x))
        const minY = Math.min(...points2D.map((point) => point.y))
        const maxY = Math.max(...points2D.map((point) => point.y))

        // Находим центр объекта
        setCenterX((minX + maxX) / 2)
        setCenterY((minY + maxY) / 2)

        // Находим диагональ объекта
        const diagonal = Math.sqrt((maxX - minX) ** 2 + (maxY - minY) ** 2)

        // Вычисляем расстояние камеры от объекта
        const cameraDistance = diagonal / (2 * Math.tan(Math.PI * 0.5 * 0.5))
        setCameraDistance(cameraDistance)

        const rectangles = []
        for (let i = 0; i < points2D.length - 2; i++) {
            const start = new THREE.Vector3(points2D[i].x, points2D[i].y, 0)
            const mid = new THREE.Vector3(
                points2D[i + 1].x,
                points2D[i + 1].y,
                0
            )
            const end = new THREE.Vector3(
                points2D[i + 2].x,
                points2D[i + 2].y,
                0
            )

            const direction1 = mid.clone().sub(start).normalize()
            const direction2 = end.clone().sub(mid).normalize()
            const angle =
                computeAngleBetweenVectors(direction1, direction2) *
                (180 / Math.PI) // в градусах

            const position = mid
                .clone()
                .add(
                    direction1
                        .clone()
                        .add(direction2)
                        .normalize()
                        .multiplyScalar(10)
                ) // установите нужное смещение

            const quaternion = new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 0, 0),
                direction1
            )

            const textElement = (
                <mesh
                    position={[position.x + 5, position.y - 10, 60]}
                    quaternion={quaternion}
                >
                    <Text
                        fontSize={16}
                        color='#000000'
                        anchorX='center'
                        anchorY='middle'
                    >
                        {`${angle.toFixed(0)}°`}
                    </Text>
                </mesh>
            )

            rectangles.push(textElement)
        }

        for (let i = 0; i < points2D.length - 1; i++) {
            const start = new THREE.Vector3(points2D[i].x, points2D[i].y, 0)
            const end = new THREE.Vector3(
                points2D[i + 1].x,
                points2D[i + 1].y,
                0
            )

            const length = start.distanceTo(end)

            const quaternion = new THREE.Quaternion()
            const direction = end.clone().sub(start).normalize()
            quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), direction)

            const geometry = new THREE.BoxGeometry(length, height, depth)
            const material = new THREE.MeshBasicMaterial({
                color: '#dcd9c9',
                map: texture
            })

            const rectangle = (
                <mesh
                    key={i}
                    position={start.clone().add(end).multiplyScalar(0.5)}
                    quaternion={quaternion}
                >
                    <bufferGeometry
                        attach='geometry'
                        {...geometry}
                    />
                    <meshBasicMaterial
                        {...material}
                        attach={'material'}
                        map={texture}
                    />
                    {!(firstPoints && (i === 0 || i === 1)) &&
                        !(
                            lastPoints &&
                            (i === points2D.length - 2 ||
                                i === points2D.length - 3)
                        ) && (
                            <Text
                                position={[0, 0, height + 50]}
                                anchorX={'center'}
                                anchorY={'middle'}
                                fontSize={17}
                                color={'#000000'}
                            >
                                {`${length.toFixed(0)} mm`}
                            </Text>
                        )}
                </mesh>
            )

            rectangles.push(rectangle)
        }

        setRectangles(rectangles)
    }, [sketch, texture])

    return (
        <Canvas
            style={{ height: '403px', width: '500px' }}
            camera={{
                far: 1000,
                fov: 75,
                near: 0.1,
                position: [centerX, centerY, cameraDistance]
            }}
        >
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
                position={[centerX, centerY, cameraDistance]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
            />
            <pointLight
                position={[-centerX, -centerY, cameraDistance]}
                decay={0}
                intensity={Math.PI}
            />

            <group
                ref={groupRef}
                position={[centerY - 450, centerX - 450, 0]}
            >
                {rectangles}

                {geometries?.map(
                    (
                        geometry: { x: number; y: number; z: number },
                        index: string | number | bigint | undefined
                    ) => (
                        <mesh
                            key={index}
                            ref={ref}
                            position={[geometry.x, geometry.y, geometry.z - 2]}
                        >
                            <boxGeometry args={[height, height, depth]} />
                            <meshBasicMaterial
                                attach={'material'}
                                map={texture}
                                color={'#dcd9c9'}
                            />
                        </mesh>
                    )
                )}
            </group>

            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.1}
                panSpeed={0.8}
                rotateSpeed={0.5}
                target={new THREE.Vector3(0, 0, 0)} // Устанавливаем центр вращения
            />
        </Canvas>
    )
}

export default Sketch3DViewer
