"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllMachines, fetchLogs } from "@/actions/logs";

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
  startDate?: Date | string;
  interval?: number;
};

export function useEventLogs({ startDate, interval = 60000 }: EventLogConfigProps) {
  // Handle both Date objects and string inputs
  const getFormattedStartDate = () => {
    if (!startDate) {
      // Default to 2025-02-11 if no startDate provided
      return "2025-02-11 18:05:32";
    }

    if (typeof startDate === 'string') {
      return startDate;
    }

    // If it's a Date object, format it
    return formatDateForDatabase(startDate);
  };

  const formattedStartDate = getFormattedStartDate();

  // Calculate initial end time
  const getEndTime = (startTimeStr: string) => {
    const startTime = new Date(startTimeStr.replace(' ', 'T'));
    const endTime = new Date(startTime.getTime() + interval);
    return formatDateForDatabase(endTime);
  };

  const initialEndTime = getEndTime(formattedStartDate);

  // Simplified state - store both times as formatted strings
  const [timeRange, setTimeRange] = useState({
    startTimeString: formattedStartDate,
    endTimeString: initialEndTime
  });

  // Update time range every interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRange(prev => {
        // Use the previous end time as the new start time
        const newStartTime = prev.endTimeString;
        // Calculate new end time (interval ms after new start time)
        const newEndTime = getEndTime(newStartTime);

        return {
          startTimeString: newStartTime,
          endTimeString: newEndTime
        };
      });
    }, interval);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]);

  // fetch all machines data
  const { data: machinesData, isPending: machinesLoading } = useQuery({
    queryKey: ['machines'],
    queryFn: () => fetchAllMachines(),
    refetchOnWindowFocus: false,
  });

  // Use TanStack Query with the server action directly
  const { data: eventLogs, isPending: logsLoading, error, refetch } = useQuery({
    queryKey: ['eventLogs', timeRange.startTimeString, timeRange.endTimeString],
    queryFn: () => fetchLogs(timeRange.startTimeString, timeRange.endTimeString),
    refetchInterval: interval,
    refetchOnWindowFocus: false,
  });

  // Reset time range to the initial starting date
  const resetTimeRange = () => {
    setTimeRange({
      startTimeString: formattedStartDate,
      endTimeString: initialEndTime
    });
  };

  // Convert string dates to Date objects for display purposes
  const displayTimeRange = {
    startTime: new Date(timeRange.startTimeString.replace(' ', 'T')),
    endTime: new Date(timeRange.endTimeString.replace(' ', 'T'))
  };

  // Group event logs by machine
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventLogsByMachine = eventLogs?.data?.reduce((grouped: any, log: any) => {
    if (!grouped[log.machineName]) {
      grouped[log.machineName] = [];
    }
    grouped[log.machineName].push(log);
    return grouped;
  }, {}) || {};

  return {
    machines: machinesData?.data || [],
    eventLogsByMachine,
    isLoading: machinesLoading || logsLoading,
    error,
    refetch,
    currentTimeRange: displayTimeRange,
    resetTimeRange,
  };
}