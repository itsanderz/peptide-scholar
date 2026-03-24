interface MoleculeDecorationProps {
  variant?: "helix" | "chain" | "ring" | "branch";
  className?: string;
}

export function MoleculeDecoration({
  variant = "helix",
  className = "",
}: MoleculeDecorationProps) {
  const color = "var(--color-border, #cbd5e1)";
  const secondaryColor = "var(--color-secondary, #3B7A9E)";

  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 120 120",
    width: 120,
    height: 120,
    fill: "none",
    className,
    style: { opacity: 0.15 } as React.CSSProperties,
    "aria-hidden": true as const,
  };

  if (variant === "helix") {
    return (
      <svg {...svgProps}>
        {/* Abstract alpha helix */}
        <path
          d="M30 10 Q60 30 30 50 Q0 70 30 90 Q60 110 30 130"
          stroke={secondaryColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M90 10 Q60 30 90 50 Q120 70 90 90 Q60 110 90 130"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Cross rungs */}
        <line x1="38" y1="20" x2="82" y2="20" stroke={color} strokeWidth="1.5" />
        <line x1="22" y1="40" x2="98" y2="40" stroke={color} strokeWidth="1.5" />
        <line x1="38" y1="60" x2="82" y2="60" stroke={color} strokeWidth="1.5" />
        <line x1="22" y1="80" x2="98" y2="80" stroke={color} strokeWidth="1.5" />
        <line x1="38" y1="100" x2="82" y2="100" stroke={color} strokeWidth="1.5" />
        {/* Nodes */}
        <circle cx="30" cy="10" r="3" fill={secondaryColor} />
        <circle cx="30" cy="50" r="3" fill={secondaryColor} />
        <circle cx="30" cy="90" r="3" fill={secondaryColor} />
        <circle cx="90" cy="30" r="3" fill={color} />
        <circle cx="90" cy="70" r="3" fill={color} />
        <circle cx="90" cy="110" r="3" fill={color} />
      </svg>
    );
  }

  if (variant === "chain") {
    return (
      <svg {...svgProps}>
        {/* Linear peptide chain */}
        <line x1="10" y1="60" x2="110" y2="60" stroke={color} strokeWidth="1.5" />
        {/* Amino acid nodes */}
        <circle cx="15" cy="60" r="5" fill={secondaryColor} opacity="0.6" />
        <circle cx="35" cy="60" r="5" fill={color} opacity="0.8" />
        <circle cx="55" cy="60" r="5" fill={secondaryColor} opacity="0.6" />
        <circle cx="75" cy="60" r="5" fill={color} opacity="0.8" />
        <circle cx="95" cy="60" r="5" fill={secondaryColor} opacity="0.6" />
        {/* Side chains */}
        <line x1="15" y1="55" x2="15" y2="38" stroke={secondaryColor} strokeWidth="1" />
        <circle cx="15" cy="35" r="3" fill={secondaryColor} opacity="0.4" />
        <line x1="35" y1="65" x2="35" y2="82" stroke={color} strokeWidth="1" />
        <circle cx="35" cy="85" r="3" fill={color} opacity="0.4" />
        <line x1="55" y1="55" x2="55" y2="38" stroke={secondaryColor} strokeWidth="1" />
        <circle cx="55" cy="35" r="3" fill={secondaryColor} opacity="0.4" />
        <line x1="75" y1="65" x2="75" y2="82" stroke={color} strokeWidth="1" />
        <circle cx="75" cy="85" r="3" fill={color} opacity="0.4" />
        <line x1="95" y1="55" x2="95" y2="38" stroke={secondaryColor} strokeWidth="1" />
        <circle cx="95" cy="35" r="3" fill={secondaryColor} opacity="0.4" />
        {/* Bond angles */}
        <line x1="15" y1="60" x2="25" y2="50" stroke={color} strokeWidth="1" opacity="0.5" />
        <line x1="55" y1="60" x2="65" y2="50" stroke={color} strokeWidth="1" opacity="0.5" />
      </svg>
    );
  }

  if (variant === "ring") {
    return (
      <svg {...svgProps}>
        {/* Cyclic peptide ring */}
        <polygon
          points="60,15 100,38 100,82 60,105 20,82 20,38"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
        {/* Nodes at vertices */}
        <circle cx="60" cy="15" r="5" fill={secondaryColor} opacity="0.7" />
        <circle cx="100" cy="38" r="5" fill={color} opacity="0.7" />
        <circle cx="100" cy="82" r="5" fill={secondaryColor} opacity="0.7" />
        <circle cx="60" cy="105" r="5" fill={color} opacity="0.7" />
        <circle cx="20" cy="82" r="5" fill={secondaryColor} opacity="0.7" />
        <circle cx="20" cy="38" r="5" fill={color} opacity="0.7" />
        {/* Inner connections */}
        <line x1="60" y1="15" x2="60" y2="105" stroke={color} strokeWidth="0.75" opacity="0.3" />
        <line x1="20" y1="38" x2="100" y2="82" stroke={color} strokeWidth="0.75" opacity="0.3" />
        <line x1="100" y1="38" x2="20" y2="82" stroke={color} strokeWidth="0.75" opacity="0.3" />
        {/* Center */}
        <circle cx="60" cy="60" r="4" fill={secondaryColor} opacity="0.3" />
      </svg>
    );
  }

  // variant === "branch"
  return (
    <svg {...svgProps}>
      {/* Branched peptide structure */}
      {/* Main trunk */}
      <line x1="60" y1="10" x2="60" y2="110" stroke={color} strokeWidth="1.5" />
      {/* Trunk nodes */}
      <circle cx="60" cy="20" r="5" fill={secondaryColor} opacity="0.7" />
      <circle cx="60" cy="45" r="5" fill={color} opacity="0.7" />
      <circle cx="60" cy="70" r="5" fill={secondaryColor} opacity="0.7" />
      <circle cx="60" cy="95" r="5" fill={color} opacity="0.7" />
      {/* Left branches */}
      <line x1="60" y1="20" x2="25" y2="10" stroke={secondaryColor} strokeWidth="1" />
      <circle cx="22" cy="9" r="3.5" fill={secondaryColor} opacity="0.5" />
      <line x1="60" y1="70" x2="20" y2="60" stroke={secondaryColor} strokeWidth="1" />
      <circle cx="17" cy="59" r="3.5" fill={secondaryColor} opacity="0.5" />
      <line x1="20" y1="60" x2="8" y2="45" stroke={secondaryColor} strokeWidth="0.75" opacity="0.5" />
      <circle cx="6" cy="43" r="2.5" fill={secondaryColor} opacity="0.3" />
      {/* Right branches */}
      <line x1="60" y1="45" x2="100" y2="35" stroke={color} strokeWidth="1" />
      <circle cx="103" cy="34" r="3.5" fill={color} opacity="0.5" />
      <line x1="60" y1="95" x2="95" y2="100" stroke={color} strokeWidth="1" />
      <circle cx="98" cy="101" r="3.5" fill={color} opacity="0.5" />
      <line x1="95" y1="100" x2="108" y2="112" stroke={color} strokeWidth="0.75" opacity="0.5" />
      <circle cx="110" cy="114" r="2.5" fill={color} opacity="0.3" />
    </svg>
  );
}
