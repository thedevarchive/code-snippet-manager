import { useState } from "react";
import SnippetForm from "./SnippetForm";
import SnippetList from "./SnippetList";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [languages, setLanguages] = useState([]);

  // simple functions to add snippets and languages and delete snippets to be included in the components 
  // add a snippet to the list
  const addSnippet = (snippet) => {
    setSnippets([...snippets, snippet]);
  };

  // delete a snippet from the list
  const deleteSnippet = (index) => {
    setSnippets(snippets.filter((_, i) => i !== index));
  };

  // add a language to the list
  const addLanguage = (newLang) => {
    setLanguages([...languages, newLang]);
  };

  return (
    <div className="App">
      <div className="App-header">
        <div style={{ width: "50%", margin: "auto", paddingTop: "20px" }}>
          <h2>Code Snippet Manager</h2>
          <SnippetForm onSave={addSnippet} languages={languages} onAddLanguage={addLanguage} />
          <SnippetList snippets={snippets} onDelete={deleteSnippet} />
        </div>
      </div>
    </div>
  );
}

export default App;