"use client";
import { FormEvent, useState, useRef } from "react"; 
import { Mail } from "lucide-react";
import { insertNewItem } from '@/lib/actions';
import Toast from '@/components/Toast';

export default function Contact() {
  const [status, setStatus] = useState("");
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setStatus("Sending...");
    
    const formData = new FormData(e.currentTarget);
    const response = await insertNewItem(formData);

    if (response.status === 200) {
      formRef.current?.reset();
      setStatus(response.message);
      setToastType('success');
      setShowToast(true);
    } else {
      setStatus("Failed to send");
      setToastType('error');
      setShowToast(true);
    }
  };

  return (
    <section className="py-20 px-4 bg-gray-800 text-white">
      <h2 className="text-3xl font-bold text-center mb-10 flex justify-center items-center gap-3">
        <Mail className="w-8 h-8" /> Get In Touch
      </h2>

      <form 
        ref={formRef} 
        onSubmit={handleSubmit}
        className="max-w-md mx-auto"
        aria-label="Contact form"
      >
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          required
          className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
          aria-label="Your Name"
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
          aria-label="Your Email"
        />
        <textarea
          name="message"
          placeholder="Message"
          required
          className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
          aria-label="Message"   
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          {status === "Sending..." ? "Sending..." : "Send"}
        </button>
      </form>

      {/* Floating Toast Notification */}
      {showToast && (
        <Toast 
          message={status} 
          type={toastType} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </section>
  );
}