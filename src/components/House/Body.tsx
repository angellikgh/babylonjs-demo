import { Vector3, Vector4 } from '@babylonjs/core'

const Body = (props: {
    width: number,
}) => {
    return (
        <box name="box"
            width={props.width}
            position={new Vector3(0, 0.5, 0)}
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

Body.defaultProps = {
    width: 2,
}

export default Body;