import { Card, CardContent, Typography, Button } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// Shows list of all code snippets and their details
const SnippetList = ({ snippets, onDelete, theme, isDarkMode }) => {
  return (
    <div style={{ paddingBottom: "40px" }}>
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
            <Typography variant="h6">{snippet.title} ({snippet.language}) - <strong>{snippet.category}</strong></Typography>
            <SyntaxHighlighter language={snippet.language.toLowerCase() || "javascript"} style={theme}>
              {snippet.code}
            </SyntaxHighlighter>
            <Button 
              onClick={() => onDelete(index)} 
              variant="outlined" 
              color="error"
              sx={{
                borderColor: isDarkMode ? '#ffffff' : '#d32f2f',
                color: isDarkMode ? '#ffffff' : '#d32f2f',
                '&:hover': {
                  borderColor: isDarkMode ? '#ffffff' : '#d32f2f',
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(211, 47, 47, 0.1)',
                }
              }}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SnippetList;
