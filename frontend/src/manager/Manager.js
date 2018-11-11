import _ from 'lodash';

const { THREE, TWEEN } = window;

let
  width = window.innerWidth,
  height = window.innerHeight;

export default class Manager {

  constructor() {
    this.nodes = [];
  }

  init(node) {
    if (this.scene) return;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    this.camera.position.z = 100000;

    this.renderer = new THREE.CSS3DRenderer();
    const { domElement } = this.renderer;
    this.renderer.setSize(width, height);
    node.appendChild(domElement);

    this.controls = new THREE.TrackballControls(this.camera, domElement);
    this.controls.keys = [65, 83, 32];
    this.controls.noRotate = true;

    this.animate();

    window.addEventListener('resize', this.onWindowResize, false);
    return this;
  }

  initNodes(nodes) {
    const spreadWidth = width * 6,
      spreadHeight = height * 6,
      spreadDepth = width * 50;

    _.each(nodes, (object, i) => {
      const node = new THREE.CSS3DObject(object);
      node.random = Math.random() / 2;
      node.position.x = Math.random() * spreadWidth - (spreadWidth / 2);
      node.position.y = Math.random() * spreadHeight - (spreadHeight / 2);
      node.position.z = -Math.random() * spreadDepth - (10 * i) + 100000;

      this.nodes.push(node);
      this.scene.add(node);
    });
  }

  animate = (t) => {
    TWEEN.update();
    this.controls.update();
    this.render();
    requestAnimationFrame(this.animate);

    _.each(this.nodes, (node, i) => {
      if (i % 2 === 0) {
        node.position.x += Math.sin(t / 1000) * node.random * 2;
        node.position.y += Math.cos(t / 1000) * node.random * 2;
        node.position.z += Math.cos(t / 1000) * node.random * 2;
      }
      else {
        node.position.x -= Math.sin(t / 1000) * node.random * 2;
        node.position.y += Math.cos(t / 1000) * node.random * 2;
        node.position.z += Math.cos(t / 1000) * node.random * 2;
      }
    });
  };

  onWindowResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

}