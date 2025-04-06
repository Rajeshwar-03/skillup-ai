
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeJSAnimationProps {
  isTyping: boolean;
}

export const ThreeJSAnimation = ({ isTyping }: ThreeJSAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number>(0);

  // Set up the scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x111827); // Dark background to match the UI

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create a sphere (AI assistant icon/brain visualization)
    const geometry = new THREE.IcosahedronGeometry(1.5, 2);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x6366f1, // Indigo color matching the primary theme
      wireframe: true,
      emissive: 0x3730a3,
      emissiveIntensity: 0.3,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Add particles for a more dynamic effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x8b5cf6,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.005;
      }
      
      particlesMesh.rotation.x += 0.002;
      particlesMesh.rotation.y += 0.002;
      
      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current!, cameraRef.current);
      }
    };

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose of resources
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        (meshRef.current.material as THREE.Material).dispose();
      }
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  // Effect for responding to typing state changes
  useEffect(() => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as THREE.MeshPhongMaterial;
    
    if (isTyping) {
      // When the user is typing, make the animation more energetic
      material.emissiveIntensity = 0.8;
      material.color.set(0x8b5cf6); // Brighter purple color
      
      // Animate the mesh to respond to typing
      meshRef.current.scale.set(1.2, 1.2, 1.2);
    } else {
      // When idle, return to normal state
      material.emissiveIntensity = 0.3;
      material.color.set(0x6366f1); // Return to default color
      
      // Reset the scale
      meshRef.current.scale.set(1.0, 1.0, 1.0);
    }
  }, [isTyping]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div ref={containerRef} className="h-60 w-full rounded-lg overflow-hidden" />;
};
