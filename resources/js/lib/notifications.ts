import { toast } from "sonner";

export const notify = {
    shiftDeleted: () => toast.success("Shift record removed successfully"),
    shiftUpdated: () => toast.success("Shift updated"),
    shiftAdded: () => toast.success("New shift recorded!"),
    error: (msg = "Something went wrong") => toast.error(msg),
};