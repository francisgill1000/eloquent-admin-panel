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
// import MultiDropDown from "../ui/MultiDropDown";

let defaultPayload = {
    name: "",
    whatsapp: "",
    phone: "",
    email: "",
};

const Create = ({ pageTitle = "Item", onSuccess = (e) => { e } }) => {

    const [open, setOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);
    const [departments, setDepartments] = useState([]);

    const [branches, setBranches] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState(defaultPayload);

    useEffect(() => {
        if (open) {
            setForm(defaultPayload);
        }
    }, [open]);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = async () => {
        setGlobalError(null);
        setLoading(true);
        try {

            let r = await axios.post(`customers`, form);

            await new Promise(resolve => setTimeout(resolve, 2000));

            // inform to parent component
            onSuccess({ title: `${pageTitle} Save`, description: `${pageTitle} Save successfully` });
            setOpen(false);
        } catch (error) {
            setGlobalError((error?.response?.data));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="bg-muted/50 text-white rounded-lg font-semibold shadow-md hover:bg-muted/70 transition-all"
            >
                New {pageTitle}
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg bg-primary text-muted">
                    <DialogHeader>
                        <DialogTitle>New {pageTitle}</DialogTitle>
                        <p className="text-sm text-muted-foreground italic mb-3">{`Let's create a new ${pageTitle} — just speak or type the details.`}</p>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium mb-1">Name</label>
                            <Input
                                value={form.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Whatsapp e.g (971501234567)</label>
                            <Input
                                value={form.whatsapp}
                                onChange={(e) => handleChange("whatsapp", e.target.value)}
                                placeholder="971501234567"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Phone  e.g (971501234567)</label>
                            <Input
                                value={form.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}
                                placeholder="971501234567"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Email</label>
                            <Input
                                type={'email'}
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
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
                            {loading ? "Saving..." : `Create ${pageTitle}`}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Create;