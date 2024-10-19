import { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import 'tinymce/skins/ui/oxide/skin.min.css';

let defaultPlugins = [
    'code',
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'wordcount',
    'fullpage',
]
let defaultMenubar = 'file edit view insert format tools table tc '
let defaultToolbar = [
    'formatselect bold italic underline forecolor',
    'alignleft aligncenter alignright alignjustify bullist numlist outdent indent',
    'link',
    'undo redo',
    'fullscreen',
    'code',
    'sitecoreMediaLibary',
    'fullpage',
].join('|')

export default function EditorTinymce(props) {
    const { onChange, value, disabled, id } = props || {}
    const [modalData, setModalData] = useState()
    const editorRef = useRef(null)
    const { init, ...rest } = props

    return (
        <>
            <Editor
                onEditorChange={onChange}
                value={value || ''}
                id={`EditorTinymce-${id}`}
                disabled={disabled}
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                    ...init,
                    skin: false,
                    content_css: false,
                    menubar: defaultMenubar,
                    toolbar: defaultToolbar,
                    plugins: defaultPlugins,
                    content_style: [init?.content_style || ''].join('\n'),
                    valid_children: '+body[style]',
                    extended_valid_elements: "script[src|async|defer|type|charset]",
                    setup: function (editor) {
                        editor.ui.registry.addButton('sitecoreMediaLibary', {
                            text: 'Sitecore Media Libary',
                            onAction: () =>
                                setModalData((prev) => ({
                                    ...prev,
                                    open: true,
                                    item: undefined,
                                })),
                        })
                    },
                }}
            />
            
        </>
    )
}