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
import { cx } from "../utils";

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
      const payload = await signUp({ name, email, password, rePassword, dateOfBirth, gender, ...(username ? { username } : {}) });
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
    <main className="min-h-screen bg-[#eef2f7] px-6 py-12">
      <div className="mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-[1150px] items-center gap-12 lg:grid-cols-[1fr_430px]">
        <AcademyIntro />
        <Card className="w-full max-w-[430px] border-0 p-6 shadow-none">
          <div className="grid rounded-[10px] bg-[#eef2f7] p-1 text-sm font-extrabold text-[#172338] [grid-template-columns:1fr_1fr]">
            {(["login", "register"] as Mode[]).map((item) => (
              <button
                className={cx("h-9 rounded-[8px] capitalize", mode === item && "bg-white text-[#062f98] shadow-[0_1px_4px_rgba(15,23,42,0.18)]")}
                key={item}
                onClick={() => setMode(item)}
                type="button"
              >
                {item === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>
          {mode === "login" ? (
            <form className="mt-6 space-y-[14px]" onSubmit={submitLogin}>
              <h2 className="text-2xl font-extrabold text-[#050b18]">Log in to Route Posts</h2>
              <p className="text-sm text-[#52627c]">Log in and continue your social journey.</p>
              <Field icon={<User size={17} />} placeholder="Email or username" required setValue={setLogin} value={login} />
              <Field icon={<KeyRound size={17} />} placeholder="Password" required setValue={setLoginPassword} type="password" value={loginPassword} />
              <Button className="h-12 w-full text-base" disabled={loading} type="submit">{loading && <Loader2 className="animate-spin" size={18} />} Log In</Button>
            </form>
          ) : (
            <form className="mt-6 space-y-[14px]" onSubmit={submitRegister}>
              <h2 className="text-2xl font-extrabold text-[#050b18]">Create a new account</h2>
              <p className="text-sm text-[#52627c]">It is quick and easy.</p>
              <Field icon={<User size={17} />} placeholder="Full name" required setValue={setName} value={name} />
              <Field icon={<AtSign size={17} />} placeholder="Username (optional)" setValue={setUsername} value={username} />
              <Field icon={<AtSign size={17} />} placeholder="Email address" required setValue={setEmail} type="email" value={email} />
              <label className="relative block">
                <UsersRound className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8da0c1]" size={17} />
                <select className="h-[46px] w-full rounded-[10px] border border-[#d4dfed] bg-[#f8fafc] pl-12 pr-4 text-sm outline-none" onChange={(event) => setGender(event.target.value)} required value={gender}>
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              <Field icon={<CalendarDays size={17} />} placeholder="Date of birth" required setValue={setDateOfBirth} type="date" value={dateOfBirth} />
              <Field icon={<KeyRound size={17} />} placeholder="Password" required setValue={setPassword} type="password" value={password} />
              <Field icon={<KeyRound size={17} />} placeholder="Confirm password" required setValue={setRePassword} type="password" value={rePassword} />
              <Button className="h-12 w-full text-base" disabled={loading} type="submit">{loading && <Loader2 className="animate-spin" size={18} />} Create New Account</Button>
            </form>
          )}
          {message && <p className="mt-4 rounded-[10px] bg-[#ffedf0] p-3 text-sm font-semibold text-[#bd1233]">{message}</p>}
        </Card>
      </div>
    </main>
  );
}
