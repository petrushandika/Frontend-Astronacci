import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MembershipUpgrade from "@/components/organisms/MembershipUpgrade";
import type { Content } from "@/types/content.types";
import ContentCard from "./ContentCard";

type MembershipType = "Starter" | "Professional" | "Unlimited";

export function ContentList() {
  const [contents, setContents] = useState<Content[]>([]);
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
        const res = await fetch("/data/content.json");
        if (!res.ok) throw new Error("Failed to load content data");

        const data = await res.json();
        if (Array.isArray(data)) {
          setContents(data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An error occurred while loading contents.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Loading contents...</p>
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

  if (contents.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">No contents available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Video</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {contents.map((content, index) => {
          const isLocked = index >= accessLimit;

          return (
            <MembershipUpgrade
              key={content.id}
              isOpen={showUpgradeModal}
              onClose={() => setShowUpgradeModal(false)}
            >
              <Link
                to={isLocked ? "#" : `/content/${content.id}`}
                className="block h-full"
                onClick={(e) => {
                  if (isLocked) {
                    e.preventDefault();
                    setShowUpgradeModal(true);
                  }
                }}
              >
                <ContentCard
                  id={content.id}
                  title={content.title}
                  description={content.description}
                  video={content.video}
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

export default ContentList;
