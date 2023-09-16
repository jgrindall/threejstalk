import { RefObject, useRef } from "react"

import { DoubleSide, Color, Mesh, Group, Fog, Euler} from "three"

import { Canvas, useThree, useFrame} from '@react-three/fiber'

import {PerspectiveCamera, OrbitControls, Image, Text, Svg} from "@react-three/drei"


/**
 * A scene consisting of a blue floor, a red box and a green cylinder
 * @returns 
 */
function MyScene(){ 

    const {scene} = useThree()
    scene.background = new Color("#212121")
    scene.fog = new Fog(new Color("#dddddd"), 25, 400)
    
    const cylinderRef:RefObject<Mesh> = useRef<Mesh>() as RefObject<Mesh>
    const groupRef: RefObject<Group> = useRef<Group>() as RefObject<Group>

    useFrame((_, delta)=>{
        groupRef.current?.rotateY(delta * 2)
        cylinderRef.current?.rotateZ(delta * 2)
    })

    return (
        <group>

            <mesh
                position={[0, 6, 0]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[12, 12, 12]}></boxGeometry>
                <meshStandardMaterial color={"#E53935"}>
                </meshStandardMaterial>
            </mesh>

            <group position={[0, 0, 0]} ref={groupRef}>

                <mesh
                    ref={cylinderRef}
                    position={[16, 7, -16]}
                    castShadow
                    receiveShadow 
                >
                    <cylinderGeometry args={[4, 4, 8, 32]}></cylinderGeometry>
                    <meshStandardMaterial color={"#43A047"}></meshStandardMaterial>
                </mesh>

            </group>

            <mesh
                position={[0, -0.05, 0]}
                rotation-x={Math.PI / 2} 
                receiveShadow
            >   
                <planeGeometry args={[80, 80]}/>
                <meshStandardMaterial color={"#1565C0"} side={DoubleSide}/>
            </mesh>

            <Image url="./join_empire.jpg" position={[-30, 10, 0]} scale={20} rotation={new Euler(0, Math.PI/2, 0)}/>
            
            <Svg src="./darth_vader.svg" scale={[0.03, 0.03, 0.03]} position={[-25, 15, 25]}/>
            
            <Text color="yellow" anchorX="center" maxWidth={30} position={[-20, 10, -30]} anchorY="middle" fontSize={2}>
                In a galaxy far, far away... It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.
            </Text>

        </group>
    )
}



/** 
 * main component for the whole app
 * contains a camera, some lights and 'MyScene'
 * */
function App() {
    return (
        <Canvas shadows>
            <PerspectiveCamera
                makeDefault
                position={[40, 70, 100]}
            />
            <OrbitControls/>

            <MyScene/>

            <ambientLight
                intensity={0.3}
            />

            <pointLight
                castShadow
                position={[-10, 60, 15]}
                intensity={0.075}
            />

            <spotLight
                castShadow
                position={[10, 40, -15]}
                intensity={0.35}
            />
        </Canvas>
    )
}

export default App;

