// components/cars/Sidebar.tsx
interface SidebarProps {
  category: string;
  status: string;
  setCategory: (val: string) => void;
  setStatus: (val: string) => void;
}

export default function Sidebar({
  category,
  status,
  setCategory,
  setStatus,
}: SidebarProps) {
  return (
    <div className="space-y-4 p-4 border-r min-w-[200px]">
      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded-md"
        >
          <option value="">All</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
        </select>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Status</h3>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded-md"
        >
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
        </select>
      </div>
    </div>
  );
}
