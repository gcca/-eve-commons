declare const System: any;

System.config({
  map: {
    commons: '.',
  },
  packages: {
    commons: {
      index: './main.js',
      defaultExtension: 'js',
    }
  }
})
