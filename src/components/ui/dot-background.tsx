import { cn } from "@/lib/utils";
import React from "react";

export function DotBackground({ className, children }: { className?: string; children?: React.ReactNode }) {
    return (
        <div className={cn("relative w-full overflow-hidden bg-white dark:bg-black", className)}>
            <div
                className={cn(
                    "absolute inset-0 z-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    );
}

export function DotBackgroundDemo() {
    return (
        <DotBackground className="h-[50rem] flex items-center justify-center">
            <p className="bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
                Backgrounds
            </p>
        </DotBackground>
    );
}
