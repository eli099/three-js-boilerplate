import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';

import WebGL from 'three/addons/capabilities/WebGL.js';

if (WebGL.isWebGL2Available()) {

  // Initiate function or other initializations here

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  // document.body.appendChild("info");

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(0, 100, 0);
  camera.lookAt(0, 0, 0);

  // ? move around
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.z = 5;
  controls.update();

  const scene = new THREE.Scene();

  //create a blue LineBasicMaterial
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  // Geometry
  const points = [];
  points.push(new THREE.Vector3(- 10, 0, 0));
  points.push(new THREE.Vector3(-5, 0, 0));
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(5, 0, 0));
  points.push(new THREE.Vector3(5, -10, 0));


  points.push(new THREE.Vector3(-10, -10, 0));
  points.push(new THREE.Vector3(-10, -5, 0));
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(-10, 5, 0));
  points.push(new THREE.Vector3(-10, 10, 0));
  points.push(new THREE.Vector3(5, 10, 0));
  points.push(new THREE.Vector3(5, 0, 0));
  points.push(new THREE.Vector3(15, 0, 0));
  points.push(new THREE.Vector3(15, -20, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line(geometry, material);

  scene.add(line);


  const image = new Image()
  const texture = new THREE.Texture(image)
  texture.colorSpace = THREE.SRGBColorSpace

  image.onload = () => {
    texture.needsUpdate = true
  }

  image.src = 'assets/cheeseMap.jpg'


  const cubeGeometry = new THREE.BoxGeometry(7, 7, 7);
  const materialTwo = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(cubeGeometry, materialTwo);
  scene.add(cube);

  // load a texture, set wrap mode to repeat
  // const texture = new THREE.TextureLoader().load("assets/cheeseMap.jpg");
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.repeat.set(4, 4);

  // ! TEST
  // const something = document.getElementById("info")
  // const texty = new CSS3DRenderer({ something })
  // document.body.appendChild(texty.domElement);

  // const renderer2 = new CSS3DRenderer();
  //     document.body
  //       .getElementById("info")
  //       .appendChild(renderer2.domElement);

  renderer.render(scene, camera);
  // renderer2.render(scene, camera);

  // ? Animate cube
  function animate() {
    cube.rotation.x += 0.0;
    cube.rotation.y += 0.0;
    cube.rotation.z += 0.01;

    line.rotation.x += 0.0;
    line.rotation.y += 0.0;
    line.rotation.z += 0.0;
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);

} else {

  const warning = WebGL.getWebGL2ErrorMessage();
  document.getElementById('container').appendChild(warning);

}

