import { useState, useMemo } from "react"

import {MeshDistortMaterial, MeshTransmissionMaterial} from "@react-three/drei"

const glass =  {
    anisotropy: 0.0,
    attenuationColor: "#fff",
    attenuationDistance: 5.0,
    chromaticAberration: 0.0,
    clearcoat: 0.75,
    color: "#f7fafa",
    distortion: 0.75,
    distortionScale: 1.0,
    ior: 2.0,
    resolution: 32,
    roughness: 0.5,
    samples: 32,
    temporalDistortion: 0.0,
    thickness: 1,
    transmission: 0.975,
    transmissionSampler: true,
    opacity: 0
}

/**
 * Make a material with a distorted effect
 * @returns 
 */
function getWobbleMaterial(){
    console.log("getWobbleMaterial")
    return <MeshDistortMaterial speed={8} distort={0.75} color={"orange"}  />
}


/**
 * Make a glassy transparent material
 * @returns
 */
function getTransmissionMaterial(){
    console.log("getTransmissionMaterial")
    return <MeshTransmissionMaterial {...glass}/>
}

/**
 * A component that switches between two states when you click it
 * Not using memos, so each function is called on each click
 * @returns 
 */
export function ComponentNotUsingMemo(){
    const [isDown, setIsDown] = useState(false)
    const m1 = getWobbleMaterial()
    const m2 = getTransmissionMaterial()
    return (
        <mesh
            castShadow
            onClick={()=> setIsDown(!isDown)}
            position={[0, 20, 0]}
        >
            <sphereGeometry args={[4, 128, 128]}/>
            {
                isDown ? m1 : m2
            }
      </mesh>
    )
}

/**
 * A component that switches between two states when you click it
 * Using memos
 * @returns 
 */
export function ComponentUsingMemo(){
    const [isDown, setIsDown] = useState(false)
    const m1 = useMemo(()=>{
        return getWobbleMaterial()
    }, [])
    const m2 = useMemo(()=>{
        return getTransmissionMaterial()
    }, [])

    return (
        <mesh
            castShadow
            onClick={()=> setIsDown(!isDown)}
            position={[0, 20, 0]}
        >
            <sphereGeometry args={[4, 128, 128]}/>
            {
                isDown ? m1 : m2
            }
      </mesh>
    )
}
