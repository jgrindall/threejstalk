import { RefObject, useRef, useState } from "react"

import { DoubleSide, Color, Mesh, Group, Fog, Euler, TextureLoader, Vector3Tuple} from "three"

import { Canvas, useThree, useFrame, useLoader} from '@react-three/fiber'

import {PerspectiveCamera, OrbitControls, Image, Text, Svg, Html, Sparkles, Trail, useGLTF, useAnimations} from "@react-three/drei"

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { ComponentUsingMemo, ComponentNotUsingMemo } from "./Memo";

/**
 * Load a gltf file
 */
function XWing(){
    const gltf = useLoader(GLTFLoader, "./x-wing.glb");
    return (
        <group castShadow position={[17, 20, 17]} scale={1.5} rotation={[0, 3*Math.PI/4, 0]}>
            <primitive castShadow object={gltf.scene}></primitive>
        </group>
    )
}


/**
 * Load a gltf file. 
 * Use gltftojsx to generate the JSX
 * @param props 
 * @returns 
 */
function StormTrooper(props: {position: Vector3Tuple}){
    const ref:RefObject<Group> = useRef<Group>() as RefObject<Group>
    const gltf:any = useGLTF("./dancing_stormtrooper.glb")

    const { actions, names } = useAnimations(gltf.animations, ref)
    const anim = actions[names[0]]
    anim?.play()

    return (
        <group ref={ref}>
            <group position={props.position} scale={[7, 7, 7]}>
                <primitive object={gltf.nodes.mixamorigHips_02 } />
                <skinnedMesh
                    castShadow
                    receiveShadow
                    material={gltf.materials.Stormtroopermat}
                    geometry={gltf.nodes.Object_7.geometry}
                    skeleton={gltf.nodes.Object_7.skeleton}
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                />
            </group>
        </group>
    )
}


function Box(){

    const [count, setCount] = useState(0)

    const texture = useLoader(TextureLoader, './rebel_alliance.jpg')
    
    return (

        <group>

            <mesh
                position={[0, 6, 0]}
                castShadow
                receiveShadow
                onClick={()=> setCount(count + 1)}
            >
                <boxGeometry args={[12, 12, 12]}/>
                <meshStandardMaterial
                    map={texture}
                    color={count % 2 === 0 ? "#666" : "#E53935"}>
                </meshStandardMaterial>
                
            </mesh>
            
            <Html position={[7, 13, 7]}>
                <div className='block'>
                   # {count}
                </div>
            </Html>

            <Sparkles
                position={[0, 6, 0]}
                color="red"
                size={64}
                scale={16}
                count={150}
                noise={20}
                speed={5}
            />

            <ComponentUsingMemo/>

            <StormTrooper position={[25, 0, 30]}/>

        </group>

    )

}

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

            <Box/>

            <group position={[0, 0, 0]} ref={groupRef}>

                <Trail
                    width={32} 
                    attenuation={(width) => width/3}
                    color={'yellow'}
                    length={24} 
                    decay={3} 
                    local={false} 
                >

                    <XWing/>

                </Trail>

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

