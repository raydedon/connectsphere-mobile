import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import type { FeedPost } from "./types";

type PostCardProps = {
  onLike: () => void;
  onSave: () => void;
  post: FeedPost;
};

export function PostCard({ onLike, onSave, post }: PostCardProps) {
  const liked = post.likedByMe ?? false;
  const saved = post.savedByMe ?? false;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: post.avatarColor }]}>
          <Text style={styles.avatarText}>{post.initials}</Text>
        </View>
        <View style={styles.authorBlock}>
          <Text style={styles.author}>{post.author}</Text>
          <Text style={styles.meta}>
            @{post.handle} · {post.time}
            {post.location ? ` · ${post.location}` : ""}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`More options for ${post.author}'s post`}
          hitSlop={10}
          onPress={() => Alert.alert("Post options", "More post actions will be added in a later milestone.")}
          style={styles.moreButton}
        >
          <Text style={styles.more}>···</Text>
        </Pressable>
      </View>

      <Text style={styles.body}>{post.body}</Text>

      {post.imageLabel && post.imageColor ? (
        <View
          accessibilityLabel={post.imageLabel}
          style={[styles.imagePlaceholder, { backgroundColor: post.imageColor }]}
        >
          <View style={styles.imageBadge}>
            <Text style={styles.imageBadgeText}>{post.imageLabel}</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.metrics}>
        <Text style={styles.metricText}>
          {post.likes + (liked ? 1 : 0)} likes
        </Text>
        <Text style={styles.metricText}>{post.comments} comments</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={liked ? "Unlike post" : "Like post"}
          accessibilityState={{ selected: liked }}
          onPress={onLike}
          style={styles.action}
        >
          <Text style={[styles.actionIcon, liked && styles.selectedAction]}>
            {liked ? "♥" : "♡"}
          </Text>
          <Text style={[styles.actionLabel, liked && styles.selectedAction]}>
            Like
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${post.comments} comments`}
          onPress={() => Alert.alert("Comments", "Comment threads will be added in a later milestone.")}
          style={styles.action}
        >
          <Text style={styles.actionIcon}>◯</Text>
          <Text style={styles.actionLabel}>Comment</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={saved ? "Remove saved post" : "Save post"}
          accessibilityState={{ selected: saved }}
          onPress={onSave}
          style={styles.action}
        >
          <Text style={[styles.actionIcon, saved && styles.selectedAction]}>
            {saved ? "▣" : "▢"}
          </Text>
          <Text style={[styles.actionLabel, saved && styles.selectedAction]}>
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E9E7E2",
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
  },
  header: { alignItems: "center", flexDirection: "row" },
  avatar: {
    alignItems: "center",
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  avatarText: { color: "#26352B", fontSize: 13, fontWeight: "700" },
  authorBlock: { flex: 1, marginLeft: 11 },
  author: { color: "#20251F", fontSize: 14, fontWeight: "700" },
  meta: { color: "#777D75", fontSize: 11, marginTop: 3 },
  moreButton: { paddingHorizontal: 4, paddingVertical: 8 },
  more: { color: "#656C64", fontSize: 20, fontWeight: "700", lineHeight: 18 },
  body: { color: "#30362F", fontSize: 14, lineHeight: 21, marginTop: 14 },
  imagePlaceholder: {
    borderRadius: 14,
    height: 170,
    justifyContent: "flex-end",
    marginTop: 13,
    overflow: "hidden",
  },
  imageBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.84)",
    borderRadius: 10,
    margin: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  imageBadgeText: { color: "#30362F", fontSize: 11, fontWeight: "600" },
  metrics: { flexDirection: "row", justifyContent: "space-between", marginTop: 13 },
  metricText: { color: "#777D75", fontSize: 11 },
  divider: { backgroundColor: "#EEECE7", height: 1, marginTop: 12 },
  actions: { flexDirection: "row", justifyContent: "space-around", paddingTop: 12 },
  action: { alignItems: "center", flexDirection: "row", gap: 6, padding: 4 },
  actionIcon: { color: "#69716A", fontSize: 16 },
  actionLabel: { color: "#69716A", fontSize: 11, fontWeight: "600" },
  selectedAction: { color: "#A34F46" },
});
