'use client'

const Loader =({content ='Registerung wird bearbeitet'}:{content?:string})=>{

    return <div className="loaderView">
        <div className={"loader"}></div>
        <p>{content}...</p>
    </div>
}

export default Loader;