'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react";
import InputURL from "./components/forms";
import DataURLTable from "./components/utils";

export default function Home() {
  const [showAnalytics, setShowAnalytics] = useState(false)
  const showAnalyticsTogle = () => {
    if (showAnalytics) {
      setShowAnalytics(false)
    }else{
      setShowAnalytics(true)
    }
  }
  return (
    <main className={`${showAnalytics? 'justify-start' : 'justify-center'} flex h-screen flex-col items-center py-24 px-4`}>
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Shorten your URL
      </h1>
      <InputURL />
      <Button variant="outline" onClick={() => showAnalyticsTogle()}>{`${showAnalytics? 'Hide Analytics' : 'Show Analytics'}`}</Button>
      <div className={`${showAnalytics? 'relative' : 'hidden'} mt-4`}>
        <DataURLTable />
      </div>
    </main>
  );
}
