import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

const projects = [
  {
    id: '01',
    title: 'SCHOOL PORTAL',
    category: 'Multi-Tenant\nERP',
    description: 'A multi-tenant school ERP serving 1,000+ students, with tenant isolation enforced at the ORM layer and an AI-powered attendance pipeline.',
    tech: ['Next.js', 'MongoDB', 'Redis'],
    link: '/projects/01',
    color: '#FF4D00',
  },
  {
    id: '02',
    title: 'FINVAULT',
    category: 'Financial\nSystem',
    description: 'A double-entry bookkeeping ledger with append-only, immutable entries and a tamper-evident audit trail, hardened with JWT and rate-limiting.',
    tech: ['Node.js', 'Express', 'MongoDB'],
    link: '/projects/02',
    color: '#FF4D00',
  },
  {
    id: '03',
    title: 'PREPSENSE-AI',
    category: 'AI\nPlatform',
    description: 'An AI interview-prep platform that parses a resume against a job description to generate a tailored prep strategy and ATS-optimized resumes.',
    tech: ['React 19', 'Gemini', 'Puppeteer'],
    link: '/projects/03',
    color: '#FF4D00',
  }
];

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // offset: ["start end", "center center"] // Slower
    // offset: ["start end", "start center"] // Faster
    offset: ["start end", "start 50%"] // Tune this value (e.g., 0% to 50%) to adjust speed
  });

  const scale = useTransform(scrollYProgress, [0, 1], [15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["10rem", "0.2rem"]); // Using rem to ensure responsiveness

  return (
    <section id="projects" ref={containerRef} className="relative bg-gray-50 dark:bg-black text-black dark:text-white min-h-[100vh] py-12 px-4 sm:px-8 font-sans md:px-12 z-20">

      {/* Background Decor: massive Swiss Grid */}
      <div
        className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 pointer-events-none opacity-20"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
        }}
      >
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`border-r border-black dark:border-white h-full last:border-r-0 ${i % 2 !== 0 ? 'hidden md:block' : ''}`}></div>
        ))}
      </div>

      <div className="max-w-[1920px] mx-auto relative z-10 w-full">

        {/* Header: Small, Technical */}
        {/* Header: Small, Technical */}
        <div className="text-center mb-24 md:pb-12 pb-4">
          <motion.h2
            style={{
              scale,
              y,
              opacity,
              filter: useTransform(blur, (v) => `blur(${v}px)`),
              letterSpacing
            }}
            className="text-xl font-mono uppercase tracking-widest origin-center whitespace-nowrap"
          >
            Selected Works
          </motion.h2>

        </div>

        {/* --- PROJECT 01: COLLEGIA (Left Heavy) --- */}
        <div className="group relative mb-24 md:mb-8 grid grid-cols-1 md:grid-cols-12 gap-x-8 items-start">
          {/* Meta (Absolute Left) */}
          <div className="col-span-12 md:col-span-2 md:sticky md:top-32 self-start mb-8 md:mb-0">
            <span className="text-sm font-mono block mb-2 text-red-600">01</span>
            <h4 className="text-xl font-bold uppercase leading-tight whitespace-pre-wrap text-black dark:text-white">{projects[0].category}</h4>
            <div className="h-px w-8 bg-black dark:bg-white my-4"></div>
            <ul className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              {projects[0].tech.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>

          {/* Title (Massive, Spanning) */}
          <div className="col-span-12 md:col-span-10 md:col-start-3 relative z-20">
            <Link to={projects[0].link} className="block">
              <h3 className="text-[18vw] md:text-[14vw] font-black uppercase tracking-tighter leading-[0.8] transition-all duration-300 text-black dark:text-white hover:italic hover:text-transparent hover:[-webkit-text-stroke:1px_black] dark:hover:[-webkit-text-stroke:1px_white]">
                {projects[0].title}
              </h3>
            </Link>
            <div className="mt-8 max-w-md text-black dark:text-white">
              <p className="text-lg leading-snug">{projects[0].description}</p>
              <div className="mt-6 flex gap-4">
                <Link to={projects[0].link} className="flex items-center gap-2 text-xs font-bold uppercase border-b border-current pb-1 hover:text-[#FF4D00]">Live <FiArrowUpRight /></Link>
              </div>
            </div>
          </div>
        </div>


        {/* --- PROJECT 02: 0XKID (Right Heavy) --- */}
        <div className="group relative mb-24 md:mb-8 grid grid-cols-1 md:grid-cols-12 gap-x-8 items-start">
          {/* Title (Massive, Right Aligned) */}
          <div className="col-span-12 md:col-span-10 md:col-start-1 order-2 md:order-2 text-right relative z-20">
            <Link to={projects[1].link} className="block">
              <h3 className="text-[18vw] md:text-[14vw] font-black uppercase tracking-tighter leading-[0.8] transition-all duration-300 text-right text-black dark:text-white hover:italic hover:text-transparent hover:[-webkit-text-stroke:1px_black] dark:hover:[-webkit-text-stroke:1px_white]">
                {projects[1].title}
              </h3>
            </Link>
            <div className="mt-8 max-w-md ml-auto text-left text-black dark:text-white">
              <p className="text-lg leading-snug">{projects[1].description}</p>
              <div className="mt-6 flex gap-4">
                <Link to={projects[1].link} className="flex items-center gap-2 text-xs font-bold uppercase border-b border-current pb-1 hover:text-[#0057FF]">Live <FiArrowUpRight /></Link>
              </div>
            </div>
          </div>

          {/* Meta (Right) */}
          <div className="col-span-12 md:col-span-2 order-1 md:order-3 md:sticky md:top-32 self-start mb-8 md:mb-0 text-right flex flex-col items-end">
            <span className="text-sm font-mono block mb-2 text-red-600">02</span>
            <h4 className="text-xl font-bold uppercase leading-tight whitespace-pre-wrap text-black dark:text-white">{projects[1].category}</h4>
            <div className="h-px w-8 bg-black dark:bg-white my-4"></div>
            <ul className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              {projects[1].tech.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>


        {/* --- PROJECT 03: SKILLBLOOM (Left Heavy) --- */}
        <div className="group relative mb-4 grid grid-cols-1 md:grid-cols-12 gap-x-8 items-start pb-24">
          {/* Meta (Absolute Left) */}
          <div className="col-span-12 md:col-span-2 md:sticky md:top-32 self-start mb-8 md:mb-0">
            <span className="text-sm font-mono block mb-2 text-red-600">03</span>
            <h4 className="text-xl font-bold uppercase leading-tight whitespace-pre-wrap text-black dark:text-white">{projects[2].category}</h4>
            <div className="h-px w-8 bg-black dark:bg-white my-4"></div>
            <ul className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
              {projects[2].tech.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>

          {/* Title (Massive, Spanning) */}
          <div className="col-span-12 md:col-span-10 md:col-start-3 relative z-20">
            <Link to={projects[2].link} className="block">
              <h3 className="text-[18vw] md:text-[14vw] font-black uppercase tracking-tighter leading-[0.8] transition-all duration-300 text-black dark:text-white hover:italic hover:text-transparent hover:[-webkit-text-stroke:1px_black] dark:hover:[-webkit-text-stroke:1px_white]">
                {projects[2].title}
              </h3>
            </Link>
            <div className="mt-8 max-w-md text-black dark:text-white">
              <p className="text-lg leading-snug">{projects[2].description}</p>
              <div className="mt-6 flex gap-4">
                <Link to={projects[2].link} className="flex items-center gap-2 text-xs font-bold uppercase border-b border-current pb-1 hover:text-[#00A86B]">Live <FiArrowUpRight /></Link>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Projects;
