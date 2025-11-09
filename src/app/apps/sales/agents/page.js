"use client";

import User from "@/components/User/page";


let PAGE_TITLE = "Sales Agent";
let ENDPOINT = "users";
let USER_TYPE = "agent";

export default function Agent() {
  return <User options={{ page_title: PAGE_TITLE, endpoint: ENDPOINT, user_type: USER_TYPE }} />
}

