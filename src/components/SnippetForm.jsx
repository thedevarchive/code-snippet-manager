import { useState } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { CATEGORIES, handleKeyDown } from "../utils/snippetUtils";
import Tooltip from '@mui/material/Tooltip';
import "../App.css";

// Form for code snippet creation
export const SnippetForm = ({ onSave, languages, isDarkMode, theme }) => {
    //states for each field in SnippetForm
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);

    // state for showing the save tooltip when saving snippet is successful
    const [tooltipOpen, setTooltipOpen] = useState(false);

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

        // Show tooltip
        setTooltipOpen(true);
        setTimeout(() => setTooltipOpen(false), 1500); // Close after 1.5s
    };

    return (
        // user enters title, language and code in their respective text fields and then clicks Save
        <form className="snippet-form" onSubmit={handleSubmit}>
            <TextField
                className="snippet-form-field"
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
                <InputLabel className="snippet-form-field" sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Language</InputLabel>
                <Select
                    className="snippet-form-field"
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
                <InputLabel className="snippet-form-field" sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Category</InputLabel>
                <Select
                    className="snippet-form-field"
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
                        <MenuItem key={index} value={cat}>
                            {cat}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <textarea
                className="snippet-form-field"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => { handleKeyDown(e, code, setCode) }}
                style={{
                    backgroundColor: isDarkMode ? '#1a1a1a' : '#f8fafc',
                    color: isDarkMode ? '#e2e8f0' : '#2d3748',
                    border: isDarkMode ? '1px solid #4a5568' : '1px solid #cbd5e0',
                    fontFamily: "monospace"
                }}
            />
            <Tooltip title={tooltipOpen ? "Snippet saved!" : "Save snippet"}>
                <Button
                    className="snippet-form-field"
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
                    {tooltipOpen ? "Saved!" : "Save"}
                </Button>
            </Tooltip>
        </form>
    );
};
