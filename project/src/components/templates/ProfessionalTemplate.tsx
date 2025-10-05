import { Resume } from '../../types'
import { Linkedin, Globe, Github, Mail, Phone, MapPin } from 'lucide-react'

interface TemplateProps {
  resume: Resume
}

export default function ProfessionalTemplate({ resume }: TemplateProps) {
  const { personalInfo, workExperience, education, skills } = resume

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill.name)
    return acc
  }, {} as Record<string, string[]>)

  return (
    <div
      className="bg-gray-50 p-10 shadow-lg text-gray-900"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      {/* Header Section */}
      <div className="flex items-center gap-8 mb-8 border-b pb-6 border-gray-300">
        {personalInfo.photo && (
          <img
            src={personalInfo.photo}
            alt="Profile"
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #1e40af'
            }}
          />
        )}
        <div>
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail size={14} />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone size={14} />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin size={14} />
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-700"
                >
                  LinkedIn
                </a>
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <Github size={14} />
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-700"
                >
                  GitHub
                </a>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe size={14} />
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-700"
                >
                  Website
                </a>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-2 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-800 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience Section */}
      {workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-3 uppercase tracking-wide">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="border-b pb-3 border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    <p>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-1 text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-3 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="border-b pb-3 border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    <p>
                      {edu.startDate} - {edu.endDate}
                    </p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
                {edu.description && (
                  <p className="mt-1 text-gray-700 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-blue-800 mb-3 uppercase tracking-wide">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-y-2 text-gray-800">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <span className="font-semibold">{category}:</span>{' '}
                <span>{categorySkills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
