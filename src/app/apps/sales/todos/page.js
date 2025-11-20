"use client";

import TodosComponent from "@/components/Todos/page";


let PAGE_TITLE = "Todos";
let ENDPOINT = "todos";

export default function Todos() {
  return <TodosComponent options={{ page_title: PAGE_TITLE, endpoint: ENDPOINT }} />
}

