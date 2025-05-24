import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Article } from "@/types/article.types";
import ArticleCard from "./ArticleCard";
import MembershipUpgrade from "@/components/organisms/MembershipUpgrade";
import API from "@/services/api";
import type { User } from "@/types/user.types";

type MembershipType = "Starter" | "Professional" | "Unlimited";

const defaultLimits: Record<MembershipType, number> = {
  Starter: 3,
  Professional: 10,
  Unlimited: Infinity,
};

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [accessLimit, setAccessLimit] = useState<number>(0);

  useEffect(() => {
    function ARTICLES() {
      API.USER.LOGGED_USER()
        .then((user: User) => {
          const membership = user.membership ?? "Starter";

          API.CONTENT.ARTICLES()
            .then((data) => {
              if (!data || !Array.isArray(data.articles)) {
                setError("Invalid article format.");
                setLoading(false);
                return;
              }

              setArticles(data.articles);
              const limit =
                data.limit == null
                  ? defaultLimits[membership]
                  : data.limit === Infinity
                  ? Infinity
                  : data.limit;
              setAccessLimit(limit);
              setLoading(false);
            })
            .catch((err) => {
              setError(err.message || "Failed to load articles.");
              setLoading(false);
            });
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            setError("You must be logged in to view articles.");
          } else {
            setError(err.message || "Failed to load user data.");
          }
          setLoading(false);
        });
    }

    ARTICLES();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-600">Loading articles...</p>
    );

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  if (articles.length === 0)
    return (
      <p className="text-center py-10 text-gray-600">No articles available.</p>
    );

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Articles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article, i) => {
          const isLocked = i >= accessLimit;
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
                <ArticleCard {...article} isLocked={isLocked} />
              </Link>
            </MembershipUpgrade>
          );
        })}
      </div>
    </div>
  );
}

export default ArticleList;
