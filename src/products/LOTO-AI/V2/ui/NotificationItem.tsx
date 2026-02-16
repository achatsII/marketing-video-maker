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
            className={cn(
                "relative mx-auto min-h-fit w-full max-w-[500px] cursor-pointer overflow-hidden rounded-3xl p-6",
                "bg-black/60 backdrop-blur-xl border border-white/10 box-shadow-xl"
            )}
        >
            <div className="flex flex-row items-center gap-5">
                <div
                    className="flex size-14 items-center justify-center rounded-2xl flex-shrink-0"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span className="text-2xl text-white token-icon">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center text-xl font-medium whitespace-pre text-white">
                        <span className="text-lg sm:text-xl font-bold">{name}</span>
                        <span className="mx-2 text-white/40">·</span>
                        <span className="text-sm text-white/50">{time}</span>
                    </figcaption>
                    <p className="text-base font-normal text-white/80 leading-snug mt-1">
                        {description}
                    </p>
                </div>
            </div>
        </figure>
    );
};
