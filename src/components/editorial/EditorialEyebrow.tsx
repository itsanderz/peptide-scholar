import { EDITORIAL, editorialFont } from "./tokens";

interface Props {
  number?: string;
  children: React.ReactNode;
  color?: string;
}

export function EditorialEyebrow({ number, children, color = EDITORIAL.sage }: Props) {
  return (
    <div
      className="text-[11px] flex items-center gap-3 mb-5"
      style={{ ...editorialFont.eyebrow, color }}
    >
      {number && (
        <span
          className="inline-block"
          style={{ fontVariantNumeric: "tabular-nums", color: EDITORIAL.ink }}
        >
          {number}
        </span>
      )}
      <span
        className="inline-block h-px flex-1"
        style={{ backgroundColor: EDITORIAL.ruleSoft, maxWidth: "40px" }}
      />
      <span>{children}</span>
    </div>
  );
}
