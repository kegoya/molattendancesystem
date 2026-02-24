import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Make sure to install: npx shadcn-ui@latest add progress
import { Clock, Calendar, Target } from "lucide-react";

interface ShiftStatsProps {
    stats: {
        today: string;
        week: string;
        weekSeconds: number; // Add this from the controller to make math easier
    };
}

export function ShiftStats({ stats }: ShiftStatsProps) {
    const WEEKLY_GOAL_HOURS = 40;
    const WEEKLY_GOAL_SECONDS = WEEKLY_GOAL_HOURS * 3600;
    
    // Calculate percentage, capped at 100%
    const progressValue = Math.min(
        Math.round((stats.weekSeconds / WEEKLY_GOAL_SECONDS) * 100), 
        100
    );

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Worked Today</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.today}</div>
                    <p className="text-xs text-muted-foreground mt-1">Activity since midnight</p>
                </CardContent>
            </Card>

            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-baseline justify-between">
                        <div className="text-2xl font-bold">{stats.week}</div>
                        <span className="text-xs font-medium text-muted-foreground">
                            {progressValue}% of {WEEKLY_GOAL_HOURS}h
                        </span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                </CardContent>
            </Card>
        </div>
    );
}