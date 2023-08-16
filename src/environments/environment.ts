// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

var currentURL = 'https://localhost:7214'
//var currentURL ='https://corwl-api-app.politecliff-c1771108.eastus.azurecontainerapps.io';

export const environment = {
  production: false,
  apiUrl: currentURL + '/api/v1/',
  hubUrl: currentURL + '/hubs/',
  fileUrl: "https://stcorwl.blob.core.windows.net/rootcontainer/",
  testDataUrl: 'http://localhost:1665/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
