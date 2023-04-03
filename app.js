// let scene;
// let camera;
// let renderer;


// function main()

// {
//     const canvas = document.querySelector('#c');


//     scene = new THREE.Scene();

//     //camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     //camera.position.z = 1.5;

//     camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 2.5; // move the camera closer to the earth
//     camera.fov = 30; // increase the FOV to make the earth appear larger
//     camera.updateProjectionMatrix(); // update the camera projection matrix

//     scene.add(camera);

//     renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true,});
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);

//     renderer.autoClear = true;
//     //renderer.setClearColor(0x00000, 0.0);
//     renderer.setClearColor(0xffffff, 1.0);

        
//     // create earthgeometry

//     const earthgeometry = new THREE.SphereGeometry(0.6,32,32);

//     const eatrhmaterial = new THREE.MeshPhongMaterial({
//         roughness : 1,
//         metalness:0,
//         map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg'),
//         bumpMap: THREE.ImageUtils.loadTexture('texture/earthbump.jpg'),
//         bumpScale: 0.3,
//     });

//     const earthmesh = new THREE.Mesh(earthgeometry,eatrhmaterial);

//     scene.add(earthmesh);

//     //sun
//     const sungeometry = new THREE.SphereGeometry( 0.2, 32, 16 );
//     const sunmaterial =  new THREE.MeshPhongMaterial({
//         roughness : 1,
//         metalness:0,
//         map: THREE.ImageUtils.loadTexture('texture/sun.jpg'),
//         emissive: 0xffff00,
//         emissiveIntensity: .7  // set emissive intensity
//         // bumpMap: THREE.ImageUtils.loadTexture('texture/normal.jpg'),
//         // bumpScale: 0.3,
//     });
//     const sunsphere = new THREE.Mesh( sungeometry, sunmaterial );
//     scene.add( sunsphere );

//     // set ambientlight

//     const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
//     scene.add(ambientlight);

//     // set point light

//     const pointerlight =  new THREE.PointLight(0xffffff,0.9);

//     // set light position

//     pointerlight.position.set(.5,.5,0);
//     scene.add(pointerlight);




//     // cloud
//     const cloudgeometry =  new THREE.SphereGeometry(0.63,32,32);

//     const cloudmaterial = new THREE.MeshPhongMaterial({
//         map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
//         transparent: true
//     });

//     const cloudmesh = new THREE.Mesh(cloudgeometry,cloudmaterial);

//     scene.add(cloudmesh);


//     // star

//     // const stargeometry =  new THREE.SphereGeometry(80,64,64);

//     // const starmaterial = new THREE.MeshBasicMaterial({

//     //     map: THREE.ImageUtils.loadTexture('texture/galaxy.png'),
//     //     side: THREE.BackSide
//     // });

//     // const starmesh = new THREE.Mesh(stargeometry,starmaterial);

//     // scene.add(starmesh);

//     const animate = () =>{
//         requestAnimationFrame(animate);
//         earthmesh.position.x= 1.5;
//         cloudmesh.position.x=1.5;
//         sunsphere.position.x=.5;
//         sunsphere.position.y=.4;
//         sunsphere.rotation.z -= 0.0015;
//         earthmesh.rotation.y -= 0.0015;
//         cloudmesh.rotation.y += 0.0015;
//         //starmesh.rotation.y += 0.0005;

//         render();
//     }

//     const render = () => {
//         renderer.render(scene,camera);
//     }

//     animate();
// }

// window.onload = main;


//size



let Windowwidth = window.innerWidth;
let Windowheight = window.innerHeight;
let scrollPosition = 0;


function main(Windowwidth,Windowheight){
//scene    
const scene = new THREE.Scene();


// create a black background for the top half of the scene
var blackGeometry = new THREE.PlaneGeometry(Windowwidth , Windowheight/2);
var blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
var blackMesh = new THREE.Mesh(blackGeometry, blackMaterial);
blackMesh.position.set(0, Windowheight/4, 0);
scene.add(blackMesh);

// create a grey background for the bottom half of the scene
var greyGeometry = new THREE.PlaneGeometry(Windowwidth, Windowheight/2);
var greyMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
var greyMesh = new THREE.Mesh(greyGeometry, greyMaterial);
greyMesh.position.set(0, -Windowheight/4, 0);
scene.add(greyMesh);

//test

const spritemap = new THREE.TextureLoader().load( 'texture/sprite1.png' );
const spritematerial = new THREE.SpriteMaterial( { map: spritemap } );

const sprite = new THREE.Sprite( spritematerial );
scene.add( sprite );

//sun

// load the noise texture
const noiseTexture = THREE.ImageUtils.loadTexture('texture/sunNoise.png');
noiseTexture.wrapS = THREE.RepeatWrapping;
noiseTexture.wrapT = THREE.RepeatWrapping;
noiseTexture.repeat.set(4, 4);

const sungeometry = new THREE.SphereGeometry( 1, 64, 64 );
const sunmaterial =  new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('texture/sun.jpg'),
    emissive: new THREE.Color(0xffff00),
    emissiveIntensity: 0.9,
    color: new THREE.Color(0xffff00),
    transparent: true,
    opacity: 0.9,
    bumpMap: THREE.ImageUtils.loadTexture('texture/sunBump.webp'),
    bumpScale: 0.5,
    emissiveMap: noiseTexture,
});
const sunsphere = new THREE.Mesh( sungeometry, sunmaterial );
sunsphere.position.set(2, 4, -0.9);
scene.add( sunsphere );

// create the sun light and add it to the scene
const sunLight = new THREE.PointLight(0xffffff, 1, 100);
sunLight.position.copy(sunsphere.position);
scene.add(sunLight);   

// create a second light behind the sun to highlight its circle
const sunHighlightLight = new THREE.PointLight(new THREE.Color(0xffff00), 1, 10);
sunHighlightLight.position.set(2, 4, 1);
scene.add(sunHighlightLight);


//create a sphere
const Geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshPhongMaterial({
            roughness : 1,
            metalness:0,
            map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('texture/earthbump.jpg'),
            bumpScale: 0.3,
        });
const mesh = new THREE.Mesh(Geometry, material);
mesh.position.x = 4;
scene.add(mesh);

// create the border geometry and material

// create the border texture
const textureLoader = new THREE.TextureLoader();
const dottedTexture = textureLoader.load('texture/circle.jpg');

const borderGeometry = new THREE.RingGeometry(3.3, 3.32, 64);
const borderMaterial = new THREE.MeshBasicMaterial({map: dottedTexture});

// create the border mesh and position it behind the earth
const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
borderMesh.position.set(4.1, 0, 0);
scene.add(borderMesh);


//camera
const camera =  new THREE.PerspectiveCamera(45, Windowwidth/Windowheight);
camera.position.z = 11;

scene.add(camera);

//light
// const light =  new THREE.PointLight(0xffffff,1, 1000);
// light.position.set(0, 10, 10);
// scene.add(light);

const ambientlight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientlight);


//render
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(Windowwidth ,Windowheight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);



const loop = () =>{

    renderer.render(scene,camera);
    window.requestAnimationFrame(loop);
    window.addEventListener('scroll', onScroll);
    mesh.rotation.y -= 0.0015;
    sunsphere.rotation.y += 0.0015;
    
}
function onScroll() {
    // Update scroll position
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    scrollPosition = scrollTop / (document.body.scrollHeight - window.innerHeight);
  
    // Move camera based on scroll position
    camera.position.y = 1 - scrollPosition * 2;
  }
loop();

}
window.onload = main(Windowwidth,Windowheight*2); 

window.addEventListener('resize', () =>{
    
    Windowwidth = window.innerWidth;
    Windowheight = window.innerHeight;
    main(Windowwidth,Windowheight*2);
})
