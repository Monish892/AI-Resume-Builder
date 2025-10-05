import { useState } from 'react'
import { FileText, Download, Sparkles, Eye } from 'lucide-react'
import { Resume, PersonalInfo, WorkExperience, Education, Skill } from './types'
import PersonalInfoForm from './components/PersonalInfoForm'
import WorkExperienceForm from './components/WorkExperienceForm'
import EducationForm from './components/EducationForm'
import SkillsForm from './components/SkillsForm'
import ResumePreview from './components/ResumePreview'
import AIImproveModal from './components/AIImproveModal'

function App() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [activeSection, setActiveSection] = useState<
    'personal' | 'experience' | 'education' | 'skills'
  >('personal')
  const [showAIModal, setShowAIModal] = useState(false)
  const [aiField, setAiField] = useState('')
  const [aiContent, setAiContent] = useState('')
  const [aiCallback, setAiCallback] = useState<((improved: string) => void) | null>(null)

  const [resume, setResume] = useState<Resume>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: '',
    },
    workExperience: [],
    education: [],
    skills: [],
    template: 'modern',
  })

  // Update functions
  const updatePersonalInfo = (data: PersonalInfo) => setResume((prev) => ({ ...prev, personalInfo: data }))
  const updateWorkExperience = (data: WorkExperience[]) => setResume((prev) => ({ ...prev, workExperience: data }))
  const updateEducation = (data: Education[]) => setResume((prev) => ({ ...prev, education: data }))
  const updateSkills = (data: Skill[]) => setResume((prev) => ({ ...prev, skills: data }))

  // ✅ Template update includes professional
  const updateTemplate = (template: 'modern' | 'classic' | 'minimalist' | 'professional' | 'creative') =>
    setResume((prev) => ({ ...prev, template }))

  const handleExportPDF = () => window.print()

  const openAIImprove = (field: string, content: string, callback: (improved: string) => void) => {
    setAiField(field)
    setAiContent(content)
    setAiCallback(() => callback)
    setShowAIModal(true)
  }

  const handleAIImprove = async (field: string, content: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const improvements: Record<string, string> = {
      summary: `Results-driven professional with proven expertise in delivering high-impact solutions across diverse industries. Known for combining technical excellence with strategic thinking to drive organizational success. Adept at fostering collaborative relationships and leading cross-functional teams to exceed performance targets.`,
      description: `• Spearheaded strategic initiatives that resulted in measurable improvements in operational efficiency and stakeholder satisfaction
• Collaborated with cross-functional teams to deliver innovative solutions, ensuring alignment with business objectives
• Demonstrated expertise in problem-solving and critical thinking, consistently exceeding performance metrics
• Mentored junior team members, fostering a culture of continuous improvement and professional development`,
    }

    if (content.toLowerCase().includes('software') || content.toLowerCase().includes('developer')) {
      return `• Architected and implemented scalable solutions using modern technologies, improving system performance by 40%
• Led development of key features from conception through deployment, ensuring code quality and best practices
• Collaborated with product managers and designers to translate business requirements into technical specifications
• Mentored junior developers and conducted code reviews, fostering a culture of technical excellence`
    }

    return (
      improvements[field] ||
      `Enhanced version: ${content}\n\nProfessionally refined with attention to impact, clarity, and industry best practices. Emphasizes measurable achievements and demonstrates clear value proposition to potential employers.`
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-2 rounded-lg">
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Resume Builder</h1>
              <p className="text-sm text-gray-600">Create professional resumes in minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Eye size={18} />
              {activeTab === 'edit' ? 'Preview' : 'Edit'}
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
            >
              <Download size={18} />
              Export PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'edit' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Form Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                {/* Tabs */}
                <div className="flex gap-2 border-b pb-4">
                  {['personal', 'experience', 'education', 'skills'].map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section as any)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeSection === section
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Forms */}
                <div className="relative">
                  {activeSection === 'personal' && (
                    <div className="space-y-4">
                      <PersonalInfoForm data={resume.personalInfo} onChange={updatePersonalInfo} />
                      {resume.personalInfo.summary && (
                        <button
                          onClick={() =>
                            openAIImprove('summary', resume.personalInfo.summary, (improved) =>
                              updatePersonalInfo({ ...resume.personalInfo, summary: improved })
                            )
                          }
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all border border-blue-200"
                        >
                          <Sparkles size={16} />
                          Improve Summary with AI
                        </button>
                      )}
                    </div>
                  )}
                  {activeSection === 'experience' && (
                    <WorkExperienceForm data={resume.workExperience} onChange={updateWorkExperience} />
                  )}
                  {activeSection === 'education' && (
                    <EducationForm data={resume.education} onChange={updateEducation} />
                  )}
                  {activeSection === 'skills' && (
                    <SkillsForm data={resume.skills} onChange={updateSkills} />
                  )}
                </div>
              </div>
            </div>

            {/* Right: Template & Tips */}
            <div className="space-y-4">
              {/* Template Selection */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Template Style</h3>
                <div className="space-y-2">
                  {[
                    { id: 'modern', label: 'Modern', desc: 'Bold and colorful' },
                    { id: 'classic', label: 'Classic', desc: 'Traditional and formal' },
                    { id: 'minimalist', label: 'Minimalist', desc: 'Clean and simple' },
                    { id: 'professional', label: 'Professional', desc: 'Elegant and refined' },
                    { id: 'creative', label: 'Creative', desc: 'Vibrant and artistic' }, // Optional
                  ].map((template) => (
                    <button
                      key={template.id}
                      onClick={() => updateTemplate(template.id as any)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        resume.template === template.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{template.label}</div>
                      <div className="text-sm text-gray-600">{template.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Tips */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-md p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <Sparkles className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">AI Improvement Tips</h3>
                    <p className="text-sm text-gray-700">
                      Use the AI improvement feature to enhance your professional summary and job descriptions with powerful, results-oriented language.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div id="resume-preview">
            <ResumePreview resume={resume} />
          </div>
        )}
      </div>

      {/* AI Modal */}
      <AIImproveModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onImprove={handleAIImprove}
        field={aiField}
        content={aiContent}
        onApply={(improved) => {
          if (aiCallback) aiCallback(improved)
          setShowAIModal(false)
        }}
      />
    </div>
  )
}

export default App
