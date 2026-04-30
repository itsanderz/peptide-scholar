import React from "react";
import { getAuthorById, type ContentAuthor } from "@/data/content-authors";

interface AuthorBioProps {
  authorId?: string;
  author?: ContentAuthor;
  compact?: boolean;
  showCredentials?: boolean;
  showBio?: boolean;
}

export const AuthorBio: React.FC<AuthorBioProps> = ({
  authorId,
  author: propAuthor,
  compact = false,
  showCredentials = true,
  showBio = true,
}) => {
  const author = propAuthor ?? (authorId ? getAuthorById(authorId) : undefined);

  if (!author) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ backgroundColor: "#1A3A5C" }}
        >
          {author.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: "#1C2028" }}>
            {author.name}
          </div>
          {showCredentials && (
            <div className="text-xs" style={{ color: "#5A6577" }}>
              {author.credentials}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
      <div
        className="author-bio-card rounded-xl p-5"
      style={{ backgroundColor: "#F8FAFC", border: "1px solid #D0D7E2" }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0"
          style={{ backgroundColor: "#1A3A5C" }}
        >
          {author.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-bold" style={{ color: "#1A3A5C" }}>
              {author.name}
            </span>
            {author.role === "medical-reviewer" && (
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#DCFCE7", color: "#166534" }}
              >
                Medically Reviewed
              </span>
            )}
          </div>
          {showCredentials && (
            <div className="text-sm mt-0.5" style={{ color: "#3B7A9E" }}>
              {author.credentials}
            </div>
          )}
          {showBio && (
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "#5A6577" }}>
              {author.bio}
            </p>
          )}
          {author.specialties.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {author.specialties.map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#EBF4FF", color: "#1A3A5C" }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
