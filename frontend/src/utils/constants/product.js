import phone from '../../assets/Images/phone.webp'

const products = [{
    name:"Iphone13",
    url:phone,
    details:"Details",
    status:"Transfer"
},{
    name:"Realme 7 pro",
    url:phone,
    details:"Details",
    status:"Transfer"
},
{
    name:"Oneplus 7T",
    url:phone,
    details:"Details",
    status:"Defective"
},
{
    name:"Motorola X",
    url:phone,
    details:"Details",
    status:"Transferred"
},
{
    name:"Oneplus 7T",
    url:phone,
    details:"Details",
    status:"Transfer"
},
{
    name:"Oneplus 7T",
    url:phone,
    details:"Details",
    status:"Transfer"
}]

const Qualitycheckedproducts = [{
    name:"Iphone13",
    url:phone,
    status:'Verified',
    operation:"Transfer"
},{
    name:"Realme 7 pro",
    url:phone,
    status:'Defective',
    operation:"Transfer"
},
{
    name:"Oneplus 7T",
    url:phone,
    status:'Defective',
    operation:"Transited"
},
{
    name:"Motorola X",
    url:phone,
    status:'Verified',
    operation:"Transited"
},

]

const QualityControlProducts = [
    {
        name:"Iphone13",
        url:phone,
        operation:"Verify Product"
    },{
        name:"Realme 7 pro",
        url:phone,
        operation:"Verify Product"
    },
    {
        name:"Realme 7 pro",
        url:phone,
        operation:"Verify Product"
    },
    {
        name:"Oneplus 7T",
        url:phone,
        operation:"Verify Product"
    },
    {
        name:"Motorola X",
        url:phone,
    
        operation:"Verify Product"
    },
]

const Verifiedproducts = [
    {
        name:"Iphone13",
        url:phone,
       
        producthistory:'Product history',
        status:'Available',
    },{
        name:"Realme 7 pro",
        url:phone,
   
        producthistory:'Product history',
        status:'Available',
    },
    {
        name:"Oneplus 7T",
        url:phone,

        producthistory:'Product history',
        status:'Sold',
    },
    {
        name:"Motorola X",
        url:phone,
       
        producthistory:'Product history',
        status:'Available'
    },
]

const producthistory = {
    1:[{Timestamp:'2023-08-04 11:30 AM',
    From:'Factory',
    To:'Warehouse',
    Status:'Created'
},{
    Timestamp:'2023-08-04 11:30 AM',
    From:'Warehouse',
    To:'Factory',
    Status:'Defective'
},{
    Timestamp:'2023-08-04 11:30 AM',
    From:'Factory',
    To:'Warehouse',
    status:'Updated',
},{
    Timestamp:'2023-08-04 11:30 AM',
    From:'Warehouse',
    To:'Store',
    status:'Verified',
}
]}


export {products,Qualitycheckedproducts,QualityControlProducts,Verifiedproducts,producthistory}