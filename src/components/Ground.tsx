import { Color3 } from '@babylonjs/core'

const Ground = () => {
    return (
        <ground name="ground" width={8} height={8}>
            <standardMaterial name='groundMat' diffuseColor={new Color3(0, 1, 0)} />
        </ground>
    )
}

export default Ground;