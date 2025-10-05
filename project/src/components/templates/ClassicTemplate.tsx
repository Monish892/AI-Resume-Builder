import { Resume } from '../../types';
import { Linkedin, Globe, Github } from 'lucide-react';

interface TemplateProps {
  resume: Resume;
}

export default function ClassicTemplate({ resume }: TemplateProps) {
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
      <div className="text-center mb-6 pb-4 border-b-2 border-gray-800 flex flex-col items-center">
        {/* Profile Photo */}
        {personalInfo.photo && (
          <img
            src={personalInfo.photo}
            alt="Profile"
            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #333', marginBottom: 12 }}
          />
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-sm text-gray-700 flex flex-wrap justify-center gap-3 mb-2">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin size={14} />
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="underline">
                LinkedIn
              </a>
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github size={14} />
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="underline">
                GitHub
              </a>
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe size={14} />
              <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="underline">
                Website
              </a>
            </span>
          )}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-800 leading-relaxed text-justify">{personalInfo.summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-700">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-gray-800 italic">{exp.company}</p>
                  {exp.location && <p className="text-sm text-gray-700">{exp.location}</p>}
                </div>
                {exp.description && (
                  <p className="text-gray-800 leading-relaxed text-justify whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-700">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="text-gray-800 italic">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
                </div>
                {edu.description && (
                  <p className="text-gray-800 leading-relaxed">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="space-y-1">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="text-gray-800">
                <span className="font-bold">{category}: </span>
                <span>{categorySkills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}