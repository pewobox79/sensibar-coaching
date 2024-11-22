export const generateEditorJSONFormat = (data:string) => {


    const dataArray = data?.split("\n")
    console.log("dataArray", dataArray)


    return dataArray?.map(item => {
        if (item.includes("<h")) {
            const heading = item.substring(0, 4)
            console.log("heading", heading)
            const textValue = item.replace(/<\/?h[1-6]>/g, "")
            console.log("item contains h", textValue)

            switch (heading) {
                case "<h1>" :
                    return {
                        type: "heading",
                        children: [
                            {
                                type: "text",
                                text: textValue
                            }
                        ],
                        level: 1
                    }
                case "<h2>" :
                    return {
                        type: "heading",
                        children: [
                            {
                                type: "text",
                                text: textValue
                            }
                        ],
                        level: 2
                    }
                case "<h3>" :
                    return {
                        type: "heading",
                        children: [
                            {
                                type: "text",
                                text: textValue
                            }
                        ],
                        level: 3
                    }
                case "<h4>" :
                    return {
                        type: "heading",
                        children: [
                            {
                                type: "text",
                                text: textValue
                            }
                        ],
                        level: 4
                    }
                case "<h5>" :
                    return {
                        type: "heading",
                        children: [
                            {
                                type: "text",
                                text: textValue
                            }
                        ],
                        level: 5
                    }
                case "<h6>" :
                    return {
                        type: "heading",
                        children: [
                            {
                                type: "text",
                                text: textValue
                            }
                        ],
                        level: 6
                    }
            }


        } else if (item.includes("<p>")) {
            const textValue = item.replace(/<\/?(h[1-6]|p|strong)>/g, "")

            if (textValue != "&nbsp;") {
                return {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            text: textValue,
                            bold: item.includes("<strong>")
                        }
                    ]
                }

            } else {

                return {
                    type: "paragraph",
                    children: [
                        {
                            type: "text",
                            text: "",
                        }
                    ]
                }
            }


        } else if (item.includes("<ul>")) {
            console.log("item contains ul", item)
            return {ul: item}
        } else {
            console.log("item contains non")
            return {text: item}
        }


    })


}