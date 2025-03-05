import { db } from "@/db"
import { machines } from "../../../drizzle/schema";

export default async function TestPage() {
  // Fetch machines data
  const allMachines = await db.select().from(machines);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-5">Machines Data</h1>
      <div className="p-4 bg-gray-100 rounded-md">
        <pre className="overflow-auto">{JSON.stringify(allMachines, null, 2)}</pre>
      </div>
    </div>
  );
}