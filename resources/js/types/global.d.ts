import type { Auth } from '@/types/auth';
import type { Product } from '@/types/product';
import { Config, RouteName, RouteParams } from 'ziggy-js';



declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
             flash: {
                success: string | null;
                error: string | null;
            };
            products: Product[];
            [key: string]: unknown;
            
        };
    }
}

declare global {
    function route(): Config;
    function route<T extends RouteName>(
        name: T,
        params?: RouteParams<T>,
        absolute?: boolean,
        config?: Config
    ): string;
}
