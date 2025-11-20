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

let defaultPayload = {
    name: "",
    user_code: "",
    email: "",
    passowd: "",
    password_confirmation: "",

    phone: "",
    whatsapp: "",
    country: "",
    city: "",

};

const Create = ({ options, onSuccess = (e) => { e } }) => {

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

            let r = await axios.post(options.endpoint, { ...form, user_type: options.user_type });

            await new Promise(resolve => setTimeout(resolve, 2000));

            // inform to parent component
            onSuccess({ title: `${options.page_title} Save`, description: `${options.page_title} Save successfully` });
            setOpen(false);
        } catch (error) {
            setGlobalError((error?.response?.data?.message));
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
                New {options.page_title}
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg bg-primary text-muted">
                    <DialogHeader>
                        <DialogTitle>New {options.page_title}</DialogTitle>
                        <p className="text-sm text-muted-foreground italic mb-3">{`Let's create a new ${options.page_title} — just speak or type the details.`}</p>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="flex gap-5">
                            <div className="w-full ">
                                <label className="text-xs font-medium mb-1">Name</label>
                                <Input
                                    value={form.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                            </div>
                            <div className="w-full ">
                                <label className="text-xs font-medium mb-1">Agent Code</label>
                                <Input
                                    value={form.user_code}
                                    onChange={(e) => handleChange("user_code", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-full ">
                                <label className="text-xs font-medium mb-1">Whatsapp e.g (971501234567)</label>
                                <Input
                                    value={form.whatsapp}
                                    onChange={(e) => handleChange("whatsapp", e.target.value)}
                                />
                            </div>
                            <div className="w-full ">
                                <label className="text-xs font-medium mb-1">Phone  e.g (971501234567)</label>
                                <Input
                                    value={form.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-full ">
                                <label className="text-xs font-medium mb-1">Country</label>
                                <DropDown
                                    items={countries}
                                    value={form.country}
                                    onChange={(e) => handleChange("country", e)} />

                            </div>

                            <div className="w-full ">
                                <label className="text-xs font-medium mb-1">City</label>
                                <DropDown
                                    items={cities}
                                    value={form.city}
                                    onChange={(e) => handleChange("city", e)} />

                            </div>
                        </div>


                        <div className="">
                            <label className="block text-xs font-medium mb-1">Email</label>
                            <Input
                                type={'email'}
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                        </div>



                        <div className="pt-5 text-sm text-muted-foreground italic">
                            Fill the fields if you need to login access with their email and password
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
                            {loading ? "Saving..." : `Create ${options.page_title}`}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Create;