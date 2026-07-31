"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-screen w-full flex flex-col items-center justify-center pt-20">
      <SectionHeader id='contact' className="relative mb-8 z-[9999]" title={
        <>
          LET&apos;S WORK <br />
          TOGETHER
        </>} />
      <div className="flex z-[9999] px-4 w-full max-w-3xl mx-auto">
        <Card className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
          <CardHeader className="px-0 pt-0 pb-6">
            <CardTitle className="text-3xl font-bold text-white tracking-tight">Contact Form</CardTitle>
            <CardDescription className="text-sm text-zinc-400 mt-2">
              Please contact me directly at{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="text-white font-medium hover:underline"
              >
                {config.email.replace(/@/g, "(at)")}
              </a>{" "}
              or drop your info here.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
