import { Vector3, Vector4 } from '@babylonjs/core'

const Roof = () => {
    return (
        <box name="box" width={2} position={new Vector3(0, 0.5, 0)}
            faceUV={[
                new Vector4(0.6, 0.0, 1.0, 1.0),
                new Vector4(0.0, 0.0, 0.4, 1.0),
                new Vector4(0.4, 0, 0.6, 1.0),
                new Vector4(0.4, 0, 0.6, 1.0)
            ]}
            wrap={true}
        >
            <standardMaterial name='boxMat'>
                <texture assignTo="diffuseTexture" url={`https://assets.babylonjs.com/environments/semihouse.png`} />
            </standardMaterial>
        </box>
    )
}

export default Roof;