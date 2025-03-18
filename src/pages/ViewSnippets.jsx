import { CATEGORIES } from "../components/SnippetForm";
import SnippetList from "../components/SnippetList";
import CodeIcon from '@mui/icons-material/Code';

export const ViewSnippets = ({
    snippets,
    languages,
    onDelete,
    onUpdate,
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
                        {/* Theme selector */}
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
                    {/* Filter for categories (e.g. Frontend, Backend, etc.) */}
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
                    {/* Filter for languages entered by user */}
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
                    {/* Show user's snippets, if any */}
                    {filteredSnippets.length > 0 ? (
                        <div style={{ marginTop: "20px" }}>
                            <SnippetList
                                snippets={filteredSnippets}
                                onDelete={onDelete}
                                theme={theme}
                                isDarkMode={isDarkMode}
                                languages={languages}
                                onUpdate={onUpdate}
                            />
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                            <CodeIcon
                                sx={{
                                    fontSize: 100,
                                    color: isDarkMode ? '#666' : '#999',
                                    opacity: 0.5
                                }}
                            />
                            <p><em>No snippets in this category yet. Add some more snippets to see them here!</em></p>
                        </div>
                    )}
                </>
            ) : (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <CodeIcon
                        sx={{
                            fontSize: 100,
                            color: isDarkMode ? '#666' : '#999',
                            opacity: 0.5
                        }}
                    />
                    <p><em>No snippets yet. Add one!</em></p>
                </div>
            )}
        </div>
    );
}; 