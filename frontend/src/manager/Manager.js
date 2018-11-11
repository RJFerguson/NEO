import _ from 'lodash';

let
  { THREE, TWEEN } = window,
  width = window.innerWidth,
  height = window.innerHeight;

export default class Manager {

  constructor() {
    this.nodes = [];

    this.duration = 900;
    this.selectedNode = null;
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
      object.onclick = e => {
        e.preventDefault();
        this.transformNode(i);
      };

      const node = new THREE.CSS3DObject(object);
      node.random = Math.random() / 2;
      node.position.x = Math.random() * spreadWidth - (spreadWidth / 2);
      // node.position.y = Math.random() * spreadHeight - (spreadHeight / 2);
      node.position.z = -Math.random() * spreadDepth - (10 * i) + 100000;

      this.nodes.push(node);
      this.scene.add(node);
    });
  }

  transformNode = i => {
    const { duration, camera } = this;
    const cameraPosition = camera.position;

    TWEEN.removeAll();

    // Return currently selected back to its original position
    if (this.selectedNode && this.selectedNode.originalPosition) {
      new TWEEN.Tween(this.selectedNode.position)
      .to(this.selectedNode.originalPosition, duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();
    }

    // Reset selected node
    if (this.selectedNode) {
      this.selectedNode.element.classList.remove('focus');
    }

    // Set selected node
    this.selectedNode = this.nodes[i];
    this.selectedNode.originalPosition = { ...this.selectedNode.position };
    this.selectedNode.element.classList.add('focus');

    // Position transformation
    new TWEEN.Tween(this.selectedNode.position)
    .to({ ...cameraPosition, z: cameraPosition.z - 2000 }, duration)
    .easing(TWEEN.Easing.Exponential.InOut)
    .start();

    // Rotation transformation
    const value = { rotation: 0 };
    new TWEEN.Tween(value)
    .to({ rotation: Math.PI * 2 }, duration)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => this.selectedNode.rotation.y = value.rotation)
    .start();
  };

  animate = d => {
    TWEEN.update();

    this.controls.movementSpeed = 0.33 * d;
    this.controls.update(d);

    this.render();
    requestAnimationFrame(this.animate);

    _.each(this.nodes, (node, i) => {
      if (node === this.selectedNode) return;

      if (i % 2 === 0) {
        node.position.x += Math.sin(d / 1000) * node.random * 2;
        node.position.y += Math.cos(d / 1000) * node.random * 2;
        node.position.z += Math.cos(d / 1000) * node.random * 2;
      }
      else {
        node.position.x -= Math.sin(d / 1000) * node.random * 2;
        node.position.y += Math.cos(d / 1000) * node.random * 2;
        node.position.z += Math.cos(d / 1000) * node.random * 2;
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