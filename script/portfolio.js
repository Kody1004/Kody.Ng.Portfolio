import * as THREE from "three"; 
import {STLLoader} from 'three/addons/loaders/STLLoader';

const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
scene.background = new THREE.Color(0x90B0CE);
let showing_background = false
const renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF});
const cube = new THREE.Mesh(geometry,material);
scene.add(cube)



camera.position.z = 500;
const material2 = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
const light = new THREE.PointLight(0xffffff,5,1500)
light.position.set(500,0,500)
scene.add(light)
const loader =  new STLLoader();
let mesh;
loader.load(
    'assets/Untitled v14.stl',
    function (geometry) {
        mesh = new THREE.Mesh(geometry,material2)
        scene.add(mesh)
        mesh.scale.set(.01,.01,.01);
        mesh.rotation.x = 20
        mesh.position.x = -100
        mesh.rotation.y = 3
        mesh.position.y = -10
        mesh.rotation.z = 20
        mesh.position.z = -40

    },
    (xhr) =>{
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    renderer.setSize(canvasWidth,canvasHeight);
    camera.aspect = canvasWidth / canvasHeight;
    canvas.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame( animate );
    renderer.render(scene, camera );
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.01
    if (mesh && showing_background) {
        //mesh.rotation.x += 0.01
        mesh.rotation.z += 0.01
        //mesh.rotation.y += 0.01
    }
}

animate();

window.addEventListener("resize",resizeCanvas);

function onload() {
    let canvas = document.getElementById('threejs-canvas')
    let button = document.getElementById('see-more')
    let message = document.getElementById('hero-message')
    canvas.appendChild( renderer.domElement );
    
    button.addEventListener("click", click_button_show)
}


function click_button_show() {
    let canvas = document.getElementById('threejs-canvas')
    let message = document.getElementById('hero-message')
    showing_background = !showing_background;
    set_blur(!showing_background, canvas);
    hideElement(showing_background, message);
    
}

function hideElement(hide, element) {
    if (hide) {
        element.classList.add("hide")
    }
    else {
        element.classList.remove("hide")
    }
}

window.addEventListener("load",onload);

function set_blur(blur,element) {
    if (blur) {
        element.classList.add("blur")
    }
    else {
        element.classList.remove("blur")
    }
}

