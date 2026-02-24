import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddShiftModal({ open, onClose }: { open: boolean, onClose: () => void }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        clocked_in_at: '',
        clocked_out_at: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/shifts', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent>
                <DialogHeader><DialogTitle>Add Manual Shift</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Clock In</Label>
                        <Input type="datetime-local" value={data.clocked_in_at} onChange={e => setData('clocked_in_at', e.target.value)} />
                        {errors.clocked_in_at && <p className="text-xs text-red-500">{errors.clocked_in_at}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Clock Out</Label>
                        <Input type="datetime-local" value={data.clocked_out_at} onChange={e => setData('clocked_out_at', e.target.value)} />
                        {errors.clocked_out_at && <p className="text-xs text-red-500">{errors.clocked_out_at}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>Save Shift</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}