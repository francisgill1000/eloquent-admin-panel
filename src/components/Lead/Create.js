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

import UserCreate from "@/components/User/Create";



import { parseApiError } from "@/lib/utils";
import { leads_status } from "@/lib/dropdowns";
// import MultiDropDown from "../ui/MultiDropDown";

let defaultPayload = {
    customer_id: "",
    agent_id: "",
    source: "",
    status: "",
};

const Create = ({ options, onSuccess = (e) => { e } }) => {

    const [open, setOpen] = useState(false);
    const [globalError, setGlobalError] = useState(null);
    const [departments, setDepartments] = useState([]);

    const [customers, setCustomers] = useState([]);
    const [agents, setAgents] = useState([]);
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

    const fetchDropdowns = async () => {
        try {

            let customers = await axios.get(`user-list`, {
                params: { user_type: "customer" }
            });

            let agents = await axios.get(`user-list`, {
                params: { user_type: "agent" }
            });

            setCustomers(customers.data);
            setAgents(agents.data);


        } catch (error) {
            setGlobalError((error?.response?.data?.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDropdowns();
    }, []);


    const onSubmit = async () => {
        setGlobalError(null);
        setLoading(true);
        try {

            let r = await axios.post(options.endpoint, form);

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


    if (loading) return;

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

                        <div>
                            <label className="block text-xs font-medium mb-1">Agent</label>

                            <div className="flex gap-2 max-w-98">
                                <DropDown
                                    items={agents}
                                    value={form.agent_id}
                                    onChange={(e) => handleChange("agent_id", e)} />

                                <UserCreate options={
                                    {
                                        endpoint: `users`,
                                        user_type: `agent`,
                                        page_title: ``
                                    }
                                } onSuccess={fetchDropdowns} />

                            </div>


                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-1">Customer</label>

                            <div className="flex gap-2 max-w-98">
                                <DropDown
                                    items={customers}
                                    value={form.customer_id}
                                    onChange={(e) => handleChange("customer_id", e)} />


                                <UserCreate options={
                                    {
                                        endpoint: `users`,
                                        user_type: `customer`,
                                        page_title: ``
                                    }
                                }
                                    onSuccess={fetchDropdowns} />
                            </div>


                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-1">Source</label>
                            <Input
                                value={form.source}
                                onChange={(e) => handleChange("source", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-1">Status</label>
                            <DropDown
                                items={leads_status}
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
                            {loading ? "Saving..." : `Create ${options.page_title}`}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Create;