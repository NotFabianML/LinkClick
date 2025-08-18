"use client";

import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSessionSchema,
  CreateSessionFormData,
  CreateSessionPageProps,
} from "../types";
import { useI18n } from "../contexts/I18nContext";
import { toast } from "sonner";

import CreateSessionHeader from "../components/create-session/CreateSessionHeader";
import BasicInfoCard from "../components/create-session/BasicInfoCard";
import SessionTypeCard from "../components/create-session/SessionTypeCard";
import SkillsCard from "../components/create-session/SkillsCard";
import SessionDetailsCard from "../components/create-session/SessionDetailCard";
import PrivacySettingsCard from "../components/create-session/PrivacySettingCard";
import SubmitSection from "../components/create-session/SubmitSection";

const CreateSessionPage = (props: CreateSessionPageProps) => {
  const i18n = useI18n();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateSessionFormData>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      title: "",
      description: "",
      session_type: "",
      interest_ids: [],
      is_public: true,
      allow_recording: false,
      requires_approval: false,
      difficulty: "",
      max_participants: "",
      date: "",
      time: "",
      duration: "",
    },
  });

  const onSubmit = async (data: CreateSessionFormData) => {
    const csrfToken = document.querySelector<HTMLMetaElement>(
      "meta[name='csrf-token']"
    )?.content;
    const locale =
      (window as any).sharedProps?.locale_data?.current_locale || "en";

    try {
      const response = await axios.post(
        `/${locale}/sessions.json`,
        { session: data },
        { headers: { "X-CSRF-Token": csrfToken } }
      );
      toast.success(i18n.toasts.create_success_title, {
        description: i18n.toasts.create_success_description,
      });

      if (response.data.redirect_url) {
        (window as any).Turbo.visit(response.data.redirect_url);
      }
    } catch (error: any) {
      toast.error(i18n.toasts.create_error_title, {
        description:
          error.response?.data?.errors?.join(", ") ||
          i18n.toasts.create_error_description,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <CreateSessionHeader />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form Column */}
            <div className="lg:col-span-2 space-y-6">
              <BasicInfoCard register={register} errors={errors} />
              <SessionTypeCard control={control} errors={errors} />
              <SkillsCard
                control={control}
                errors={errors}
                availableInterests={props.available_interests}
              />
            </div>

            {/* Actions right column */}
            <div className="lg:col-span-1 space-y-6">
              <SessionDetailsCard
                control={control}
                register={register}
                errors={errors}
                watch={watch}
              />
              <PrivacySettingsCard control={control} />
              <SubmitSection isSubmitting={isSubmitting} errors={errors} />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateSessionPage;
