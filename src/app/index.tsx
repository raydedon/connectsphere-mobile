import { useState } from "react";
import { Link } from "expo-router";
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostCard } from "../features/feed/PostCard";
import { initialPosts } from "../features/feed/data";
import type { FeedPost } from "../features/feed/types";

const people = [
  { name: "Your story", initials: "+", color: "#E4E9DF" },
  { name: "Maya", initials: "MC", color: "#B9D6C2" },
  { name: "Arjun", initials: "AR", color: "#F1C7A8" },
  { name: "Leah", initials: "LW", color: "#D8C7E8" },
  { name: "Noah", initials: "NK", color: "#E8D99C" },
];

export default function FeedScreen() {
  const [posts, setPosts] = useState(initialPosts);
  const [activeFeed, setActiveFeed] = useState<"For you" | "Following">(
    "For you",
  );
  const [refreshing, setRefreshing] = useState(false);

  function toggleLike(postId: string) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, likedByMe: !post.likedByMe } : post,
      ),
    );
  }

  function toggleSave(postId: string) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, savedByMe: !post.savedByMe } : post,
      ),
    );
  }

  function refreshFeed() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 650);
  }

  const dateLabel = new Date()
    .toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
  const visiblePosts =
    activeFeed === "Following"
      ? posts.filter((post) => post.handle !== "leahw")
      : posts;

  const renderPost = ({ item }: { item: FeedPost }) => (
    <PostCard
      onLike={() => toggleLike(item.id)}
      onSave={() => toggleSave(item.id)}
      post={item}
    />
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={visiblePosts}
        keyExtractor={(post) => post.id}
        ListHeaderComponent={
          <View>
            <View style={styles.topBar}>
              <View>
                <Text style={styles.eyebrow}>{dateLabel}</Text>
                <Text style={styles.wordmark}>ConnectSphere</Text>
              </View>
              <Link asChild href="/settings">
                <Pressable
                  accessibilityLabel="Open settings"
                  accessibilityRole="button"
                  style={styles.settingsButton}
                >
                  <Text style={styles.settingsIcon}>⚙</Text>
                </Pressable>
              </Link>
            </View>

            <View style={styles.greetingRow}>
              <View>
                <Text style={styles.greeting}>Good morning, Ram</Text>
                <Text style={styles.subheading}>Your people, your place.</Text>
              </View>
              <View style={styles.weatherPill}>
                <Text style={styles.weatherText}>☀ 24°</Text>
              </View>
            </View>

            <View style={styles.sectionHeadingRow}>
              <Text style={styles.sectionHeading}>Around you</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  Alert.alert(
                    "Stories",
                    "Stories will be part of a later milestone.",
                  )
                }
              >
                <Text style={styles.seeAll}>See all</Text>
              </Pressable>
            </View>
            <FlatList
              contentContainerStyle={styles.storyList}
              data={people}
              horizontal
              keyExtractor={(person) => person.name}
              renderItem={({ item, index }) => (
                <Pressable
                  accessibilityLabel={
                    index === 0 ? "Add your story" : `View ${item.name}'s story`
                  }
                  accessibilityRole="button"
                  onPress={() =>
                    Alert.alert(
                      index === 0 ? "Your story" : `${item.name}'s story`,
                      "Stories will be part of a later milestone.",
                    )
                  }
                  style={styles.storyItem}
                >
                  <View style={styles.storyRing}>
                    <View
                      style={[
                        styles.storyAvatar,
                        { backgroundColor: item.color },
                      ]}
                    >
                      <Text style={styles.storyInitials}>{item.initials}</Text>
                    </View>
                  </View>
                  <Text numberOfLines={1} style={styles.storyName}>
                    {item.name}
                  </Text>
                </Pressable>
              )}
              showsHorizontalScrollIndicator={false}
            />

            <View style={styles.sectionHeadingRow}>
              <Text style={styles.sectionHeading}>Your community</Text>
              <Pressable
                accessibilityLabel="Create a post"
                accessibilityRole="button"
                onPress={() =>
                  Alert.alert(
                    "New post",
                    "Post creation will be part of the next feed milestone.",
                  )
                }
                style={styles.createButton}
              >
                <Text style={styles.createButtonText}>＋ Create</Text>
              </Pressable>
            </View>
            <View style={styles.feedTabs}>
              {(["For you", "Following"] as const).map((tab) => {
                const selected = activeFeed === tab;
                return (
                  <Pressable
                    accessibilityRole="tab"
                    accessibilityState={{ selected }}
                    key={tab}
                    onPress={() => setActiveFeed(tab)}
                    style={[styles.feedTab, selected && styles.selectedFeedTab]}
                  >
                    <Text
                      style={[
                        styles.feedTabText,
                        selected && styles.selectedFeedTabText,
                      ]}
                    >
                      {tab}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        }
        refreshControl={
          <RefreshControl
            onRefresh={refreshFeed}
            refreshing={refreshing}
            tintColor="#48634D"
          />
        }
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: "#F7F6F1", flex: 1 },
  list: { flex: 1 },
  listContent: { paddingBottom: 30, paddingHorizontal: 18 },
  topBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 18,
    paddingTop: 8,
  },
  eyebrow: {
    color: "#85897F",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.1,
  },
  wordmark: {
    color: "#25372A",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginTop: 3,
  },
  settingsButton: {
    alignItems: "center",
    backgroundColor: "#ECEFE8",
    borderRadius: 18,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  settingsIcon: { color: "#425547", fontSize: 17 },
  greetingRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 23,
  },
  greeting: {
    color: "#222920",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  subheading: { color: "#85897F", fontSize: 12, marginTop: 5 },
  weatherPill: {
    backgroundColor: "#F1ECDD",
    borderRadius: 13,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  weatherText: { color: "#776A43", fontSize: 11, fontWeight: "700" },
  sectionHeadingRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 2,
  },
  sectionHeading: { color: "#27352A", fontSize: 15, fontWeight: "700" },
  seeAll: { color: "#73826E", fontSize: 11, fontWeight: "600", padding: 5 },
  storyList: { gap: 12, paddingBottom: 21, paddingTop: 2 },
  storyItem: { alignItems: "center", width: 58 },
  storyRing: {
    alignItems: "center",
    borderColor: "#9BAB91",
    borderRadius: 27,
    borderWidth: 1.5,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  storyAvatar: {
    alignItems: "center",
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  storyInitials: { color: "#344236", fontSize: 12, fontWeight: "700" },
  storyName: { color: "#747A71", fontSize: 10, marginTop: 6, maxWidth: 58 },
  createButton: {
    backgroundColor: "#E7ECE3",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  createButtonText: { color: "#49604B", fontSize: 11, fontWeight: "700" },
  feedTabs: {
    backgroundColor: "#ECEBE5",
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 13,
    padding: 3,
  },
  feedTab: {
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
    paddingVertical: 8,
  },
  selectedFeedTab: { backgroundColor: "#FFFFFF" },
  feedTabText: { color: "#85897F", fontSize: 11, fontWeight: "600" },
  selectedFeedTabText: { color: "#324536" },
});
