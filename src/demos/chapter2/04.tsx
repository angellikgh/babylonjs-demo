import '@babylonjs/core/Physics/physicsEngineComponent'; // side-effect adds scene.enablePhysics function
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent'; // side-effect for shadow generator

import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import {
    Engine,
    Scene,
} from 'react-babylonjs';
import * as CANNON from 'cannon';

import Roof from '../../components/House/Roof'
import Body from '../../components/House/Body'
import Ground from '../../components/Ground'

window.CANNON = CANNON;

const gravityVector = new Vector3(0, -9.81, 0);

const places: number[][] = []; //each entry is an array [house type, rotation, x, z]
places.push([1, -Math.PI / 16, -6.8, 2.5]);
places.push([2, -Math.PI / 16, -4.5, 3]);
places.push([2, -Math.PI / 16, -1.5, 4]);
places.push([2, -Math.PI / 3, 1.5, 6]);
places.push([2, 15 * Math.PI / 16, -6.4, -1.5]);
places.push([1, 15 * Math.PI / 16, -4.1, -1]);
places.push([2, 15 * Math.PI / 16, -2.1, -0.5]);
places.push([1, 5 * Math.PI / 4, 0, -1]);
places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
places.push([2, Math.PI / 1.9, 4.75, -1]);
places.push([1, Math.PI / 1.95, 4.5, -3]);
places.push([2, Math.PI / 1.9, 4.75, -5]);
places.push([1, Math.PI / 1.9, 4.75, -7]);
places.push([2, -Math.PI / 3, 5.25, 2]);
places.push([1, -Math.PI / 3, 6, 4]);

const Home = (props: {
    width: number,
    rotation: number,
    x: number,
    z: number,
}) => (
    <mesh name="house" position-x={props.x} position-z={props.z} rotation={new Vector3(0, props.rotation)}>
        <Roof width={props.width} />
        <Body width={props.width} />
    </mesh>
)

const Street = () => {
    return (
        <div className="App-header">
            <Engine
                antialias={true}
                adaptToDeviceRatio={true}
                canvasId="sample-canvas"
            >
                <Scene enablePhysics={[gravityVector, new CannonJSPlugin()]}>
                    <arcRotateCamera
                        name="arc"
                        target={new Vector3(0, 0, 0)}
                        alpha={-Math.PI / 2}
                        beta={0.2 + Math.PI / 4}
                        wheelPrecision={50}
                        radius={14}
                        minZ={0.01}
                        lowerRadiusLimit={8}
                        upperRadiusLimit={20}
                        upperBetaLimit={Math.PI / 2}
                    />
                    <hemisphericLight
                        name="light"
                        direction={new Vector3(1, 1, 0)}
                        intensity={0.9}
                    />

                    <Ground width={20} height={20} />

                    {places.map(place => {
                        return <Home width={place[0]} rotation={place[1]} x={place[2]} z={place[3]} />
                    })}
                </Scene>
            </Engine>
        </div >
    );
};
export default Street;
