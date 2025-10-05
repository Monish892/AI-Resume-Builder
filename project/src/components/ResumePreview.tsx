import { Resume } from '../types'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import MinimalistTemplate from './templates/MinimalistTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import CreativeTemplate from './templates/CreativeTemplate' // ✅ Added Creative Template

interface ResumePreviewProps {
  resume: Resume
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (resume.template) {
      case 'classic':
        return <ClassicTemplate resume={resume} />
      case 'minimalist':
        return <MinimalistTemplate resume={resume} />
      case 'professional':
        return <ProfessionalTemplate resume={resume} />
      case 'creative': // ✅ New creative template case
        return <CreativeTemplate resume={resume} />
      case 'modern':
      default:
        return <ModernTemplate resume={resume} />
    }
  }

  return (
    <div className="overflow-auto h-full">
      <div className="flex justify-center py-8 bg-gray-100 min-h-screen">
        <div className="shadow-2xl transition-all duration-300 scale-[0.9] hover:scale-[0.95]">
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}
