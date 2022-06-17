// striker.c.js

let shellCache = null;
let state = false;
let salvoRocketsCount = 8;
let targetId;

Striker.init = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let striker = GameObjects.getStrikerComponent();

    if (!striker)
    {
        return;
    }

    let targetingSystem = striker.targetingSystem_0.targetingSystem_vutpoz$_0;

    if (!targetingSystem)
    {
        targetingSystem = striker.targetingSystem_0.targetingSystem_0;
    }

    let targetingSectorsCalculator = targetingSystem.directionCalculator_0.targetingSectorsCalculator_0;

    if (targetingSectorsCalculator)
    {
        targetingSectorsCalculator.maxElevationAngle_0 = 100000;
        targetingSectorsCalculator.minElevationAngle_0 = -100000;
    }

    salvoRocketsCount = striker.salvoRocketsCount;

    striker.__proto__.lockTarget_gcez93$ = function (t, e, n)
    {
        if (e != null && e != localPlayer.at(4).userId)
        {
            targetId = e;
        }
        
        striker.stopAiming();
        t.targetId = localPlayer.at(4).userId;
        this.lockTarget_gcez93$$default(t, e);
        return true;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("shellCache_0"))
        {
            shellCache = localPlayer.at(i).shellCache_0.itemsInUse_123ot1$_0.array_hd7ov6$_0;
            break;
        }
    }
}

Striker.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let striker = GameObjects.getStrikerComponent();

    if (!striker)
    {
        return;
    }

    striker.stopAiming();

    if (KeyPressing.isKeyPressed(82 /*key: R*/) && Utils.isNotOpenChat())
    {
        state = true;
    }

    if (shellCache)
    {
        if (shellCache.length == salvoRocketsCount)
        {
            setTimeout(() => { state = true; }, 2000);
        }

        let targetPos = { x: 0, y: 0, z: 0 };

        if (targetId)
        {
            let bodies = world.physicsScene_0.bodies_0.array_hd7ov6$_0;

            for (let i = 0; i < bodies.length; i++)
            {
                let idComponent = bodies.at(i).data.components_0.array;

                for (let i = 0; i < idComponent.length; i++)
                {
                    if (idComponent.at(i).hasOwnProperty("userId_dt4r72$_0"))
                    {
                        idComponent = idComponent.at(i);
                    }
                }

                if (idComponent && idComponent.hasOwnProperty("userId_dt4r72$_0"))
                {
                    if (idComponent.userId_dt4r72$_0 == targetId)
                    {
                        if (bodies.at(i).state.position)
                        {
                            targetPos = bodies.at(i).state.position;
                            break;
                        }
                    }
                }
            }
        }

        if (state)
        {
            for (let i = 0; i < shellCache.length; i++)
            {
                shellCache.at(i).components_0.array.at(1).direction.x = 0;
                shellCache.at(i).components_0.array.at(1).direction.y = 0;
                shellCache.at(i).components_0.array.at(1).direction.z = 0;

                if (targetPos)
                {
                    shellCache.at(i).components_0.array.at(1).position.x = targetPos.x;
                    shellCache.at(i).components_0.array.at(1).position.y = targetPos.y;
                    shellCache.at(i).components_0.array.at(1).position.z = targetPos.z;
                }
            }

            if (shellCache.length == 0)
            {
                state = false;
            }
        }
        else
        {
            for (let i = 0; i < shellCache.length; i++)
            {
                shellCache.at(i).components_0.array.at(1).direction.x = 0;
                shellCache.at(i).components_0.array.at(1).direction.y = 0;
                shellCache.at(i).components_0.array.at(1).direction.z = 0;
            }
        }
    }
}