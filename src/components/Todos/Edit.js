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
import { countries, cities, todos_status } from "@/lib/dropdowns";
import { Textarea } from "../ui/textarea";
import DatePicker from "../ui/DatePicker";

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
                            <label className="block text-xs font-medium mb-1">Title</label>
                            <Input
                                type={'title'}
                                value={form.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-1">Description</label>
                            <Textarea
                                value={form.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Enter description..."
                                rows={4} // adjust height
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wide text-gray-300 mb-1">
                                Due Date
                            </label>
                            <DatePicker
                                value={form.due_date}
                                onChange={(e) => handleChange("due_date", e)}
                                placeholder="Pick a date"
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-wide text-gray-300 mb-1">
                                Due Date
                            </label>
                            <DropDown
                                items={todos_status}
                                value={form.status}
                                onChange={(e) => handleChange("status", e)} />
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