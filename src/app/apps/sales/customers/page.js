"use client";

import User from "@/components/User/page";


let PAGE_TITLE = "Customers";
let ENDPOINT = "users";
let USER_TYPE = "customer";

export default function Customer() {
  return <User options={{ page_title: PAGE_TITLE, endpoint: ENDPOINT, user_type: USER_TYPE }} />
}

