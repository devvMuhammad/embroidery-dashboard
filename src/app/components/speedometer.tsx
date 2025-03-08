
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

// Speedometer component with different states
export default function Speedometer({
  value = 0,
  threshold = 500,
  operator = "John Doe",
  machine = "1",
  head = "8",
  designNumber = "D-1234",
  stitchCount = 0,
}) {
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    // Set blinking effect for zero value
    if (value === 0) {
      const interval = setInterval(() => {
        setIsBlinking((prev) => !prev)
      }, 500)
      return () => clearInterval(interval)
    } else {
      setIsBlinking(false)
    }
  }, [value])

  // Determine color based on value
  const getColor = () => {
    if (value === 0) {
      return isBlinking ? "transparent" : "rgb(239, 68, 68)"
    }
    return value < threshold ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)"
  }

  // Determine status text and style
  const getStatus = () => {
    if (value === 0) {
      return {
        text: "Stopped Working",
        color: "text-red-500",
        blinking: isBlinking ? "opacity-50" : "opacity-100",
        state: "Stopped"
      }
    } else if (value < threshold) {
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

  const status = getStatus()
  const formattedStitchCount = formatStitchCount(stitchCount)

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>Machine {machine} - {head} Head</span>
          <span className={`text-sm flex items-center ${status.color} ${status.blinking} transition-opacity duration-300`}>
            <span className="inline-block w-2 h-2 rounded-full bg-current mr-2"></span>
            {status.text}
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
              {status.state}
            </text>
          </svg>
        </div>
        <div className="w-full space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Operator:</span>
            <span className="font-medium">{operator}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current Speed:</span>
            <span className="font-medium">{value} SPM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Design Number:</span>
            <span className="font-medium">{designNumber}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}