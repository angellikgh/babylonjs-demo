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

const App = () => {
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

          <Ground />

          <Roof />
          <Body />
        </Scene>
      </Engine>
    </div >
  );
};
export default App;
