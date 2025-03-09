"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMachinesWithEventLogs } from "@/actions/idEventLogs";

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
    }, interval); // Run every 60 seconds (1 minute)

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use TanStack Query with the server action directly
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['idEventLogs', currentId],
    queryFn: () => fetchMachinesWithEventLogs(currentId),
    refetchInterval: interval, // Refetch every minute
    refetchOnWindowFocus: false,
  });

  // Reset time range to the specific starting date
  const resetTimeRange = () => {
    setCurrentId(startId);
  };


  return {
    machineLogs: data?.data,
    isLoading,
    error,
    refetch,
    currentId,
    resetTimeRange,
  };
}