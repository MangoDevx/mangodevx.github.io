import * as THREE from 'three';

export default class SplashScreenLoader {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.spinSpeed = 0.005; // Variable to control spin speed
    this.isZoomingToFlorida = false;
    this.isFadingOut = false;
    this.fadeOutSpeed = 0.02;
    this.opacity = 1;
    this.floridaCoords = { lat: 28.5383, lon: -81.3792 };
    this.targetRotation = { lat: 28.5383, lon: -81.3792 };
    this.cameraDistance = 15; // Initial camera distance

    // Call the initialize method
    this.init();
  }

  init() {
    // Initialize the scene, camera, and renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 1);
    this.container.appendChild(this.renderer.domElement);

    // Set up the globe with textures
    let geometry = new THREE.SphereGeometry(5, 64, 64);

    let textureLoader = new THREE.TextureLoader();
    let earthDayTexture = textureLoader.load('/textures/earth_daymap.jpg');
    let earthNormalTexture = textureLoader.load('/textures/earth_normal_map.jpg');

    let material = new THREE.MeshStandardMaterial({
      map: earthDayTexture,
      normalMap: earthNormalTexture,
      transparent: true,
      opacity: 1
    });

    this.globe = new THREE.Mesh(geometry, material);
    this.scene.add(this.globe);

    // Set random initial rotation
    this.globe.rotation.x = (Math.random() - 0.5) * Math.PI * 2; // Random latitude rotation (-180 to 180)
    this.globe.rotation.y = Math.random() * Math.PI * 2; // Random longitude rotation (0 to 360)
    this.globe.rotation.z = (Math.random() - 0.5) * Math.PI * 2; // Random Z-axis rotation (-180 to 180)

    // Set up the lighting
    let light = new THREE.AmbientLight(0x404040); // Ambient light
    this.scene.add(light);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    this.scene.add(directionalLight);

    // Set camera position
    this.camera.position.z = this.cameraDistance;

    // Call the animate method
    this.animate();
  }

  animate() {
    this.animationFrame = requestAnimationFrame(() => this.animate());

    if (!this.isZoomingToFlorida) {
      // Use the saved exact Three.js coordinates for Florida
      const targetX = 0.49015312926279625;  // Saved Florida X rotation
      const targetY = -0.15332783314769354; // Adjusted Y rotation to move right
      const targetZ = 0;                     // Saved Florida Z rotation

      let currentX = this.globe.rotation.x;
      let currentY = this.globe.rotation.y;
      let currentZ = this.globe.rotation.z;

      // Smoothly rotate towards the target coordinates using spinSpeed
      this.globe.rotation.x += (targetX - currentX) * this.spinSpeed;
      this.globe.rotation.y += (targetY - currentY) * this.spinSpeed;
      this.globe.rotation.z += (targetZ - currentZ) * this.spinSpeed;

      // Zoom to Florida when the globe is close to the target coordinates
      if (
        Math.abs(targetX - currentX) < 0.01 &&
        Math.abs(targetY - currentY) < 0.01 &&
        Math.abs(targetZ - currentZ) < 0.01
      ) {
        this.startZoomToFlorida();
      }
    } else if (!this.isFadingOut) {
      // Smooth zoom-in effect once we're near Florida
      if (this.camera.position.z > 5) {
        this.camera.position.z -= 0.05; // Zoom in slowly
      } else {
        // Start fade out after zoom is complete
        this.isFadingOut = true;
      }
    } else {
      // Fade out effect
      if (this.opacity > 0) {
        this.opacity -= this.fadeOutSpeed;
        this.globe.material.opacity = this.opacity;
      } else {
        // Animation complete, trigger event
        document.dispatchEvent(new Event('splashScreenComplete'));
        // Stop the animation loop
        cancelAnimationFrame(this.animationFrame);
      }
    }

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  // Function to start the zooming to Florida
  startZoomToFlorida() {
    this.isZoomingToFlorida = true;
  }

  // Function to clean up Three.js resources
  cleanup() {
    // Stop the animation loop
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    // Dispose of geometries
    if (this.globe && this.globe.geometry) {
      this.globe.geometry.dispose();
    }
    
    // Dispose of materials and textures
    if (this.globe && this.globe.material) {
      // Dispose of textures if they exist
      if (this.globe.material.map) this.globe.material.map.dispose();
      if (this.globe.material.normalMap) this.globe.material.normalMap.dispose();
      
      // Dispose of the material
      this.globe.material.dispose();
    }
    
    // Remove the globe from the scene
    if (this.globe && this.scene) {
      this.scene.remove(this.globe);
    }
    
    // Dispose of the renderer
    if (this.renderer) {
      this.renderer.dispose();
      
      // Clear the scene
      if (this.scene) {
        this.scene.clear();
      }
    }
  }
}
