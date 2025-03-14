import { useState } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";

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
          <p><em>Save your source code snippets in any programming language in one place</em></p>
          <SnippetForm onSave={addSnippet} languages={languages} onAddLanguage={addLanguage} />
          <SnippetList snippets={snippets} onDelete={deleteSnippet} />
        </div>
      </div>
    </div>
  );
}

export default App;