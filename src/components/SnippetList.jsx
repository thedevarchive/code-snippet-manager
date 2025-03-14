import { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

// Shows list of all code snippets and their details
const SnippetList = ({ snippets, onDelete }) => {
  return (
    <div>
      {snippets.map((snippet, index) => (
        <Card key={index} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6">{snippet.title} ({snippet.language})</Typography>
            <pre style={{ backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
              <code>{snippet.code}</code>
            </pre>
            <Button onClick={() => onDelete(index)} variant="outlined" color="error">Delete</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SnippetList;
