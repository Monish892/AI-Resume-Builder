import { Plus, X } from 'lucide-react';
import { Skill } from '../types';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const categories = ['Technical', 'Soft Skills', 'Languages', 'Tools', 'Other'];

  const addSkill = (category: string) => {
    onChange([
      ...data,
      {
        id: Date.now().toString(),
        name: '',
        category,
      },
    ]);
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const updateSkill = (id: string, name: string) => {
    onChange(
      data.map((skill) => (skill.id === id ? { ...skill, name } : skill))
    );
  };

  const getSkillsByCategory = (category: string) => {
    return data.filter((skill) => skill.category === category);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
      </div>

      {categories.map((category) => {
        const categorySkills = getSkillsByCategory(category);
        return (
          <div key={category} className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-700">{category}</h4>
              <button
                onClick={() => addSkill(category)}
                className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                <Plus size={14} />
                Add
              </button>
            </div>

            {categorySkills.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No skills added</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full"
                  >
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, e.target.value)}
                      className="bg-transparent border-none focus:outline-none text-sm text-gray-800 w-32"
                      placeholder="Skill name"
                    />
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
