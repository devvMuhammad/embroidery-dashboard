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

export function useRealLogs() {
  const specificDateString = "2025-02-11 18:05:32";

  // Calculate initial end time string
  const initialEndTime = formatDateForDatabase(
    new Date(new Date(specificDateString).getTime() + 60000)
  );

  // Simplified state - store both times as formatted strings
  const [timeRange, setTimeRange] = useState({
    startTimeString: specificDateString,
    endTimeString: initialEndTime
  });

  // Update time range every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRange(prev => {
        // Use the previous end time as the new start time
        const newStartTime = prev.endTimeString;

        // Calculate new end time (1 minute after new start time)
        const newEndDate = new Date(new Date(newStartTime).getTime() + 60000);
        const newEndTime = formatDateForDatabase(newEndDate);

        return {
          startTimeString: newStartTime,
          endTimeString: newEndTime
        };
      });
    }, 60000); // Run every 60 seconds (1 minute)

    return () => clearInterval(intervalId);
  }, []);

  // Use TanStack Query with the server action directly
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['eventLogs', timeRange.startTimeString, timeRange.endTimeString],
    queryFn: () => fetchLogs(timeRange.startTimeString, timeRange.endTimeString),
    refetchInterval: 60000, // Refetch every minute
    refetchOnWindowFocus: false,
  });

  // Reset time range to the specific starting date
  const resetTimeRange = () => {
    setTimeRange({
      startTimeString: specificDateString,
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