import * as THREE from "three";
//轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//动画库
import gsap from "gsap";
import * as dat from "dat.gui";
import { roughness } from "three/examples/jsm/nodes/Nodes.js";

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
const cubeGeometry = new THREE.BoxGeometry(15.5, 13.5, 1);
//几何体材质
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://cdn.shopify.com/s/files/1/0741/5129/7333/files/exam-test.jpg');
const materials = [
    new THREE.MeshBasicMaterial({ color: 0x51efe4, map: texture, roughness: 0.9, metalness: 0 }), // 正面
    new THREE.MeshBasicMaterial({ map: texture, roughness: 0.9, metalness: 0 }), // 右
    new THREE.MeshBasicMaterial({ map: texture, roughness: 0.9, metalness: 0 }), // 上面
    new THREE.MeshBasicMaterial({ map: texture, roughness: 0.9, metalness: 0 }), // 下面
    new THREE.MeshBasicMaterial({ map: texture, roughness: 0.9, metalness: 0 }), // 正面
    new THREE.MeshBasicMaterial(), // 后
];
// const cubeMaterial = new THREE.MeshBasicMaterial();
const cube = new THREE.Mesh(cubeGeometry, materials);
scene.add(cube);

// const geometry = new THREE.BufferGeometry();
// const vertices = new Float32Array([
//     -1.0,-1.0,1.0,
//     1.0,-1.0,1.0,
//     1.0,1.0,1.0,
//     1.0,1.0,1.0,
//     -1.0,1.0,1.0,
//     -1.0,-1.0,1.0,
// ]);
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices,3))
// const Material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const mesh = new THREE.Mesh(geometry, Material);
// scene.add(mesh);

//gui 控制库
const gui = new dat.GUI();
// gui.add(cube.position, "x")
//     .min(0)
//     .max(5)
//     .step(1)
//     .name("x轴坐标")
//     .onChange((value) => {
//         // console.log("x:", value);
//     })
//     .onFinishChange((val) => {
//         console.log(val);
//     });
const params = {
    color: "#ffff00",
    animation: () => {
        //动画
        if(animation1.isActive()) {
            animation1.pause();
            animation2.pause();
        } else {
            animation1.resume();
            animation2.resume();
        }
    },
}
// gui.addColor(params, 'color').onChange((val) => {
//     console.log(val);
//     cube.material.color.set(val)
// });

// const folder = gui.addFolder("设置立方体");
// folder.add(cube.material, "wireframe").name("线框模式");
// folder.add(cube,"visible").name("是否显示");
// folder.add(params, 'animation').name('动画');

//初始化渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
//控制器阻尼
controls.enableDamping = true;

//添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//跟踪时间
const clock = new THREE.Clock();

//动画
// const animation1 = gsap.to(cube.position, {
//     x: 5,
//     duration: 5,
//     ease: "power1.inOut",
//     repeat: -1,  //重复次数
//     yoyo: true,
//     //delay 延时时间
//     onComplete: () => {
//         console.log("动画完成");
//     },
//     onStart: () => {
//         console.log("动画开始");
//     },
// });

// const animation2 = gsap.to(cube.rotation, {
//     x: Math.PI * 2,
//     duration: 5,
//     ease: "power1.inOut",
//     repeat: -1,
//     yoyo: true,
//     onComplete: () => {
//         console.log("动画完成");
//     },
//     onStart: () => {
//         console.log("动画开始");
//     },
// });

//全屏操作
window.addEventListener("dblclick", () => {
        const fullScreenElement = document.fullscreenElement;
        if (fullScreenElement) {
            document.exitFullscreen();
        } else {
            renderer.domElement.requestFullscreen();
        }
});

function render() {
    // let t = clock.getElapsedTime() % 5;
    // cube.position.x = t;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    controls.update();
}

render();

//自适应尺寸
window.addEventListener("resize", () => {
    //更新相机摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //更新摄像机投影矩阵
    camera.updateProjectionMatrix();
    //更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    //渲染器像素比例
    renderer.setPixelRatio(window.devicePixelRatio);
});
