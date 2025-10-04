import { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';

interface AIImproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImprove: (field: string, content: string) => Promise<string>;
  field: string;
  content: string;
  onApply: (improved: string) => void;
}

export default function AIImproveModal({
  isOpen,
  onClose,
  onImprove,
  field,
  content,
  onApply,
}: AIImproveModalProps) {
  const [improved, setImproved] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleImprove = async () => {
    setIsLoading(true);
    try {
      const result = await onImprove(field, content);
      setImproved(result);
    } catch (error) {
      console.error('Error improving content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    onApply(improved);
    onClose();
    setImproved('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-blue-600" size={20} />
            AI Improve: {field}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Content
            </label>
            <div className="p-3 bg-gray-50 rounded border border-gray-200 text-sm text-gray-700 whitespace-pre-line">
              {content || 'No content provided'}
            </div>
          </div>

          {!improved && !isLoading && (
            <div className="text-center py-8">
              <button
                onClick={handleImprove}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center gap-2 mx-auto"
              >
                <Sparkles size={18} />
                Generate AI Improvements
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Our AI will enhance your content with professional language and structure
              </p>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-8">
              <Loader2 className="animate-spin mx-auto text-blue-600 mb-3" size={32} />
              <p className="text-gray-600">Improving your content...</p>
            </div>
          )}

          {improved && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI-Improved Content
              </label>
              <div className="p-3 bg-blue-50 rounded border border-blue-200 text-sm text-gray-700 whitespace-pre-line">
                {improved}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          {improved && (
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
