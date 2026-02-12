import { cn } from "@/lib/utils";
import React from "react";

export interface NotificationItemProps {
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    time: string;
}

export const LargeNotificationItem = ({ name, description, icon, color, time }: NotificationItemProps) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[500px] cursor-pointer overflow-hidden rounded-3xl p-6", // Increased max-w, rounded, padding
                // "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles (we want these for lockscreen)
                "bg-black/50 backdrop-blur-md"
            )}
        >
            <div className="flex flex-row items-center gap-5"> {/* Increased gap */}
                <div
                    className="flex size-14 items-center justify-center rounded-2xl flex-shrink-0" // size-10 -> size-14
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span className="text-2xl">{icon}</span> {/* text-lg -> text-2xl */}
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center text-xl font-medium whitespace-pre text-black dark:text-white"> {/* text-lg -> text-xl */}
                        <span className="text-lg sm:text-xl">{name}</span> {/* text-sm -> text-lg */}
                        <span className="mx-2">·</span>
                        <span className="text-sm text-gray-500">{time}</span> {/* text-xs -> text-sm */}
                    </figcaption>
                    <p className="text-base font-normal text-black/60 dark:text-white/60 leading-snug"> {/* text-sm -> text-base */}
                        {description}
                    </p>
                </div>
            </div>
        </figure>
    );
};
