import React from 'react';
import { AbsoluteFill } from 'remotion';
// --- UTILS ---
const gridPattern = (color: string = 'rgba(255,255,255,0.1)') => `
  radial-gradient(${color} 1px, transparent 1px)
`;
// --- COMPONENT 1: Gradient Mesh (SaaS Classic) ---
export const GradientMeshWallpaper: React.FC = () => {
    return (
        <AbsoluteFill className="bg-white overflow-hidden">
            <div
                className="absolute top-[-20%] left-[-20%] w-[80%] h-[60%] rounded-full blur-[100px] opacity-70"
                style={{ background: '#bfdbfe' }} // blue-200
            />
            <div
                className="absolute top-[10%] right-[-20%] w-[70%] h-[60%] rounded-full blur-[100px] opacity-70"
                style={{ background: '#e9d5ff' }} // purple-200
            />
            <div
                className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full blur-[100px] opacity-60"
                style={{ background: '#fbcfe8' }} // pink-200
            />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />
        </AbsoluteFill>
    );
};
// --- COMPONENT 2: Dark Glassmorphism (Premium Tech) ---
export const DarkGlassWallpaper: React.FC = () => {
    return (
        <AbsoluteFill className="bg-slate-950 overflow-hidden">
            {/* Background Glows */}
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40"
                style={{ background: '#4f46e5' }} // indigo-600
            />
            <div
                className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
                style={{ background: '#0ea5e9' }} // sky-500
            />
            {/* Grid Overlay */}
            <AbsoluteFill
                style={{
                    backgroundImage: gridPattern('rgba(255,255,255,0.05)'),
                    backgroundSize: '40px 40px'
                }}
            />
            {/* Glass Card Element (Decorative) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md rotate-12" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40%] bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md -rotate-6" />
        </AbsoluteFill>
    );
};
// --- COMPONENT 3: Abstract Geometric (Clean 3D) ---
export const GeometricWallpaper: React.FC = () => {
    return (
        <AbsoluteFill className="bg-zinc-50 overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-zinc-50 to-zinc-200" />
            {/* Geometric Shapes */}
            <div className="absolute w-[300px] h-[300px] border-[40px] border-indigo-500/10 rounded-full top-[10%] -left-[10%]" />
            <div className="absolute w-[200px] h-[200px] bg-purple-500/10 rounded-lg rotate-45 top-[40%] right-[-10%]" />
            <div className="absolute w-[400px] h-[400px] border-[2px] border-zinc-900/5 rounded-full bottom-[-10%] right-[20%]" />
            {/* Overlay to soften */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
        </AbsoluteFill>
    );
};
// --- COMPONENT 4: Neo-Brutalism / Vibrant (Dynamic) ---
export const VibrantTechWallpaper: React.FC = () => {
    return (
        <AbsoluteFill className="bg-[#FFDE59] overflow-hidden flex flex-col justify-between">
            {/* Top Pattern */}
            <div className="w-full h-1/3 bg-[#FF914D] rounded-bl-[100px]" />
            {/* Middle Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-black rounded-full mix-blend-overlay opacity-20" />
            {/* Bottom Pattern */}
            <div className="w-full h-1/3 bg-[#7ED957] rounded-tr-[100px]" />
            <AbsoluteFill
                className="opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, black 2px, transparent 2px)',
                    backgroundSize: '20px 20px'
                }}
            />
        </AbsoluteFill>
    );
};
// Export a map for easy detailed usage
export const Wallpapers = {
    GradientMesh: GradientMeshWallpaper,
    DarkGlass: DarkGlassWallpaper,
    Geometric: GeometricWallpaper,
    VibrantTech: VibrantTechWallpaper,
};
