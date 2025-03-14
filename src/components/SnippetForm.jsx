import { useState } from "react";
import { TextField, Button } from "@mui/material";

// Form for code snippet creation
const SnippetForm = ({ onSave, languages, onAddLanguage }) => {
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");

    // Handle tab key in code input
    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            
            // Insert 4 spaces for tab
            const spaces = '    ';
            const newValue = code.substring(0, start) + spaces + code.substring(end);
            setCode(newValue);
            
            // Move cursor after the inserted spaces
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + spaces.length;
            }, 0);
        }
    };

    // save snippet
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!languages.includes(language) && language.trim() !== "") {
            onAddLanguage(language); // Add new language if not already in the list
        }
        onSave({ title, language, code });
        setTitle("");
        setCode("");
    };

    return (
        // user enters title, language and code in their respective text fields and then clicks Save
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <TextField 
                label="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter a title for the snippet"
                required 
            />
            <TextField
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Enter a programming language (e.g. JavaScript, Python, Java, etc.)"
                required
            />
            <TextField
                label="Code Snippet"
                multiline
                minRows={8}
                maxRows={20}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter code here"
                required
                sx={{
                    '& .MuiInputBase-root': {
                        fontFamily: 'monospace',
                        fontSize: '14px',
                    }
                }}
            />
            <Button type="submit" variant="contained">Save</Button>
        </form>
    );
};

export default SnippetForm;
