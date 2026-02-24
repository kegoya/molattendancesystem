import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface WorkChartProps {
    data: { day: string; hours: number }[];
}

export function WorkChart({ data }: WorkChartProps) {
    return (
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Last 7 Days (Hours)</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[200px] w-full">
                    <ChartContainer config={{ hours: { label: "Hours", color: "hsl(var(--primary))" } }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis 
                                    dataKey="day" 
                                    stroke="#888888" 
                                    fontSize={12} 
                                    tickLine={false} 
                                    axisLine={false} 
                                />
                                <YAxis 
                                    stroke="#888888" 
                                    fontSize={12} 
                                    tickLine={false} 
                                    axisLine={false} 
                                    tickFormatter={(value) => `${value}h`}
                                />
                                <Tooltip content={<ChartTooltipContent />} />
                                <Bar 
                                   dataKey="hours" 
    fill="#3b82f6" // Use a standard blue or "hsl(var(--primary))"
    radius={[4, 4, 0, 0]} 
    barSize={30} // Limits the width of the bars on desktop
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}