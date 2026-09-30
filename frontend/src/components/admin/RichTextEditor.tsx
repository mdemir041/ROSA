import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import TextAlign from '@tiptap/extension-text-align';
import { Sparkles, Bold, Italic, Underline as UnderlineIcon, Heading1, Heading2, Link2, Image as ImageIcon, Strikethrough, Superscript as SuperscriptIcon, Subscript as SubscriptIcon, Eraser, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify, X } from 'lucide-react';
import ImageUploadField from './ImageUploadField';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onOpenIconModal: () => void;
  placeholder?: string;
}

const UrlModal = ({ isOpen, onClose, onSubmit, title, placeholder, initialValue = '' }: { isOpen: boolean, onClose: () => void, onSubmit: (val: string) => void, title: string, placeholder: string, initialValue?: string }) => {
  const [value, setValue] = useState(initialValue);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { 
    setMounted(true);
    if (isOpen) setValue(initialValue); 
  }, [isOpen, initialValue]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1A1622] rounded-2xl w-full max-w-md p-6 shadow-2xl border border-gray-200 dark:border-white/10 animate-in zoom-in-95 duration-200">
        <h3 className="text-lg font-bold text-[#3D154B] dark:text-white mb-4">{title}</h3>
        <input 
          autoFocus
          type="text" 
          value={value} 
          onChange={e => setValue(e.target.value)} 
          placeholder={placeholder}
          className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-[#3D154B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all mb-6"
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); onSubmit(value); onClose(); }
            if (e.key === 'Escape') onClose();
          }}
        />
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">İptal</button>
          <button type="button" onClick={() => { onSubmit(value); onClose(); }} className="px-6 py-2 rounded-xl font-bold bg-[#6A4C93] text-white hover:bg-[#523A70] dark:bg-[#D4AF37] dark:text-[#1A1622] transition-colors shadow-md">Ekle</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const ImageModal = ({ isOpen, onClose, onSubmit, title }: { isOpen: boolean, onClose: () => void, onSubmit: (val: string) => void, title: string }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { 
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1A1622] rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-gray-200 dark:border-white/10 animate-in zoom-in-95 duration-200 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2 z-10 bg-white dark:bg-[#1A1622] rounded-full">
          <X size={20} />
        </button>
        <div className="mt-2">
          <ImageUploadField 
             value="" 
             onChange={(url) => { 
               if(url) {
                 onSubmit(url); 
                 onClose(); 
               }
             }} 
             label={title} 
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default function RichTextEditor({ value, onChange, onOpenIconModal, placeholder }: RichTextEditorProps) {
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-5 my-2 space-y-1',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-5 my-2 space-y-1',
          }
        }
      }) as any,
      Underline as any,
      Superscript,
      Subscript,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#6A4C93] dark:text-[#D4AF37] underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg shadow-md my-4',
        },
      }),
    ] as any,
    content: value,
    editorProps: {
      attributes: {
        class: 'w-full min-h-[180px] max-h-[300px] overflow-y-auto bg-white dark:bg-[#1A1622] border-x border-b border-gray-200 dark:border-white/5 rounded-b-xl px-3 py-3 text-[15px] text-[#3D154B] dark:text-gray-200 focus:outline-none prose prose-sm dark:prose-invert max-w-none leading-relaxed',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      // Force re-render to update toolbar button states
      // Tiptap's useEditor should do this automatically, but sometimes it misses stored marks
      setTrigger(prev => prev + 1);
    },
    onTransaction: ({ editor }) => {
      setTrigger(prev => prev + 1);
    }
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    if (previousUrl) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    setLinkModalOpen(true);
  };

  const submitLink = (url: string) => {
    if (!url) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    setImageModalOpen(true);
  };

  const submitImage = (url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const ToolbarButton = ({ onClick, isActive, children, title }: { onClick: () => void, isActive?: boolean, children: React.ReactNode, title: string }) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className={`w-8 h-8 rounded-md flex items-center justify-center font-bold transition-all shrink-0 ${
        isActive 
          ? 'bg-[#6A4C93] text-white dark:bg-[#D4AF37] dark:text-[#1A1622] shadow-inner shadow-black/20 ring-2 ring-[#6A4C93]/30 ring-offset-1 scale-95' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:scale-105'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/5 rounded-t-xl p-1.5 flex gap-1 overflow-x-auto flex-wrap items-center">
        
        <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleBold().run()} isActive={editor.isActive('bold')} title="Kalın">
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleItalic().run()} isActive={editor.isActive('italic')} title="Eğik">
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleUnderline().run()} isActive={editor.isActive('underline')} title="Altı Çizili">
          <UnderlineIcon size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => (editor.chain().focus() as any).clearNodes().unsetAllMarks().run()} title="Biçimlendirmeyi Temizle">
          <Eraser size={16} />
        </ToolbarButton>
        
        <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1"></div>

        <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleStrike().run()} isActive={editor.isActive('strike')} title="Üstü Çizili">
          <Strikethrough size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleSuperscript().run()} isActive={editor.isActive('superscript')} title="Üst Simge">
          <SuperscriptIcon size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleSubscript().run()} isActive={editor.isActive('subscript')} title="Alt Simge">
          <SubscriptIcon size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1"></div>
        
        <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Madde İşaretleri">
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Numaralandırma">
          <ListOrdered size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1"></div>
        
        <ToolbarButton onClick={() => (editor.chain().focus() as any).setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Sola Hizala">
          <AlignLeft size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => (editor.chain().focus() as any).setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Ortala">
          <AlignCenter size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => (editor.chain().focus() as any).setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Yasla">
          <AlignJustify size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1"></div>

        <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Ana Başlık (H1)">
          <Heading1 size={16} />
        </ToolbarButton>
        <ToolbarButton onClick={() => (editor.chain().focus() as any).toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Alt Başlık (H2)">
          <Heading2 size={16} />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1"></div>

        <ToolbarButton onClick={toggleLink} isActive={editor.isActive('link')} title="Bağlantı (Link)">
          <Link2 size={16} />
        </ToolbarButton>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); addImage(); }}
          title="Görsel Ekle"
          className="w-8 h-8 rounded-md flex items-center justify-center font-bold transition-all shrink-0 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:scale-105"
        >
          <ImageIcon size={16} />
        </button>

        <div className="w-px h-6 bg-gray-300 dark:bg-white/10 mx-1"></div>
        
        <button 
          type="button" 
          onClick={onOpenIconModal}
          className="h-8 px-2 ml-1 rounded-md bg-[#6A4C93]/10 dark:bg-[#E0CFF2]/10 hover:bg-[#6A4C93]/20 dark:hover:bg-[#E0CFF2]/20 border border-[#6A4C93]/20 dark:border-[#E0CFF2]/20 flex items-center gap-1.5 font-bold text-[#6A4C93] dark:text-[#E0CFF2] transition-colors shrink-0"
          title="İkon Ekle"
        >
          <Sparkles size={14} /> 
          <span className="text-xs">İkon Ekle</span>
        </button>
      </div>

      <EditorContent editor={editor} />
      
      <UrlModal 
        isOpen={linkModalOpen}
        onClose={() => { setLinkModalOpen(false); editor.commands.focus(); }}
        onSubmit={submitLink}
        title="Bağlantı (Link) Ekle"
        placeholder="https://www.ornek.com"
      />

      <ImageModal 
        isOpen={imageModalOpen}
        onClose={() => { setImageModalOpen(false); editor.commands.focus(); }}
        onSubmit={submitImage}
        title="Görsel Yükle veya Link Gir"
      />
      
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
