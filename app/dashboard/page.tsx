// app/dashboard/page.tsx
// Remove 'use client' - this is a Server Component

import { db } from '@/db';
import { subscribers } from '@/db/schema';
import { Trash2, Mail, User, Calendar, LogOut } from "lucide-react";
import { revalidatePath } from "next/cache";
import { desc, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logout } from '@/lib/auth-actions';

interface Subscriber {
  id: number;
  name: string | null;
  email: string;
  message: string | null;
  createdAt: string;
}

// Check authentication on server side
async function checkAuth() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('auth_session')?.value;
  
  if (!sessionToken) {
    redirect('/login');
  }
}

export default async function Dashboard() {
  // Check authentication
  await checkAuth();

  let subscribersList: Subscriber[] = [];
  
  try {
    const rows = await db.select().from(subscribers).orderBy(desc(subscribers.createdAt));
    subscribersList = rows as unknown as Subscriber[];
  } catch (error) {
    console.error('Error fetching subscribers:', error);
  }

  async function deleteSubscriber(formData: FormData) {
    "use server";
    
    const id = formData.get("id") as string;
    
    try {
      // await db.delete(subscribers).where(subscribers.id.eq(parseInt(id)));
      await db.delete(subscribers).where(eq(subscribers.id, parseInt(id)));

      revalidatePath("/dashboard");
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
          <div className="flex items-center gap-4">
            <span className="bg-blue-600 px-4 py-1 rounded-full text-sm">
              {subscribersList.length} Total Subscribers
            </span>
            {/* Logout Form - Server Component */}
            <form action={logout}>
              <button 
                type="submit"
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </form>
          </div>
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
              {subscribersList.map((s: Subscriber) => (
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
          
          {subscribersList.length === 0 && (
            <div className="p-20 text-center text-gray-500">
              No subscribers yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}