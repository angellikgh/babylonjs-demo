import { Color3 } from '@babylonjs/core'

const Ground = (props: {
    width: number,
    height: number,
}) => {
    return (
        <ground name="ground" width={props.width} height={props.height}>
            <standardMaterial name='groundMat' diffuseColor={new Color3(0, 1, 0)} />
        </ground>
    )
}

Ground.defaultProps = {
    width: 8,
    height: 8,
}

export default Ground;