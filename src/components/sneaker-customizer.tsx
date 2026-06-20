"use client";
import { useRef, useState, useEffect, useCallback, Component, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ── Error boundary ──────────────────────────────────────────
class CanvasErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: "" };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-[#111] text-white/40 gap-3 p-8 text-center">
          <p className="text-xs uppercase tracking-widest">Error al cargar el modelo</p>
          <p className="text-[10px] font-mono text-white/20">{this.state.error}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Modelo con vertex painting ───────────────────────────────
function PaintableSneaker({
  paintColor,
  brushSize,
  painting,
  onStroke,
}: {
  paintColor: string;
  brushSize: number;
  painting: boolean;
  onStroke: () => void;
}) {
  const { scene } = useGLTF("/af1.glb");
  const { gl, camera } = useThree();
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const initialized = useRef(false);

  // Inicializar geometrías con vertex colors blancos
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const meshes: THREE.Mesh[] = [];
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;

      const geo = mesh.geometry;
      const count = geo.attributes.position.count;

      // Inicializar colores en blanco
      const colors = new Float32Array(count * 3).fill(1);
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      mesh.material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.55,
        metalness: 0.05,
      });

      meshes.push(mesh);
    });
    meshesRef.current = meshes;
  }, [scene]);

  // Raycasting + paint on click/drag
  const raycaster = useRef(new THREE.Raycaster());
  const colorObj = useRef(new THREE.Color());

  const paintingRef = useRef(painting);
  const paintColorRef = useRef(paintColor);
  const brushSizeRef = useRef(brushSize);
  useEffect(() => { paintingRef.current = painting; }, [painting]);
  useEffect(() => { paintColorRef.current = paintColor; }, [paintColor]);
  useEffect(() => { brushSizeRef.current = brushSize; }, [brushSize]);

  const paint = useCallback(
    (e: PointerEvent) => {
      if (!paintingRef.current) return;
      if (meshesRef.current.length === 0) return;

      const rect = gl.domElement.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      raycaster.current.setFromCamera(ndc, camera);
      const hits = raycaster.current.intersectObjects(meshesRef.current, false);
      if (!hits.length) return;

      const hit = hits[0];
      const mesh = hit.object as THREE.Mesh;
      const geo = mesh.geometry;
      const pos = geo.attributes.position;
      const col = geo.attributes.color as THREE.BufferAttribute | undefined;
      if (!col || !pos) return;

      colorObj.current.set(paintColorRef.current);
      const { r, g, b } = colorObj.current;
      const bs = brushSizeRef.current;

      const localHit = mesh.worldToLocal(hit.point.clone());
      const lx = localHit.x, ly = localHit.y, lz = localHit.z;

      for (let i = 0; i < pos.count; i++) {
        const dist = Math.sqrt(
          (pos.getX(i) - lx) ** 2 +
          (pos.getY(i) - ly) ** 2 +
          (pos.getZ(i) - lz) ** 2
        );
        if (dist < bs) {
          const t = 1 - dist / bs;
          col.setXYZ(i,
            col.getX(i) * (1 - t) + r * t,
            col.getY(i) * (1 - t) + g * t,
            col.getZ(i) * (1 - t) + b * t,
          );
        }
      }
      col.needsUpdate = true;
      onStroke();
    },
    [camera, gl, onStroke]
  );

  useEffect(() => {
    const el = gl.domElement;
    el.addEventListener("pointermove", paint as EventListener);
    el.addEventListener("pointerdown", paint as EventListener);
    return () => {
      el.removeEventListener("pointermove", paint as EventListener);
      el.removeEventListener("pointerdown", paint as EventListener);
    };
  }, [paint, gl]);

  return (
    <primitive
      object={scene}
      scale={2.8}
      position={[0, -0.4, 0]}
    />
  );
}

// ── Paleta ───────────────────────────────────────────────────
const PALETTE = [
  "#ffffff", "#f0f0f0", "#d4d4d4", "#a3a3a3", "#737373", "#404040", "#1a1a1a", "#000000",
  "#2563EB", "#3b82f6", "#60a5fa", "#dc2626", "#ef4444",
  "#16a34a", "#53FC18", "#ca8a04", "#f59e0b",
  "#9333ea", "#db2777", "#ea580c", "#06b6d4",
];

const BRUSH_SIZES = [
  { label: "S", value: 0.04 },
  { label: "M", value: 0.09 },
  { label: "L", value: 0.18 },
  { label: "XL", value: 0.32 },
];

// ── Main component ───────────────────────────────────────────
export default function SneakerCustomizer() {
  const [paintColor, setPaintColor] = useState("#2563EB");
  const [brushSize, setBrushSize] = useState(0.09);
  const [painting, setPainting] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [strokeCount, setStrokeCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleStroke = useCallback(() => {
    setStrokeCount((n) => n + 1);
    setAutoRotate(false);
  }, []);

  const downloadDesign = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "flashdesign-custom-af1.png";
    a.click();
  };

  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">

      {/* header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 mt-16 shrink-0">
        <a href="/" className="text-white/40 text-xs uppercase tracking-widest hover:text-white transition">
          ← Volver
        </a>
        <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
          Customizador — Air Force 1
        </span>
        <button
          onClick={() => setAutoRotate((v) => !v)}
          className="text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition"
        >
          {autoRotate ? "⏸" : "▶"} Rotar
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-1 min-h-0">

        {/* Canvas */}
        <div className="flex-1 relative min-h-0">

          {/* instrucción */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            {painting ? (
              <span className="bg-[#2563EB] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                🎨 Pintando — arrastrá sobre el zapato
              </span>
            ) : (
              <span className="bg-black/60 backdrop-blur text-white/50 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full">
                Rotá el zapato · activá Pintar para colorear
              </span>
            )}
          </div>

          <CanvasErrorBoundary>
            <Canvas
              camera={{ position: [0, 1.5, 5], fov: 35 }}
              style={{ background: "#111111", cursor: painting ? "crosshair" : "grab" }}
              gl={{ antialias: true, preserveDrawingBuffer: true }}
              onCreated={({ gl }) => { canvasRef.current = gl.domElement; }}
            >
              <ambientLight intensity={2.5} />
              <directionalLight position={[5, 10, 5]} intensity={3} />
              <directionalLight position={[-5, 5, -5]} intensity={1.5} />
              <pointLight position={[0, 4, 3]} intensity={0.8} color="#4488ff" />

              <Suspense fallback={
                <mesh>
                  <boxGeometry args={[1, 0.4, 2]} />
                  <meshStandardMaterial color="#222" />
                </mesh>
              }>
                <PaintableSneaker
                  paintColor={paintColor}
                  brushSize={brushSize}
                  painting={painting}
                  onStroke={handleStroke}
                />
              </Suspense>

              <OrbitControls
                enabled={!painting}
                autoRotate={autoRotate && !painting}
                autoRotateSpeed={1.2}
                enablePan={false}
                minDistance={3}
                maxDistance={9}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 1.8}
              />
            </Canvas>
          </CanvasErrorBoundary>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 text-[10px] uppercase tracking-widest pointer-events-none whitespace-nowrap">
            {painting ? "Soltá para dejar de pintar" : "Scroll para zoom · arrastrá para rotar"}
          </p>
        </div>

        {/* Panel */}
        <div className="w-full md:w-[260px] bg-[#0d0d0d] border-t md:border-t-0 md:border-l border-white/8 flex flex-col overflow-y-auto">

          {/* pintar toggle */}
          <div className="p-4 border-b border-white/8">
            <button
              onClick={() => setPainting((v) => !v)}
              className={`w-full py-3.5 font-extrabold text-sm uppercase tracking-widest transition-all ${
                painting
                  ? "bg-[#2563EB] text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                  : "bg-white/8 text-white/60 hover:bg-white/12 hover:text-white"
              }`}
            >
              {painting ? "🎨 Modo pintura — ACTIVO" : "✏️ Activar pintura"}
            </button>
            {painting && (
              <p className="text-[#2563EB]/70 text-[10px] uppercase tracking-widest text-center mt-2">
                Hacé click o arrastrá sobre el zapato
              </p>
            )}
          </div>

          {/* color */}
          <div className="p-4 border-b border-white/8">
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">Color</p>
            <div className="grid grid-cols-7 gap-1.5 mb-3">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  onClick={() => setPaintColor(c)}
                  className={`w-full aspect-square rounded-md border-2 transition-all hover:scale-110 ${
                    paintColor === c ? "border-white scale-110" : "border-transparent"
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={paintColor}
                onChange={(e) => setPaintColor(e.target.value)}
                className="w-9 h-7 rounded cursor-pointer border border-white/10 bg-transparent"
              />
              <span className="text-white/40 text-xs font-mono">{paintColor}</span>
              <span
                className="ml-auto w-5 h-5 rounded-full border border-white/20"
                style={{ background: paintColor }}
              />
            </div>
          </div>

          {/* brush */}
          <div className="p-4 border-b border-white/8">
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">Tamaño del pincel</p>
            <div className="flex gap-2">
              {BRUSH_SIZES.map((b) => (
                <button
                  key={b.label}
                  onClick={() => setBrushSize(b.value)}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-lg border transition-all ${
                    brushSize === b.value
                      ? "border-[#2563EB] bg-[#2563EB]/20 text-white"
                      : "border-white/8 text-white/40 hover:border-white/20"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* acciones */}
          <div className="p-4 space-y-2 mt-auto">
            <button
              onClick={downloadDesign}
              className="w-full py-3 border border-white/15 text-white/60 text-xs font-bold uppercase tracking-widest hover:border-white/30 hover:text-white transition-all"
            >
              ↓ Descargar imagen
            </button>
            <a
              href={`https://wa.me/5491100000000?text=${encodeURIComponent("Hola! Diseñé mi custom Air Force 1 en tu web. Te mando la imagen por acá 👟🎨")}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-[#2563EB] text-white font-extrabold text-sm uppercase tracking-widest text-center py-3.5 hover:bg-blue-700 transition-colors"
              style={{ boxShadow: "6px 6px 0 rgba(0,0,0,0.4)" }}
            >
              Pedir este diseño →
            </a>
            <p className="text-white/20 text-[10px] text-center">
              {strokeCount > 0 ? `${strokeCount} pinceladas aplicadas` : "Pintá tu diseño para pedirlo"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
