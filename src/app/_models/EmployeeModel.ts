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
}
