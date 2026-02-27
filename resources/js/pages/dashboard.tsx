import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { ClockInOut } from '@/components/mycompos/clock-in-out';
import { ShiftHistory, type Shift } from '@/components/mycompos/shift-history';
import { ShiftStats } from '@/components/mycompos/shift-stats'; // Import the new component
import { ToastHandler } from '@/components/mycompos/toast-handler'; // For the notifications we built
import { WorkChart } from '@/components/mycompos/work-chart';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    isActive: boolean;
    shifts: Shift[];
    stats: {
        today: string;
        week: string;
        weekSeconds: number;    
    };
    chartData: { day: string; hours: number }[];
}

export default function Dashboard({ isActive, shifts, stats, chartData }: DashboardProps) { 
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            {/* Listens for flash messages from Laravel for your Toasts */}
            <ToastHandler />

            <div className="max-w-2xl mx-auto space-y-8">
                {/* 1. Summary Stats Card */}
                <ShiftStats stats={stats} />
                

                {/* 2. Main Action Control */}
                <ClockInOut isActive={isActive} />

                {/* 3. Detailed Logs Table */}
                <ShiftHistory shifts={shifts} />
            </div>
        </AppLayout>
    );
}