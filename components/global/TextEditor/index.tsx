import {Editor} from "@tinymce/tinymce-react";
import {FormikProps} from "formik";
import {FormValues} from "@/components/forms/WorkshopForm";

interface TextEditorProps {
    formik: Pick<FormikProps<FormValues>, 'values' | 'setFieldValue'>; // Only pass relevant Formik props
    fieldname: keyof Pick<FormValues, 'title' | 'type' | 'description' | 'ws_status'>; // Fields must be strings
}
function TextEditor({ formik, fieldname }: TextEditorProps){
    const fieldValue = formik.values[fieldname];
    return <Editor
        apiKey='4llvbiwdmrw5rewez0b5iwicw7kpg4gw7d2dcixd1l9a3m0s'
        value={ fieldValue  }
        init={ {
            height: 500,
            menubar: false,
            branding: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: ' blocks |bold| alignleft aligncenter |alignright alignjustify | bullist | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

        } }

        onEditorChange={ (content) => formik?.setFieldValue(`${fieldname}`, content) }/>
}
export default TextEditor