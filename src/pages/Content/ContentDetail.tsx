import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Content } from "@/types/content.types";
import API from "@/services/api";

function ContentDetail() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      setError(null);
      try {
        const user = await API.USER.LOGGED_USER();

        const data = await API.CONTENT.VIDEOS();

        if (!data || !Array.isArray(data.contents)) {
          setError("Invalid content format.");
          setLoading(false);
          return;
        }

        const found = data.contents.find((c: Content) => c.id === id);
        if (!found) {
          setError("Content not found.");
          setContent(null);
        } else {
          setContent(found);
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("You must be logged in to access this content.");
        } else {
          setError(err.message || "Failed to load data.");
        }
        setContent(null);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">Loading content...</div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!content) {
    return (
      <div className="p-4 text-center text-red-500">Content not found.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mb-6 rounded-lg overflow-hidden shadow-md">
        <video
          src={content.video}
          controls
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        {content.title}
      </h1>

      <div className="prose prose-gray prose-lg max-w-none">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
          {content.description}
        </p>
      </div>
    </div>
  );
}

export default ContentDetail;
