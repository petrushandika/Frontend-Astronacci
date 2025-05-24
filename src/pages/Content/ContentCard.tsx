import { Card, CardContent } from "@/components/ui/card";
import type { Content } from "@/types/content.types";
import { FiLock } from "react-icons/fi";

const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + " ...";
};

interface ContentCardProps extends Content {
  isLocked?: boolean;
}

function ContentCard({
  title,
  description,
  video,
  isLocked = false,
}: ContentCardProps) {
  const truncatedContent = truncateText(description, 10);

  return (
    <div className="relative group">
      <Card
        className={`overflow-hidden border border-gray-200 rounded-lg h-full transition-transform flex flex-col min-h-full shadow-none ${
          isLocked ? "opacity-70" : ""
        }`}
      >
        <div className="relative h-48 w-full bg-gray-100 flex-shrink-0">
          <video src={video} className="h-full w-full object-cover" />
        </div>

        <CardContent className="p-4 flex flex-col flex-grow min-h-fit">
          <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-800 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 text-pretty">
            {truncatedContent}
          </p>
        </CardContent>
      </Card>

      {isLocked && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-lg pointer-events-none">
          <FiLock className="text-white w-8 h-8" />
          <span className="text-white text-sm sm:text-base font-medium">
            Unlock Full Access
          </span>
        </div>
      )}
    </div>
  );
}

export default ContentCard;
