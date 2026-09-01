import { KeyRound, Loader2 } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { Field } from "../Components/Field";

type SettingsViewProps = {
  change: (oldPassword: string, password: string, rePassword: string) => Promise<void>;
  busy: boolean;
  message: string;
};

export function SettingsView({ change, busy, message }: SettingsViewProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await change(oldPassword, password, rePassword);
    setOldPassword("");
    setPassword("");
    setRePassword("");
  }

  return (
    <main className="mx-auto max-w-[640px] px-4 py-6">
      <Card className="p-6">
        <h1 className="text-2xl font-extrabold">Settings</h1>
        <p className="mt-2 text-sm text-[#60708a]">Change your Route Posts account password.</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <Field icon={<KeyRound size={17} />} placeholder="Current password" required setValue={setOldPassword} type="password" value={oldPassword} />
          <Field icon={<KeyRound size={17} />} placeholder="New password" required setValue={setPassword} type="password" value={password} />
          <Field icon={<KeyRound size={17} />} placeholder="Confirm new password" required setValue={setRePassword} type="password" value={rePassword} />
          <Button disabled={busy} type="submit">{busy && <Loader2 className="animate-spin" size={17} />} Change Password</Button>
        </form>
        {message && <p className="mt-4 rounded-[10px] bg-[#eef8f2] p-3 text-sm font-semibold text-[#16723b]">{message}</p>}
      </Card>
    </main>
  );
}
