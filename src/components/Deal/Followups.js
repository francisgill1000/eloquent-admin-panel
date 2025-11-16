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
import AddFollowups from "./AddFollowups";
import { Clock } from "lucide-react";

// import MultiDropDown from "../ui/MultiDropDown";

const Followups = ({
  endpoint,
  pageTitle = "Item",
  onSuccess = (e) => { e },
  dealId = 0,
  item = {},
}) => {

  const [open, setOpen] = useState(false);

  const [globalError, setGlobalError] = useState(null);
  const [departments, setDepartments] = useState([]);

  const [branches, setBranches] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [activities, setActivities] = useState([]);

  // Fetch function (search passed explicitly)
  const fetchRecords = async () => {
    try {

      const { data } = await axios.get(`activities-by-deal/${dealId}`);

      if (data && Array.isArray(data)) {
        setActivities(data);
      } else {
        throw new Error("Invalid data structure received from API.");
      }

    } catch (error) {
      console.log(parseApiError(error));
    }
  };

  // Trigger fetch on search change
  useEffect(() => {
    fetchRecords();
  }, []);


  const handleChange = (field, value) => {
    setActivities((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm w-full text-left px-3 py-2 hover:bg-[#00ffcc1a] text-white"
      >
        <Clock size={20} /> Followups
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-primary text-white border border-white/10 shadow-2xl rounded-2xl">
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle className="mt-5  tracking-wide flex justify-between items-center">
              <span>Follow-ups </span>
              <AddFollowups
                endpoint={endpoint}
                pageTitle={pageTitle}
                dealId={dealId}
                onSuccess={fetchRecords}
              />
            </DialogTitle>
          </DialogHeader>

          {/* Body */}
          <div className="mt-3">
            <div className="ml-4">Customer: {item.customer?.name}</div>
            <div className="max-h-80 overflow-y-auto rounded-lg  bg-primary/20 p-3 backdrop-blur-sm">
              {loading ? (
                <p className="text-center text-gray-300 text-sm py-6 animate-pulse">
                  Loading activities...
                </p>
              ) : activities.length === 0 ? (
                <p className="text-center text-gray-300 text-sm py-6">
                  No follow-ups yet.
                </p>
              ) : (

                <div className="space-y-3">
                  {activities.map((act) => {
                    // 1. Destructuring for cleaner access
                    const { id, note, user, contact_method, follow_up_date, created_at } = act;

                    // 2. Date Logic Simplification
                    const dateTime = created_at
                      ? new Date(created_at).toLocaleString()
                      : "—";

                    return (
                      <div
                        key={id}
                        className="p-3 rounded-lg bg-primary/30 hover:bg-primary/40 transition-all border shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-white">
                              Note: {note || "No note provided"}
                            </p>

                            <p className="text-xs text-gray-300 mt-1">
                              By: {user?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-300 mt-1">
                              Contact Via: {contact_method || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-300 mt-1">
                              Next Follow UP Date: {follow_up_date || "Unknown"}
                            </p>
                          </div>

                          <span className="text-xs px-2 py-1 rounded-md">
                            DateTime: {dateTime}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>

  );
};

export default Followups;