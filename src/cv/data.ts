import type { CvDocument } from "./types";
import { list, h2, text, h3, subtitle } from "./helpers";


export const sampleCv: CvDocument = {
  name: "Andrey Kovlyagin",

  leftColumn: [
    list([
      "Barcelona, Spain",
      "andrey.kovlyagin@gmail.com",
      "+34 677 255 561",
    ]),

    h2("Objective"),
    text(
      "Full-stack Developer with a solid foundation in graphic design and a recent shift to web development. Skilled in creating visually appealing and highly functional user interfaces while ensuring robust and efficient backend systems. Proficient in modern frameworks such as React, Next.js and NestJS, with experience in database management using PostgreSQL. Passionate about enhancing user experiences.",
    ),

    h2("Skills"),
    list([
      "TypeScript",
      "React.js, Next.js, RTK, TanStack Query/Table/Form",
      "Sass, CSS Modules, Tailwind CSS",
      "WebGL, SVG animations",
      "Git, Docker, Vite, Turbopack",
      "Node.js, NestJS, Socket.io",
      "PostgreSQL, TypeORM, Supabase",
      "Jest",
      "n8n",
      "Figma, Adobe CS, layout design and visual communication",
      "Fluent in Russian, English B2, Spanish A2",
    ]),
  ],

  rightColumn: [
    h2("Professional Experience"),

    h3("Full-Stack Developer — Jupid (Fintech Startup)"),
    subtitle("Barcelona, April – October 2025"),
    text(
      "Contributed to the early-stage development of a fintech SaaS platform focused on AI-accounting. Collaborated closely with the CTO to build integrations and enhance the product's technical foundation.",
    ),
    list([
      "Developed front-end modules using Next.js, TypeScript, TailwindCSS, and TanStack Query/Table.",
      "Integrated a Banno banking API integration. Supported integrations with Stripe, Customer.io, and PostHog.",
    ]),

    h3("Full-Stack Developer"),
    subtitle("Barcelona, March 2023 – Present"),
    text(
      "Conceived, designed, and developed a project management application for designers and publishers to streamline collaboration.",
    ),
    list([
      "Built the front-end with React, RTK and TailwindCSS.",
      "Integrated backend, TypeORM and PostgreSQL.",
      "Deployed via Docker to Hetzner.",
    ]),

    h3("Front-end Developer — Kamina Mental Health Platform"),
    subtitle("Project based, January 2024"),
    text(
      "Developed a responsive landing page for Kamina, a mental health platform, within one month. Collaborated directly with stakeholders to refine requirements and ensure alignment with project goals.",
    ),
    list([
      "Implemented an interactive SVG graphic to enhance user engagement and visual appeal.",
      "Delivered an optimized site, ensuring compatibility across devices and browsers.",
    ]),

    h3("Graphic Designer"),
    subtitle("Moscow, October 2017 – March 2023"),
    text(
      "Successfully completed diverse design projects, including corporate branding, editorial design, and wayfinding systems for public transport. Enhanced efficiency through automation scripts for batch processing in design projects.",
    ),
    list([
      "Designed 10+ books.",
      "Issued 30+ magazines.",
      "Prepared 150+ wayfinding stands for public spaces.",
    ]),
  ],
};
