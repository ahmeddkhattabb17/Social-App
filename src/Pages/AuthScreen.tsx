import { AtSign, CalendarDays, KeyRound, Loader2, User, UsersRound } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import type { AppUser } from "../services";
import { errText, object, signIn, signUp } from "../services";
import { AcademyIntro } from "../Components/AcademyIntro";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { Field } from "../Components/Field";
import { guest } from "../constants";

type Mode = "login" | "register";

export function AuthScreen({ onLogin }: { onLogin: (token: string, user: AppUser) => void }) {
  const [mode, setMode] = useState<Mode>("login");
  const [login, setLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const payload = await signIn(login, loginPassword);
      const token = String(payload.data?.token ?? "");
      const foundUser = object<AppUser>(payload.data) ?? { ...guest, name: login };
      if (!token) throw new Error("The API did not return a token.");
      onLogin(token, foundUser);
    } catch (error) {
      setMessage(errText(error));
    } finally {
      setLoading(false);
    }
  }

  async function submitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (password !== rePassword) throw new Error("Passwords do not match.");
      const payload = await signUp({
        name,
        email,
        password,
        rePassword,
        dateOfBirth,
        gender,
        ...(username ? { username } : {}),
      });
      const token = String(payload.data?.token ?? "");
      const foundUser = object<AppUser>(payload.data) ?? { ...guest, name, username, email };
      if (!token) throw new Error("Account created, but no token was returned.");
      onLogin(token, foundUser);
    } catch (error) {
      setMessage(errText(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <AcademyIntro />

        <Card className="auth-card">
          <div className="auth-tabs">
            {(["login", "register"] as Mode[]).map((item) => (
              <button
                className={item === mode ? "auth-tab active" : "auth-tab"}
                key={item}
                onClick={() => {
                  setMode(item);
                  setMessage("");
                }}
                type="button"
              >
                {item === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>

          {mode === "login" ? (
            <form className="auth-form" onSubmit={submitLogin}>
              <div>
                <h2>Log in to Route Posts</h2>
                <p>Log in and continue your social journey.</p>
              </div>

              <Field icon={<User size={17} />} placeholder="Email or username" required setValue={setLogin} value={login} />
              <Field icon={<KeyRound size={17} />} placeholder="Password" required setValue={setLoginPassword} type="password" value={loginPassword} />

              <Button className="auth-submit" disabled={loading} type="submit">
                {loading && <Loader2 className="animate-spin" size={18} />}
                Log In
              </Button>
            </form>
          ) : (
            <form className="auth-form register-form" onSubmit={submitRegister}>
              <div>
                <h2>Create a new account</h2>
                <p>It is quick and easy.</p>
              </div>

              <Field icon={<User size={17} />} placeholder="Full name" required setValue={setName} value={name} />
              <Field icon={<AtSign size={17} />} placeholder="Username (optional)" setValue={setUsername} value={username} />
              <Field icon={<AtSign size={17} />} placeholder="Email address" required setValue={setEmail} type="email" value={email} />

              <label className="auth-select">
                <UsersRound size={17} />
                <select onChange={(event) => setGender(event.target.value)} required value={gender}>
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>

              <Field icon={<CalendarDays size={17} />} placeholder="Date of birth" required setValue={setDateOfBirth} type="date" value={dateOfBirth} />
              <Field icon={<KeyRound size={17} />} placeholder="Password" required setValue={setPassword} type="password" value={password} />
              <Field icon={<KeyRound size={17} />} placeholder="Confirm password" required setValue={setRePassword} type="password" value={rePassword} />

              <Button className="auth-submit" disabled={loading} type="submit">
                {loading && <Loader2 className="animate-spin" size={18} />}
                Create New Account
              </Button>
            </form>
          )}

          {message && <p className="auth-error">{message}</p>}
        </Card>
      </div>
    </main>
  );
}
