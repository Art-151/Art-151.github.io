//works for all floating point animations, takes array of animation objects
//with obj, prop, val and optional dims properties
//starts with current value and animates to "val"
function animate(animations, scene, seconds = 3) {
    //generates discrete animation to add to objects anims
    var frameRate = 5;
    var all_animations = [];
    //iterate through each animation object
    for (let anim of animations) {
        anim.anims = [];
        if (anim.dims) { //if there are dimensions, add one animation for each
            for (const dim of anim.dims) {
                anim.anims.push(discreteAnim(anim.prop, dim, anim.obj[anim.prop], anim.val, frameRate, seconds));
            }
        } else { //otherwise add just one animation
            anim.anims.push(discreteAnim(anim.prop, false, anim.obj[anim.prop], anim.val, frameRate, seconds));
        }
        //initalize animationz
        all_animations.push(anim.anims);
        scene.beginDirectAnimation(anim.obj, anim.anims, 0, seconds * frameRate, false);
    }
    return all_animations;
}

//creates animation for a discrete property
function discreteAnim(type, dim, pos1, pos2, frameRate, seconds) {
    var anim_name;
    var anim_type; 
    var keys = []; 
    if(dim){
        anim_name = type + "_" + dim;
        anim_type = type + "." + dim;
        keys.push(pos1[dim]);
        keys.push(pos2[dim]);  
    }else{
        anim_name = type;
        anim_type = type;
        keys.push(pos1);
        keys.push(pos2);  
    }
    var anim = new BABYLON.Animation(anim_name, anim_type, frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keyFrames = [];
    keyFrames.push({ frame: 0, value: keys[0] });
    keyFrames.push({ frame: frameRate*seconds, value: keys[1]});
    anim.setKeys(keyFrames);
    return anim;
}
//load and place object in scene
function placeObject(folder, file, position, scene, scale = 1, rotation = new BABYLON.Vector3(0, 0, 0), wrap_color = new BABYLON.Color3(0.5, 0.5, 0.5)){
    let object = BABYLON.SceneLoader.ImportMesh(
        null,
         folder,
        file,
        scene,
        function (meshes) { 
           for (const mesh of meshes) { 
            mesh.position = position;
            mesh.rotation = rotation;
            mesh.scaling = new BABYLON.Vector3(scale, scale, scale);
            var mat = new BABYLON.StandardMaterial("material", scene);
            mat.diffuseColor = wrap_color;
            mesh.material = mat;  
           }                 
    });
}
