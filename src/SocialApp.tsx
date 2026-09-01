import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LIMIT,
  TOKEN,
  USER,
  changePasswordRequest,
  createPostComment,
  deletePost,
  deletePostComment,
  errText,
  getFeedPosts,
  getMyPosts,
  getNotifications,
  getPostComments,
  getProfile,
  list,
  markAllNotificationsRead,
  markNotificationRead,
  object,
  reactToPost,
  savePostRequest,
  updatePostComment,
} from "./services";
import type { AppUser, Comment, Notify, Post } from "./services";
import { Header } from "./Components/Header";
import { guest } from "./constants";
import { AuthScreen } from "./Pages/AuthScreen";
import { Details } from "./Pages/Details";
import { Feed } from "./Pages/Feed";
import { Notifications } from "./Pages/Notifications";
import { Profile } from "./Pages/Profile";
import { SettingsView } from "./Pages/SettingsView";
import type { ReactionAction, View } from "./types";

export default function SocialApp() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN));
  const [user, setUser] = useState<AppUser>(() => {
    const saved = localStorage.getItem(USER);
    return saved ? (JSON.parse(saved) as AppUser) : guest;
  });
  const [view, setView] = useState<View>("feed");
  const [posts, setPosts] = useState<Post[]>([]);
  const [profilePosts, setProfilePosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [notifications, setNotifications] = useState<Notify[]>([]);
  const [selected, setSelected] = useState<Post | null>(null);
  const [editing, setEditing] = useState<Post | null>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [busy, setBusy] = useState("");
  const [toast, setToast] = useState("");
  const [settingsMessage, setSettingsMessage] = useState("");
  const unread = useMemo(() => notifications.filter((item) => !(item.isRead ?? item.read)).length, [notifications]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    setToken(null);
    setUser(guest);
    setPosts([]);
    setProfilePosts([]);
  }, []);

  const loadProfile = useCallback(async () => {
    if (!token) return;
    try {
      const payload = await getProfile(token);
      const profile = object<AppUser>(payload.data);
      if (profile) {
        setUser((current) => {
          const next = { ...current, ...profile };
          localStorage.setItem(USER, JSON.stringify(next));
          return next;
        });
      }
    } catch {
      /* best effort */
    }
  }, [token]);

  const loadPosts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const payload = await getFeedPosts(token, page);
      setPosts(list<Post>(payload.data));
      setPages(payload.meta?.totalPages ?? (payload.meta?.total ? Math.max(1, Math.ceil(payload.meta.total / LIMIT)) : 1));
    } catch (error) {
      setToast(errText(error));
      if (errText(error).toLowerCase().includes("jwt")) logout();
    } finally {
      setLoading(false);
    }
  }, [logout, page, token]);

  const loadProfilePosts = useCallback(async () => {
    if (!token) return;
    setProfileLoading(true);
    try {
      const payload = await getMyPosts(token);
      setProfilePosts(list<Post>(payload.data));
    } catch (error) {
      setToast(errText(error));
      setProfilePosts([]);
    } finally {
      setProfileLoading(false);
    }
  }, [token]);

  const loadNotifications = useCallback(async () => {
    if (!token) return;
    try {
      const payload = await getNotifications(token);
      setNotifications(list<Notify>(payload.data));
    } catch {
      setNotifications([]);
    }
  }, [token]);

  const loadComments = useCallback(async (postId: string) => {
    if (!token) return;
    setCommentsLoading(true);
    try {
      const payload = await getPostComments(token, postId);
      setComments(list<Comment>(payload.data));
    } catch (error) {
      setToast(errText(error));
      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      // The app loads remote session data whenever the stored token or current page changes.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void loadProfile();
      void loadPosts();
      void loadNotifications();
      void loadProfilePosts();
    }
  }, [loadNotifications, loadPosts, loadProfile, loadProfilePosts, token]);

  function login(nextToken: string, nextUser: AppUser) {
    localStorage.setItem(TOKEN, nextToken);
    localStorage.setItem(USER, JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  }

  async function savePost(body: string, image?: File | null, id?: string) {
    if (!token) return;
    setBusy("post");
    try {
      await savePostRequest(token, body, image, id);
      setEditing(null);
      await loadPosts();
      await loadProfilePosts();
      setToast(id ? "Post updated successfully." : "Post created successfully.");
    } catch (error) {
      setToast(errText(error));
    } finally {
      setBusy("");
    }
  }

  async function removePost(post: Post) {
    if (!token || !confirm("Delete this post?")) return;
    try {
      await deletePost(token, post._id);
      setPosts((current) => current.filter((item) => item._id !== post._id));
      setProfilePosts((current) => current.filter((item) => item._id !== post._id));
      if (selected?._id === post._id) setView("feed");
      setToast("Post deleted.");
    } catch (error) {
      setToast(errText(error));
    }
  }

  async function react(post: Post, action: ReactionAction) {
    if (!token) return;
    try {
      await reactToPost(token, post._id, action);
      await loadPosts();
      await loadProfilePosts();
    } catch (error) {
      setToast(errText(error));
    }
  }

  function openDetails(post: Post) {
    setSelected(post);
    setView("details");
    void loadComments(post._id);
  }

  function editPost(post: Post) {
    setEditing(post);
    setView("feed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function createComment(body: string, image?: File | null) {
    if (!token || !selected) return;
    try {
      await createPostComment(token, selected._id, body, image);
      await loadComments(selected._id);
      await loadPosts();
    } catch (error) {
      setToast(errText(error));
    }
  }

  async function updateComment(comment: Comment, body: string, image?: File | null) {
    if (!token || !selected) return;
    try {
      await updatePostComment(token, selected._id, comment._id, body, image);
      await loadComments(selected._id);
    } catch (error) {
      setToast(errText(error));
    }
  }

  async function removeComment(comment: Comment) {
    if (!token || !selected || !confirm("Delete this comment?")) return;
    try {
      await deletePostComment(token, selected._id, comment._id);
      setComments((current) => current.filter((item) => item._id !== comment._id));
      await loadPosts();
    } catch (error) {
      setToast(errText(error));
    }
  }

  async function mark(id: string) {
    if (!token) return;
    try {
      await markNotificationRead(token, id);
      setNotifications((current) => current.map((item) => item._id === id ? { ...item, isRead: true, read: true } : item));
    } catch (error) {
      setToast(errText(error));
    }
  }

  async function markAll() {
    if (!token) return;
    try {
      await markAllNotificationsRead(token);
      setNotifications((current) => current.map((item) => ({ ...item, isRead: true, read: true })));
    } catch (error) {
      setToast(errText(error));
    }
  }

  async function changePassword(currentPassword: string, password: string, rePassword: string) {
    if (!token) return;
    setBusy("password");
    setSettingsMessage("");
    try {
      if (password !== rePassword) throw new Error("Passwords do not match.");
      const payload = await changePasswordRequest(token, currentPassword, password, rePassword);
      const nextToken = String(payload.data?.token ?? token);
      localStorage.setItem(TOKEN, nextToken);
      setToken(nextToken);
      setSettingsMessage("Password changed successfully.");
    } catch (error) {
      setToast(errText(error));
    } finally {
      setBusy("");
    }
  }

  function go(next: View) {
    if (next !== "details") setSelected(null);
    setView(next);
  }

  if (!token) return <AuthScreen onLogin={login} />;

  return (
    <div className="min-h-screen bg-[#eef2f7] text-[#06122f]">
      <Header go={go} logout={logout} unread={unread} user={user} view={view} />
      {toast && <div className="fixed bottom-4 left-1/2 z-50 max-w-[calc(100vw-32px)] -translate-x-1/2 rounded-[12px] border border-[#d7e1ef] bg-white px-4 py-3 text-sm font-semibold text-[#314058] shadow-xl">{toast}<button className="ml-4 text-[#0875ff]" onClick={() => setToast("")} type="button">Dismiss</button></div>}
      {view === "feed" && <Feed busy={busy === "post"} cancel={() => setEditing(null)} details={openDetails} edit={editPost} editing={editing} go={go} loading={loading} page={page} pages={pages} posts={posts} react={react} remove={removePost} save={savePost} setPage={setPage} user={user} />}
      {view === "details" && <Details back={() => setView("feed")} comments={comments} createComment={createComment} editPost={editPost} loading={commentsLoading} post={selected} react={react} removeComment={removeComment} removePost={removePost} updateComment={updateComment} user={user} />}
      {view === "profile" && <Profile details={openDetails} edit={editPost} loading={profileLoading} posts={profilePosts} remove={removePost} user={user} />}
      {view === "notifications" && <Notifications items={notifications} mark={mark} markAll={markAll} />}
      {view === "settings" && <SettingsView busy={busy === "password"} change={changePassword} message={settingsMessage} />}
    </div>
  );
}
