"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchLogs } from "@/app/test/action";

// Function to format date objects to strings in the correct format
function formatDateForDatabase(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

type EventLogConfigProps = {
  startDateString?: string;
  interval?: number;
};

export function useEventLogs({ startDateString = "2025-02-11 18:05:32", interval = 60000 }: EventLogConfigProps) {

  // Calculate initial end time string
  const initialEndTime = formatDateForDatabase(
    new Date(new Date(startDateString).getTime() + interval)
  );

  // Simplified state - store both times as formatted strings
  const [timeRange, setTimeRange] = useState({
    startTimeString: startDateString,
    endTimeString: initialEndTime
  });

  // Update time range every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRange(prev => {
        // Use the previous end time as the new start time
        const newStartTime = prev.endTimeString;

        // Calculate new end time (1 minute after new start time)
        const newEndDate = new Date(new Date(newStartTime).getTime() + interval);
        const newEndTime = formatDateForDatabase(newEndDate);

        return {
          startTimeString: newStartTime,
          endTimeString: newEndTime
        };
      });
    }, interval); // Run every 60 seconds (1 minute)

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use TanStack Query with the server action directly
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['eventLogs', timeRange.startTimeString, timeRange.endTimeString],
    queryFn: () => fetchLogs(timeRange.startTimeString, timeRange.endTimeString),
    refetchInterval: interval, // Refetch every minute
    refetchOnWindowFocus: false,
  });

  // Reset time range to the specific starting date
  const resetTimeRange = () => {
    setTimeRange({
      startTimeString: startDateString,
      endTimeString: initialEndTime
    });
  };

  // Convert string dates to Date objects for display purposes
  const displayTimeRange = {
    startTime: new Date(timeRange.startTimeString),
    endTime: new Date(timeRange.endTimeString)
  };

  return {
    eventLogs: data?.data || [],
    isLoading,
    error,
    refetch,
    currentTimeRange: displayTimeRange,
    resetTimeRange,
  };
}