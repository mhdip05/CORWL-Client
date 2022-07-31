import { INavData } from '@coreui/angular';

export const navItems: any[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },

  {
    title: true,
    name: 'Setup Utility',
    role:["admin","management"]
  },
  {
    name: 'Settings',
    url: '/settings',
    role:["admin","management"],
    iconComponent: { name: 'cilApplicationsSettings' },
    children: [
      { name: 'Add Company', url: '/settings/company' },
      { name: 'Add Branch', url: '/settings/branch' },
      { name: 'Add Place', url: '/settings/place' }
    ]
  },

  {
    title: true,
    name: 'Employee Module',
    role:["admin","management"],
  },
  {
    name: 'Employee',
    url: '/employee',
    role:["admin","management"],
    iconComponent: { name: 'cilPeople' },
    children: [
      {name: 'Add Employee',url:'/employee/add-employee'},
      {name: 'Add Designation',url:'/employee/designation'}
    ]
  },
  
  {
    title: true,
    name: 'Doctor Module',
    role:["doctor"]
  },
  {
     
     name:'Doctor',
     url:'/appointment-list',
     role:["doctor"],
     iconComponent: { name: 'cilPeople' },
     children:[
       {name:'Appointment List', url:'/doctor/appointment-list'}
     ]
  },

];


