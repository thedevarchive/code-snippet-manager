import { SnippetForm } from "../components/SnippetForm";

export const AddSnippet = ({ onSave, languages, onAddLanguage, isDarkMode }) => {
  return (
    <div>
      <SnippetForm 
        onSave={onSave} 
        languages={languages} 
        onAddLanguage={onAddLanguage} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
}; 