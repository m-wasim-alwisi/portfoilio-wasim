// app/dashboard/page.tsx
import pool from '@/lib/mysql';
import { Trash2, Mail, User, Calendar } from "lucide-react";
import { revalidatePath } from "next/cache";

// Define the Subscriber type
interface Subscriber {
  id: string;
  name: string;
  email: string;
  message: string | null;
  createdAt: Date;
}

export default async function Dashboard() {
  // 1. Fetch data from MySQL
  let subscribers: Subscriber[] = [];
  
  try {
    const [rows] = await pool.query(
      'SELECT * FROM subscribers ORDER BY createdAt DESC'
    );
    subscribers = rows as Subscriber[];
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    // Return empty array or handle error appropriately
  }

  // 2. Server Action to delete a subscriber
  async function deleteSubscriber(formData: FormData) {
    "use server";
    
    const id = formData.get("id") as string;
    
    try {
      await pool.query(
        'DELETE FROM subscribers WHERE id = ?',
        [id]
      );
      revalidatePath("/dashboard"); // Refresh the page data
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      throw new Error('Failed to delete subscriber');
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Mail className="text-blue-500" /> Subscription Manager
          </h1>
          <span className="bg-blue-600 px-4 py-1 rounded-full text-sm">
            {subscribers.length} Total Subscribers
          </span>
        </header>

        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-700/50 text-gray-300 uppercase text-xs">
                <th className="p-4 flex items-center gap-2"><User size={14}/> Name</th>
                <th className="p-4 text-center">Email</th>
                <th className="p-4">Message</th>
                <th className="p-4 flex items-center gap-2"><Calendar size={14}/> Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {subscribers.map((s: Subscriber) => (
                <tr key={s.id} className="hover:bg-gray-750 transition-colors">
                  <td className="p-4 font-medium">{s.name || "Anonymous"}</td>
                  <td className="p-4 text-blue-400">{s.email}</td>
                  <td className="p-4 text-gray-400 text-sm max-w-xs truncate">
                    {s.message || "No message"}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <form action={deleteSubscriber}>
                      <input type="hidden" name="id" value={s.id} />
                      <button 
                        type="submit"
                        className="text-red-400 hover:text-red-600 p-2 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {subscribers.length === 0 && (
            <div className="p-20 text-center text-gray-500">
              No subscribers yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}