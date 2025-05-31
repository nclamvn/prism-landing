const API_URL = 'https://web-production-87be0.up.railway.app';

export async function translateText(text: string, targetLang: string = 'vi') {
  try {
    const response = await fetch(`${API_URL}/api/v1/translation/translate-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        target_language: targetLang,
        source_language: 'en',
        provider: 'openai'
      }),
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}
