import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MembershipUpgrade from "@/components/organisms/MembershipUpgrade";
import API from "@/services/api";
import type { User } from "@/types/user.types";
import ContentCard from "./ContentCard";
import type { Content } from "@/types/content.types";

type MembershipType = "Starter" | "Professional" | "Unlimited";

const defaultLimits: Record<MembershipType, number> = {
  Starter: 3,
  Professional: 10,
  Unlimited: Infinity,
};

export function ContentList() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [accessLimit, setAccessLimit] = useState<number>(0);

  useEffect(() => {
    function VIDEOS() {
      API.USER.LOGGED_USER()
        .then((user: User) => {
          const membership = user.membership ?? "Starter";

          API.CONTENT.VIDEOS()
            .then((data) => {
              console.log("API.CONTENT.VIDEOS() response:", data);
              if (!data || !Array.isArray(data.contents)) {
                setError("Invalid content format.");
                setLoading(false);
                return;
              }

              setContents(data.contents);
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
              setError(err.message || "Failed to load contents.");
              setLoading(false);
            });
        })
        .catch((err) => {
          if (err.response?.status === 401) {
            setError("You must be logged in to view contents.");
          } else {
            setError(err.message || "Failed to load user data.");
          }
          setLoading(false);
        });
    }

    VIDEOS();
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-600">Loading videos...</p>;

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  if (contents.length === 0)
    return (
      <p className="text-center py-10 text-gray-600">No videos available.</p>
    );

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Videos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {contents.map((content, i) => {
          const isLocked = i >= accessLimit;
          return (
            <MembershipUpgrade
              key={content.id}
              isOpen={showUpgradeModal}
              onClose={() => setShowUpgradeModal(false)}
            >
              <Link
                to={isLocked ? "#" : `/video/${content.id}`}
                className="block h-full"
                onClick={(e) => {
                  if (isLocked) {
                    e.preventDefault();
                    setShowUpgradeModal(true);
                  }
                }}
              >
                <ContentCard {...content} isLocked={isLocked} />
              </Link>
            </MembershipUpgrade>
          );
        })}
      </div>
    </div>
  );
}

export default ContentList;
