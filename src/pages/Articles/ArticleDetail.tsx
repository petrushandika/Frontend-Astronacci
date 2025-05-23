import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Article } from "@/types/article.types";

function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/article.json")
      .then((res) => res.json())
      .then((data: Article[]) => {
        const found = data.find((a) => a.id === id);
        setArticle(found || null);
        setLoading(false);
      })
      .catch(() => {
        setArticle(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">Memuat artikel...</div>
    );
  }

  if (!article) {
    return (
      <div className="p-4 text-center text-red-500">
        Artikel tidak ditemukan.
      </div>
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
          {article.description}
        </p>
      </div>
    </div>
  );
}

export default ArticleDetail;
