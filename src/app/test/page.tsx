"use client";

import { useEventLogs } from "@/hooks/useEventLogs"
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EventLogs() {
  const { eventLogs, isLoading, error, currentTimeRange } =
    useEventLogs({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allLogs, setAllLogs] = useState<any[]>([]);

  useEffect(() => {
    if (eventLogs && eventLogs.length > 0) {
      setAllLogs((prevLogs) => {
        const existingLogsMap = new Map(
          prevLogs.map(log => [log.eventLogId, log])
        );

        eventLogs.forEach(log => {
          if (!existingLogsMap.has(log.eventLogId)) {
            existingLogsMap.set(log.eventLogId, log);
          }
        });

        return Array.from(existingLogsMap.values());
      });
    }
  }, [eventLogs]);


  const getEventTypeColor = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case "error":
        return "text-red-500";
      case "warning":
        return "text-amber-500";
      case "stopped":
        return "text-orange-500";
      case "started":
        return "text-green-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Event Logs</span>
        </CardTitle>
        <CardDescription>
          Monitoring from {currentTimeRange.startTime.toLocaleTimeString()} to {currentTimeRange.endTime.toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent>

        {error && (
          <div className="text-red-500 p-4 text-center">
            Error loading event logs: {(error as Error).message}
          </div>
        )}

        {!isLoading && allLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No events found in the selected time range
          </div>
        )}

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {allLogs.map((log) => (
            <div
              key={log.eventLogId}
              className="p-3 bg-gray-50 rounded-md flex justify-between"
            >
              <div>
                <span className={`font-medium ${getEventTypeColor(log.eventType)}`}>
                  {log.eventType}
                </span>
                <span className="mx-2 text-gray-700">
                  {log.machineName}
                </span>
                {log.job && (
                  <span className="text-sm text-gray-600">Job: {log.job}</span>
                )}
                {log.reason && (
                  <p className="text-sm text-gray-600 mt-1">{log.reason}</p>
                )}
              </div>
              <div className="text-gray-500 text-sm">
                {log.eventDateTime.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Auto-refreshes every minute. Total events: {allLogs.length}
        {isLoading && <span className="ml-2">(Loading...)</span>}
      </CardFooter>
    </Card>
  );
}