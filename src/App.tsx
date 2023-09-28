import { DoubleSide} from "three"

import { Canvas} from '@react-three/fiber'

import {PerspectiveCamera, OrbitControls} from "@react-three/drei"

/**
 * A scene consisting of a blue floor
 * @returns 
 */
function MyScene(){ 
    return (
        <group>

            <mesh
                position={[0, -0.05, 0]}
                rotation-x={Math.PI / 2} 
                receiveShadow
            >   
                <planeGeometry args={[80, 80]}/>
                <meshStandardMaterial color={"#1565C0"} side={DoubleSide}/>
            </mesh>

        </group>
    )
}



/** 
 * main component for the whole app
 * contains a camera, some lights and 'MyScene'
 * */
function App() {
    return (
        <Canvas>
            <PerspectiveCamera
                makeDefault
                position={[40, 70, 100]}
            />
            <OrbitControls/>

            <MyScene/>

            <ambientLight
                intensity={1}
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

