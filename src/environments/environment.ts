
var currentURL = 'https://localhost:7214'
//var currentURL ='https://corwl-dev.azurewebsites.net';
//var currentURL ='https://corwl.azurewebsites.net';

export const environment = {
  production: false,
  apiUrl: currentURL + '/api/v1/',
  hubUrl: currentURL + '/hubs/',
  fileUrl: "https://stcorwl.blob.core.windows.net/rootcontainer/",
  testDataUrl: 'http://localhost:1665/',
};

