export default {
    name:"ingredient",
    title:"Ingredient",
    type:"document",
    fields:[
        {
            name:"name",
            title:"ingredient Name",
            type:"string"
        },
        {
            name:"image",
            title:"Image",
            type:"image",
            option:{
                hotshot:true
            }
        },
        {
            name:"notes",
            title:"Notes",
            type:"text"
        }
    ]
}