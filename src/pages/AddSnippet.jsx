import { SnippetForm } from "../components/SnippetForm";

export const AddSnippet = ({ onSave, languages, onAddLanguage, isDarkMode, theme, currentThemeOptions, setTheme }) => {
  return (
    <div>
      <h3>Add Snippet</h3>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="themeSelect">Select Theme: &nbsp;</label>
        <select
          value={Object.keys(currentThemeOptions).find(key => currentThemeOptions[key] === theme)}
          onChange={(e) => setTheme(currentThemeOptions[e.target.value])}
          style={{
            padding: "8px",
            borderRadius: "4px",
            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
            border: "1px solid #ccc",
            color: isDarkMode ? "#ffffff" : "#333",
            width: "200px",
            fontSize: "16px"
          }}
        >
          {Object.keys(currentThemeOptions).map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName}
            </option>
          ))}
        </select>
      </div>
      <SnippetForm 
        onSave={onSave} 
        languages={languages} 
        onAddLanguage={onAddLanguage} 
        isDarkMode={isDarkMode} 
      />
    </div>
  );
}; 