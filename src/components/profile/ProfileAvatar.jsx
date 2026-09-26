export default function ProfileAvatar({ user, size = 40 }) {
  const initials = user?.name
    ?.split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const style = {
    width: size,
    height: size,
    display: "block",
    borderRadius: "50%",
    flexShrink: 0,
    objectFit: "cover",
  };

  if (user?.profilePic) {
    return (
      <img src={user.profilePic} alt={`${user.name} profile`} style={style} />
    );
  }

  return (
    <span
      aria-label={`${user?.name || user?.username || "User"} profile`}
      role="img"
      style={{
        ...style,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e5e7eb",
        color: "#374151",
        fontSize: size * 0.36,
        fontWeight: 600,
      }}
    >
      {initials || "?"}
    </span>
  );
}
