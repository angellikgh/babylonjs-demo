import '@babylonjs/core/Physics/physicsEngineComponent'; // side-effect adds scene.enablePhysics function
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent'; // side-effect for shadow generator

import React, { useEffect, useRef } from 'react';
import { CannonJSPlugin } from '@babylonjs/core/Physics/Plugins';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import * as earcut from "earcut"
import { ValueAndUnit } from '@babylonjs/gui/2D/valueAndUnit';
import {
  Engine as EngineComponent,
  Scene as SceneComponent,
  SceneEventArgs,
  useScene,
  useEngine,
} from 'react-babylonjs';
import { Scene } from "@babylonjs/core";
import * as CANNON from 'cannon';
import { Control, Grid, AdvancedDynamicTexture } from '@babylonjs/gui';
import { PolygonMeshBuilder, Color3, AxesViewer, Plane, StandardMaterial, DynamicTexture, MeshBuilder, Engine, Texture, StateCondition, ArcRotateCamera, Path2, Color4, Nullable } from '@babylonjs/core'

import Roof from '../../components/House/Roof'
import Body from '../../components/House/Body'
import Ground from '../../components/Ground'
import GridComponent from '../../components/Grid'
import Compass from '../../components/Compass';

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
  const gridRef = useRef<any>(null);
  const screenRef = useRef<any>(null);
  const camRef = useRef<ArcRotateCamera>(null);
  const scene = useScene()!;
  const engine = useEngine();

  const onSceneMount = ({ scene, canvas }: SceneEventArgs) => {
    buildControllbarPanel(scene);
    buildCompass(scene, camRef.current)

    // console.log('DBG - renderWidth', engine.getRenderWidth());
    console.log('DBG - renderWidth', canvas);
  }

  const buildControllbarPanel = (scene: Scene) => {
    let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("Controllers", true, scene);

    let grid = new Grid();
    grid.addColumnDefinition(1);
    grid.addColumnDefinition(150, true);
    grid.addColumnDefinition(0.1);
    grid.addRowDefinition(1);
    grid.addRowDefinition(200, true);
    grid.addRowDefinition(0.2);
    advancedTexture.addControl(grid);

    gridRef.current = grid;

    let subGrid = new Grid();
    subGrid.background = 'white'
    subGrid.alpha = 0.7
    subGrid.addColumnDefinition(1);
    subGrid.addColumnDefinition(150, true);
    subGrid.addColumnDefinition(0.1);
    subGrid.addRowDefinition(1);
    subGrid.addRowDefinition(200, true);
    subGrid.addRowDefinition(0.2);

    grid.addControl(subGrid, 1, 1);
  }

  function buildCompass(scene?: Scene, camera?: ArcRotateCamera | null) {
    // if (!camera) return;
  // function buildCompass(scene?: Scene) {
    const poly_path = new Path2(0.4, 0);
    poly_path.addLineTo(0, 1.5);
    poly_path.addLineTo(-0.4, 0);
    poly_path.addArcTo(0, 0.1, 0.4, 0);
    const arrowB = new PolygonMeshBuilder('arrow', poly_path, scene, earcut);
    // const arrowB = new PolygonMeshBuilder('arrow', poly_path);
    const arrow = arrowB.build();

    const mat = new StandardMaterial('mat', scene);
    mat.emissiveColor = Color3.Black();
    mat.alpha = 0.5;
    mat.disableLighting = true;

    arrow.material = mat;
    arrow.edgesColor = new Color4(1, 1, 1, 1);
    arrow.edgesWidth = 2;
    arrow.rotation.x = -Math.PI/2;
    arrow.bakeCurrentTransformIntoVertices();
    arrow.enableEdgesRendering();
    arrow.position.y = 1;
    arrow.position.z = 10;
    // arrow.parent = camera;

    return arrow; 
  };

  return (
    <div className="App-header">
      <EngineComponent
        antialias={true}
        // adaptToDeviceRatio={true}
        canvasId="sample-canvas"
      >
        <SceneComponent enablePhysics={[gravityVector, new CannonJSPlugin()]} onSceneMount={onSceneMount}>
          <adtFullscreenUi name='ui1' ref={screenRef}>
            {/* <GridComponent screenRef={screenRef} /> */}
            {/* <grid name='grid1' background='white' width='500px'>
              <rowDefinition value={0.5} />
              <rowDefinition value={0.5} />
              <columnDefinition value={100} unit={ValueAndUnit.UNITMODE_PIXEL} />
              <columnDefinition value={0.5} />
              <columnDefinition value={0.5} />
              <columnDefinition value={100} unit={ValueAndUnit.UNITMODE_PIXEL} />
              <rectangle name="rect-0-1" background="green" thickness={0} gridRow={0} gridColumn={1} />
              <rectangle name="rect-1-2" background="red" thickness={0} gridRow={1} gridColumn={2} />
              <rectangle name="rect-0-2" background="yellow" thickness={0} gridRow={0} gridColumn={2} />
            </grid> */}

            <Compass />
          </adtFullscreenUi>

          <arcRotateCamera
            ref={camRef}
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
            ignoreParentScaling={true}
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
        </SceneComponent>
      </EngineComponent>
    </div >
  );
};
export default Street;
