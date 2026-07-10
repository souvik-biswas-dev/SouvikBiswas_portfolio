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
    link: '/projects/03',
    live: 'https://schoolportal360.com',
    code: null,
    accent: '#FF4D00',
  },
  {
    id: '02',
    title: 'PREPSENSE-AI',
    category: 'AI\nPlatform',
    description: 'An AI interview-prep platform that parses a resume against a job description to generate a tailored prep strategy and ATS-optimized resumes.',
    tech: ['React 19', 'Gemini', 'Puppeteer'],
    link: '/projects/05',
    live: 'https://prepsense-ai.pages.dev',
    code: 'https://github.com/souvik-biswas-dev/PrepSense-AI',
    accent: '#00A86B',
  },
  {
    id: '03',
    title: 'DRIFTWATCH',
    category: 'DevOps\nWatchdog',
    description: 'A watchdog that flags the moment live Docker containers stop matching the git-declared docker-compose.yml — drift caught within ~60 seconds.',
    tech: ['Go (Gin)', 'SvelteKit', 'Postgres'],
    link: '/projects/01',
    live: 'https://driftwatch.pages.dev',
    code: 'https://github.com/souvik-biswas-dev/DriftWatch',
    accent: '#0057FF',
  },
  {
    id: '04',
    title: 'REVIEWFLOW',
    category: 'Realtime\nPlatform',
    description: 'Real-time, multiplayer code review with an AI in the room — live WebSocket rooms, GraphQL, and async Gemini reviews streaming in as they land.',
    tech: ['Svelte 5', 'Go (Gin)', 'WebSocket'],
    link: '/projects/02',
    live: 'https://reviewflow.pages.dev',
    code: 'https://github.com/souvik-biswas-dev/ReviewFlow',
    accent: '#7C3AED',
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

        {projects.map((project, index) => {
          const rightHeavy = index % 2 !== 0;

          const meta = (
            <div className={`col-span-12 md:col-span-2 md:sticky md:top-32 self-start mb-8 md:mb-0 ${rightHeavy ? 'order-1 md:order-3 text-right flex flex-col items-end' : ''}`}>
              <span className="text-sm font-mono block mb-2 text-red-600">{project.id}</span>
              <h4 className="text-xl font-bold uppercase leading-tight whitespace-pre-wrap text-black dark:text-white">{project.category}</h4>
              <div className="h-px w-8 bg-black dark:bg-white my-4"></div>
              <ul className="text-xs font-mono text-gray-600 dark:text-gray-400 space-y-1">
                {project.tech.map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
          );

          const body = (
            <div className={`col-span-12 md:col-span-10 relative z-20 ${rightHeavy ? 'md:col-start-1 order-2 md:order-2 text-right' : 'md:col-start-3'}`}>
              <Link to={project.link} className="block">
                <h3 className={`text-[18vw] md:text-[14vw] font-black uppercase tracking-tighter leading-[0.8] transition-all duration-300 text-black dark:text-white hover:italic hover:text-transparent hover:[-webkit-text-stroke:1px_black] dark:hover:[-webkit-text-stroke:1px_white] ${rightHeavy ? 'text-right' : ''}`}>
                  {project.title}
                </h3>
              </Link>
              <div className={`mt-8 max-w-md text-black dark:text-white ${rightHeavy ? 'ml-auto text-left' : ''}`}>
                <p className="text-lg leading-snug">{project.description}</p>
                <div className="mt-6 flex gap-6">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold uppercase border-b border-current pb-1 transition-colors"
                    style={{ ['--accent' as string]: project.accent }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = project.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    Live <FiArrowUpRight />
                  </a>
                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-bold uppercase border-b border-current pb-1 transition-colors"
                      onMouseEnter={(e) => (e.currentTarget.style.color = project.accent)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                    >
                      Code <FiArrowUpRight />
                    </a>
                  )}
                  <Link to={project.link} className="flex items-center gap-2 text-xs font-bold uppercase border-b border-current pb-1 hover:text-red-600">
                    Case Study <FiArrowUpRight />
                  </Link>
                </div>
              </div>
            </div>
          );

          return (
            <div
              key={project.id}
              className={`group relative grid grid-cols-1 md:grid-cols-12 gap-x-8 items-start ${index === projects.length - 1 ? 'mb-4 pb-24' : 'mb-24 md:mb-8'}`}
            >
              {rightHeavy ? <>{body}{meta}</> : <>{meta}{body}</>}
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default Projects;
