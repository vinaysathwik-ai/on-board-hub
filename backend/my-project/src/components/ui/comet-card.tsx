"use client";
import React, { useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useMotionTemplate,
} from "motion/react";
import { cn } from "@/lib/utils";

export const CometCard = ({
    rotateDepth = 17.5,
    translateDepth = 20,
    className,
    children,
}: {
    rotateDepth?: number;
    translateDepth?: number;
    className?: string;
    children: React.ReactNode;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(
        mouseYSpring,
        [-0.5, 0.5],
        [`${rotateDepth}deg`, `-${rotateDepth}deg`],
    );
    const rotateY = useTransform(
        mouseXSpring,
        [-0.5, 0.5],
        [`-${rotateDepth}deg`, `${rotateDepth}deg`],
    );

    const translateX = useTransform(
        mouseXSpring,
        [-0.5, 0.5],
        [`-${translateDepth}px`, `${translateDepth}px`],
    );
    const translateY = useTransform(
        mouseYSpring,
        [-0.5, 0.5],
        [`${translateDepth}px`, `-${translateDepth}px`],
    );

    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            className={cn("relative", className)}
            style={{
                perspective: "1500px",
                transformStyle: "preserve-3d",
            }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    translateX,
                    translateY,
                    transformStyle: "preserve-3d",
                    boxShadow: "0 25px 80px -12px rgba(0, 0, 0, 0.6)",
                }}
                initial={{ scale: 1, z: 0 }}
                whileHover={{
                    scale: 1.05,
                    z: 50,
                    transition: { duration: 0.2 },
                }}
                className="relative rounded-[24px] bg-[#1a1a1a] overflow-hidden"
            >
                <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                    {children}
                </div>

                {/* Glare effect */}
                <motion.div
                    className="pointer-events-none absolute inset-0 z-50 mix-blend-overlay"
                    style={{
                        background: glareBackground,
                        opacity: 0,
                    }}
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.15 }}
                />
            </motion.div>
        </div>
    );
};
