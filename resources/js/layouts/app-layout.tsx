import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { Toaster } from "@/components/ui/sonner"; // shadcn uses Sonner

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
        <Toaster richColors closeButton position="top-right" />
    </AppLayoutTemplate>
);
