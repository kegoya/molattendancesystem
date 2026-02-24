import { useState } from "react";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MoreHorizontal, Trash2, Pencil, Plus } from "lucide-react";
import { EditShiftModal } from "./edit-shift-modal";
import { AddShiftModal } from "./add-shift-modal"; 
import { DeleteShiftDialog } from "./delete-shift-dialog";

export interface Shift {
    id: number;
    clocked_in_at: string;
    clocked_out_at: string | null;
    duration: string;
}

interface ShiftHistoryProps {
    shifts: Shift[];
}

export function ShiftHistory({ shifts = [] }: ShiftHistoryProps) {
    const [editingShift, setEditingShift] = useState<Shift | null>(null);
    const [deletingShiftId, setDeletingShiftId] = useState<number | null>(null); 
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="mt-8 rounded-md border bg-card shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-muted/50 flex justify-between items-center">
                <div>
                    <h3 className="font-semibold leading-none tracking-tight">Recent Shifts</h3>
                    <p className="text-sm text-muted-foreground mt-1">Manage your recorded work sessions.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Shift
                </Button>
            </div>
            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Date</TableHead>
                        <TableHead>Clock In</TableHead>
                        <TableHead>Clock Out</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shifts.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                No shifts recorded yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        shifts.map((shift) => (
                            <TableRow key={shift.id}>
                                <TableCell className="font-medium">
                                    {format(new Date(shift.clocked_in_at), "MMM dd, yyyy")}
                                </TableCell>
                                <TableCell>{format(new Date(shift.clocked_in_at), "hh:mm a")}</TableCell>
                                <TableCell>
                                    {shift.clocked_out_at ? format(new Date(shift.clocked_out_at), "hh:mm a") : "--:--"}
                                </TableCell>
                                <TableCell className="text-muted-foreground italic">{shift.duration}</TableCell>
                                <TableCell>
                                    {shift.clocked_out_at ? (
                                        <Badge variant="secondary">Completed</Badge>
                                    ) : (
                                        <Badge variant="default" className="bg-green-600 hover:bg-green-600">Active</Badge>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => setEditingShift(shift)}>
                                                <Pencil className="mr-2 h-4 w-4" /> Edit
                                            </DropdownMenuItem>
                                            {/* Set deletingShiftId to trigger the AlertDialog */}
                                            <DropdownMenuItem 
                                                className="text-red-600 focus:text-red-600" 
                                                onClick={() => setDeletingShiftId(shift.id)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <EditShiftModal 
                shift={editingShift} 
                open={!!editingShift} 
                onClose={() => setEditingShift(null)} 
            />

            {/* The new professional Delete Dialog */}
            <DeleteShiftDialog 
                shiftId={deletingShiftId}
                open={!!deletingShiftId} 
                onClose={() => setDeletingShiftId(null)} 
            />

            <AddShiftModal 
                open={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
            />
        </div>
    );
}