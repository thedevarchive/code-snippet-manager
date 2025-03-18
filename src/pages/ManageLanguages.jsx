import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Box,
  Divider,
  Fab
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import { languageIcons } from '../utils/languageIcons';

const ManageLanguages = ({ languages, onUpdateLanguage, onDeleteLanguage, onAddLanguage, isDarkMode }) => {
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [languageToDelete, setLanguageToDelete] = useState(null);
  const [newLanguage, setNewLanguage] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (language) => {
    setEditingLanguage(language);
    setEditedName(language);
  };

  const handleSave = () => {
    if (editedName.trim() && editedName !== editingLanguage) {
      onUpdateLanguage(editingLanguage, editedName.trim());
    }
    setEditingLanguage(null);
  };

  const handleCancel = () => {
    setEditingLanguage(null);
  };

  const handleDeleteClick = (language) => {
    setLanguageToDelete(language);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteLanguage(languageToDelete);
    setDeleteDialogOpen(false);
    setLanguageToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setLanguageToDelete(null);
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleAddSave = () => {
    if (newLanguage.trim()) {
      onAddLanguage(newLanguage.trim());
      setNewLanguage('');
      setIsAdding(false);
    }
  };

  const handleAddCancel = () => {
    setNewLanguage('');
    setIsAdding(false);
  };

  const getLanguageIcon = (language) => {
    const IconComponent = languageIcons[language.toLowerCase()];
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3, 
        mt: 3
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: isDarkMode ? '#e2e8f0' : '#2d3748', 
            fontWeight: 'bold'
          }}
        >
          Manage Languages
        </Typography>
        {!isAdding && (
          <Tooltip title="Add Language">
            <Fab
              size="small"
              onClick={handleAddClick}
              sx={{
                backgroundColor: isDarkMode ? '#4caf50' : '#2e7d32',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: isDarkMode ? '#45a049' : '#1b5e20',
                }
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        )}
      </Box>

      {isAdding && (
        <Card
          sx={{
            mb: 3,
            backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
            color: isDarkMode ? '#e2e8f0' : '#2c3e50',
            boxShadow: isDarkMode 
              ? '0 2px 4px rgba(0, 0, 0, 0.2)' 
              : '0 2px 4px rgba(0, 0, 0, 0.4)'
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Enter new language name"
                size="small"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: isDarkMode ? '#e2e8f0' : '#2d3748',
                    '& fieldset': {
                      borderColor: isDarkMode ? '#4a5568' : '#cbd5e0',
                    },
                    '&:hover fieldset': {
                      borderColor: isDarkMode ? '#718096' : '#a0aec0',
                    },
                  },
                }}
              />
              <Tooltip title="Save">
                <IconButton 
                  onClick={handleAddSave}
                  sx={{ 
                    color: isDarkMode ? '#4caf50' : '#2e7d32',
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'rgba(76, 175, 80, 0.1)' : 'rgba(46, 125, 50, 0.1)',
                    }
                  }}
                >
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel">
                <IconButton 
                  onClick={handleAddCancel}
                  sx={{ 
                    color: isDarkMode ? '#ffffff' : '#1976d2',
                    '&:hover': {
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                    }
                  }}
                >
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      )}

      <Divider sx={{ mb: 3, backgroundColor: isDarkMode ? '#4a5568' : '#cbd5e0' }} />

      {languages.map((language) => (
        <Card
          key={language}
          sx={{
            mb: 2,
            backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
            color: isDarkMode ? '#e2e8f0' : '#2c3e50',
            boxShadow: isDarkMode 
              ? '0 2px 4px rgba(0, 0, 0, 0.2)' 
              : '0 2px 4px rgba(0, 0, 0, 0.4)'
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {editingLanguage === language ? (
                <>
                  <TextField
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    size="small"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: isDarkMode ? '#e2e8f0' : '#2d3748',
                        '& fieldset': {
                          borderColor: isDarkMode ? '#4a5568' : '#cbd5e0',
                        },
                        '&:hover fieldset': {
                          borderColor: isDarkMode ? '#718096' : '#a0aec0',
                        },
                      },
                    }}
                  />
                  <Tooltip title="Save">
                    <IconButton 
                      onClick={handleSave}
                      sx={{ 
                        color: isDarkMode ? '#4caf50' : '#2e7d32',
                        '&:hover': {
                          backgroundColor: isDarkMode ? 'rgba(76, 175, 80, 0.1)' : 'rgba(46, 125, 50, 0.1)',
                        }
                      }}
                    >
                      <SaveIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cancel">
                    <IconButton 
                      onClick={handleCancel}
                      sx={{ 
                        color: isDarkMode ? '#ffffff' : '#1976d2',
                        '&:hover': {
                          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                        }
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Typography sx={{ flexGrow: 1 }}>{getLanguageIcon(language)} &nbsp; {language}</Typography>
                  <Tooltip title="Edit language name">
                    <IconButton 
                      onClick={() => handleEdit(language)}
                      sx={{ 
                        color: isDarkMode ? '#ffffff' : '#1976d2',
                        '&:hover': {
                          backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete language">
                    <IconButton 
                      onClick={() => handleDeleteClick(language)}
                      sx={{ 
                        color: isDarkMode ? '#ff6b6b' : '#d32f2f',
                        '&:hover': {
                          backgroundColor: isDarkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}

      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Language</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{languageToDelete}"? This will also delete all snippets using this language.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDeleteCancel}
            sx={{ 
              color: isDarkMode ? '#ffffff' : '#1976d2',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(25, 118, 210, 0.1)',
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm}
            sx={{ 
              color: isDarkMode ? '#ff6b6b' : '#d32f2f',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255, 107, 107, 0.1)' : 'rgba(211, 47, 47, 0.1)',
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageLanguages; 