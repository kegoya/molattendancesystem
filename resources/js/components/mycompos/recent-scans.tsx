// resources/js/components/mycompos/recent-scans.tsx
import { Badge } from "@/components/ui/badge";

interface Scan {
    id: number;
    name: string;
    type: 'IN' | 'OUT';
    time: string;
}

export function RecentScans({ scans }: { scans: Scan[] }) {
    if (!scans.length) return null;

    return (
        <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">
                Recent Activity
            </h4>
            <div className="space-y-2">
                {scans.map((scan) => (
                    <div 
                        key={scan.id} 
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800"
                    >
                        <div className="flex items-center gap-3">
                            <Badge variant={scan.type === 'IN' ? 'default' : 'destructive'} className="w-12 justify-center">
                                {scan.type}
                            </Badge>
                            <span className="font-semibold text-sm">{scan.name}</span>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{scan.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}