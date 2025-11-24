import { useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";

export default function RedirectPage() {
  const { code } = useParams();

  useEffect(() => {
    window.location.href = `/${code}`; // backend will handle 302
  }, [code]);

  return <div className="p-6">Redirecting...</div>;
}
