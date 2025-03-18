export const CATEGORIES = ["Frontend", "Backend", "Database", "Algorithms"];

// Handle tab key in code input
export function handleKeyDown(event, code, setCode) {
  if (event.key === 'Tab') {
    event.preventDefault();
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;

    // Insert 4 spaces for tab
    const spaces = '    ';
    const newValue = code.substring(0, start) + spaces + code.substring(end);
    setCode(newValue);

    // Move cursor after the inserted spaces
    setTimeout(() => {
      event.target.selectionStart = event.target.selectionEnd = start + spaces.length;
    }, 0);
  }
} 