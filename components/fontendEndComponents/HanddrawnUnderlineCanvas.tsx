import React, { useEffect, useRef } from "react";

type HanddrawnLineProps = {
    height?: number;  // CSS px
    color?: string;
    thickness?: number;
    className?: string;
};

function mulberry32(seed: number) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function drawWobblyCurve(
    ctx: CanvasRenderingContext2D,
    fromX: number,
    toX: number,
    baseY: number,
    amplitude: number,
    bow: number,
    seed: number
) {
    const rand = mulberry32(seed);
    const steps = 42;

    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = fromX + (toX - fromX) * t;

        // bow: smooth hump (up in middle, down at ends)
        const bowOffset = -bow * Math.sin(Math.PI * t);

        // wobble: layered sine + tiny randomness
        const wobble =
            Math.sin(t * Math.PI * 3) * amplitude * 0.6 +
            Math.sin(t * Math.PI * 9) * amplitude * 0.25 +
            (rand() - 0.5) * amplitude * 0.35;

        const y = baseY + bowOffset + wobble;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
}

export default function HanddrawnUnderlineCanvas({
                                                     height = 60,
                                                     color = "rgb(230, 211, 198)",
                                                     thickness = 3,
                                                     className,
                                                 }: HanddrawnLineProps) {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));

        const redraw = () => {
            const width = Math.floor(parent.clientWidth);
            if (!width) return;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);

            canvas.style.width = "100%";
            canvas.style.height = `${height}px`;
            canvas.style.display = "block";

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);

            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.strokeStyle = color;

            const pad = Math.max(6, thickness * 2);

            // Top stroke (full width)
            ctx.lineWidth = thickness;
            drawWobblyCurve(
                ctx,
                pad,
                width - pad,
                22,     // baseY
                1.6,    // wobble amplitude
                8,      // bow amount (bigger = more curve)
                12345
            );

            // Slight second pass to mimic “hand pressure” variation
            ctx.globalAlpha = 0.55;
            ctx.lineWidth = Math.max(1, thickness - 1);
            drawWobblyCurve(ctx, pad, width - pad, 22.6, 1.1, 7.2, 67890);
            ctx.globalAlpha = 1;

            // Bottom stroke (right half)
            ctx.lineWidth = Math.max(2, thickness - 1);
            drawWobblyCurve(
                ctx,
                width * 0.2,
                width - pad,
                38,    // baseY lower
                1.2,   // wobble
                5.5,   // bow
                24680
            );
        };

        redraw();

        const ro = new ResizeObserver(() => redraw());
        ro.observe(parent);

        return () => ro.disconnect();
    }, [height, color, thickness]);

    return <canvas ref={ref} className={className} aria-hidden="true" />;
}