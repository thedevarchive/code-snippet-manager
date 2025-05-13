import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

const useCodeTranslation = (codeSnippet, targetLanguage) => {
    const [translatedCode, setTranslatedCode] = useState(null);

    useEffect(() => {
        if (!codeSnippet || !targetLanguage) return;

        const translateCode = async () => {
            try {
                const response = await fetch('https://chatstat-openai.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2025-01-01-preview', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`, // Replace with your API key
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o', // Codex model for code-related tasks
                        "messages": [
                            { "role": "system", "content": "You are an assistant that translates code between programming languages."},
                            { "role": "user", "content": `Translate the following code to ${targetLanguage}: \n\n${codeSnippet}. Only show the translated code.` }
                        ],
                        max_tokens: 100,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Translation failed!');
                }

                const data = await response.json();
                setTranslatedCode(data.choices[0].message.content.trim()); // Adjust based on response format
            } catch (err) {
                console.log(err); 
            }
        };

        translateCode();
    }, [codeSnippet, targetLanguage]);

    return translatedCode; 
};

export default useCodeTranslation;
