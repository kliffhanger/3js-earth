let scene;
let camera;
let renderer;


function main()
{
    const canvas = document.querySelector('#c');


    scene = new THREE.Scene();

    //camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //camera.position.z = 1.5;

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2.5; // move the camera closer to the earth
    camera.fov = 30; // increase the FOV to make the earth appear larger
    camera.updateProjectionMatrix(); // update the camera projection matrix

    scene.add(camera);

    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true,});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.autoClear = true;
    //renderer.setClearColor(0x00000, 0.0);
    renderer.setClearColor(0xffffff, 1.0);

        
    // create earthgeometry

    const earthgeometry = new THREE.SphereGeometry(0.6,32,32);

    const eatrhmaterial = new THREE.MeshPhongMaterial({
        roughness : 1,
        metalness:0,
        map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('texture/earthbump.jpg'),
        bumpScale: 0.3,
    });

    const earthmesh = new THREE.Mesh(earthgeometry,eatrhmaterial);

    scene.add(earthmesh);

    //sun
    const sungeometry = new THREE.SphereGeometry( 0.2, 32, 16 );
    const sunmaterial =  new THREE.MeshPhongMaterial({
        roughness : 1,
        metalness:0,
        map: THREE.ImageUtils.loadTexture('texture/sun.jpg'),
        emissive: 0xffff00,
        emissiveIntensity: .7  // set emissive intensity
        // bumpMap: THREE.ImageUtils.loadTexture('texture/normal.jpg'),
        // bumpScale: 0.3,
    });
    const sunsphere = new THREE.Mesh( sungeometry, sunmaterial );
    scene.add( sunsphere );

    // set ambientlight

    const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientlight);

    // set point light

    const pointerlight =  new THREE.PointLight(0xffffff,0.9);

    // set light position

    pointerlight.position.set(.5,.5,0);
    scene.add(pointerlight);




    // cloud
    const cloudgeometry =  new THREE.SphereGeometry(0.63,32,32);

    const cloudmaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
        transparent: true
    });

    const cloudmesh = new THREE.Mesh(cloudgeometry,cloudmaterial);

    scene.add(cloudmesh);


    // star

    // const stargeometry =  new THREE.SphereGeometry(80,64,64);

    // const starmaterial = new THREE.MeshBasicMaterial({

    //     map: THREE.ImageUtils.loadTexture('texture/galaxy.png'),
    //     side: THREE.BackSide
    // });

    // const starmesh = new THREE.Mesh(stargeometry,starmaterial);

    // scene.add(starmesh);

    const animate = () =>{
        requestAnimationFrame(animate);
        earthmesh.position.x= 1.5;
        cloudmesh.position.x=1.5;
        sunsphere.position.x=.5;
        sunsphere.position.y=.4;
        sunsphere.rotation.z -= 0.0015;
        earthmesh.rotation.y -= 0.0015;
        cloudmesh.rotation.y += 0.0015;
        //starmesh.rotation.y += 0.0005;

        render();
    }

    const render = () => {
        renderer.render(scene,camera);
    }

    animate();
}

window.onload = main;