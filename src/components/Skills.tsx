import Section from './Section'

const skills = [
  {
    title: 'Languages & Frameworks',
    items: ['PHP', 'Laravel', 'JavaScript', 'TypeScript', 'Node.js', 'React']
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'GCP', 'CI/CD', 'Docker', 'GitHub Actions']
  },
  {
    title: 'Databases & Messaging',
    items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ']
  },
  {
    title: 'Practices',
    items: ['System Design', 'API Integrations', 'ERP', 'Testing', 'Performance']
  },
]

export default function Skills() {
  return (
    <Section id="skills" title="Skills & Tech" subtitle="A toolbox crafted by building at scale.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <div key={group.title} className="card">
            <h3 className="text-lg font-semibold text-white">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="badge">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
