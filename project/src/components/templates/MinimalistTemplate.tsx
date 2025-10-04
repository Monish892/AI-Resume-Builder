import { Resume } from '../../types';

interface TemplateProps {
  resume: Resume;
}

export default function MinimalistTemplate({ resume }: TemplateProps) {
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
      <div className="mb-8">
        <h1 className="text-5xl font-light text-gray-900 mb-3">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-3 text-xs text-gray-600 uppercase tracking-wider">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-1">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        )}
      </div>

      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-widest">
            Experience
          </h2>
          <div className="space-y-6">
            {workExperience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-4 gap-4">
                <div className="text-xs text-gray-600">
                  <div>{exp.startDate}</div>
                  <div>{exp.endDate || 'Present'}</div>
                </div>
                <div className="col-span-3">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{exp.position}</h3>
                  <p className="text-sm text-gray-700 mb-1">{exp.company}</p>
                  {exp.location && <p className="text-xs text-gray-600 mb-2">{exp.location}</p>}
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-widest">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-4 gap-4">
                <div className="text-xs text-gray-600">
                  <div>{edu.startDate}</div>
                  <div>{edu.endDate}</div>
                </div>
                <div className="col-span-3">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{edu.degree}</h3>
                  <p className="text-sm text-gray-700 mb-1">{edu.institution}</p>
                  {edu.gpa && <p className="text-xs text-gray-600 mb-1">GPA: {edu.gpa}</p>}
                  {edu.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-widest">
            Skills
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <div></div>
            <div className="col-span-3 space-y-2">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="text-sm">
                  <span className="text-gray-900 font-medium">{category}: </span>
                  <span className="text-gray-700">{categorySkills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
