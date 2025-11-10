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

const Followups = ({
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

  const [activities, setActivities] = useState(initialData);

  const handleChange = (field, value) => {
    setActivities((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Dialog open={actualOpen} onOpenChange={actualSetOpen}>
        <DialogContent className="max-w-lg bg-primary text-muted">
          <DialogHeader>
            <DialogTitle>Activities</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-3 max-h-72 overflow-y-auto border rounded-md p-3 bg-primary/10">
              {activities.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground">
                  No follow-ups yet.
                </p>
              ) : (
                activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-2 border-b border-muted-foreground/20 last:border-0"
                  >
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-white">
                        {act.user?.name || "Unknown"}
                      </p>
                      <span className="text-xs text-gray-400">
                        {act.follow_up_date
                          ? new Date(act.follow_up_date).toLocaleDateString()
                          : "—"}
                      </span>
                    </div>
                    <p className="text-sm mt-1 text-gray-300">{act.note}</p>
                  </div>
                ))
              )}
            </div>
          </div>


          <DialogFooter className="mt-4">
            <Button variant="outline" className="bg-primary text-white" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Followups;