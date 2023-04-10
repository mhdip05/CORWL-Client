export class EmployeeModel {

  bloodGroup = [
    { bloodGroup: 'A+' },
    { bloodGroup: 'A-' },
    { bloodGroup: 'B+' },
    { bloodGroup: 'B-' },
    { bloodGroup: 'O+' },
    { bloodGroup: 'O-' },
    { bloodGroup: 'AB+' },
    { bloodGroup: 'AB-' },
  ];

  maritalStatus = [{ maritalStatus: 'Single' }, { maritalStatus: 'Married' }];

  gender = [{ gender: 'Male' }, { gender: 'Female' }, { gender: 'Other' }];

  idType = [
    {idType:'Voter Id'},
    {idType:'Registration Card'},
    {idType:'Driving Licence'},
    {idType:'Passport'},
    {idType:'School/College Id'},
    {idType:'Cirtificate No'},
  ]

  staffGrade = [
    {staffGrade:1},
    {staffGrade:2},
    {staffGrade:3},
    {staffGrade:4},
    {staffGrade:5},
    {staffGrade:6},
    {staffGrade:7},
  ]

  reportingMethod = [
    {reportingMethod:'Direct'},
    {reportingMethod:'Indirect'}
  ]
}
