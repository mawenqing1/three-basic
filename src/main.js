import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//创建场景
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

camera.position.set(0,0,10);
scene.add(camera);

// 添加物体
//创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
//几何体材质
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

//修改物体位置
// cube.position.set(5,0,0);
//缩放
// cube.scale.set(3,2,1);
//旋转
// cube.rotation.set(Math.PI/4, 0, 0);

scene.add(cube)

//初始化渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

//添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render(time) {
    let t = time / 1000 % 5;
    cube.position.x = t + 1;
    if(cube.position.x > 5) {
        cube.position.x = 0;
    }
    // cube.scale.x += 0.01;
    // if(cube.scale.x > 5) {
    //     cube.scale.x = 1;
    // }
    cube.rotation.x += Math.PI / 180;
    cube.rotation.y += Math.PI / 180;
    cube.rotation.z += Math.PI / 180;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    controls.update();
}

render()