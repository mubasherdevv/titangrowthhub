'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link2, Quote, Code, ImageIcon
} from 'lucide-react';
import MediaLibraryPicker from './MediaLibraryPicker';
import { Node, mergeAttributes, Extension } from '@tiptap/core';

const GlobalStyleAndClass = Extension.create({
  name: 'globalStyleAndClass',
  addGlobalAttributes() {
    return [
      {
        types: ['heading', 'paragraph', 'div', 'span', 'i'],
        attributes: {
          style: {
            default: null,
            parseHTML: element => element.getAttribute('style'),
            renderHTML: attributes => {
              if (!attributes.style) return {};
              return { style: attributes.style };
            },
          },
          class: {
            default: null,
            parseHTML: element => element.getAttribute('class'),
            renderHTML: attributes => {
              if (!attributes.class) return {};
              return { class: attributes.class };
            },
          },
        },
      },
    ];
  },
});

const DivNode = Node.create({
  name: 'div',
  group: 'block',
  content: 'block+',
  parseHTML() { return [{ tag: 'div' }]; },
  renderHTML({ HTMLAttributes }) { return ['div', mergeAttributes(HTMLAttributes), 0]; },
});

const SpanNode = Node.create({
  name: 'span',
  group: 'inline',
  inline: true,
  content: 'inline*',
  parseHTML() { return [{ tag: 'span' }]; },
  renderHTML({ HTMLAttributes }) { return ['span', mergeAttributes(HTMLAttributes), 0]; },
});

const INode = Node.create({
  name: 'i',
  group: 'inline',
  inline: true,
  content: 'inline*',
  parseHTML() { return [{ tag: 'i' }]; },
  renderHTML({ HTMLAttributes }) { return ['i', mergeAttributes(HTMLAttributes), 0]; },
});

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState(content);

  const editor = useEditor({
    extensions: [
      StarterKit,
      GlobalStyleAndClass,
      DivNode,
      SpanNode,
      INode,
      Underline,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[300px] p-4 max-w-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const handleImageSelect = (url: string) => {
    editor.chain().focus().setImage({ src: url }).run();
    setShowMediaPicker(false);
  };

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-zinc-200 bg-zinc-50 p-2 flex flex-wrap items-center gap-1">
        <select 
          className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 focus:outline-none mr-2"
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'p') editor.chain().focus().setParagraph().run();
            else if (val === 'h1') editor.chain().focus().toggleHeading({ level: 1 }).run();
            else if (val === 'h2') editor.chain().focus().toggleHeading({ level: 2 }).run();
            else if (val === 'h3') editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          value={
            editor.isActive('heading', { level: 1 }) ? 'h1' :
            editor.isActive('heading', { level: 2 }) ? 'h2' :
            editor.isActive('heading', { level: 3 }) ? 'h3' : 'p'
          }
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <div className="h-4 w-px bg-zinc-200 mx-1" />

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg ${editor.isActive('bold') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Bold"
        ><Bold className="h-4 w-4" /></button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg ${editor.isActive('italic') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Italic"
        ><Italic className="h-4 w-4" /></button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded-lg ${editor.isActive('underline') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Underline"
        ><UnderlineIcon className="h-4 w-4" /></button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded-lg ${editor.isActive('strike') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Strikethrough"
        ><Strikethrough className="h-4 w-4" /></button>

        <div className="h-4 w-px bg-zinc-200 mx-1" />

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg ${editor.isActive('bulletList') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Bullet List"
        ><List className="h-4 w-4" /></button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg ${editor.isActive('orderedList') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Numbered List"
        ><ListOrdered className="h-4 w-4" /></button>

        <div className="h-4 w-px bg-zinc-200 mx-1" />

        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-1.5 rounded-lg ${editor.isActive({ textAlign: 'left' }) ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Align Left"
        ><AlignLeft className="h-4 w-4" /></button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-1.5 rounded-lg ${editor.isActive({ textAlign: 'center' }) ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Align Center"
        ><AlignCenter className="h-4 w-4" /></button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-1.5 rounded-lg ${editor.isActive({ textAlign: 'right' }) ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Align Right"
        ><AlignRight className="h-4 w-4" /></button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-1.5 rounded-lg ${editor.isActive({ textAlign: 'justify' }) ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Justify"
        ><AlignJustify className="h-4 w-4" /></button>

        <div className="h-4 w-px bg-zinc-200 mx-1" />

        <button
          onClick={addLink}
          className={`p-1.5 rounded-lg ${editor.isActive('link') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Link"
        ><Link2 className="h-4 w-4" /></button>

        <button
          onClick={() => setShowMediaPicker(true)}
          className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70"
          title="Insert Image"
        ><ImageIcon className="h-4 w-4" /></button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg ${editor.isActive('blockquote') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Quote"
        ><Quote className="h-4 w-4" /></button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1.5 rounded-lg ${editor.isActive('codeBlock') ? 'bg-zinc-200 text-zinc-900' : 'text-zinc-600 hover:bg-zinc-200/70'}`}
          title="Code Block"
        ><Code className="h-4 w-4" /></button>
        
        {/* Templates Dropdown */}
        <div className="h-4 w-px bg-zinc-200 mx-1" />
        <select 
          className="rounded-lg border border-orange-200 bg-orange-50 px-2 py-1 text-xs font-bold text-orange-700 focus:outline-none cursor-pointer"
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'cards') {
              editor.commands.insertContent(`<div style="margin-top: 40px; margin-bottom: 40px;">
  <h3 style="font-size: 28px; font-weight: 800; color: #111; margin-bottom: 30px;">Our Services Include</h3>
  <div style="display: flex; flex-wrap: wrap; gap: 20px;">
    <div style="flex: 1; min-width: 250px; background: #fff; border: 1px solid #f0f0f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
      <div style="width: 50px; height: 50px; background: #fff0eb; color: #fd3f00; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 20px;">
        <i class="fas fa-star"></i>
      </div>
      <h4 style="font-size: 18px; font-weight: 700; color: #111; margin-bottom: 12px;">Service Name</h4>
      <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0;">Service description goes here.</p>
    </div>
    <div style="flex: 1; min-width: 250px; background: #fff; border: 1px solid #f0f0f0; border-radius: 12px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
      <div style="width: 50px; height: 50px; background: #fff0eb; color: #fd3f00; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 20px;">
        <i class="fas fa-bolt"></i>
      </div>
      <h4 style="font-size: 18px; font-weight: 700; color: #111; margin-bottom: 12px;">Service Name</h4>
      <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0;">Service description goes here.</p>
    </div>
  </div>
</div>`);
            } else if (val === 'features') {
              editor.commands.insertContent(`<div style="margin-top: 30px; margin-bottom: 30px; padding: 30px; background: #f8fafc; border-radius: 12px; border-left: 4px solid #fd3f00;">
  <h4 style="font-size: 20px; font-weight: 700; color: #111; margin-bottom: 15px;">Key Features</h4>
  <ul style="list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
    <li style="display: flex; align-items: center; gap: 10px; font-size: 16px; color: #444;"><i class="fas fa-check-circle" style="color: #fd3f00;"></i> Feature 1</li>
    <li style="display: flex; align-items: center; gap: 10px; font-size: 16px; color: #444;"><i class="fas fa-check-circle" style="color: #fd3f00;"></i> Feature 2</li>
    <li style="display: flex; align-items: center; gap: 10px; font-size: 16px; color: #444;"><i class="fas fa-check-circle" style="color: #fd3f00;"></i> Feature 3</li>
    <li style="display: flex; align-items: center; gap: 10px; font-size: 16px; color: #444;"><i class="fas fa-check-circle" style="color: #fd3f00;"></i> Feature 4</li>
  </ul>
</div>`);
            } else if (val === 'cta') {
              editor.commands.insertContent(`<div style="margin-top: 40px; margin-bottom: 40px; padding: 40px; background: #111; border-radius: 16px; text-align: center; color: #fff;">
  <h3 style="font-size: 26px; font-weight: 800; color: #fff; margin-bottom: 15px;">Ready to get started?</h3>
  <p style="font-size: 16px; color: #aaa; margin-bottom: 25px;">Contact us today to learn more about how we can help your business grow.</p>
  <a href="/contact-us" style="display: inline-block; padding: 12px 28px; background: #fd3f00; color: #fff; text-decoration: none; font-weight: 600; border-radius: 8px; font-size: 15px;">Get a Free Quote</a>
</div>`);
            }
            e.target.value = '';
          }}
          value=""
        >
          <option value="" disabled>+ Insert Template</option>
          <option value="cards">Service Cards</option>
          <option value="features">Features Grid</option>
          <option value="cta">Call to Action Box</option>
        </select>

        {/* HTML Toggle Button */}
        <div className="h-4 w-px bg-zinc-200 mx-1" />
        <button
          onClick={() => {
            if (isHtmlMode) {
              editor.commands.setContent(htmlContent);
            } else {
              setHtmlContent(editor.getHTML());
            }
            setIsHtmlMode(!isHtmlMode);
          }}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${isHtmlMode ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}
        >
          {isHtmlMode ? 'Visual Editor' : '</> HTML Source'}
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto relative bg-zinc-50/30">
        {isHtmlMode ? (
          <textarea
            value={htmlContent}
            onChange={(e) => {
              setHtmlContent(e.target.value);
              onChange(e.target.value);
            }}
            className="w-full h-full min-h-[400px] p-6 font-mono text-sm bg-zinc-900 text-zinc-300 focus:outline-none resize-none"
            spellCheck="false"
            placeholder="<!-- Type your custom HTML here -->"
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>

      {/* Media Picker Modal */}
      {showMediaPicker && (
        <MediaLibraryPicker 
          onClose={() => setShowMediaPicker(false)}
          onSelect={handleImageSelect}
          folderName="editor-images"
        />
      )}
    </div>
  );
};

export default RichTextEditor;
