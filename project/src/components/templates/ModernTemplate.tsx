import { Resume } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export default function ModernTemplate({ resume }: TemplateProps) {
  const { personalInfo, workExperience, education, skills } = resume;

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="bg-white p-8 shadow-lg" style={{ width: '210mm', minHeight: '297mm' }}>
      <div className="flex items-center border-l-4 border-blue-600 pl-6 mb-6">
        {/* Profile Photo */}
        {personalInfo.photo && (
          <img
            src={personalInfo.photo}
            alt="Profile"
            className="mr-6"
            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563eb' }}
          />
        )}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone size={14} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin size={14} />
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="underline">
                  LinkedIn
                </a>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github size={14} />
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="underline">
                  GitHub
                </a>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe size={14} />
                <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="underline">
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">Experience</h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{exp.startDate} - {exp.endDate || 'Present'}</p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{edu.startDate} - {edu.endDate}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">Skills</h2>
          <div className="space-y-2">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <span className="font-semibold text-gray-800">{category}: </span>
                <span className="text-gray-700">{categorySkills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}