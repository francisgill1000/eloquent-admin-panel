"use client";

import Lead from "@/components/Lead/page";


let PAGE_TITLE = "Leads";
let ENDPOINT = "leads";

export default function Customer() {
  return <Lead options={{ page_title: PAGE_TITLE, endpoint: ENDPOINT }} />
}

