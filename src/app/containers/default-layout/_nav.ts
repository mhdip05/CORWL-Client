import { INavData } from '@coreui/angular';

export const navItems: any[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    title: true,
    name: 'Setup Utility',
    role: ['admin', 'management'],
  },
  {
    name: 'Settings',
    url: '/settings',
    role: ['admin', 'management'],
    iconComponent: { name: 'cilApplicationsSettings' },
    children: [
      { name: 'Basic Settings', url: '/settings/basic-settings' },
      { name: 'Company', url: '/settings/company' },
      { name: 'Branch', url: '/settings/branch' },
    ],
  },

  {
    title: true,
    name: 'Employee Module',
    role: ['admin', 'management'],
  },
  {
    name: 'Employee',
    url: '/employee',
    role: ['admin', 'management'],
    iconComponent: { name: 'cil-people' },
    children: [
      { name: 'Settings', url: '/employee/employee-settings' },
      { name: 'Employee List', url: '/employee/employee-list' },
      { name: 'Add Employee', url: '/employee/add-employee' },  
      { name: 'User List', url: '/employee/user-list' },
    ],
  },

  {
    title: true,
    name: 'Doctor Module',
    role: ['doctor'],
  },
  {
    name: 'Doctor',
    url: '/appointment-list',
    role: ['doctor'],
    iconComponent: { name: 'cilPeople' },
    children: [{ name: 'Appointment List', url: '/doctor/appointment-list' }],
  },

  {
    title: true,
    name: 'CS Module',
    role: ['customer service', 'admin', 'management'],
  },
  {
    name: 'Customer Services',
    url: '/customer-services',
    role: ['customer service', 'admin', 'management'],
    iconComponent: { name: 'cil-user' },
    children: [
      { name: 'Settings', url:'/supply-chain/supply-chain-settings'},
      { name: 'Forwarded Orders', url: '/supply-chain/add-supplier' },
      { name: 'All Customer', url: '/supply-chain/add-product' },
      { name: 'Work Order Entry', url: '/supply-chain/requision' },
      { name: 'Customer Order', url: '/supply-chain/requision' },
      { name: 'Job List', url: '/supply-chain/requision' },
    ],
  },
  {
    name: 'Sample Development',
    url: '/customer-services',
    role: ['customer service', 'admin', 'management'],
    iconComponent: { name: 'cil-view-stream' },
    children: [
      { name: 'Settings', url:'/supply-chain/supply-chain-settings'},
      { name: 'Sample Set', url:'/supply-chain/supply-chain-settings'},
      { name: 'Sample Requirement Sheet', url: '/supply-chain/add-supplier' },
      { name: 'Production Development', url: '/supply-chain/add-product' },
    ],
  },
  {
    title: true,
    name: 'Retail Buyer Module',
    role: ['customer service', 'admin', 'management'],
  },
  {
    name: 'Retail Buyer',
    url: '/customer-services',
    role: ['customer service', 'admin', 'management'],
    iconComponent: { name: 'cil-voice-over-record' },
    children: [
      { name: 'Settings', url:'/supply-chain/supply-chain-settings'},
      { name: 'Product Category', url:'/supply-chain/supply-chain-settings'},
      { name: 'Customs Information', url: '/supply-chain/add-supplier' },
      { name: 'All Customer', url: '/supply-chain/add-product' },
      { name: 'Label Type', url: '/supply-chain/requision' },
    ],
  },

  {
    title: true,
    name: 'Accounts Module',
    role: ['accounts','admin', 'management'],
  },
  {
    name: 'Accounts',
    url: '/customer-services',
    role: ['accounts','admin', 'management'],
    iconComponent: { name: 'cil-cash' },
    children: [
      { name: 'Settings', url:'/supply-chain/supply-chain-settings'},
      { name: 'Credit Control', url:'/supply-chain/supply-chain-settings'},
      { name: 'LC', url: '/supply-chain/add-supplier' },
      { name: 'Proforma Invoice ', url: '/supply-chain/add-product' },
    ],
  },

  {
    title: true,
    name: 'Supply Chain Module',
    role: ['store', 'admin', 'management'],
  },
  {
    name: 'Supplier',
    url: '/add-product',
    role: ['store', 'admin', 'management'],
    iconComponent: { name: 'cil-people' },
    children: [
      { name: 'Settings', url:'/supply-chain/supply-chain-settings'},
      { name: 'Add Supplier', url: '/supply-chain/add-supplier' },
    ],
  },
  {
    name: 'Warehouse & Product',
    url: '/add-product',
    role: ['store', 'admin', 'management'],
    iconComponent: { name: 'cil-industry' },
    children: [
      { name: 'Settings', url:'/supply-chain/supply-chain-settings'},
      { name: 'Add Product', url: '/supply-chain/add-product' },

    ],
  },

  {
    name: 'Inventory',
    url: '/add-product',
    role: ['store', 'admin', 'management'],
    iconComponent: { name: 'cil-storage' },
    children: [
      { name: 'Settings', url:'/supply-chain/supply-chain-settings'},
      { name: 'Requisition', url: '/supply-chain/requision' },
    ],
  },
];
