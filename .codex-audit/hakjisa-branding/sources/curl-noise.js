// Simplex Noise 3D implementation
class SimplexNoise3D {
    constructor() {
        this.grad3 = [
            [1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
            [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
            [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]
        ];
        
        this.p = [];
        for(let i = 0; i < 256; i++) {
            this.p[i] = Math.floor(Math.random() * 256);
        }
        
        // Duplicate the permutation vector
        this.perm = new Array(512);
        for(let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255];
        }
    }

    dot(g, x, y, z) {
        return g[0] * x + g[1] * y + g[2] * z;
    }

    noise(xin, yin, zin) {
        let n0, n1, n2, n3;
        
        const F3 = 1.0/3.0;
        const s = (xin + yin + zin) * F3;
        const i = Math.floor(xin + s);
        const j = Math.floor(yin + s);
        const k = Math.floor(zin + s);
        
        const G3 = 1.0/6.0;
        const t = (i + j + k) * G3;
        const X0 = i - t;
        const Y0 = j - t;
        const Z0 = k - t;
        const x0 = xin - X0;
        const y0 = yin - Y0;
        const z0 = zin - Z0;

        let i1, j1, k1;
        let i2, j2, k2;
        
        if(x0 >= y0) {
            if(y0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
            else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
            else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
        } else {
            if(y0 < z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
            else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
            else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
        }

        const x1 = x0 - i1 + G3;
        const y1 = y0 - j1 + G3;
        const z1 = z0 - k1 + G3;
        const x2 = x0 - i2 + 2.0*G3;
        const y2 = y0 - j2 + 2.0*G3;
        const z2 = z0 - k2 + 2.0*G3;
        const x3 = x0 - 1.0 + 3.0*G3;
        const y3 = y0 - 1.0 + 3.0*G3;
        const z3 = z0 - 1.0 + 3.0*G3;

        const ii = i & 255;
        const jj = j & 255;
        const kk = k & 255;
        
        const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
        const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
        const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
        const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;

        let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
        if(t0 < 0) n0 = 0.0;
        else {
            t0 *= t0;
            n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0);
        }
        
        let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
        if(t1 < 0) n1 = 0.0;
        else {
            t1 *= t1;
            n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1);
        }
        
        let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
        if(t2 < 0) n2 = 0.0;
        else {
            t2 *= t2;
            n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2);
        }
        
        let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
        if(t3 < 0) n3 = 0.0;
        else {
            t3 *= t3;
            n3 = t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3);
        }

        return 32.0 * (n0 + n1 + n2 + n3);
    }
}

class CurlNoiseApp {
    constructor(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id "${containerId}" not found`);
            return;
        }

        this.container = container;
        this.scene = new THREE.Scene();
        
        // Get container dimensions
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true // Transparent background
        });
        this.noise = new SimplexNoise3D();
        
        // Parameters (optimized for footer background)
        this.particleCount = 15000; // Reduced for better performance
        this.speed = 1.0;
        this.noiseScale = 0.01;
        this.timeScale = 0.1;
        this.pointSize = 0.15;
        this.particleColor = new THREE.Color(0x00ff88);
        this.colorMode = 'rainbow';
        this.time = 0;
        
        this.setupRenderer();
        this.setupCamera();
        this.setupParticles();
        this.animate();
    }

    setupRenderer() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 0); // Transparent background
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Handle resize
        const resizeObserver = new ResizeObserver(() => {
            const newWidth = this.container.clientWidth;
            const newHeight = this.container.clientHeight;
            
            this.camera.aspect = newWidth / newHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(newWidth, newHeight);
        });
        
        resizeObserver.observe(this.container);
    }

    setupCamera() {
        this.camera.position.set(0, 0, 100);
        this.camera.lookAt(0, 0, 0);
    }

    setupParticles() {
        if (this.particleSystem) {
            this.scene.remove(this.particleSystem);
        }

        this.positions = new Float32Array(this.particleCount * 3);
        this.velocities = new Float32Array(this.particleCount * 3);
        this.colors = new Float32Array(this.particleCount * 3);
        this.ages = new Float32Array(this.particleCount);

        // Initialize particles in a spherical distribution
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // Random position in sphere
            const radius = Math.pow(Math.random(), 1/3) * 30;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            this.positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            this.positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            this.positions[i3 + 2] = radius * Math.cos(phi);
            
            this.velocities[i3] = 0;
            this.velocities[i3 + 1] = 0;
            this.velocities[i3 + 2] = 0;
            
            this.ages[i] = Math.random();
            
            // Color based on position for initial setup
            const hue = (Math.atan2(this.positions[i3 + 1], this.positions[i3]) + Math.PI) / (2 * Math.PI);
            const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
            this.colors[i3] = color.r;
            this.colors[i3 + 1] = color.g;
            this.colors[i3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));

        const material = new THREE.PointsMaterial({
            size: this.pointSize,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true
        });

        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
    }

    getCurl(x, y, z, time) {
        const eps = 0.5;
        const scale = this.noiseScale;
        const t = time * this.timeScale * 0.01;
        
        // Sample noise at 6 neighboring points
        const n1 = this.noise.noise((x) * scale, (y + eps) * scale, (z) * scale + t);
        const n2 = this.noise.noise((x) * scale, (y - eps) * scale, (z) * scale + t);
        const n3 = this.noise.noise((x) * scale, (y) * scale, (z + eps) * scale + t);
        const n4 = this.noise.noise((x) * scale, (y) * scale, (z - eps) * scale + t);
        const n5 = this.noise.noise((x + eps) * scale, (y) * scale, (z) * scale + t);
        const n6 = this.noise.noise((x - eps) * scale, (y) * scale, (z) * scale + t);
        
        // Calculate curl components
        const curl = new THREE.Vector3();
        curl.x = (n3 - n4) / (2 * eps) - (n1 - n2) / (2 * eps);
        curl.y = (n5 - n6) / (2 * eps) - (n3 - n4) / (2 * eps);
        curl.z = (n1 - n2) / (2 * eps) - (n5 - n6) / (2 * eps);
        
        return curl;
    }

    updateParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            const x = this.positions[i3];
            const y = this.positions[i3 + 1];
            const z = this.positions[i3 + 2];
            
            // Get curl at particle position
            const curl = this.getCurl(x, y, z, this.time);
            
            // Update velocity with curl
            this.velocities[i3] += curl.x * this.speed * 0.1;
            this.velocities[i3 + 1] += curl.y * this.speed * 0.1;
            this.velocities[i3 + 2] += curl.z * this.speed * 0.1;
            
            // Apply damping
            this.velocities[i3] *= 0.98;
            this.velocities[i3 + 1] *= 0.98;
            this.velocities[i3 + 2] *= 0.98;
            
            // Update position
            this.positions[i3] += this.velocities[i3];
            this.positions[i3 + 1] += this.velocities[i3 + 1];
            this.positions[i3 + 2] += this.velocities[i3 + 2];
            
            // Update age and color
            this.ages[i] += 0.005;
            
            // Update color based on mode
            this.updateParticleColor(i, x, y, z);
            
            // Reset particle if too far away
            const distance = Math.sqrt(x*x + y*y + z*z);
            if (distance > 60) {
                const radius = Math.pow(Math.random(), 1/3) * 30;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                
                this.positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
                this.positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                this.positions[i3 + 2] = radius * Math.cos(phi);
                
                this.velocities[i3] = 0;
                this.velocities[i3 + 1] = 0;
                this.velocities[i3 + 2] = 0;
            }
        }
        
        this.particleSystem.geometry.attributes.position.needsUpdate = true;
        this.particleSystem.geometry.attributes.color.needsUpdate = true;
        this.particleSystem.material.size = this.pointSize;
    }

    updateParticleColor(i, x, y, z) {
        const i3 = i * 3;
        let color;
        
        switch(this.colorMode) {
            case 'rainbow':
                // 더 자연스러운 무지개 색상 생성
                const angle = Math.atan2(y, x);
                const distance = Math.sqrt(x*x + y*y + z*z);
                const hue = (angle / (2 * Math.PI) + 0.5 + this.ages[i] * 0.1 + distance * 0.01) % 1;
                color = new THREE.Color().setHSL(hue, 0.8, 0.6);
                break;
                
            case 'velocity':
                const speed = Math.sqrt(
                    this.velocities[i3] * this.velocities[i3] +
                    this.velocities[i3 + 1] * this.velocities[i3 + 1] +
                    this.velocities[i3 + 2] * this.velocities[i3 + 2]
                );
                const normalizedSpeed = Math.min(speed * 2.0, 1.0);
                color = new THREE.Color().setHSL(0.7 - normalizedSpeed * 0.7, 0.8, 0.6);
                break;
                
            case 'position':
                const dist = Math.sqrt(x*x + y*y + z*z);
                const normalizedDistance = Math.min(dist / 40.0, 1.0);
                color = new THREE.Color().setHSL(normalizedDistance * 0.8, 0.8, 0.6);
                break;
                
            case 'single':
            default:
                color = this.particleColor.clone();
                break;
        }
        
        this.colors[i3] = color.r;
        this.colors[i3 + 1] = color.g;
        this.colors[i3 + 2] = color.b;
    }

    animate() {
        this.time += 1;
        
        this.updateParticles();
        this.renderer.render(this.scene, this.camera);
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('curlNoiseContainer');
    if (container && typeof THREE !== 'undefined') {
        new CurlNoiseApp('curlNoiseContainer');
    } else if (!container) {
        console.warn('Curl noise container not found');
    } else {
        console.warn('Three.js not loaded');
    }
});

