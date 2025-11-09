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

    const [form, setForm] = useState(initialData);


    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = async () => {
        setGlobalError(null);
        setLoading(true);
        try {

            let r = await axios.put(`${endpoint}/${form.id}`, form);

            await new Promise(resolve => setTimeout(resolve, 2000));

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
                        <DialogTitle>Edit  {pageTitle}</DialogTitle>
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
                            <label className="block text-xs font-medium mb-1">Email</label>
                            <Input
                                type={'email'}
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>

                        <div className="flex gap-5">
                            <div className="w-full ">
                                <label className="text-xs font-medium mb-1">Password</label>
                                <Input
                                    value={form.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                />
                            </div>
                            <div className="w-full ">
                                <label className="text-xs font-medium mb-1">Password Confirmation</label>
                                <Input
                                    value={form.password_confirmation}
                                    onChange={(e) => handleChange("password_confirmation", e.target.value)}
                                />
                            </div>
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