import { FC } from 'react';

import '@babylonjs/core/Physics/physicsEngineComponent'; // side-effect adds scene.enablePhysics function
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent'; // side-effect for shadow generator
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3 } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials';

import {
  Engine,
  Scene,
  HostRegistrationStore,
  FiberPushMaterialPropsHandler,
  FiberMaterialPropsHandler,
  checkColor3Diff,
  checkTextureDiff,
  checkPrimitiveDiff,
  checkVector3Diff,
} from 'react-babylonjs';

import * as CANNON from 'cannon';

window.CANNON = CANNON;

const gravityVector = new Vector3(0, -9.81, 0);

class GridMaterialPropsHandler {
  getPropertyUpdates(oldProps, newProps) {
    const changedProps = [];
    checkColor3Diff(
      oldProps.mainColor,
      newProps.mainColor,
      'mainColor',
      changedProps
    );
    checkColor3Diff(
      oldProps.lineColor,
      newProps.lineColor,
      'lineColor',
      changedProps
    );
    checkPrimitiveDiff(
      oldProps.gridRatio,
      newProps.gridRatio,
      'gridRatio',
      changedProps
    );
    checkVector3Diff(
      oldProps.gridOffset,
      newProps.gridOffset,
      'gridOffset',
      changedProps
    );
    checkPrimitiveDiff(
      oldProps.majorUnitFrequency,
      newProps.majorUnitFrequency,
      'majorUnitFrequency',
      changedProps
    );
    checkPrimitiveDiff(
      oldProps.minorUnitVisibility,
      newProps.minorUnitVisibility,
      'minorUnitVisibility',
      changedProps
    );
    checkPrimitiveDiff(
      oldProps.opacity,
      newProps.opacity,
      'opacity',
      changedProps
    );
    checkPrimitiveDiff(
      oldProps.preMultiplyAlpha,
      newProps.preMultiplyAlpha,
      'preMultiplyAlpha',
      changedProps
    );
    checkTextureDiff(
      oldProps.opacityTexture,
      newProps.opacityTexture,
      'opacityTexture',
      changedProps
    );
    return changedProps.length === 0 ? null : changedProps;
  }
}

class FiberGridMaterial {
  constructor() {
    this.propsHandlers = [
      new GridMaterialPropsHandler(),
      new FiberPushMaterialPropsHandler(),
      new FiberMaterialPropsHandler(),
    ];
  }

  getPropsHandlers() {
    return this.propsHandlers;
  }

  addPropsHandler(propHandler) {
    this.propsHandlers.push(propHandler);
  }
}

HostRegistrationStore.Register({
  hostElementName: 'gridMaterial',
  hostFactory: (scene) => {
    return new GridMaterial('test', scene);
  },
  propHandlerInstance: new FiberGridMaterial(),
  createInfo: {
    creationType: '...',
    libraryLocation: '...',
    namespace: '@babylonjs/materials',
    parameters: [
      {
        name: 'name',
        type: 'string',
        optional: false,
      },
      {
        name: 'scene',
        type: 'BabylonjsCoreScene',
        optional: false,
      },
    ],
  },
  metadata: {
    isMaterial: true,
    className: 'GridMaterial',
  },
});

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
            target={new Vector3(0, 1, 0)}
            alpha={-Math.PI / 2}
            beta={0.2 + Math.PI / 4}
            wheelPrecision={50}
            radius={14}
            minZ={0.001}
            lowerRadiusLimit={8}
            upperRadiusLimit={20}
            upperBetaLimit={Math.PI / 2}
          />
          <hemisphericLight
            name="hemi"
            direction={new Vector3(0, -1, 0)}
            intensity={0.8}
          />

          <ground name="ground1" width={24} height={24} subdivisions={2}>
            <gridMaterial lineColor={Color3['Green']()} />
          </ground>

          <sphere
            name="sphare1"
            key="sphare1"
            diameter={0.5}
            segments={16}
            position={new Vector3(0, 4, 0)}
          />

          <box name="box1" size={2} position={new Vector3(0, 2, 0)} />
        </Scene>
      </Engine>
    </div>
  );
};
export default App;
