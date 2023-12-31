export const  sidebar_menu = [
    {
      name: "Dashboard",
      url:"/dashboard",
      role:["super_admin"],
      icon: 'fa-tachometer-alt',
      child:[]
    },
    {
      name: "Brands",
      url:"/brands",
      role:["super_admin"],
      icon: 'fa-cogs',
      child:[]
    },
    { 
      name: "Category",
      url:"/category",
      role:["super_admin"],
      icon: 'fa-cube',
      child:[]
    },
    {
      name: "Sub Category",
      url:"/subcategory",
      role:["super_admin"],
      icon: 'fa-cubes',
    },
    {
      name: "Products",
      role:["super_admin"],
      url:"/product/add",
      icon: 'fa-list',
      child:[
        {
          name: "Add",
          url:"/product/add",
          role:["super_admin"],
          icon: 'fa-user-plus',
        },{
        name: "List",
        url:"/products",
        role:["super_admin"],
        icon: 'fa-user-plus',
      }]
    },
    {
      name: "Clients",
      role:["super_admin"],
      icon: 'fa-user',
      url:"/client/add",
      child:[
        {
          name: "Add",
          url:"/client/add",
          role:["super_admin"],
          icon: 'fa-user',
        },{
        name: "List",
        url:"/clients",
        role:["super_admin"],
        icon: 'fa-user-plus',
      }]
    },
    {
      name: "Rate calculation",
      url:"/rate-calculation",
      role:["super_admin"],
      icon: 'fa-sort',
      child:[]
    },
    // {
    //   name: "Broker",
    //   url:"/broker",
    //   role:["super_admin","admin"],
    //   icon: 'fa-users',
    //   child:[{
    //     name: "Register",
    //     url:"broker",
    //     role:["super_admin","admin"],
    //     icon: 'fa-users',
    //   },
    //   {
    //     name: "List",
    //     url:"/broker/list",
    //     role:["super_admin","admin"],
    //     icon: 'fa-users',

    //   }]
    // },
    // {
    //   name: "Township",
    //   url:"/township",
    //   role:["super_admin","admin"],
    //   icon: 'fa-flag-checkered',
    //   child:[{
    //     name: "Register",
    //     url:"/township/view",
    //     role:["super_admin","admin"],
    //     icon: 'fa-flag-checkered',
    //   },
    //   {
    //     name: "List",
    //     url:"/township/list",
    //     role:["super_admin","admin"],
    //     icon: 'fa-flag-checkered',
    //   }]
    // },
    // {
    //   name: "Block",
    //   url:"/blocklist",
    //   role:["super_admin","admin"],
    //   icon: 'fa-building',
    //   child:[{
    //     name: "List",
    //     url:"blocklist",
    //     role:["super_admin","admin"],
    //     icon: 'fa-building',
    //   },
    //   // {
    //   //   name: "List",
    //   //   url:"/blocklist",
    //   //   role:["super_admin","admin"],
    //   // }
    // ]
    // },
    // {
    //   name: "Plots",
    //   url:"/plots",
    //   role:["super_admin","admin"],
    //   icon: 'fa-th',
    //   child:[ {
    //     name: "Register",
    //     url:"/plots",
    //     role:["super_admin","admin"],
    //     icon: 'fa-th',
    //   },
    //   {
    //     name: "List",
    //     url:"/plots/list",
    //     role:["super_admin","admin"],
    //     icon: 'fa-th',
    //   }]
    // },
    // {
    //   name: "Booking",
    //   url:"/booking",
    //   role:["super_admin","admin"],
    //   icon: 'fa-handshake',
    //   child:[ {
    //     name: "Booking",
    //     url:"/booking",
    //     role:["super_admin","admin"],
    //     icon: 'fa-handshake',
    //   },
    //   {
    //     name: "List",
    //     url:"/booking/list",
    //     role:["super_admin","admin"],
    //     icon: 'fa-handshake',
    //   }]
    // },
    // {
    //   name: "Reports",
    //   url:"/reports/townships",
    //   role:["super_admin","admin"],
    //   icon: 'fa-chart-pie',
    //   child:[
    //     {
    //       name: "Township",
    //       url:"/reports/townships",
    //       role:["super_admin","admin"],
    //       icon: 'fa-chart-pie',
    //       child:[]
    //     },
    //     {
    //       name: "Block",
    //       url:"/reports/blocks",
    //       role:["super_admin","admin"],
    //       icon: 'fa-chart-pie',
    //       child:[]
    //     },
    //     {
    //       name: "Plot",
    //       url:"/reports/plots",
    //       role:["super_admin","admin"],
    //       icon: 'fa-chart-pie',
    //       child:[]
    //     },
    //     {
    //       name: "Broker",
    //       url:"/reports/brokers",
    //       role:["super_admin","admin"],
    //       icon: 'fa-chart-pie',
    //       child:[]
    //     }
    //   ]
    // },
   
  ]