import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface QAItem {
  question: string;
  author: string;
  date: string;
  tags: { label: string; color: string }[];
  answered: boolean;
}

const qaItems: QAItem[] = [
  {
    question: "Comment configurer le SSO avec Azure AD ?",
    author: "Marie Dupont",
    date: "Il y a 3h",
    tags: [{ label: "Engineering", color: "#0078FF" }],
    answered: true,
  },
  {
    question: "Quelle est la procédure de remboursement ?",
    author: "Lucas Bernard",
    date: "Hier",
    tags: [{ label: "Finance", color: "#10b981" }],
    answered: true,
  },
  {
    question: "Quels sont les SLA pour le support Tier 2 ?",
    author: "Émilie Laurent",
    date: "Il y a 2j",
    tags: [{ label: "Support", color: "#f59e0b" }],
    answered: true,
  },
  {
    question: "Comment déployer en environnement staging ?",
    author: "Thomas Moreau",
    date: "Il y a 3j",
    tags: [
      { label: "Engineering", color: "#0078FF" },
      { label: "DevOps", color: "#8b5cf6" },
    ],
    answered: false,
  },
];

const filters = ["Tous", "Engineering", "Finance", "Support", "DevOps"];

export const QAListUI = ({
  activeFilter = "Tous",
  staggerDelay = 8,
}: {
  activeFilter?: string;
  staggerDelay?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const filteredItems =
    activeFilter === "Tous"
      ? qaItems
      : qaItems.filter((item) =>
          item.tags.some((t) => t.label === activeFilter)
        );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f1823",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ padding: "20px 24px 12px" }}>
        <div
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          Base de connaissances
        </div>

        {/* Search bar */}
        <div
          style={{
            background: "#1a2332",
            borderRadius: 10,
            padding: "10px 14px",
            color: "#6b7280",
            fontSize: 13,
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          🔍 Rechercher...
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {filters.map((filter) => (
            <div
              key={filter}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 500,
                background:
                  filter === activeFilter ? "#0078FF" : "#1a2332",
                color: filter === activeFilter ? "white" : "#9ca3af",
                border:
                  filter === activeFilter
                    ? "none"
                    : "1px solid #2a3442",
              }}
            >
              {filter}
            </div>
          ))}
        </div>
      </div>

      {/* Q&A Cards */}
      <div style={{ flex: 1, padding: "8px 24px", overflow: "hidden" }}>
        {filteredItems.map((item, i) => {
          const delay = i * staggerDelay + 10;
          const cardProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          return (
            <div
              key={i}
              style={{
                opacity: cardProgress,
                transform: `translateY(${interpolate(
                  cardProgress,
                  [0, 1],
                  [30, 0]
                )}px) scale(${interpolate(cardProgress, [0, 1], [0.95, 1])})`,
                background: "#1a2332",
                borderRadius: 14,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 8,
                  lineHeight: 1.4,
                }}
              >
                {item.question}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: 12,
                  }}
                >
                  {item.author} · {item.date}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 6,
                        fontSize: 10,
                        fontWeight: 600,
                        background: `${tag.color}20`,
                        color: tag.color,
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
