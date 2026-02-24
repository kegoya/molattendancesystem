import { useForm } from '@inertiajs/react';
import { 
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEffect } from 'react';
import { Shift } from './shift-history';

interface EditShiftModalProps {
    shift: Shift | null;
    open: boolean;
    onClose: () => void;
}

export function EditShiftModal({ shift, open, onClose }: EditShiftModalProps) {
    const { data, setData, patch, processing, reset, errors } = useForm({
        clocked_in_at: '',
        clocked_out_at: '',
    });

    // Update form data whenever the shift prop changes
    useEffect(() => {
        if (shift) {
            setData({
                clocked_in_at: format(new Date(shift.clocked_in_at), "yyyy-MM-dd'T'HH:mm"),
                clocked_out_at: shift.clocked_out_at 
                    ? format(new Date(shift.clocked_out_at), "yyyy-MM-dd'T'HH:mm") 
                    : '',
            });
        }
    }, [shift]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!shift) return;

        patch(`/shifts/${shift.id}`, {
            onSuccess: () => {
                onClose();
                reset();
            },
            preserveScroll: true
        });
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Shift</DialogTitle>
                    <DialogDescription>Adjust your clock-in and clock-out times.</DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="clocked_in_at">Clock In</Label>
                        <Input 
                            id="clocked_in_at" 
                            type="datetime-local" 
                            value={data.clocked_in_at}
                            onChange={e => setData('clocked_in_at', e.target.value)}
                        />
                        {errors.clocked_in_at && <p className="text-xs text-red-500">{errors.clocked_in_at}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="clocked_out_at">Clock Out</Label>
                        <Input 
                            id="clocked_out_at" 
                            type="datetime-local" 
                            value={data.clocked_out_at}
                            onChange={e => setData('clocked_out_at', e.target.value)}
                        />
                        {errors.clocked_out_at && <p className="text-xs text-red-500">{errors.clocked_out_at}</p>}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>Save Changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}