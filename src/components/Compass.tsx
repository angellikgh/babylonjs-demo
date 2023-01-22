import * as earcut from "earcut";
import { PolygonMeshBuilder, Path2, Color3, Color4, Vector3, Camera, Vector2, Plane, Matrix, ActionManager } from "@babylonjs/core"
import { FC, useMemo } from "react"
import { useBeforeRender, useScene } from "react-babylonjs"

const Compass = () => {

  const scene = useScene();

  const scale = 0.03;
  const position = new Vector3(0.225, -0.3, 1)
  // const position = new Vector3(0, 0, 1)

  const arrowMesh = useMemo(() => {
    if (!scene) return;
    const path = new Path2(position.x, position.y + 2.5)
      .addLineTo(position.x - 0.75, position.y + 1)
      .addArcTo(position.x, position.y + 1.15, position.x + 0.75, position.y + 1)
      .addLineTo(position.x, position.y + 2.5);
    const meshBuilder = new PolygonMeshBuilder("arrowMesh", path, scene, earcut);
    const mesh = meshBuilder.build();
    mesh.edgesColor = new Color4(1,1,1,1)
    mesh.edgesWidth = 0.2;
    mesh.rotation.x = -Math.PI / 2;
    mesh.scaling = new Vector3(scale, scale, scale);
    mesh.bakeCurrentTransformIntoVertices();
    mesh.enableEdgesRendering();
    mesh.position.x = position.x;
    mesh.position.y = position.y;
    mesh.position.z = position.z;
    return mesh;
  }, [scene])

  const bodyMesh = useMemo(() => {
    if (!scene) return;
    const path = new Path2(position.x, position.y + 1.15)
      .addArcTo(position.x + 1.15, position.y, position.x, position.y - 1.15)
      .addArcTo(position.x - 1.15, position.y, position.x, position.y + 1.15);
    const meshBuilder = new PolygonMeshBuilder("bodyMesh", path, scene, earcut);
    const mesh = meshBuilder.build();
    mesh.edgesColor = new Color4(1,1,1,1)
    mesh.edgesWidth = 0.2;
    mesh.rotation.x = -Math.PI / 2;
    mesh.scaling = new Vector3(scale, scale, scale);
    mesh.bakeCurrentTransformIntoVertices();
    mesh.enableEdgesRendering();
    mesh.position.x = position.x;
    mesh.position.y = position.y;
    mesh.position.z = position.z;
    return mesh;
  }, [scene])

  useBeforeRender(() => {
    if (!scene || !arrowMesh || !bodyMesh) return;
    scene.clipPlane = null;
    const [camera] = scene.cameras;
    const targetDiff = Vector3.TransformCoordinates(new Vector3(0, 0, 100000000), camera.getViewMatrix());
    const inRads = Math.atan2(targetDiff.x, targetDiff.y);
    arrowMesh.rotation.z = inRads < 0 ? Math.abs(inRads) : 2 * Math.PI - inRads;
    bodyMesh.rotation.z = inRads < 0 ? Math.abs(inRads) : 2 * Math.PI - inRads;

    let actionManager = new ActionManager(scene);

    bodyMesh.actionManager = actionManager;
  })

  if (!scene) return null;

  return <>
    <mesh name="compassArrow" fromInstance={arrowMesh} disposeInstanceOnUnmount>
      <standardMaterial
        name="compassArrowMaterial"
        emissiveColor={Color3.White()}
        disableLighting={true}
      />
    </mesh>
    <mesh
      name="compassBody"
      fromInstance={bodyMesh}
      disposeInstanceOnUnmount
    >
      <standardMaterial
        name="compassBodyMaterial"
        emissiveColor={Color3.White()}
        alpha={0.5}
        disableLighting={true}
      />
    </mesh>
  </>
};

export default Compass;