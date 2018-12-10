import React, { Component } from 'react';
import * as THREE from 'three';
import blockies from 'ethereum-blockies';

export class NewSecurityIcon extends Component {
  // uses hqx pixel scaling with max value 4 x 2 = factor 8
  // identiconData(identity) {
  //   return hqx(
  //     hqx(
  //       blockies.create({
  //         seed: identity,
  //         size: 8,
  //         scale: 1
  //       }),
  //       4
  //     ),
  //     4
  //   ).toDataURL()
  // }
  // uses blockie's factor 8 scaling
  identiconDataPixel(identity) {
    return blockies
      .create({
        seed: identity,
        size: 8,
        scale: 8,
      })
      .toDataURL();
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 8;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    console.log(this);
    console.log(this.renderer);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //Add SPHERE
    //LOAD TEXTURE and on completion apply it on box
    // var loader = new THREE.TextureLoader().load(
    //   "data:image/png;base64,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",
    //   this.onLoad,
    // );

    console.log(this.identiconDataPixel(this.props.address.toLowerCase()));
    var texture = new THREE.TextureLoader().load(
      this.identiconDataPixel(this.props.address.toLowerCase()),
      this.onLoad
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);

    //LIGHTS
    var lights = [];
    lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    this.earthMesh.rotation.x += 0.01;
    this.earthMesh.rotation.y += 0.01;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  onLoad = texture => {
    var objGeometry = new THREE.SphereBufferGeometry(4.5, 100, 100);
    var objMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      shading: THREE.FlatShading,
    });

    this.earthMesh = new THREE.Mesh(objGeometry, objMaterial);
    this.scene.add(this.earthMesh);
    this.renderScene();
    //start animation
    this.start();
  };

  render() {
    return (
      <div
        style={{ width: '250px', height: '250px' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default NewSecurityIcon;
