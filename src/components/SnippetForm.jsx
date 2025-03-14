import { useState } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";

// Form for code snippet creation
const SnippetForm = ({ onSave }) => {
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");

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
            <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <TextField
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Enter a language"
                required
            />
            <TextField
                label="Code Snippet"
                multiline
                rows={4}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
            />
            <Button type="submit" variant="contained">Save</Button>
        </form>
    );
};

export default SnippetForm;
