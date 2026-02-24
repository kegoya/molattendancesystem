import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface ClockInOutProps {
    isActive: boolean;
}

export function ClockInOut({ isActive }: { isActive: boolean }) {
    const [processing, setProcessing] = useState(false);

    const handleToggle = () => {
        router.post('/shifts/toggle', {}, {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 border rounded-xl bg-card shadow-sm">
            <div className="space-y-1 text-center">
                <h3 className="text-lg font-semibold tracking-tight">Shift Control</h3>
                <p className="text-sm text-muted-foreground">
                    {isActive ? "You are currently clocked in." : "Ready to start your shift?"}
                </p>
            </div>

            <Button 
                variant={isActive ? "destructive" : "default"} 
                size="lg"
                onClick={handleToggle}
                disabled={processing}
                className="w-full sm:w-48 transition-all"
            >
                {processing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : isActive ? (
                    <LogOut className="mr-2 h-4 w-4" />
                ) : (
                    <LogIn className="mr-2 h-4 w-4" />
                )}
                
                {processing ? "Processing..." : isActive ? "Clock Out" : "Clock In"}
            </Button>
        </div>
    );
}