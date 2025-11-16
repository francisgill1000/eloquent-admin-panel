// @ts-nocheck
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { parseApiError } from "@/lib/utils";
import { contact_methods } from "@/lib/dropdowns";
import DropDown from "@/components/ui/DropDown";
import DatePicker from "../ui/DatePicker";

const AddFollowups = ({
  endpoint,
  pageTitle = "Item",
  onSuccess = (e) => e,
  dealId = 0,
}) => {
  const [actualOpen, actualSetOpen] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ note: "", contact_method: "", follow_up_date: "" });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const sendWhatsApp = (phone, note) => {
    if (!phone) return alert("Deal phone number not available");
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(note)}`;
    window.open(url, "_blank");
  };

  const onSubmit = async () => {
    setGlobalError(null);
    setLoading(true);
    try {
      const payload = { deal_id: dealId , ...form };
      await axios.post(`deals-activities`, payload);
      await new Promise((r) => setTimeout(r, 1000));

      // Optionally send WhatsApp message
      // sendWhatsApp("971554501483", form.note);

      onSuccess({
        title: `${pageTitle} Saved`,
        description: `${pageTitle} saved successfully.`,
      });

      actualSetOpen(false);
      setForm({ note: "", contact_method: "", follow_up_date: "" });
    } catch (error) {
      setGlobalError(parseApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        onClick={() => actualSetOpen(true)}
        className="bg-muted/50 hover:bg-muted/70 text-white font-medium px-3 py-2 rounded-lg shadow-sm transition-all"
      >
        + New Follow-up
      </Button>

      {/* Dialog */}
      <Dialog open={actualOpen} onOpenChange={actualSetOpen}>
        <DialogContent className="max-w-md bg-primary text-white rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold tracking-wide">
              Add Follow-up
            </DialogTitle>
          </DialogHeader>

          {/* Form Fields */}
          <div className="space-y-4 mt-3">
            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-300 mb-1">
                Note
              </label>
              <Input
                value={form.note}
                onChange={(e) => handleChange("note", e.target.value)}
                placeholder="Enter follow-up note..."
                className=""
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-300 mb-1">
                Contact Method
              </label>
              <DropDown
                items={contact_methods}
                value={form.contact_method}
                onChange={(e) => handleChange("contact_method", e)} />
            </div>



            <div>
              <label className="block text-xs uppercase tracking-wide text-gray-300 mb-1">
                Follow Up Date
              </label>
              <DatePicker
                value={form.follow_up_date}
                onChange={(e) => handleChange("follow_up_date", e)}
                placeholder="Pick a date"
              />
            </div>

          </div>

          {/* Error Message */}
          {globalError && (
            <div className="mt-3 bg-red-500/20 border border-red-400 text-red-100 rounded-md p-2 text-sm">
              {globalError}
            </div>
          )}

          {/* Footer */}
          <DialogFooter className="mt-5 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => actualSetOpen(false)}
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              Cancel
            </Button>

            <Button
              onClick={onSubmit}
              disabled={loading || !form.note.trim()}
              className="bg-muted/50 text-white px-5"
            >
              {loading ? (
                <span className="flex items-center gap-2 text-white">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFollowups;
