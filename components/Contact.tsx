"use client";
import { FormEvent, useState } from "react"; // 1. Import FormEvent
import { Mail } from "lucide-react";
import { insertNewItem } from '@/lib/actions';
import { useRef } from 'react';

export default function Contact() {
  const [status, setStatus] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setStatus("Running");
    // Create FormData from the form element
    const formData = new FormData(e.currentTarget);
    
    const response = await insertNewItem(formData);
    // alert(response.message);
    if (response.status === 200) {
      formRef.current?.reset();
      setStatus(response.message);
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
      aria-label="Contact form" // Add this
      >
        
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          required
          className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
          aria-label="Your Name" // Add this
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
          aria-label="Your Email" // Add this
        />
        <textarea
          name="message"
          placeholder="Message"
          required
          className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
          aria-label="Message" // Add this
          
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
        <p className="mt-4 text-center">{status}</p>
      </form>
    </section>
  );
}
