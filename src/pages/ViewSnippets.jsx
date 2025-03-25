import { CATEGORIES } from "../utils/snippetUtils";
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
    filteredSnippets
}) => {
    return (
        <div className="component-div">
            {snippets.length > 0 ? (
                <>
                    {/* Filter for categories (e.g. Frontend, Backend, etc.) */}
                    <label className="view-snippet-label" htmlFor="categorySelect">Select Category: &nbsp;</label>
                    <select
                        className="snippet-dropdown"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                        style={{
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                            color: isDarkMode ? "#ffffff" : "#333",
                        }}>
                        <option value="All">All</option>
                        {CATEGORIES.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                    {/* Filter for languages entered by user */}
                    <label className="view-snippet-label" htmlFor="languageSelect">Select Language: &nbsp;</label>
                    <select
                        className="snippet-dropdown"
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        value={selectedLanguage}
                        style={{
                            backgroundColor: isDarkMode ? "#3b3b3b" : "#ffffff",
                            color: isDarkMode ? "#ffffff" : "#333"
                        }}>
                        <option value="All">All</option>
                        {languages.map((lang, index) => (
                            <option key={index} value={lang}>{lang}</option>
                        ))}
                    </select>
                    {/* Show user's snippets, if any */}
                    {filteredSnippets.length > 0 ? (
                        <div className="snippet-list">
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