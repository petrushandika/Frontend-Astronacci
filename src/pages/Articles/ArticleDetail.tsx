import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "@/services/api";
import type { Article } from "@/types/article.types";

function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      setError(null);
      try {
        const user = await API.USER.LOGGED_USER();

        const data = await API.CONTENT.ARTICLES();

        if (!data || !Array.isArray(data.articles)) {
          setError("Invalid article format.");
          setLoading(false);
          return;
        }

        const found = data.articles.find((a: Article) => a.id === id);
        if (!found) {
          setError("Article not found.");
          setArticle(null);
        } else {
          setArticle(found);
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("You must be logged in to access this article.");
        } else {
          setError(err.message || "Failed to load data.");
        }
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">Loading article...</div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!article) {
    return (
      <div className="p-4 text-center text-red-500">Article not found.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mb-6 rounded-lg overflow-hidden shadow-md">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {article.title}
      </h1>

      <div className="prose prose-gray prose-lg max-w-none">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
          {article.content}
        </p>
      </div>
    </div>
  );
}

export default ArticleDetail;
