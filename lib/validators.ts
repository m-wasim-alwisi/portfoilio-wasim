// lib/validators.ts
import { ObjectId } from 'mongodb';

export const validators = {
  // Validate email format
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate password strength
  password: (password: string): boolean => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[0-9]/.test(password);
  },

  // Validate ObjectId
  objectId: (id: string): boolean => {
    return ObjectId.isValid(id);
  },

  // Sanitize string input
  sanitize: (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .trim();
  },

  // Validate number
  number: (value: any): boolean => {
    return !isNaN(Number(value)) && isFinite(value);
  },

  // Validate string length
  stringLength: (input: string, min: number, max: number): boolean => {
    return input.length >= min && input.length <= max;
  },
};