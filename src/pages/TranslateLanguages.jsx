import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useLocalStorage } from '../hooks/useLocalStorage'; // assuming you have a custom hook for localStorage
import useCodeTranslation from '../hooks/useCodeTranslation'; // custom hook for Hugging Face API

const TranslateLanguages = ({ languages, isDarkMode }) => {
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [translatedCode, setTranslatedCode] = useState('');
  const [savedSnippets, setSavedSnippets] = useLocalStorage('snippets', []);

  // Get available languages and code snippets
  const snippets = savedSnippets || [];

  const translationFromAPI = useCodeTranslation(selectedSnippet, selectedLanguage);

  useEffect(() => {
    console.log("translationFromAPI:", translationFromAPI);

    if (translationFromAPI) {
      const cleanedCode = translationFromAPI?.replace(/```[\w]*\n?/, '').replace(/```$/, '');
      setTranslatedCode(cleanedCode);
    }
  }, [translationFromAPI]);

  const handleSaveTranslation = () => {
    // Save the translated code to localStorage
    const updatedSnippets = [...savedSnippets, { code: translatedCode, language: selectedLanguage }];
    setSavedSnippets(updatedSnippets);
  };

  return (
    <div>
      <h1>Translate Code</h1>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Choose Code Snippet</InputLabel>
        <Select value={selectedSnippet} onChange={(e) => setSelectedSnippet(e.target.value)}>
          {snippets.map((snippet, index) => (
            <MenuItem key={index} value={snippet.code}>
              {snippet.title} ({snippet.language}) - &nbsp; <strong>{snippet.category}</strong>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Choose Language</InputLabel>
        <Select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          {languages.map((lang, index) => (
            <MenuItem value={lang}>{lang}</MenuItem>
          ))}
          {/* Add more languages here */}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Translated Code"
        value={translatedCode}
        multiline
        minRows={10}
        variant="outlined"
        margin="normal"
      />
      
      {/* Not sure if this will be implemented */}
      <Button variant="contained" onClick={handleSaveTranslation} disabled>
        Save Translated Code (Coming Soon)
      </Button>
    </div>
  );
};

export default TranslateLanguages;
