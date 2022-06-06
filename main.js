import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Sphere } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
document.body.appendChild( renderer.domElement );

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(50);
camera.position.setX(0);
camera.position.setY(20);



renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347}); 
const torus = new THREE.Mesh(geometry,material);

//scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(1000,0,0)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200.50);
scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement);

//Stars

function addStar(){
  const geometry = new THREE.SphereGeometry(0.5,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh (geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1500));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(1500).fill().forEach(addStar)

//Background

const spaceTexture = new THREE.TextureLoader().load('space2.jpg');
scene.background = spaceTexture;

//Sun

const sunTexture = new THREE.TextureLoader().load('sun.jpg')

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(500,32,32),
  new THREE.MeshStandardMaterial({
    map:sunTexture,
  })
)
sun.position.set(100,0,-1000)
scene.add(sun)

//Earth

const earthTexture = new THREE.TextureLoader().load('earth.webp');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5,32,32),
  new THREE.MeshStandardMaterial({
    map:earthTexture,
  })
);
earth.position.set(20,0,0);
scene.add(earth)

//Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
  })
);
moon.position.set(50,0,-20);
scene.add(moon);

//Scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  //camera.position.z = t * -0.01;
  camera.position.x = t * -0.02;
  camera.rotation.y = t * -0.02;
}


document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y +=0.0008
  moon.rotation.y +=0.001
   controls.update();

  renderer.render(scene, camera);

}


animate();
