import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Globe, Clock, Shield } from 'lucide-react';

const values = [
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Operating in 30+ countries with a diverse network of professionals.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to delivering outstanding results and exceeding expectations.',
  },
  {
    icon: Clock,
    title: 'Efficiency',
    description: 'Streamlined processes that save time without compromising quality.',
  },
  {
    icon: Shield,
    title: 'Trust',
    description: 'Building lasting relationships through transparency and integrity.',
  },
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About iTalentHunt
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Since 2010, we've been revolutionizing how companies approach talent
              acquisition and HR management. Our innovative solutions have helped
              hundreds of organizations build stronger teams and achieve their goals.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
              alt="Team collaboration"
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}