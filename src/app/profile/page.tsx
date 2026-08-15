"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User as UserIcon,
  Pencil,
  Camera,
  MapPin,
  Settings,
  Package,
  Eye,
  Activity,
  Plus,
  Trash2,
  Star,
  Loader2,
  Mail,
  Phone,
  Lock,
  LogOut,
} from "lucide-react";

import { toast } from "@/components/ui/toast";
import data from "@/src/database/db.json";

// =========================
// TYPES
// =========================

type CurrentUser = {
  name: string;
  email: string;
  phone: string;
};

type StoredUser = CurrentUser & { password: string };

type Address = {
  id: string;
  ownerEmail: string;
  label: string;
  fullAddress: string;
  city: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
};

type AccountSettings = {
  orderUpdates: boolean;
  promotionalEmails: boolean;
};

const TABS = [
  { id: "overview", label: "Overview", icon: UserIcon },
  { id: "edit", label: "Edit Info", icon: Pencil },
  { id: "picture", label: "Profile Picture", icon: Camera },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Account Settings", icon: Settings },
  { id: "orders", label: "Recent Orders", icon: Package },
  { id: "recent", label: "Recently Viewed", icon: Eye },
  { id: "activity", label: "Activity", icon: Activity },
] as const;

type TabId = (typeof TABS)[number]["id"];

// =========================
// STORAGE HELPERS
// =========================

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem("verdea-users") || "[]");
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem("verdea-users", JSON.stringify(users));
}

// Writes the updated current-user object back to whichever storage
// ("remember me" -> localStorage, otherwise sessionStorage) it already
// lives in, then tells the Navbar to refresh.
function updateCurrentUserStorage(user: CurrentUser) {
  if (localStorage.getItem("verdea-current-user")) {
    localStorage.setItem("verdea-current-user", JSON.stringify(user));
  } else {
    sessionStorage.setItem("verdea-current-user", JSON.stringify(user));
  }
  window.dispatchEvent(new Event("verdea-auth-change"));
}

function getAddresses(): Address[] {
  try {
    return JSON.parse(localStorage.getItem("verdea-addresses") || "[]");
  } catch {
    return [];
  }
}

function saveAddresses(addresses: Address[]) {
  localStorage.setItem("verdea-addresses", JSON.stringify(addresses));
}

function getSettings(email: string): AccountSettings {
  try {
    const stored = localStorage.getItem(`verdea-settings-${email}`);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return { orderUpdates: true, promotionalEmails: false };
}

function saveSettings(email: string, settings: AccountSettings) {
  localStorage.setItem(`verdea-settings-${email}`, JSON.stringify(settings));
}

// =========================
// PAGE
// =========================

export default function ProfilePage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [checked, setChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("verdea-current-user");
    const sessionUser = sessionStorage.getItem("verdea-current-user");
    const userData = localUser || sessionUser;

    if (!userData) {
      router.replace("/sign-in");
      return;
    }

    try {
      const parsed: CurrentUser = JSON.parse(userData);
      setCurrentUser(parsed);

      const savedAvatar = localStorage.getItem(
        `verdea-avatar-${parsed.email}`
      );
      if (savedAvatar) setAvatar(savedAvatar);
    } catch {
      router.replace("/sign-in");
      return;
    }

    setChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked || !currentUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-mainP-500">
        <Loader2 className="h-6 w-6 animate-spin text-black" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-mainP-500 px-3 py-5 sm:px-5 sm:py-7 md:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-[1100px]">
        <h1 className="mb-5 text-2xl font-black text-black sm:mb-7 sm:text-3xl">
          My Profile
        </h1>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
          {/* ================= SIDEBAR ================= */}

          <aside className="shrink-0 lg:w-64">
            <div className="rounded-[20px] bg-mainT p-3 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] sm:rounded-[24px] sm:p-4">
              {/* mini identity card */}
              <div className="mb-3 flex items-center gap-3 border-b border-gray-100 pb-3 sm:mb-4 sm:pb-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-mainP-500 sm:h-12 sm:w-12">
                  {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatar}
                      alt={currentUser.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-black text-black">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-black">
                    {currentUser.name}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold transition lg:w-full lg:rounded-[14px] lg:text-sm ${
                        isActive
                          ? "bg-black text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={16} strokeWidth={1.8} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ================= CONTENT ================= */}

          <section className="min-w-0 flex-1 rounded-[20px] bg-mainT p-5 shadow-[3px_4px_6.7px_rgba(0,0,0,0.02)] sm:rounded-[24px] sm:p-7 lg:p-8">
            {activeTab === "overview" && (
              <OverviewSection user={currentUser} avatar={avatar} />
            )}
            {activeTab === "edit" && (
              <EditInfoSection user={currentUser} onUpdated={setCurrentUser} />
            )}
            {activeTab === "picture" && (
              <PictureSection
                user={currentUser}
                avatar={avatar}
                onChange={setAvatar}
              />
            )}
            {activeTab === "addresses" && (
              <AddressesSection user={currentUser} />
            )}
            {activeTab === "settings" && (
              <SettingsSection user={currentUser} />
            )}
            {activeTab === "orders" && <OrdersSection user={currentUser} />}
            {activeTab === "recent" && <RecentlyViewedSection />}
            {activeTab === "activity" && <ActivitySection />}
          </section>
        </div>
      </div>
    </main>
  );
}

// =========================
// OVERVIEW
// =========================

function OverviewSection({
  user,
  avatar,
}: {
  user: CurrentUser;
  avatar: string | null;
}) {
  const rows = [
    { icon: UserIcon, label: "Full name", value: user.name },
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Phone", value: user.phone },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-mainP-500 sm:h-20 sm:w-20">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xl font-black text-black sm:text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div>
          <h2 className="text-lg font-black text-black sm:text-xl">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={row.label}
              className="flex items-center gap-3 rounded-[13px] border border-gray-200 bg-white px-4 py-3.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mainP-500">
                <Icon size={16} strokeWidth={1.8} className="text-black" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-gray-500">{row.label}</p>
                <p className="truncate text-sm font-semibold text-black">
                  {row.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =========================
// EDIT INFO
// =========================

function EditInfoSection({
  user,
  onUpdated,
}: {
  user: CurrentUser;
  onUpdated: (user: CurrentUser) => void;
}) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [savingInfo, setSavingInfo] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingInfo(true);

    const users = getStoredUsers();
    const currentIndex = users.findIndex(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );

    if (currentIndex === -1) {
      toast.add({
        title: "Something went wrong",
        description: "Your account could not be found.",
        type: "error",
      });
      setSavingInfo(false);
      return;
    }

    const emailTaken = users.some(
      (u, i) =>
        i !== currentIndex &&
        u.email.toLowerCase() === form.email.toLowerCase()
    );

    if (emailTaken) {
      toast.add({
        title: "Email already in use",
        description: "Another account is already using this email.",
        type: "error",
      });
      setSavingInfo(false);
      return;
    }

    const updatedUser: StoredUser = {
      ...users[currentIndex],
      name: form.name,
      email: form.email,
      phone: form.phone,
    };

    const updatedUsers = [...users];
    updatedUsers[currentIndex] = updatedUser;
    saveStoredUsers(updatedUsers);

    const nextUser: CurrentUser = {
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
    };

    updateCurrentUserStorage(nextUser);
    onUpdated(nextUser);

    toast.add({
      title: "Profile updated",
      description: "Your information has been saved.",
      type: "success",
    });

    setSavingInfo(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingPassword(true);

    if (passwordForm.newPassword.length < 6) {
      toast.add({
        title: "Password too short",
        description: "New password must be at least 6 characters.",
        type: "error",
      });
      setSavingPassword(false);
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.add({
        title: "Passwords do not match",
        description: "New password and confirmation must match.",
        type: "error",
      });
      setSavingPassword(false);
      return;
    }

    const users = getStoredUsers();
    const currentIndex = users.findIndex(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );

    if (
      currentIndex === -1 ||
      users[currentIndex].password !== passwordForm.currentPassword
    ) {
      toast.add({
        title: "Incorrect password",
        description: "Your current password is incorrect.",
        type: "error",
      });
      setSavingPassword(false);
      return;
    }

    const updatedUsers = [...users];
    updatedUsers[currentIndex] = {
      ...updatedUsers[currentIndex],
      password: passwordForm.newPassword,
    };
    saveStoredUsers(updatedUsers);

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    toast.add({
      title: "Password changed",
      description: "Your password has been updated.",
      type: "success",
    });

    setSavingPassword(false);
  };

  return (
    <div className="space-y-8">
      {/* PERSONAL INFO */}
      <div>
        <h2 className="mb-4 text-base font-black text-black sm:text-lg">
          Personal information
        </h2>

        <form onSubmit={handleInfoSubmit} className="space-y-3.5">
          <FormField
            label="Full name"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
            required
          />
          <FormField
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => setForm((p) => ({ ...p, email: v }))}
            required
          />
          <FormField
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
            required
          />

          <button
            type="submit"
            disabled={savingInfo}
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
          >
            {savingInfo ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>

      <div className="h-px bg-gray-200" />

      {/* PASSWORD */}
      <div>
        <h2 className="mb-4 text-base font-black text-black sm:text-lg">
          Change password
        </h2>

        <form onSubmit={handlePasswordSubmit} className="space-y-3.5">
          <FormField
            label="Current password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(v) =>
              setPasswordForm((p) => ({ ...p, currentPassword: v }))
            }
            required
          />
          <FormField
            label="New password"
            type="password"
            value={passwordForm.newPassword}
            onChange={(v) =>
              setPasswordForm((p) => ({ ...p, newPassword: v }))
            }
            required
          />
          <FormField
            label="Confirm new password"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(v) =>
              setPasswordForm((p) => ({ ...p, confirmPassword: v }))
            }
            required
          />

          <button
            type="submit"
            disabled={savingPassword}
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
          >
            {savingPassword ? "Saving..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-gray-600">
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-[13px] border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-black"
      />
    </div>
  );
}

// =========================
// PROFILE PICTURE
// =========================

function PictureSection({
  user,
  avatar,
  onChange,
}: {
  user: CurrentUser;
  avatar: string | null;
  onChange: (avatar: string | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(avatar);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!preview) return;
    localStorage.setItem(`verdea-avatar-${user.email}`, preview);
    onChange(preview);
    toast.add({
      title: "Profile picture updated",
      description: "Your new photo has been saved.",
      type: "success",
    });
  };

  const handleRemove = () => {
    localStorage.removeItem(`verdea-avatar-${user.email}`);
    setPreview(null);
    onChange(null);
    toast.add({
      title: "Profile picture removed",
      description: "Your photo has been removed.",
      type: "success",
    });
  };

  return (
    <div>
      <h2 className="mb-4 text-base font-black text-black sm:text-lg">
        Profile picture
      </h2>

      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-mainP-500">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-3xl font-black text-black">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <label className="cursor-pointer rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-50">
            Choose photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={!preview}
              className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-40"
            >
              Save photo
            </button>

            {preview && (
              <button
                type="button"
                onClick={handleRemove}
                className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-50"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================
// ADDRESSES
// =========================

function AddressesSection({ user }: { user: CurrentUser }) {
  const emptyForm = {
    label: "",
    fullAddress: "",
    city: "",
    postalCode: "",
    phone: "",
  };

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setAddresses(
      getAddresses().filter((a) => a.ownerEmail === user.email)
    );
  }, [user.email]);

  const persist = (all: Address[]) => {
    const others = getAddresses().filter((a) => a.ownerEmail !== user.email);
    saveAddresses([...others, ...all]);
    setAddresses(all);
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newAddress: Address = {
      id: `${Date.now()}`,
      ownerEmail: user.email,
      isDefault: addresses.length === 0,
      ...form,
    };

    persist([...addresses, newAddress]);
    setForm(emptyForm);
    setShowForm(false);

    toast.add({
      title: "Address added",
      description: "Your new address has been saved.",
      type: "success",
    });
  };

  const handleDelete = (id: string) => {
    const remaining = addresses.filter((a) => a.id !== id);
    // if we removed the default, promote the next one
    if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
      remaining[0].isDefault = true;
    }
    persist(remaining);

    toast.add({
      title: "Address removed",
      description: "The address has been deleted.",
      type: "success",
    });
  };

  const handleSetDefault = (id: string) => {
    persist(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-black text-black sm:text-lg">
          Delivery addresses
        </h2>

        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-800 sm:text-sm"
        >
          <Plus size={15} strokeWidth={2} />
          Add address
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="mb-5 space-y-3 rounded-[16px] border border-gray-200 bg-white p-4"
        >
          <FormField
            label="Label (e.g. Home, Work)"
            value={form.label}
            onChange={(v) => setForm((p) => ({ ...p, label: v }))}
            required
          />
          <FormField
            label="Full address"
            value={form.fullAddress}
            onChange={(v) => setForm((p) => ({ ...p, fullAddress: v }))}
            required
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <FormField
              label="City"
              value={form.city}
              onChange={(v) => setForm((p) => ({ ...p, city: v }))}
              required
            />
            <FormField
              label="Postal code"
              value={form.postalCode}
              onChange={(v) => setForm((p) => ({ ...p, postalCode: v }))}
              required
            />
          </div>
          <FormField
            label="Contact phone"
            type="tel"
            value={form.phone}
            onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
            required
          />

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Save address
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {addresses.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No addresses yet"
          description="Add a delivery address to speed up checkout."
        />
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="flex items-start justify-between gap-3 rounded-[16px] border border-gray-200 bg-white p-4"
            >
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <p className="text-sm font-bold text-black">
                    {address.label}
                  </p>
                  {address.isDefault && (
                    <span className="rounded-full bg-mainP-500 px-2.5 py-0.5 text-[10px] font-bold text-black">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {address.fullAddress}, {address.city}, {address.postalCode}
                </p>
                <p className="mt-1 text-xs text-gray-500">{address.phone}</p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {!address.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(address.id)}
                    aria-label="Set as default"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50"
                  >
                    <Star size={14} strokeWidth={1.8} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(address.id)}
                  aria-label="Delete address"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={14} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =========================
// ACCOUNT SETTINGS
// =========================

function SettingsSection({ user }: { user: CurrentUser }) {
  const [settings, setSettings] = useState<AccountSettings>({
    orderUpdates: true,
    promotionalEmails: false,
  });
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSettings(getSettings(user.email));
  }, [user.email]);

  const toggle = (key: keyof AccountSettings) => {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    saveSettings(user.email, next);
  };

  const handleDeleteAccount = () => {
    const users = getStoredUsers().filter(
      (u) => u.email.toLowerCase() !== user.email.toLowerCase()
    );
    saveStoredUsers(users);

    localStorage.removeItem("verdea-current-user");
    sessionStorage.removeItem("verdea-current-user");
    localStorage.removeItem(`verdea-avatar-${user.email}`);
    localStorage.removeItem(`verdea-settings-${user.email}`);
    saveAddresses(
      getAddresses().filter((a) => a.ownerEmail !== user.email)
    );

    window.dispatchEvent(new Event("verdea-auth-change"));

    toast.add({
      title: "Account deleted",
      description: "Your account has been permanently removed.",
      type: "success",
    });

    router.replace("/");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-base font-black text-black sm:text-lg">
          Notifications
        </h2>

        <div className="space-y-3">
          <ToggleRow
            label="Order status updates"
            description="Get notified about your order's progress."
            checked={settings.orderUpdates}
            onToggle={() => toggle("orderUpdates")}
          />
          <ToggleRow
            label="Promotional emails"
            description="Occasional offers and news from Verdea."
            checked={settings.promotionalEmails}
            onToggle={() => toggle("promotionalEmails")}
          />
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      <div>
        <h2 className="mb-1 text-base font-black text-black sm:text-lg">
          Danger zone
        </h2>
        <p className="mb-4 text-xs text-gray-500">
          Deleting your account is permanent and cannot be undone.
        </p>

        {!confirmingDelete ? (
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Delete account
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-black">
              Are you sure?
            </span>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Yes, delete my account
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[13px] border border-gray-200 bg-white px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-black">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        aria-label={label}
        className={`inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
          checked ? "bg-black" : "bg-gray-200"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

// =========================
// ORDERS
// =========================
// Reads every order placed at checkout (see verdea-orders in
// app/checkout/page.tsx) and shows this user's own orders, most recent
// first.

type StoredOrderItem = {
  id: string | number;
  image: string;
  title: string;
  price: string | number;
  quantity: number;
};

type StoredOrder = {
  id: string;
  ownerEmail: string;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    address: string;
    postalCode: string;
  };
  paymentMethod: string;
  items: StoredOrderItem[];
  subtotal: number;
  discount: { code: string; percentage: number } | null;
  discountAmount: number;
  total: number;
  createdAt: string;
};

function OrdersSection({ user }: { user: CurrentUser }) {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored: StoredOrder[] = JSON.parse(
        localStorage.getItem("verdea-orders") || "[]"
      );

      const mine = stored
        .filter((order) => order.ownerEmail === user.email)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

      setOrders(mine);
    } catch {
      setOrders([]);
    }
  }, [user.email]);

  return (
    <div>
      <h2 className="mb-4 text-base font-black text-black sm:text-lg">
        Recent orders
      </h2>

      {orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="Your recent orders will show up here once you place one."
          action={{ label: "Browse menu", href: "/" }}
        />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const isOpen = openId === order.id;
            const itemCount = order.items.reduce(
              (total, item) => total + item.quantity,
              0
            );

            return (
              <div
                key={order.id}
                className="rounded-[16px] border border-gray-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : order.id)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-left"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-black">
                      {order.id}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                      {itemCount} item{itemCount !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-sm font-black text-black">
                      ${order.total.toFixed(2)}
                    </span>
                    <span className="rounded-full bg-mainP-500 px-3 py-1 text-[10px] font-bold text-black">
                      Placed
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 p-4">
                    <div className="space-y-2.5">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-mainP-500">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`/${item.image}`}
                              alt={item.title}
                              className="h-full w-full object-contain p-1"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-black">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="text-xs font-bold text-black">
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="my-3 h-px bg-gray-100" />

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-gray-500">
                        <span>Delivery address</span>
                      </div>
                      <p className="text-black">
                        {order.customer.address}, {order.customer.city}
                      </p>
                      {order.discountAmount > 0 && (
                        <div className="flex items-center justify-between pt-1 text-green-600">
                          <span>Discount</span>
                          <span>-${order.discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


// =========================
// RECENTLY VIEWED
// =========================

function RecentlyViewedSection() {
  const [productIds, setProductIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored: string[] = JSON.parse(
        localStorage.getItem("verdea-recently-viewed") || "[]"
      );
      setProductIds(stored);
    } catch {
      setProductIds([]);
    }
  }, []);

  const products = productIds
    .map((id) => data.products.find((p) => String(p.id) === String(id)))
    .filter((p): p is (typeof data.products)[number] => Boolean(p));

  return (
    <div>
      <h2 className="mb-4 text-base font-black text-black sm:text-lg">
        Recently viewed
      </h2>

      {products.length === 0 ? (
        <EmptyState
          icon={Eye}
          title="Nothing viewed yet"
          description="Products you look at will be listed here."
          action={{ label: "Browse menu", href: "/" }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {products.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="group min-w-0 rounded-[16px] bg-[#fafafa] p-2.5 transition hover:bg-[#f7f7f7] sm:rounded-[18px] sm:p-4"
            >
              <div className="flex h-[110px] items-center justify-center overflow-hidden rounded-[12px] sm:h-[130px] sm:rounded-[14px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/${item.image}`}
                  alt={item.title}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="mt-3">
                <h3 className="line-clamp-2 text-xs font-semibold leading-[1.4] text-black sm:text-[14px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-bold text-black sm:text-[15px]">
                  ${item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// =========================
// ACTIVITY (placeholder — waiting on data)
// =========================

function ActivitySection() {
  return (
    <div>
      <h2 className="mb-4 text-base font-black text-black sm:text-lg">
        Activity summary
      </h2>

      <EmptyState
        icon={Activity}
        title="Coming soon"
        description="This section is being wired up to your activity data."
      />
    </div>
  );
}

// =========================
// SHARED: EMPTY STATE
// =========================

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: typeof Package;
  title: string;
  description: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[16px] border border-dashed border-gray-200 px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-mainP-500">
        <Icon size={20} strokeWidth={1.8} className="text-black" />
      </div>
      <p className="text-sm font-bold text-black">{title}</p>
      <p className="mt-1 max-w-[280px] text-xs text-gray-500">
        {description}
      </p>

      {action && (
        <Link
          href={action.href}
          className="mt-4 rounded-full bg-black px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
