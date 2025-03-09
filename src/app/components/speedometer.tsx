import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Format stitch count in K or M format when needed
const formatStitchCount = (count: number) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}

type SpeedometerProps = {
  status: "start" | "running" | "stopped",
  totalStitchCount: number,
  operator: string | null,
  machineName: string,
  goal: number,
  headCount: number,
}

// Speedometer component with different states
export default function Speedometer({ status, headCount, totalStitchCount, goal, operator, machineName }: SpeedometerProps) {
  const [isBlinking, setIsBlinking] = useState(false)

  // Calculate performance percentage
  const performancePercentage = goal > 0 ? (totalStitchCount / goal) * 100 : 0;
  const isPerformanceLow = performancePercentage < 90;

  useEffect(() => {
    // Set blinking effect for stopped status
    if (status === "stopped") {
      const interval = setInterval(() => {
        setIsBlinking((prev) => !prev)
      }, 500)
      return () => clearInterval(interval)
    } else {
      setIsBlinking(false)
    }
  }, [status])

  // Determine color based on value and status
  const getColor = () => {
    if (status === "stopped") {
      return isBlinking ? "transparent" : "rgb(239, 68, 68)" // Red blinking
    } else if (status === "running" && isPerformanceLow) {
      return "rgb(249, 115, 22)" // Orange for < 90% of goal
    }
    return "rgb(34, 197, 94)" // Green otherwise
  }

  // Determine status text and style
  const getStatus = () => {
    if (status === "stopped") {
      return {
        text: "Stopped Working",
        color: "text-red-500",
        blinking: isBlinking ? "opacity-50" : "opacity-100",
      }
    } else if (status === "running" && isPerformanceLow) {
      return {
        text: "Low Performance",
        color: "text-orange-500",
        blinking: "",
      }
    } else {
      return {
        text: "Operational",
        color: "text-green-500",
        blinking: "",
      }
    }
  }

  const statusToDisplay = getStatus()
  const formattedStitchCount = formatStitchCount(totalStitchCount)
  const statusText = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>Machine {machineName}</span>
          <span className={`text-sm flex items-center ${statusToDisplay.color} ${statusToDisplay.blinking} transition-opacity duration-300`}>
            <span className="inline-block w-2 h-2 rounded-full bg-current mr-2"></span>
            {statusToDisplay.text}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center ">
        <div className="relative w-32 h-32 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke={getColor()}
              strokeWidth="5"
              className="transition-colors duration-300"
            />
            <text x="50" y="45" textAnchor="middle" className="font-bold fill-foreground">
              {statusText}
            </text>
            <text x="50" y="60" textAnchor="middle" className="text-xs fill-foreground">
              {formattedStitchCount}
            </text>
          </svg>
        </div>
        <div className="w-full space-y-1">
          {operator && <div className="flex justify-between">
            <span className="text-muted-foreground">Operator:</span>
            <span className="font-medium">{operator}</span>
          </div>}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Head Count:</span>
            <span className="font-medium">{headCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Goal:</span>
            <span className="font-medium">{formatStitchCount(goal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Performance:</span>
            <span className={`font-medium ${isPerformanceLow && status === "running" ? "text-orange-500" : "text-green-500"}`}>
              {performancePercentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}