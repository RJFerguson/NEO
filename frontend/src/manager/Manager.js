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
    this.camera.position.z = 9000;

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

    _.each(nodes, (node, i) => {
      const object = new THREE.CSS3DObject(node);
      object.random = Math.random() / 2;
      object.position.x = Math.random() * spreadWidth - (spreadWidth / 2);
      object.position.y = Math.random() * spreadHeight - (spreadHeight / 2);
      object.position.z = Math.random() * spreadDepth - (10 * i);

      this.nodes.push(object);
      this.scene.add(object);
    });
  }

  animate = (t) => {
    TWEEN.update();
    this.controls.update();
    this.render();
    requestAnimationFrame(this.animate);

    _.each(this.nodes, (node, i) => {
      if (i % 2 === 0) {
        node.position.x += Math.sin(t / 10000) * node.random;
        node.position.y += Math.cos(t / 10000) * node.random;
        node.position.z += Math.cos(t / 10000) * node.random;
      }
      else {
        node.position.x -= Math.sin(t / 10000) * node.random;
        node.position.y += Math.cos(t / 10000) * node.random;
        node.position.z += Math.cos(t / 10000) * node.random;
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