import { useState } from 'react';
import SearchForm from './components/SearchForm';
import NewsCard from './components/NewsCard';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  author: string;
  source: {
    name: string;
  };
}

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchNews = async (topic: string) => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    
    if (!apiKey || apiKey === 'your_newsapi_key_here') {
      setError('Please add your NewsAPI key to the .env file. Get your free API key from https://newsapi.org/');
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&sortBy=publishedAt&pageSize=12&apiKey=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch news');
      }

      if (data.articles && data.articles.length > 0) {
        // Filter out articles with incomplete data
        const validArticles = data.articles.filter((article: Article) => 
          article.title && 
          article.url && 
          article.title !== '[Removed]'
        );
        setArticles(validArticles);
      } else {
        setArticles([]);
        setError('No articles found for your search. Try different keywords.');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      if (err instanceof Error) {
        if (err.message.includes('CORS')) {
          setError('Due to CORS restrictions, NewsAPI requires a backend proxy for browser requests. Consider deploying with a serverless function or backend API.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to fetch news articles. Please try again.');
      }
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setArticles([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <SearchForm onSearch={searchNews} isLoading={isLoading} />
        
        {isLoading && <LoadingSpinner />}
        
        {error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}
        
        {!isLoading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
        )}
        
        {!isLoading && !error && hasSearched && articles.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto border border-gray-200 shadow-lg">
              <h3 className="text-xl font-semibold text-black mb-2">No articles found</h3>
              <p className="text-gray-600">Try searching with different keywords or check your spelling.</p>
            </div>
          </div>
        )}
        
        {!hasSearched && !isLoading && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 max-w-lg mx-auto border border-gray-200 shadow-lg">
              <h2 className="text-2xl font-bold text-black mb-4">Stay Informed</h2>
              <p className="text-gray-600 text-lg">
                Search for the latest news on any topic from around the world. 
                Enter a topic above to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;