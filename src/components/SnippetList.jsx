import { Card, CardContent, Typography, Button } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// Shows list of all code snippets and their details
const SnippetList = ({ snippets, onDelete, theme }) => {
  return (
    <div>
      {snippets.map((snippet, index) => (
        <Card key={index} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6">{snippet.title} ({snippet.language})</Typography>
            <SyntaxHighlighter language={snippet.language.toLowerCase() || "javascript"} style={theme}>
              {snippet.code}
            </SyntaxHighlighter>
            <Button onClick={() => onDelete(index)} variant="outlined" color="error">Delete</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SnippetList;
