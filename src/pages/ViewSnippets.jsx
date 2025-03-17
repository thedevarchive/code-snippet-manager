import { CATEGORIES } from "../components/SnippetForm";
import SnippetList from "../components/SnippetList";

export const ViewSnippets = ({
    snippets,
    languages,
    onDelete,
    isDarkMode,
    theme,
    selectedCategory,
    setSelectedCategory,
    selectedLanguage,
    setSelectedLanguage,
    filteredSnippets, 
    currentThemeOptions, 
    setTheme
}) => {
    return (
        <div>
            {snippets.length > 0 ? (
                <>
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
                    <label htmlFor="categorySelect">Select Category: &nbsp;</label>
                    <select
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                            border: "1px solid #ccc",
                            color: isDarkMode ? "#ffffff" : "#333",
                            width: "200px",
                            fontSize: "16px",
                            marginBottom: "20px"
                        }}>
                        <option value="All">All</option>
                        {CATEGORIES.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <label htmlFor="languageSelect">&nbsp; Select Language: &nbsp;</label>
                    <select
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        value={selectedLanguage}
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                            border: "1px solid #ccc",
                            color: isDarkMode ? "#ffffff" : "#333",
                            width: "200px",
                            fontSize: "16px",
                            marginBottom: "20px"
                        }}>
                        <option value="All">All</option>
                        {languages.map((lang, index) => (
                            <option key={index} value={lang}>{lang}</option>
                        ))}
                    </select>
                    {filteredSnippets.length > 0 ? (
                        <div style={{ marginTop: "20px" }}>
                            <SnippetList
                                snippets={filteredSnippets}
                                onDelete={onDelete}
                                theme={theme}
                                isDarkMode={isDarkMode}
                            />
                        </div>
                    ) : (
                        <p>No snippets in this category yet. Add some more snippets to see them here!</p>
                    )}
                </>
            ) : (
                <p>No snippets yet. Add one!</p>
            )}
        </div>
    );
}; 