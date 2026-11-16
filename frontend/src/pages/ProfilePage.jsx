import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser.js";
import { updateProfile } from "../lib/api.js";
import { LANGUAGES } from "../constants";
import toast from "react-hot-toast";
import {
  CameraIcon,
  LoaderIcon,
  MapPinIcon,
  ShuffleIcon,
  UserIcon,
} from "lucide-react";

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      // Refresh authUser so Navbar avatar & all components reflect the new data
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${idx}`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random avatar generated!");
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-2xl">

        {/* PAGE HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <UserIcon className="size-7 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Edit Profile</h1>
        </div>

        <div className="card bg-base-200 shadow-sm">
          <div className="card-body p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* PROFILE PICTURE */}
              <div className="flex flex-col items-center gap-4">
                <div className="size-28 rounded-full bg-base-300 overflow-hidden ring-4 ring-primary/20">
                  {formState.profilePic ? (
                    <img
                      src={formState.profilePic}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <CameraIcon className="size-10 opacity-40" />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-outline btn-sm gap-2"
                >
                  <ShuffleIcon className="size-4" />
                  Generate Random Avatar
                </button>
              </div>

              {/* FULL NAME */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  value={formState.fullName}
                  onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="Your full name"
                />
              </div>

              {/* BIO */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Bio</span>
                </label>
                <textarea
                  value={formState.bio}
                  onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                  className="textarea textarea-bordered h-24 resize-none"
                  placeholder="Tell others about yourself and your language learning goals"
                />
              </div>

              {/* LANGUAGES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* NATIVE LANGUAGE */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Native Language</span>
                  </label>
                  <select
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select native language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`native-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* LEARNING LANGUAGE */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Learning Language</span>
                  </label>
                  <select
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select learning language</option>
                    {LANGUAGES.map((lang) => (
                      <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LOCATION */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Location</span>
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute top-1/2 -translate-y-1/2 left-3 size-5 opacity-50" />
                  <input
                    type="text"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    className="input input-bordered w-full pl-10"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* READ-ONLY EMAIL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                  <span className="label-text-alt opacity-60">Cannot be changed</span>
                </label>
                <input
                  type="email"
                  value={authUser?.email || ""}
                  className="input input-bordered w-full opacity-60 cursor-not-allowed"
                  disabled
                />
              </div>

              {/* SAVE BUTTON */}
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <LoaderIcon className="animate-spin size-5" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
