import Speedometer from "./speedometer"

// // Sample data for speedometers
// const speedometersData = [
//   { value: 750, operator: "Emma Wilson", machine: "1", head: "8", designNumber: "D-1001", stitchCount: 25000 },
//   { value: 450, operator: "James Smith", machine: "2", head: "6", designNumber: "D-1002", stitchCount: 8500 },
//   { value: 0, operator: "Sarah Johnson", machine: "3", head: "8", designNumber: "D-1003", stitchCount: 42700 },
//   { value: 820, operator: "Michael Brown", machine: "4", head: "12", designNumber: "D-1004", stitchCount: 1250000 },
//   { value: 0, operator: "Lisa Davis", machine: "5", head: "6", designNumber: "D-1005", stitchCount: 750 },
//   { value: 650, operator: "Robert Miller", machine: "6", head: "8", designNumber: "D-1006", stitchCount: 65300 },
// ]

export default function Machines() {
  return <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Machine Status</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Speedometer
        status="running"
        operator="Muhammad Khan"
        totalStitchCount={2500}
        machineName="Emb Machine 9"
        goal={5000}
        headCount={12} />
      {/* {speedometersData.map((data, index) => (
        <Speedometer key={index} {...data} threshold={500} />
      ))} */}
    </div>
  </section>

}