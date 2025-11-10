// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import DropDown from "@/components/ui/DropDown";

import { parseApiError } from "@/lib/utils";
import { countries, cities } from "@/lib/dropdowns";

// import MultiDropDown from "../ui/MultiDropDown";

const Edit = ({
    endpoint,
    pageTitle = "Item",
    onSuccess = (e) => { e },
    initialData = {},
    controlledOpen,
    controlledSetOpen,
}) => {

    const isControlled = controlledOpen !== undefined;
    const [open, setOpen] = useState(false);
    const actualOpen = isControlled ? controlledOpen : open;
    const actualSetOpen = isControlled ? controlledSetOpen : setOpen;

    const [globalError, setGlobalError] = useState(null);
    const [departments, setDepartments] = useState([]);

    const [branches, setBranches] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({});

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const sendWhatsApp = (phone, note) => {
        if (!phone) {
            alert("Lead phone number not available");
            return;
        }
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(note)}`;
        window.open(url, "_blank");
    };


    const onSubmit = async () => {
        setGlobalError(null);
        setLoading(true);
        try {

            let payload = { note: form.note, lead_id: initialData.id };


            let r = await axios.post(`leads-activities`, payload);

            await new Promise(resolve => setTimeout(resolve, 2000));

            sendWhatsApp(`971554501483`, form.note);

            // inform to parent component
            onSuccess({ title: `${pageTitle} Save`, description: `${pageTitle} Save successfully` });
            setOpen(false);
        } catch (error) {
            setGlobalError((error?.response?.data?.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={actualOpen} onOpenChange={actualSetOpen}>
                <DialogContent className="max-w-lg bg-primary text-muted">
                    <DialogHeader>
                        <DialogTitle>Add Activity</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium mb-1">Notes</label>
                            <Input
                                value={form.note}
                                onChange={(e) => handleChange("note", e.target.value)}
                            />
                        </div>
                    </div>

                    {globalError && (
                        <div className="mb-4 p-3 border border-red-500  text-red-700 rounded-lg" role="alert">
                            {globalError}
                        </div>
                    )}

                    <DialogFooter className="mt-4">
                        <Button variant="outline" className="bg-primary text-white" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={onSubmit}
                            disabled={loading}
                            className="bg-muted/50 text-white"
                        >
                            {loading ? "Saving..." : `Save ${pageTitle}`}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Edit;