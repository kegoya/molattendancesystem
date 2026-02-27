// resources/js/components/mycompos/kiosk-header.tsx
import { useEffect, useState } from 'react';

export function KioskHeader() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-center space-y-2 mb-8">
            <h1 className="text-6xl font-black tracking-tighter tabular-nums">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </h1>
            <p className="text-xl text-muted-foreground font-medium uppercase tracking-widest">
                {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full mt-4" />
        </div>
    );
}