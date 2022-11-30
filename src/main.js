import * as THREE from "three";
//轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//动画库
import gsap from "gsap";

//创建场景
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
//创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//几何体材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

//修改物体位置
// cube.position.set(5,0,0);
//缩放
// cube.scale.set(3,2,1);
//旋转
// cube.rotation.set(Math.PI/4, 0, 0);

scene.add(cube);

//初始化渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

//添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//跟踪时间
const clock = new THREE.Clock();

//动画
const animation1 = gsap.to(cube.position, {
    x: 5,
    duration: 5,
    ease: "power1.inOut",
    repeat: -1,  //重复次数
    yoyo: true,
    //delay 延时时间 
    onComplete: () => {
        console.log("动画完成");
    },
    onStart: () => {
        console.log("动画开始");
    },
});

window.addEventListener("dblclick", () => {
    if(animation1.isActive()) {
        animation1.pause();//暂停
    } else {
        animation1.resume(); //恢复
    }
})

gsap.to(cube.rotation, {
    x: Math.PI * 2,
    duration: 5,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
    onComplete: () => {
        console.log("动画完成");
    },
    onStart: () => {
        console.log("动画开始");
    },
});

function render() {
    // let t = clock.getElapsedTime() % 5;
    // cube.position.x = t;
    // if(cube.position.x > 5) {
    //     cube.position.x = 0;
    // }
    // cube.scale.x += 0.01;
    // if(cube.scale.x > 5) {
    //     cube.scale.x = 1;
    // }
    // cube.rotation.x = t + Math.PI / 180;
    // cube.rotation.y = t + Math.PI / 180;
    // cube.rotation.z = t + Math.PI / 180;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    controls.update();
}

render();
