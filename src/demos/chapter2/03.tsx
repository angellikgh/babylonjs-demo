import * as React from 'react';

import '@babylonjs/core/Physics/physicsEngineComponent'; // side-effect adds scene.enablePhysics function
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent'; // side-effect for shadow generator
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import {
  Engine,
  Scene,
} from 'react-babylonjs';

import * as CANNON from 'cannon';

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

          <ground name="ground1" width={8} height={8} subdivisions={2} />

          <box name="box1" position={new Vector3(0, 0.5, 0)} />

          <cylinder
            name="roof"
            diameter={1.3}
            height={1.2}
            tessellation={3}
            scaling={new Vector3(0.75, 1, 1)}
            rotation={new Vector3(0, 0, Math.PI / 2)}
            position={new Vector3(0, 1.22, 0)}
          />
        </Scene>
      </Engine>
    </div>
  );
};
export default App;
