import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import App from "../App";

// Portfolio Elements (existing tests remain unchanged)
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);
  // ... rest of the test
});

// ... other existing tests

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", async () => {
  render(<App />);
  const user = userEvent.setup();

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  await user.type(nameInput, 'Jane Doe');
  await user.type(emailInput, 'jane@example.com');

  expect(nameInput).toHaveValue('Jane Doe');
  expect(emailInput).toHaveValue('jane@example.com');
});

test("checked status of checkboxes changes when user clicks them", async () => {
  render(<App />);
  const user = userEvent.setup();

  const webDevCheckbox = screen.getByLabelText(/web development/i);
  const designCheckbox = screen.getByLabelText(/design/i);

  await user.click(webDevCheckbox);
  expect(webDevCheckbox).toBeChecked();

  await user.click(designCheckbox);
  expect(designCheckbox).toBeChecked();

  await user.click(webDevCheckbox);
  expect(webDevCheckbox).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", async () => {
  render(<App />);
  const user = userEvent.setup();

  // Fill out the form
  await user.type(screen.getByLabelText(/name/i), 'John Smith');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.click(screen.getByLabelText(/data science/i));

  // Submit the form
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // Check for success message
  expect(screen.getByText(/thank you/i)).toBeInTheDocument();
  expect(screen.getByText(/john smith/i)).toBeInTheDocument();
  expect(screen.getByText(/data science/i)).toBeInTheDocument();
});