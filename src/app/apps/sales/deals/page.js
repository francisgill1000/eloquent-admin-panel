"use client";

import Deal from "@/components/Deal/page";



let PAGE_TITLE = "Deals";
let ENDPOINT = "deals";

export default function Customer() {
  return <Deal options={{ page_title: PAGE_TITLE, endpoint: ENDPOINT }} />
}

