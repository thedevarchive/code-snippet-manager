import { useState } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CATEGORIES, handleKeyDown } from "../utils/snippetUtils";

// Form for code snippet creation
export const SnippetForm = ({ onSave, languages, isDarkMode, theme }) => {
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);

    // save snippet
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && language && category && code) {
            onSave({ title, language, category, code });
            setTitle("");
            setLanguage("");
            setCategory("");
            setCode("");
        }
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
                sx={{
                    '& .MuiInputLabel-root': {
                        color: isDarkMode ? '#ffffff' : '#000000',
                    },
                    '& .MuiOutlinedInput-root': {
                        color: isDarkMode ? '#ffffff' : '#000000',
                        '& fieldset': {
                            borderColor: isDarkMode ? '#ffffff' : '#000000',
                        },
                        '&:hover fieldset': {
                            borderColor: isDarkMode ? '#ffffff' : '#000000',
                        },
                    }
                }}
            />
            <FormControl>
                <InputLabel sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Language</InputLabel>
                <Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    label="Language"
                    required
                    sx={{
                        color: isDarkMode ? '#ffffff' : '#000000',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: isDarkMode ? '#ffffff' : '#000000',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: isDarkMode ? '#ffffff' : '#000000',
                        },
                    }}
                >
                    {languages.map((lang) => (
                        <MenuItem key={lang} value={lang}>
                            {lang}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Category</InputLabel>
                <Select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                    required
                    sx={{
                        color: isDarkMode ? '#ffffff' : '#000000',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: isDarkMode ? '#ffffff' : '#000000',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: isDarkMode ? '#ffffff' : '#000000',
                        },
                    }}
                >
                    {CATEGORIES.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => {handleKeyDown(e, code, setCode)}}
                style={{
                    width: '100%',
                    minHeight: '200px',
                    margin: '20px 0',
                    padding: '15px',
                    borderRadius: '4px',
                    backgroundColor: isDarkMode ? '#1a1a1a' : '#f8fafc',
                    color: isDarkMode ? '#e2e8f0' : '#2d3748',
                    border: isDarkMode ? '1px solid #4a5568' : '1px solid #cbd5e0',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    lineHeight: '1.5',
                    whiteSpace: 'pre',
                    overflow: 'auto',
                    display: 'block'
                }}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{
                    backgroundColor: isDarkMode ? '#ffffff' : '#1976d2',
                    color: isDarkMode ? '#000000' : '#ffffff',
                    '&:hover': {
                        backgroundColor: isDarkMode ? '#e0e0e0' : '#1565c0',
                    }
                }}
            >
                Save
            </Button>
        </form>
    );
};
