"use client";
import React from "react";
import { motion } from "framer-motion";
import { Avatar } from "./avatar";
import { Star } from "lucide-react";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatar: string | null;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ content, author, role, company, rating, avatar }, i) => (
                <div
                  className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-lg max-w-xs w-full"
                  key={i}
                >
                  <div className="flex mb-4">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-neutral-700 font-montserrat italic mb-6">
                    &ldquo;{content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={avatar}
                      fallback={author}
                      size="sm"
                    />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold font-montserrat text-primary-dark">
                        {author}
                      </div>
                      <div className="text-xs text-neutral-600 font-montserrat">
                        {role} at {company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
