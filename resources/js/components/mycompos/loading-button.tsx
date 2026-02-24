// resources/js/components/ui/loading-button.tsx
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
    loading?: boolean;
}

export function LoadingButton({ 
    loading, 
    children, 
    className, 
    disabled, 
    ...props 
}: LoadingButtonProps) {
    return (
        <Button
            className={cn("relative", className)}
            disabled={loading || disabled}
            {...props}
        >
            {loading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {children}
        </Button>
    );
}