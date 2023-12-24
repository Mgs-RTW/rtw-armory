"use client";
import { useSearchParams } from "next/navigation";

export default function AdminPage() {
  const params = useSearchParams();
  return <h2>{params.get("id")}</h2>;
}
