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
  operator: string,
  machineName: string,
  goal: number,
  headCount: number,
}

// Speedometer component with different states
export default function Speedometer({ status, headCount, totalStitchCount, goal, operator, machineName }: SpeedometerProps) {
  const [isBlinking, setIsBlinking] = useState(false)



  useEffect(() => {
    // Set blinking effect for zero value
    if (status === "stopped") {
      const interval = setInterval(() => {
        setIsBlinking((prev) => !prev)
      }, 500)
      return () => clearInterval(interval)
    } else {
      setIsBlinking(false)
    }
  }, [status])

  // Determine color based on value
  const getColor = () => {
    if (status === "stopped") {
      return isBlinking ? "transparent" : "rgb(239, 68, 68)"
    }
    return totalStitchCount < goal ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)"
  }

  // Determine status text and style
  const getStatus = () => {
    if (status === "stopped") {
      return {
        text: "Stopped Working",
        color: "text-red-500",
        blinking: isBlinking ? "opacity-50" : "opacity-100",
        state: "Stopped"
      }
    } else if (totalStitchCount < goal) {
      return {
        text: "Low Performance",
        color: "text-red-500",
        blinking: "",
        state: "Running"
      }
    } else {
      return {
        text: "Operational",
        color: "text-green-500",
        blinking: "",
        state: "Running"
      }
    }
  }

  const statusToDisplay = getStatus()
  const formattedStitchCount = formatStitchCount(totalStitchCount)

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
            <text x="50" y="45" textAnchor="middle" className="text-xl font-bold fill-foreground">
              {formattedStitchCount}
            </text>
            <text x="50" y="60" textAnchor="middle" className="text-xs fill-foreground">
              {status}
            </text>
          </svg>
        </div>
        <div className="w-full space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Operator:</span>
            <span className="font-medium">{operator}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Head Count:</span>
            <span className="font-medium">{headCount}</span>
          </div>
          {/* <div className="flex justify-between">
            <span className="text-muted-foreground">Design Number:</span>
            <span className="font-medium">{designNumber}</span>
          </div> */}
        </div>
      </CardContent>
    </Card>
  )
}