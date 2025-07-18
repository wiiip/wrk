"use client";

import type { Profile, SocialLink } from "@/types";

import { useState } from "react";

import { useProfileKeyboardShortcuts } from "@/hooks/use-profile-keyboard-shortcuts";

import ProfileEditForm from "./profile-edit-form";
import ProfileView from "./profile-view";

type SessionUser = {
  id: string;
  name?: string | null;
  username?: string | null;
  email: string;
  image?: string | null;
};

type ProfileFormProps = {
  user: SessionUser;
  profile: Profile | null;
  socialLinks?: SocialLink[];
  profileImageUrl?: string;
};

export function ProfileForm({
  user,
  profile,
  socialLinks = [],
  profileImageUrl,
}: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleSuccess = () => setIsEditing(false);

  useProfileKeyboardShortcuts({
    isEditing,
    onEdit: handleEdit,
    onCancel: handleCancel,
  });

  if (isEditing) {
    return (
      <ProfileEditForm
        user={user}
        profile={profile}
        socialLinks={socialLinks}
        profileImageUrl={profileImageUrl}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
    );
  }

  return (
    <ProfileView
      user={user}
      profile={profile}
      socialLinks={socialLinks}
      profileImageUrl={profileImageUrl}
    />
  );
}
