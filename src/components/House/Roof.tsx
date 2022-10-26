import { Vector3 } from '@babylonjs/core'

const Roof = () => {
    return (
        <cylinder
            name="roof"
            diameter={1.3}
            height={1.2}
            tessellation={3}
            scaling={new Vector3(0.75, 2, 1)}
            rotation={new Vector3(0, 0, Math.PI / 2)}
            position={new Vector3(0, 1.22, 0)}
        >
            <standardMaterial name='roofMat'>
                <texture assignTo="diffuseTexture" url={`https://assets.babylonjs.com/environments/roof.jpg`} />
            </standardMaterial>
        </cylinder>
    )
}

export default Roof;