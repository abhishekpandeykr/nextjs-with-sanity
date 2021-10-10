export default{
    name:"chef",
    title:"chef",
    type:"document",
    fields:[
        {
            name:"name",
            titles:"Chef's name",
            type:"string"
        },
        {
            name:"image",
            title:"image",
            type:"image",
            options:{
                hotspot:true
            }
        },
        {
            name:"bio",
            title:"Bio",
            type:"array",
            of:[
                {
                    title:"Block",
                    type:"block",
                    styles:[{title:"Normal", value:"Normal"}],
                    lists:[]
                }
            ]
        }
    ]
}