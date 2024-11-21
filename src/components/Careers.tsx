import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Users, Briefcase } from 'lucide-react';
import { useState } from 'react';
import JobApplicationModal from './JobApplicationModal';

const jobs = [
  {
    title: 'Senior HR Consultant',
    location: 'New York, USA',
    type: 'Full-time',
    department: 'Consulting',
  },
  {
    title: 'Talent Acquisition Specialist',
    location: 'London, UK',
    type: 'Full-time',
    department: 'Recruitment',
  },
  {
    title: 'HR Analytics Manager',
    location: 'Remote',
    type: 'Full-time',
    department: 'Analytics',
  },
];

export default function Careers() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  return (
    <section id="careers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of a dynamic team that's shaping the future of HR. We offer
            competitive benefits, continuous learning opportunities, and a vibrant
            work culture.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {job.title}
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-5 h-5 mr-2" />
                  {job.type}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  {job.department}
                </div>
              </div>
              <button 
                onClick={() => setSelectedJob(job)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedJob && (
        <JobApplicationModal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          job={selectedJob}
        />
      )}
    </section>
  );
}