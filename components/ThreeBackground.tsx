"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Terminal の theme コマンドが発火するイベント名（パーティクル色の同期用）
export const THEME_CHANGE_EVENT = "profile-theme-change";

// 旧 main.js §3: Three.js 背景パーティクル
export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    // ピクセル比を考慮してレンダリング負荷を下げる（最大2倍まで）
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 画面幅に応じてパーティクル数を調整（スマホ: 100, PC: 200）
    const count = window.innerWidth < 768 ? 100 : 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };
    document.addEventListener("mousemove", onMouseMove);

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.002;
      particles.rotation.x += (mouseY * 0.5 - particles.rotation.x) * 0.05;
      particles.rotation.y += (mouseX * 0.5 - particles.rotation.y) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // theme コマンドとの色同期
    const onThemeChange = () => {
      const next = document.body.classList.contains("light-theme")
        ? 0x111111
        : 0xffffff;
      material.color.setHex(next);
    };
    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="canvas-container" />;
}
