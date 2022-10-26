import * as React from 'react';
import * as BABYLON from 'babylonjs';
import BabylonScene, { SceneEventArgs } from '../components/BabylonScene'; // import the component above linking to file we just created.

class PageWithScene extends React.Component<{}, {}> {
  onSceneMount = (e: SceneEventArgs) => {
    const { canvas, engine } = e;

    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon").then((result) => {
      scene.getMeshByName("detached_house");
    });

    engine.runRenderLoop(() => {
      if (scene) {
        scene.render();
      }
    });
  };

  render() {
    return (
      <div className='h-screen'>
        <BabylonScene onSceneMount={this.onSceneMount} width={1024} height={768} />
      </div>
    );
  }
}

export default PageWithScene;
