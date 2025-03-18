import { Card, CardContent, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useState } from "react";
import { CATEGORIES } from "./SnippetForm";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';

// Shows list of all code snippets and their details
const SnippetList = ({ snippets, onDelete, theme, isDarkMode, onUpdate, languages }) => {
  //states for editing a snippet and managing changes in snippet
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSnippet, setEditedSnippet] = useState({
    title: "",
    language: "",
    category: "",
    code: ""
  });

  //state for managing snippet to be copied to clipboard
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleEdit = (index, snippet) => {
    setEditingIndex(index);
    setEditedSnippet({
      title: snippet.title,
      language: snippet.language,
      category: snippet.category,
      code: snippet.code
    });
  };

  // function to copy code to clipboard
  const handleCopy = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // save any edits to a snippet
  const handleSave = (index) => {
    // Find the original index in the full snippets array
    const originalIndex = snippets.findIndex(s =>
      s.title === snippets[index].title &&
      s.language === snippets[index].language &&
      s.category === snippets[index].category
    );
    onUpdate(originalIndex, editedSnippet);
    setEditingIndex(null);
  };

  // cancel editing a snippet
  const handleCancel = () => {
    setEditingIndex(null);
  };

  // handle input changes in the editing form
  const handleInputChange = (field, value) => {
    setEditedSnippet(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // render the list of snippets
  return (
    <div>
      {snippets.map((snippet, index) => (
        <Card
          key={index}
          style={{
            marginBottom: "10px",
            backgroundColor: isDarkMode ? '#3b3b3b' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000'
          }}
        >
          <CardContent>
            {editingIndex === index ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                  {/* Show editing form when user is editing a snippet */}
                  <TextField
                    label="Title"
                    value={editedSnippet.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: isDarkMode ? '#ffffff' : '#000000',
                        '& fieldset': {
                          borderColor: isDarkMode ? '#ffffff' : '#000000',
                        },
                        '&:hover fieldset': {
                          borderColor: isDarkMode ? '#ffffff' : '#000000',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDarkMode ? '#ffffff' : '#000000',
                      },
                    }}
                  />
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Language</InputLabel>
                    <Select
                      value={editedSnippet.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      label="Language"
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
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Category</InputLabel>
                    <Select
                      value={editedSnippet.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      label="Category"
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
                      {CATEGORIES.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <textarea
                  value={editedSnippet.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '200px',
                    margin: '20px 0',
                    padding: '15px',
                    borderRadius: '4px',
                    backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                    color: isDarkMode ? '#ffffff' : '#000000',
                    border: isDarkMode ? '1px solid #ffffff' : '1px solid #000000',
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
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Tooltip title="Save edits">
                    <Button
                      onClick={() => handleSave(index)}
                      variant="outlined"
                      size="small"
                      sx={{
                        minWidth: '40px',
                        padding: '8px',
                        backgroundColor: isDarkMode ? '#4caf50' : '#2e7d32',
                        color: '#ffffff',
                        '&:hover': {
                          borderColor: '#ffffff',
                          backgroundColor: isDarkMode ? '#45a049' : '#1b5e20',
                        }
                      }}
                    >
                      <SaveIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Cancel edit">
                    <Button
                      onClick={() => handleCancel()}
                      variant="outlined"
                      size="small"
                      sx={{
                        minWidth: '40px',
                        padding: '8px',
                        borderColor: isDarkMode ? '#ffffff' : '#1976d2',
                        color: isDarkMode ? '#ffffff' : '#1976d2',
                        '&:hover': {
                          borderColor: isDarkMode ? '#ffffff' : '#1976d2',
                          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                        }
                      }}
                    >
                      <CancelIcon />
                    </Button>
                  </Tooltip>
                </div>
              </>
            ) : (
              <>
                {/* Show snippet details when user is not editing a snippet 
                    i.e. prevent editing when user is viewing a snippet */}
                <Typography variant="h6">{snippet.title} ({snippet.language}) - <strong>{snippet.category}</strong></Typography>
                <SyntaxHighlighter
                  language={snippet.language.toLowerCase() || "javascript"}
                  style={theme}
                  showLineNumbers={false}
                  wrapLines={true}
                  customStyle={{
                    margin: '20px 0',
                    padding: '15px',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                >
                  {snippet.code}
                </SyntaxHighlighter>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Tooltip title="Edit snippet">
                    <Button
                      onClick={() => handleEdit(index, snippet)}
                      variant="outlined"
                      size="small"
                      sx={{
                        minWidth: '40px',
                        padding: '8px',
                        borderColor: isDarkMode ? '#ffffff' : '#1976d2',
                        color: isDarkMode ? '#ffffff' : '#1976d2',
                        '&:hover': {
                          borderColor: isDarkMode ? '#ffffff' : '#1976d2',
                          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                        }
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title={copiedIndex === index ? "Copied!" : "Copy to clipboard"}>
                    <Button
                      onClick={() => handleCopy(snippet.code, index)}
                      variant="outlined"
                      size="small"
                      sx={{
                        minWidth: '40px',
                        padding: '8px',
                        borderColor: isDarkMode ? '#ffffff' : '#1976d2',
                        color: isDarkMode ? '#ffffff' : '#1976d2',
                        '&:hover': {
                          borderColor: isDarkMode ? '#ffffff' : '#1976d2',
                          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                        }
                      }}
                    >
                      {copiedIndex === index ? <CheckIcon /> : <ContentCopyIcon />}
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete snippet">
                    <Button
                      onClick={() => onDelete(index)}
                      variant="outlined"
                      size="small"
                      sx={{
                        minWidth: '40px',
                        padding: '8px',
                        borderColor: isDarkMode ? '#ff6b6b' : '#d32f2f',
                        color: isDarkMode ? '#ff6b6b' : '#d32f2f',
                        '&:hover': {
                          borderColor: isDarkMode ? '#ff6b6b' : '#d32f2f',
                          backgroundColor: isDarkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                        }
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))
      }
    </div>
  );
};

export default SnippetList;
