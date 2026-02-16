import { cn } from "@/lib/utils";
import React from "react";

export interface NotificationItemProps {
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    time: string;
}

export const NotificationItem = ({ name, description, icon, color, time }: NotificationItemProps) => {
    return (
        <figure
            // Force dark mode styles by default for the lockscreen usage, or ensure parent has 'dark' class.
            // I will include the dark classes active by default or just assume 'dark' is present?
            // To be safe and ensure the transparent glass look on the lockscreen instantly, I will stick to the snippet 
            // but likely wrap in a 'dark' directive if needed.
            // Actually, let's keep the snippet classes exactly so it's reusable, but I'll add 'dark' to the className just in case
            // or rely on the parent context.
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
                // animation styles
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                // light styles (fallback)
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles (we want these for lockscreen)
                "transform-gpu dark:bg-black/40 dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-3xl dark:[border:1px_solid_rgba(255,255,255,.1)]"
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex size-10 items-center justify-center rounded-xl flex-shrink-0"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre text-black dark:text-white">
                        <span className="text-sm sm:text-lg">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    <p className="text-sm font-normal text-black/60 dark:text-white/60">
                        {description}
                    </p>
                </div>
            </div>
        </figure>
    );
};
