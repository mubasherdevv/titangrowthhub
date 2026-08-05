'use client';

import React, { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';
import { Plus, Code, Type, Trash2, Sparkles, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from './ToastProvider';

interface ContentBlock {
  id: string;
  type: 'wysiwyg' | 'html';
  content: string;
}

interface ContentBlockBuilderProps {
  content: string;
  onChange: (content: string) => void;
}

export default function ContentBlockBuilder({ content, onChange }: ContentBlockBuilderProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(() => {
    if (content) {
      if (content.includes('<!-- BLOCK:')) {
        const parsedBlocks: ContentBlock[] = [];
        const regex = /<!-- BLOCK:(wysiwyg|html) -->\s*([\s\S]*?)\s*<!-- ENDBLOCK -->/g;
        let match;
        let hasMatches = false;
        while ((match = regex.exec(content)) !== null) {
          hasMatches = true;
          parsedBlocks.push({
            id: Math.random().toString(36).substr(2, 9),
            type: match[1] as 'wysiwyg' | 'html',
            content: match[2]
          });
        }
        if (hasMatches) return parsedBlocks;
      }
      return [{ id: Math.random().toString(36).substr(2, 9), type: 'wysiwyg', content }];
    }
    return [{ id: Math.random().toString(36).substr(2, 9), type: 'wysiwyg', content: '' }];
  });

  const [aiPrompts, setAiPrompts] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({});
  const toast = useToast();

  const [availableModels, setAvailableModels] = useState<{model: string, url: string}[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch('/api/ai/models');
        const data = await res.json();
        if (data.success && data.models) {
          setAvailableModels(data.models);
          if (data.models.length > 0) {
            setSelectedModel(data.models[0].model);
          }
        }
      } catch (err) {
        console.error('Failed to fetch AI models', err);
      }
    };
    fetchModels();
  }, []);

  // Call onChange whenever blocks change
  useEffect(() => {
    const finalHtml = blocks
      .map(b => `<!-- BLOCK:${b.type} -->\n${b.content}\n<!-- ENDBLOCK -->`)
      .join('\n\n');
    onChange(finalHtml);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  const addBlock = (type: 'wysiwyg' | 'html') => {
    setBlocks([...blocks, { id: Math.random().toString(36).substr(2, 9), type, content: '' }]);
  };

  const removeBlock = (id: string) => {
    if (blocks.length === 1) {
      // Don't remove the last block, just clear it
      setBlocks([{ ...blocks[0], content: '' }]);
      return;
    }
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    
    setBlocks(newBlocks);
  };

  const updateBlockContent = (id: string, newContent: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: newContent } : b));
  };

  const generateHtmlWithAI = async (id: string) => {
    const prompt = aiPrompts[id];
    if (!prompt || prompt.trim() === '') {
      toast.error('Please enter a prompt for the AI');
      return;
    }

    setIsGenerating(prev => ({ ...prev, [id]: true }));
    try {
      const res = await fetch('/api/ai/generate-html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model: selectedModel }),
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        updateBlockContent(id, data.html);
        toast.success('HTML generated successfully!');
        // Clear prompt
        setAiPrompts(prev => ({ ...prev, [id]: '' }));
      } else {
        toast.error(data.error || 'Failed to generate HTML');
      }
    } catch (err) {
      toast.error('An error occurred while calling AI');
    } finally {
      setIsGenerating(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <div key={block.id} className="relative group bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm transition-all hover:border-orange-200 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
          
          {/* Block Header Toolbar */}
          <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-md bg-white border border-zinc-200 text-zinc-500 font-mono text-[10px] shadow-sm">
                {index + 1}
              </span>
              <span className="text-[13px] font-bold text-zinc-700 flex items-center gap-1.5 uppercase tracking-wide">
                {block.type === 'wysiwyg' ? <Type className="w-4 h-4 text-orange-500" /> : <Code className="w-4 h-4 text-purple-500" />}
                {block.type === 'wysiwyg' ? 'Rich Text Block' : 'Custom HTML Block'}
              </span>
            </div>
            
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
              <button 
                type="button"
                onClick={() => moveBlock(index, 'up')}
                disabled={index === 0}
                className="p-1.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200 rounded-md disabled:opacity-30 transition-colors"
                title="Move Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={() => moveBlock(index, 'down')}
                disabled={index === blocks.length - 1}
                className="p-1.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200 rounded-md disabled:opacity-30 transition-colors"
                title="Move Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-zinc-300 mx-1"></div>
              <button 
                type="button"
                onClick={() => removeBlock(block.id)}
                className="p-1.5 text-red-400 hover:text-white hover:bg-red-500 rounded-md transition-colors"
                title="Delete Block"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Block Content */}
          <div className="p-0">
            {block.type === 'wysiwyg' ? (
              <div className="[&>div]:border-0 [&>div]:rounded-none [&>div]:shadow-none">
                <RichTextEditor 
                  content={block.content} 
                  onChange={(val) => updateBlockContent(block.id, val)} 
                />
              </div>
            ) : (
              <div className="bg-zinc-950 p-4 relative">
                {/* AI Prompt Input overlay */}
                <div className="mb-4 flex gap-2">
                  <div className="relative flex-1">
                    <Sparkles className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      value={aiPrompts[block.id] || ''}
                      onChange={(e) => setAiPrompts(prev => ({ ...prev, [block.id]: e.target.value }))}
                      placeholder="Ask AI to generate HTML (e.g. 'Create a pricing table with 3 columns')"
                      className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-zinc-600 transition-all"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          generateHtmlWithAI(block.id);
                        }
                      }}
                    />
                  </div>
                  {availableModels.length > 0 && (
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className="bg-zinc-900/50 border border-zinc-800 text-zinc-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none max-w-[200px] truncate"
                    >
                      {availableModels.map((m, i) => (
                        <option key={i} value={m.model}>{m.model}</option>
                      ))}
                    </select>
                  )}
                  <button 
                    type="button"
                    onClick={() => generateHtmlWithAI(block.id)}
                    disabled={isGenerating[block.id]}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {isGenerating[block.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate'}
                  </button>
                </div>
                <textarea 
                  value={block.content}
                  onChange={(e) => updateBlockContent(block.id, e.target.value)}
                  placeholder="<div>Paste your custom HTML here...</div>"
                  className="w-full h-64 bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-sm p-4 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y transition-all custom-scrollbar"
                  spellCheck="false"
                />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Add Block Buttons */}
      <div className="flex items-center justify-center gap-4 py-4 border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
        <button 
          type="button"
          onClick={() => addBlock('wysiwyg')}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 text-zinc-700 text-sm font-bold rounded-lg hover:bg-zinc-50 hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Rich Text Block
        </button>
        <button 
          type="button"
          onClick={() => addBlock('html')}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-zinc-200 text-zinc-700 text-sm font-bold rounded-lg hover:bg-zinc-50 hover:border-purple-500 hover:text-purple-600 transition-all shadow-sm"
        >
          <Code className="w-4 h-4" />
          Add Custom HTML Block
        </button>
      </div>
    </div>
  );
}
