import { DoubleSide} from "three"

import { Canvas} from '@react-three/fiber'

import {PerspectiveCamera, OrbitControls} from "@react-three/drei"

/** 
 * main component for the whole app
 * contains a camera, a light and a blue rectangular 'floor'
 * */
function App() {
    return (
        <Canvas>
            <PerspectiveCamera
                makeDefault
                position={[40, 70, 100]}
            />
            <OrbitControls/>

            <mesh
                position={[0, -0.05, 0]}
                rotation-x={Math.PI / 2} 
                receiveShadow
            >   
                <planeGeometry args={[80, 80]}/>
                <meshStandardMaterial color={"#1565C0"} side={DoubleSide}/>
            </mesh>

            <ambientLight
                intensity={1}
            />
        </Canvas>
    )
}

export default App;

