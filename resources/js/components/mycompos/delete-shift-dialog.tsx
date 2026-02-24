import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { router } from '@inertiajs/react';
import { notify } from "@/lib/notifications";

interface DeleteShiftDialogProps {
    shiftId: number | null;
    open: boolean;
    onClose: () => void;
}

export function DeleteShiftDialog({ shiftId, open, onClose }: DeleteShiftDialogProps) {
    

    const handleDelete = () => {
        router.delete(`/shifts/${shiftId}`, {
            preserveScroll: true,
            onSuccess: () => onClose(), // The ToastHandler catches the message from PHP!
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={(val) => !val && onClose()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this shift
                        record from your history.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}