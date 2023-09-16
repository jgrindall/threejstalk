import { RefObject} from "react"

import { DoubleSide, Vector3Tuple, Mesh} from "three"

import { useBox, useSphere } from "@react-three/cannon";


/**
 * A box with a canon js physics body. Static, mass zero
 * @param props 
 * @returns 
 */
function Ground(props: {position: Vector3Tuple, rotation: Vector3Tuple, size: Vector3Tuple, color: string}) {

    // add a physics body
    const api = useBox(() => {
        return {
            mass: 0,
            args: props.size,
            position: props.position,
            rotation: props.rotation,
            type: "Static"
        }
    })
    const ref:RefObject<Mesh> = api[0] as RefObject<Mesh>

    return (
        <mesh
            ref={ref}
            castShadow
            receiveShadow
            position={props.position}
            rotation={props.rotation}
        >
            <boxGeometry attach="geometry" args={props.size} />
            <meshStandardMaterial color={props.color} side={DoubleSide}/>
        </mesh>
    )
}


/**
 * An icosahedron shaped 'ball' with a sphere for its physics body
 * @param props 
 * @returns 
 */
function Ball(props:{position: Vector3Tuple, color: string}){

    const size = 3

    const api = useSphere(() => ({
        mass: 1,
        args:[size + 0.1],
        position: props.position
    }))

    const ref:RefObject<Mesh> = api[0] as RefObject<Mesh>

    return (
        <mesh
            ref={ref} 
            position={props.position}
            castShadow
        >
            <icosahedronGeometry args={[size]} />
            <meshPhysicalMaterial color={props.color} />
        </mesh>
    )
}

/**
    A load of balls
    And a box, rotated slightly so the balls roll off it
*/
export function MyPhysicsScene(){
    const centre = [30, 20, -20] as Vector3Tuple
    return (
        <group>
            <Ball position={[centre[0] + 2, centre[1] + 20, centre[2] - 5]} color={"yellow"}  />
            <Ball position={[centre[0] + 4, centre[1] + 30, centre[2] + 3]} color={"purple"}  />
            <Ball position={[centre[0] - 2, centre[1] + 40, centre[2] - 2]} color={"pink"}  />
            <Ball position={[centre[0] - 5, centre[1] + 50, centre[2] + 4]} color={"green"}  />
            <Ball position={[centre[0] + 1, centre[1] + 60, centre[2] - 1]} color={"black"}  />
            <Ball position={[centre[0] - 6, centre[1] + 70, centre[2] + 7]} color={"orange"}  />
            <Ball position={[centre[0] + 8, centre[1] + 80, centre[2] - 1]} color={"white"}  />
            <Ground
                color={"gray"}
                size={[25, 1, 30]} 
                position={centre}
                rotation={[0.2, -0.2, 0.2]}
            />

        </group>
    )
}