"use client";

import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-20 px-4 bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-10 flex justify-center items-center gap-3">
        <Mail className="w-8 h-8" />
        Get In Touch
      </h2>

      <form className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 mb-4 bg-gray-700 rounded"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 mb-4 bg-gray-700 rounded"
        />

        <textarea
          placeholder="Message"
          className="w-full p-3 mb-4 bg-gray-700 rounded"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 py-3 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </section>
  );
}
