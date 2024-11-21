import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Target, Briefcase, LineChart } from 'lucide-react';

const services = [
  {
    icon: Users,
    title: 'Talent Acquisition',
    description: 'Find the perfect match for your team with our data-driven recruitment process.',
  },
  {
    icon: Target,
    title: 'HR Consulting',
    description: 'Strategic HR solutions to optimize your organizational structure and processes.',
  },
  {
    icon: Briefcase,
    title: 'Career Development',
    description: 'Comprehensive programs for employee growth and skill enhancement.',
  },
  {
    icon: LineChart,
    title: 'Performance Management',
    description: 'Tools and strategies to measure and improve workforce productivity.',
  },
];

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900"
            ref={ref}
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl text-gray-600"
          >
            Comprehensive HR solutions tailored to your needs
          </motion.p>
        </div>

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}