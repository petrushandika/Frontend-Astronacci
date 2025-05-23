import { useEffect, useState } from "react";
import type { Article } from "@/types/article.types";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";
import MembershipUpgrade from "@/components/organisms/MembershipUpgrade";

type MembershipType = "Starter" | "Professional" | "Unlimited";

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const userMembership: MembershipType = "Starter";

  const getAccessLimit = (type: MembershipType): number => {
    switch (type) {
      case "Starter":
        return 3;
      case "Professional":
        return 10;
      case "Unlimited":
        return Infinity;
    }
  };

  const accessLimit = getAccessLimit(userMembership);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/article.json");
        if (!res.ok) throw new Error("Failed to load article data");

        const data = await res.json();
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred while loading articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No articles available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Articles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article, index) => {
          const isLocked = index >= accessLimit;

          return (
            <MembershipUpgrade
              key={article.id}
              isOpen={showUpgradeModal}
              onClose={() => setShowUpgradeModal(false)}
            >
              <Link
                to={isLocked ? "#" : `/article/${article.id}`}
                className="block h-full"
                onClick={(e) => {
                  if (isLocked) {
                    e.preventDefault();
                    setShowUpgradeModal(true);
                  }
                }}
              >
                <ArticleCard
                  id={article.id}
                  title={article.title}
                  description={article.description}
                  image={article.image}
                  isLocked={isLocked}
                />
              </Link>
            </MembershipUpgrade>
          );
        })}
      </div>
    </div>
  );
}

export default ArticleList;
