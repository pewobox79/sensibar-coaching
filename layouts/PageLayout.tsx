const PageLayout=({children}: {children: React.ReactNode |React.ReactElement |React.ReactElement[]})=>{

    return <div className={"pageLayout"}>
        {children}
    </div>

}

export default PageLayout;