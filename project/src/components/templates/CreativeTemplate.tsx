import { Resume } from '../../types'
import { Linkedin, Globe, Github, Mail, Phone, MapPin } from 'lucide-react'

interface TemplateProps {
  resume: Resume
}

export default function CreativeTemplate({ resume }: TemplateProps) {
  const { personalInfo, workExperience, education, skills } = resume

  return (
    <div
      className="bg-gradient-to-br from-pink-50 to-blue-50 p-10 shadow-2xl text-gray-800"
      style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Header Section */}
      <div className="flex items-center gap-8 mb-10 border-b-4 border-pink-400 pb-6">
        {personalInfo.photo && (
          <img
            src={personalInfo.photo}
            alt="Profile"
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #ec4899'
            }}
          />
        )}
        <div>
          <h1 className="text-4xl font-extrabold text-pink-700 mb-1 tracking-tight">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-lg text-blue-700 mb-3">
            {personalInfo.title || 'Your Professional Title'}
          </p>
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
              <span className="flex items-center gap-1 text-blue-700">
                <Linkedin size={14} />
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  LinkedIn
                </a>
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1 text-gray-800">
                <Github size={14} />
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  GitHub
                </a>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1 text-blue-700">
                <Globe size={14} />
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
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
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-700 border-b-2 border-pink-300 pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience Section */}
      {workExperience && workExperience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-700 border-b-2 border-pink-300 pb-1 mb-4">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-lg text-blue-800">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-gray-700 italic mb-2">{exp.company}</p>
                <p className="text-gray-600 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-pink-700 border-b-2 border-pink-300 pb-1 mb-4">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-blue-800">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700">{edu.institution}</p>
                {edu.gpa && (
                  <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills && skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-pink-700 border-b-2 border-pink-300 pb-1 mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-pink-200 text-pink-800 rounded-full text-sm font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
