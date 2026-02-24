// resources/js/components/mycompos/toast-handler.tsx
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from "sonner";

export function ToastHandler() {
    const { flash } = usePage().props as any;

    useEffect(() => {
        // Use ?. to safely check if flash exists before reading properties
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return null;
}
