import { FC } from 'react';

import "@babylonjs/core/Physics/physicsEngineComponent"  // side-effect adds scene.enablePhysics function
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent"; // side-effect for shadow generator
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins'
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { PhysicsImpostor } from '@babylonjs/core/Physics/physicsImpostor';

import { Scene, Engine } from 'react-babylonjs';

import * as CANNON from 'cannon';

import './App.css'

window.CANNON = CANNON;

const gravityVector = new Vector3(0, -9.81, 0);

const App: FC = () => {

  return (
    <div className="App">
      <header className="App-header">
        <p>@babylonjs + `react-babylonjs`</p>
        <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
          <Scene enablePhysics={[gravityVector, new CannonJSPlugin()]}>
            <arcRotateCamera name="arc" target={new Vector3(0, 1, 0)}
              alpha={-Math.PI / 2} beta={(0.2 + (Math.PI / 4))} wheelPrecision={50}
              radius={14} minZ={0.001} lowerRadiusLimit={8} upperRadiusLimit={20} upperBetaLimit={Math.PI / 2} />
            <hemisphericLight name='hemi' direction={new Vector3(0, -1, 0)} intensity={0.8} />

            <ground name="ground1" width={24} height={24} subdivisions={2} receiveShadows={true}>
              <physicsImpostor type={PhysicsImpostor.BoxImpostor} _options={{ mass: 0, restitution: 0.9 }} />
            </ground>
          </Scene>
        </Engine>
      </header>
    </div>
  );
}
export default App;