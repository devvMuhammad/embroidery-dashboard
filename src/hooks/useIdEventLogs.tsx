"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEventLogs, fetchMachine } from "@/actions/idEventLogs";

type EventLogConfigProps = {
  startId?: number;
  interval?: number;
};

export function useIdEventLogs({ startId = 1, interval = 1000 }: EventLogConfigProps) {

  // Simplified state - store both times as formatted strings
  const [currentId, setCurrentId] = useState(startId);

  // Update time range every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentId(prev => prev + 1);
    }, interval); // Run every second

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch machine data
  const { data: machineData } = useQuery({
    queryKey: ['idEventLogs'],
    queryFn: () => fetchMachine("TMAR-K1508C--03166"),
    refetchOnWindowFocus: false,
  });

  // fetch logs
  const { data: eventLogs, isLoading, error, refetch } = useQuery({
    queryKey: ['idEventLogs', currentId],
    queryFn: () => fetchEventLogs(currentId, "TMAR-K1508C--03166"),
    refetchInterval: interval, // Refetch every minute
    refetchOnWindowFocus: false,
  });

  if (!isLoading) {
    console.log("eventLogs", eventLogs);
  }

  // Reset time range to the specific starting date
  const resetTimeRange = () => {
    setCurrentId(startId);
  };


  return {
    machineData: machineData?.data,
    eventLogs: eventLogs?.data,
    isLoading,
    error,
    refetch,
    currentId,
    resetTimeRange,
  };
}