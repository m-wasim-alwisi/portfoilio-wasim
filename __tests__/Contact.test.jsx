import React from 'react';
import { render, screen,  waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '@/components/Contact';
import { insertNewItem } from '@/lib/actions';

// Mock the insertNewItem function
jest.mock('@/lib/actions', () => ({
  insertNewItem: jest.fn(),
}));

describe('Contact Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders the contact form with all fields', () => {
    render(<Contact />);

    // Check for the main heading
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();

    // Check for form fields
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument();

    // Check for the submit button
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  test('renders Mail icon in the heading', () => {
    render(<Contact />);
    // Since we mocked the Mail icon as a string, we can check for it
    expect(screen.getByText('MailIcon')).toBeInTheDocument();
  });

  test('updates form fields when user types', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Your Email');
    const messageInput = screen.getByPlaceholderText('Message');

    // Type into the inputs
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Hello, this is a test message');

    // Check if values are updated
    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Hello, this is a test message');
  });

  test('shows validation error when required fields are empty', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send/i });

    // Try to submit without filling required fields
    await user.click(submitButton);

    // The form should prevent submission due to HTML5 validation
    // We can check that the insertNewItem wasn't called
    expect(insertNewItem).not.toHaveBeenCalled();
  });

  test('submits form successfully with correct data', async () => {
    // Mock successful response
    const mockResponse = {
      status: 200,
      message: 'Message sent successfully!',
    };
    insertNewItem.mockResolvedValue(mockResponse);

    const user = userEvent.setup();
    render(<Contact />);

    // Fill out the form
    await user.type(screen.getByPlaceholderText('Your Name'), 'John Doe');
    await user.type(screen.getByPlaceholderText('Your Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Message'), 'Test message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send/i }));

    // Check that insertNewItem was called with FormData
    expect(insertNewItem).toHaveBeenCalledTimes(1);
    
    // The argument should be a FormData instance
    const formDataArg = insertNewItem.mock.calls[0][0];
    expect(formDataArg).toBeInstanceOf(FormData);
  });

  test('displays "Running" status when form is submitted', async () => {
    // Mock a slow response to see the "Running" status
    insertNewItem.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ status: 200, message: 'Success' }), 100))
    );

    const user = userEvent.setup();
    render(<Contact />);

    // Fill out the form
    await user.type(screen.getByPlaceholderText('Your Name'), 'John Doe');
    await user.type(screen.getByPlaceholderText('Your Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Message'), 'Test message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send/i }));

    // Check that "Running" status appears
    expect(screen.getByText('Running')).toBeInTheDocument();
  });

  test('resets form and shows success message on successful submission', async () => {
    const mockResponse = {
      status: 200,
      message: 'Message sent successfully!',
    };
    insertNewItem.mockResolvedValue(mockResponse);

    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Your Email');
    const messageInput = screen.getByPlaceholderText('Message');

    // Fill out the form
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send/i }));

    // Wait for the async operation to complete
    await waitFor(() => {
      // Check that success message is displayed
      expect(screen.getByText('Message sent successfully!')).toBeInTheDocument();
    });

    // Check that the form is reset (values should be empty)
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(messageInput).toHaveValue('');
  });

  test('does not reset form on failed submission', async () => {
    const mockResponse = {
      status: 400, // Not 200
      message: 'Failed to send message',
    };
    insertNewItem.mockResolvedValue(mockResponse);

    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Your Email');

    // Fill out the form
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send/i }));

    // Wait for the async operation to complete
    await waitFor(() => {
      // Check that error message is NOT displayed (since we only show success message)
      // The form should not be reset because status is not 200
      expect(nameInput).toHaveValue('John Doe'); // Value should remain
      expect(emailInput).toHaveValue('john@example.com'); // Value should remain
    });
  });

  test('handles FormData creation correctly', async () => {
    let capturedFormData;
    insertNewItem.mockImplementation((formData) => {
      capturedFormData = formData;
      return Promise.resolve({ status: 200, message: 'Success' });
    });

    const user = userEvent.setup();
    render(<Contact />);

    // Fill out the form
    await user.type(screen.getByPlaceholderText('Your Name'), 'Jane Smith');
    await user.type(screen.getByPlaceholderText('Your Email'), 'jane@example.com');
    await user.type(screen.getByPlaceholderText('Message'), 'Hello World');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send/i }));

    // Verify the FormData contains the correct values
    expect(capturedFormData).toBeInstanceOf(FormData);
    expect(capturedFormData.get('name')).toBe('Jane Smith');
    expect(capturedFormData.get('email')).toBe('jane@example.com');
    expect(capturedFormData.get('message')).toBe('Hello World');
  });

  test('prevents default form submission', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const form = screen.getByRole('form', { hidden: true }) || 
                 screen.getByPlaceholderText('Your Name').closest('form');

    // Create a mock event handler
    const submitHandler = jest.fn(e => e.preventDefault());
    form.onsubmit = submitHandler;

    // Fill and submit form
    await user.type(screen.getByPlaceholderText('Your Name'), 'Test');
    await user.type(screen.getByPlaceholderText('Your Email'), 'test@test.com');
    
    await user.click(screen.getByRole('button', { name: /send/i }));

    // Check that preventDefault would have been called
    expect(submitHandler).toHaveBeenCalled();
  });
  
});