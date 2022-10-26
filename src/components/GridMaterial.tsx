import '@babylonjs/core/Physics/physicsEngineComponent'; // side-effect adds scene.enablePhysics function
import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent'; // side-effect for shadow generator
import { Color3 } from '@babylonjs/core';
import { GridMaterial } from '@babylonjs/materials';

import {
    HostRegistrationStore,
    FiberPushMaterialPropsHandler,
    FiberMaterialPropsHandler,
    checkColor3Diff,
    checkTextureDiff,
    checkPrimitiveDiff,
    checkVector3Diff,
    PropertyUpdate,
} from 'react-babylonjs';

import * as CANNON from 'cannon';

window.CANNON = CANNON;

class GridMaterialPropsHandler {
    getPropertyUpdates(oldProps: any, newProps: any) {
        const changedProps: PropertyUpdate[] = [];
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
    propsHandlers: any = null

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

    addPropsHandler(propHandler: any) {
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

const App = (props: { gridMaterial: any; }) => {
    const Grid = props.gridMaterial;
    return (
        <ground name="ground1" width={24} height={24} subdivisions={2}>
            <Grid lineColor={Color3['Green']()} />
        </ground>
    );
};
export default App;
