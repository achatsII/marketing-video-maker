import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { TypingAnimation } from "../../components/remotion/TypingAnimation";

const BotMessage = ({
  text,
  delay,
  variant = "normal",
}: {
  text: string;
  delay: number;
  variant?: "normal" | "error";
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  if (frame < delay) return null;

  const isError = variant === "error";

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: isError
            ? "linear-gradient(135deg, #f59e0b, #ef4444)"
            : "linear-gradient(135deg, #0078FF, #00C6FF)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 16 }}>{isError ? "⚠" : "🤖"}</span>
      </div>
      <div
        style={{
          background: isError ? "#2a1a1a" : "#1a2332",
          borderRadius: "12px 12px 12px 4px",
          padding: "12px 16px",
          color: isError ? "#fbbf24" : "#e0e0e0",
          fontSize: 14,
          maxWidth: 400,
          lineHeight: 1.5,
          border: isError ? "1px solid #f59e0b40" : "none",
        }}
      >
        {text}
      </div>
    </div>
  );
};

const UserBubble = ({
  text,
  delay,
}: {
  text: string;
  delay: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  if (frame < delay) return null;

  return (
    <div
      style={{
        opacity: progress,
        transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          background: "#0078FF",
          borderRadius: "12px 12px 4px 12px",
          padding: "12px 16px",
          color: "white",
          fontSize: 14,
          maxWidth: 400,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const SourceBadge = ({ delay }: { delay: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  if (frame < delay) return null;

  return (
    <div
      style={{
        opacity: progress,
        transform: `scale(${progress})`,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "#0078FF20",
        border: "1px solid #0078FF40",
        borderRadius: 6,
        padding: "4px 8px",
        fontSize: 11,
        color: "#0078FF",
        marginLeft: 42,
        marginTop: -4,
        marginBottom: 12,
      }}
    >
      📄 Source : Base de connaissances
    </div>
  );
};

/**
 * ChatbotUI — Flow:
 * 1. Bot welcome message
 * 2. User types Q1 in input field → cursor clicks send → Q1 bubble appears → AI responds
 * 3. User types Q2 in input field → cursor clicks send → Q2 bubble appears → AI error response
 *
 * Timeline (all frame values are relative to the component's own frame):
 * - q1TypingStart: user starts typing Q1 in input field
 * - q1SendClick: cursor clicks send, Q1 appears as bubble
 * - q1ResponseFrame: AI responds to Q1
 * - q2TypingStart: user starts typing Q2 in input field
 * - q2SendClick: cursor clicks send, Q2 appears as bubble
 * - q2ResponseFrame: AI error response to Q2
 */
export const ChatbotUI = ({
  q1TypingStart = 15,
  q1SendClick = 40,
  q1ResponseFrame = 48,
  q2TypingStart = 70,
  q2SendClick = 105,
  q2ResponseFrame = 113,
}: {
  q1TypingStart?: number;
  q1SendClick?: number;
  q1ResponseFrame?: number;
  q2TypingStart?: number;
  q2SendClick?: number;
  q2ResponseFrame?: number;
}) => {
  const frame = useCurrentFrame();

  const q1Text = "Comment configurer le SSO ?";
  const q2Text = "Comment fonctionne le remboursement ?";

  // Determine what's being typed in the input field right now
  const isTypingQ1 = frame >= q1TypingStart && frame < q1SendClick;
  const isTypingQ2 = frame >= q2TypingStart && frame < q2SendClick;

  // Send button glow on click
  const isSendingQ1 = frame >= q1SendClick && frame < q1SendClick + 6;
  const isSendingQ2 = frame >= q2SendClick && frame < q2SendClick + 6;
  const isSending = isSendingQ1 || isSendingQ2;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f1823",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #1a2332",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0078FF, #00C6FF)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 18 }}>🤖</span>
        </div>
        <div>
          <div style={{ color: "white", fontSize: 15, fontWeight: 600 }}>
            Assistant IA
          </div>
          <div style={{ color: "#6b7280", fontSize: 12 }}>En ligne</div>
        </div>
      </div>

      {/* Messages — start from top */}
      <div
        style={{
          flex: 1,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          overflow: "hidden",
        }}
      >
        {/* Bot welcome */}
        <BotMessage
          text="Bonjour ! Posez-moi n'importe quelle question sur votre entreprise."
          delay={0}
        />

        {/* Q1 user bubble — appears after send click */}
        <UserBubble text={q1Text} delay={1} />

        {/* Q1 bot response */}
        <BotMessage
          text="Le SSO se configure dans Sécurité > SSO. Ajoutez votre fournisseur d'identité, puis activez l'authentification unifiée."
          delay={2}
        />
        <SourceBadge delay={2} />

        {/* Q2 user bubble — appears after send click */}
        <UserBubble text={q2Text} delay={q2SendClick} />

        {/* Q2 AI error */}
        <BotMessage
          text="Information manquante. Je n'ai pas assez de données pour répondre. Demandez l'aide d'un expert."
          delay={q2ResponseFrame}
          variant="error"
        />
      </div>

      {/* Input bar — always fixed at bottom */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid #1a2332",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#1a2332",
            borderRadius: 20,
            padding: "10px 16px",
            color: isTypingQ1 || isTypingQ2 ? "#e0e0e0" : "#6b7280",
            fontSize: 14,
            minHeight: 20,
          }}
        >
          {isTypingQ1 ? (
            <TypingAnimation
              text={q1Text}
              startFrame={q1TypingStart}
              framesPerChar={2}
              showCursor={true}
            />
          ) : isTypingQ2 ? (
            <TypingAnimation
              text={q2Text}
              startFrame={q2TypingStart}
              framesPerChar={1}
              showCursor={true}
            />
          ) : (
            "Posez votre question..."
          )}
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "#0078FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: isSending
              ? "0 0 16px rgba(0, 120, 255, 0.8), 0 0 32px rgba(0, 120, 255, 0.4)"
              : "none",
            transform: `scale(${isSending ? 0.9 : 1})`,
          }}
        >
          <span style={{ color: "white", fontSize: 16 }}>➤</span>
        </div>
      </div>
    </div>
  );
};
