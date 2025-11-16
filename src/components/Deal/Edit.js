// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DropDown from "@/components/ui/DropDown";
import UserCreate from "@/components/User/Create";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { deals_status } from "@/lib/dropdowns";
import { Handshake, Pen, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import DatePicker from "../ui/DatePicker";

const EditDeal = ({ endpoint, pageTitle, item, onSuccess = (e) => e }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    const [customers, setCustomers] = useState([]);
    const [agents, setAgents] = useState([]);
    const [form, setForm] = useState(item);

    const handleChange = (field, value) => {
        setForm((prev) => {
            const updated = { ...prev, [field]: value };

            // Recalculate total automatically

            if (["amount", "discount", "tax"].includes(field)) {
                const baseWithTax = Number(updated.amount || 0) + (Number(updated.amount || 0) * (Number(updated.tax || 0) / 100));
                updated.total = baseWithTax - Number(updated.discount || 0);
            }


            return updated;
        });
    };

    const fetchDropdowns = async () => {
        try {
            const [customersRes, agentsRes] = await Promise.all([
                axios.get("user-list", { params: { user_type: "customer" } }),
                axios.get("user-list", { params: { user_type: "agent" } }),
            ]);

            setCustomers(customersRes.data);
            setAgents(agentsRes.data);
        } catch (error) {
            setGlobalError(error?.response?.data?.message || "Failed to load users");
        }
    };

    useEffect(() => {
        fetchDropdowns();
    }, []);

    const onSubmit = async () => {
        setGlobalError(null);
        setLoading(true);

        try {

            const response = await axios.put(endpoint + "/" + item.id, form);

            onSuccess({
                title: `${pageTitle} Saved`,
                description: `${pageTitle} created successfully`,
                data: response.data,
            });

            setOpen(false);
        } catch (error) {
            setGlobalError(error?.response?.data?.message || "Failed to create deal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 hover:bg-[#00ffcc1a] text-white"
            >
                <Pencil size={20} /> Edit
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg bg-primary text-muted">
                    <DialogHeader>
                        <DialogTitle>
                            New {pageTitle}
                        </DialogTitle>
                        <p className="text-sm text-muted-foreground italic mb-3">
                            Let's create a new {pageTitle} — just speak or type the details.
                        </p>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Agent */}
                        <div>
                            <label className="block text-xs font-medium mb-1">Deal Title</label>
                            <Input
                                value={form.deal_title}
                                onChange={(e) => handleChange("deal_title", (e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium mb-1">Agent</label>
                            <div className="flex gap-2 max-w-98">
                                <DropDown
                                    items={agents}
                                    value={form.agent_id}
                                    onChange={(e) => handleChange("agent_id", e)}
                                />
                                <UserCreate
                                    options={{
                                        endpoint: "users",
                                        user_type: "agent",
                                        page_title: "",
                                    }}
                                    onSuccess={fetchDropdowns}
                                />
                            </div>
                        </div>

                        {/* Customer */}
                        <div>
                            <label className="block text-xs font-medium mb-1">Customer</label>
                            <div className="flex gap-2 max-w-98">
                                <DropDown
                                    items={customers}
                                    value={form.customer_id}
                                    onChange={(e) => handleChange("customer_id", e)}
                                />
                                <UserCreate
                                    options={{
                                        endpoint: "users",
                                        user_type: "customer",
                                        page_title: "",
                                    }}
                                    onSuccess={fetchDropdowns}
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-xs font-medium mb-1">Status</label>
                            <DropDown
                                items={deals_status}
                                value={form.status}
                                onChange={(e) => handleChange("status", e)}
                            />
                        </div>


                        <div className="w-full">
                            <label className=" text-xs font-medium mb-1">Amount</label>
                            <Input
                                type="number"
                                value={form.amount}
                                onChange={(e) => handleChange("amount", Number(e.target.value))}
                            />
                        </div>

                        <div className="flex gap-2 ">
                            {/* Tax */}
                            <div className="w-full">
                                <label className=" text-xs font-medium mb-1">Tax</label>
                                <Input
                                    type="number"
                                    value={form.tax}
                                    onChange={(e) => handleChange("tax", Number(e.target.value))}
                                />
                            </div>
                            {/* Discount */}
                            <div className="w-full">
                                <label className="block text-xs font-medium mb-1">Discount</label>
                                <Input
                                    type="number"
                                    value={form.discount}
                                    onChange={(e) => handleChange("discount", Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className=" flex gap-2 ">

                            {/* Total (read-only) */}
                            <div className="w-full">
                                <label className="block text-xs font-medium mb-1">Total</label>
                                <Input type="number" value={form.total} readOnly />
                            </div>
                        </div>

                        {/* Expected Close Date */}
                        <div>
                            <label className="block text-xs font-medium mb-1">Expected Close Date</label>
                            <DatePicker
                                value={form.expected_close_date}
                                onChange={(e) => handleChange("expected_close_date", e)}
                                placeholder="Pick a date"
                            />
                        </div>
                    </div>

                    {globalError && (
                        <div className="mb-4 p-3 border border-red-500 text-red-700 rounded-lg" role="alert">
                            {globalError}
                        </div>
                    )}

                    <DialogFooter className="mt-4">
                        <Button variant="outline" className="bg-primary text-white" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={onSubmit} disabled={loading} className="bg-muted/50 text-white">
                            {loading ? "Saving..." : `Create ${pageTitle}`}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditDeal;
