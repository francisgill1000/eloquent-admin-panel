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

// import MultiDropDown from "../ui/MultiDropDown";

const Followups = ({
  endpoint,
  pageTitle = "Item",
  onSuccess = (e) => { e },
  leadId = 0,
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

  const [activities, setActivities] = useState([]);

  // Fetch function (search passed explicitly)
  const fetchRecords = async () => {
    try {

      const { data } = await axios.get(`activities-by-lead/${leadId}`);

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
    <Dialog open={actualOpen} onOpenChange={actualSetOpen}>
      <DialogContent className="max-w-lg bg-primary text-white border border-white/10 shadow-2xl rounded-2xl">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="mt-5 text-xl font-semibold tracking-wide flex justify-between items-center">
            <span>Follow-up Activities</span>
            <AddFollowups
              endpoint={endpoint}
              pageTitle={pageTitle}
              leadId={leadId}
              onSuccess={fetchRecords}
            />
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="mt-3">
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
                {activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-lg bg-primary/30 hover:bg-primary/40 transition-all border border-white/10 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-white">
                          {act.note || "No note provided"}
                        </p>
                        <p className="text-xs text-gray-300 mt-1">
                          By: {act.user?.name || "Unknown"}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-md">
                        {act.follow_up_date
                          ? new Date(act.follow_up_date).toLocaleDateString()
                          : "—"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 flex justify-end">
          <Button
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white"
            onClick={() => actualSetOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Followups;