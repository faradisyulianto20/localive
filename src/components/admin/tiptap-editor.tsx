import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import LinkExtension from '@tiptap/extension-link'
import { Bold, Italic, List, ListOrdered, Heading2 } from 'lucide-react'

interface TipTapEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  error?: string
}

export default function TipTapEditor({ value, onChange, placeholder, error }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension,
      LinkExtension.configure({ openOnClick: false }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[200px] p-4 outline-none focus:outline-none',
      },
    },
    immediatelyRender: false,
  })

  if (!editor) return null

  const toggle = (cb: () => void) => cb()

  return (
    <div className={`rounded-md border ${error ? 'border-red-500' : 'border-input'} overflow-hidden`}>
      <div className="flex items-center gap-0.5 border-b bg-muted/50 p-1.5">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded p-1.5 transition-colors hover:bg-neutral-200 ${
            editor.isActive('bold') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-500'
          }`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded p-1.5 transition-colors hover:bg-neutral-200 ${
            editor.isActive('italic') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-500'
          }`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`rounded px-2 py-1.5 text-xs font-bold transition-colors hover:bg-neutral-200 ${
            editor.isActive('heading', { level: 2 }) ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-500'
          }`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded p-1.5 transition-colors hover:bg-neutral-200 ${
            editor.isActive('bulletList') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-500'
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded p-1.5 transition-colors hover:bg-neutral-200 ${
            editor.isActive('orderedList') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-500'
          }`}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
