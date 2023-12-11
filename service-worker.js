/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "03-01.jpg",
    "revision": "61ccd31b9a99e4dc0b2115d7a181dc71"
  },
  {
    "url": "03-02.jpg",
    "revision": "0e42c83dcc174ebfdbb611ab0956fcd9"
  },
  {
    "url": "03-03.jpg",
    "revision": "dd23072447e0798b536bd162235d14c3"
  },
  {
    "url": "03-04.jpg",
    "revision": "661a64ee2776ef94b23ba82f7ee50969"
  },
  {
    "url": "03-05.jpg",
    "revision": "6f52dcb2ccb40af28a65a4b796eb918d"
  },
  {
    "url": "03-06.jpg",
    "revision": "2643698d9412e41a449c1edee719fb29"
  },
  {
    "url": "03-07.jpg",
    "revision": "c4a788f41d803f8b9bddb5adc0513be6"
  },
  {
    "url": "03-08.jpg",
    "revision": "4c810503ec4bc1adfd29904056fc2886"
  },
  {
    "url": "03-09.jpg",
    "revision": "9c798bc91f80f84b6b0e7f7fba26d65b"
  },
  {
    "url": "03-10.jpg",
    "revision": "bb5b18b65591e9d058edbc14b02c6ba5"
  },
  {
    "url": "03-11.jpg",
    "revision": "6a88d8f48c63e79c72ec45ae84a8d9ff"
  },
  {
    "url": "04-01.jpg",
    "revision": "4bbafd5dd4000461cef55f669139b17b"
  },
  {
    "url": "05-01.jpg",
    "revision": "8d54b111a4b6b5fb4cd39e4c7261b927"
  },
  {
    "url": "06-01.jpg",
    "revision": "cf2dab320c48c5ead6fe105863629e4e"
  },
  {
    "url": "06-02.jpg",
    "revision": "aa286f8fd6540b7a7b6d36392a63f505"
  },
  {
    "url": "06-03.jpg",
    "revision": "239fa5fb2a9063f1e261ae2db81fceef"
  },
  {
    "url": "06-04.jpg",
    "revision": "a2dbf924afd6a8580ce4a2d2bcd6e049"
  },
  {
    "url": "06-05.jpg",
    "revision": "22f4f542b283cdc3d027eb664424d3c8"
  },
  {
    "url": "06-06.jpg",
    "revision": "12017ddd5b9179e8f53e93044acee998"
  },
  {
    "url": "06-07.jpg",
    "revision": "1ded65fc56da9f0008ae4ef2eacc8175"
  },
  {
    "url": "1.jpg",
    "revision": "f1ea37a492254cc85dd6fd1e89b1a6b4"
  },
  {
    "url": "1.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "12-01.jpg",
    "revision": "cc85570b3c89f73291af87791115986a"
  },
  {
    "url": "12-02.jpg",
    "revision": "f2b24c5c4beb21d5302c64b59445927a"
  },
  {
    "url": "12-03.jpg",
    "revision": "61fe98dff39d0887978deb0af605571b"
  },
  {
    "url": "12-04.jpg",
    "revision": "ff2468e7fbb03e034be0ffd7312dc7d9"
  },
  {
    "url": "12-05.jpg",
    "revision": "a126fe17514d81279c677666fd459d9d"
  },
  {
    "url": "12-06.jpg",
    "revision": "c25686b2f77ac7c5a2d4706f43e40132"
  },
  {
    "url": "12-07.jpg",
    "revision": "de17f3eb1df503250bcf1a5a4b533eec"
  },
  {
    "url": "12-08.jpg",
    "revision": "f3b58c768c18919a6fa2ab59ea6627db"
  },
  {
    "url": "13-01.jpg",
    "revision": "b22f06060909d43d796a8ffd4b0743a0"
  },
  {
    "url": "13-02.jpg",
    "revision": "2d2bca0518716a8dfaf37ef5c15e54ee"
  },
  {
    "url": "13-03.jpg",
    "revision": "fec1a3db903dc05c462fb6f384a400d6"
  },
  {
    "url": "2.jpg",
    "revision": "572bc2e4ef3efb7c81bbbcac5f09147b"
  },
  {
    "url": "3.jpg",
    "revision": "248757985bb49f73624c6923057530ac"
  },
  {
    "url": "4.jpg",
    "revision": "407c52446e2e463c4f8e494d52dbe485"
  },
  {
    "url": "404.html",
    "revision": "e0e627325d31aa03af996cbbc1477d02"
  },
  {
    "url": "5.jpg",
    "revision": "7e861769b640afa00fcc0ac4b72d9c52"
  },
  {
    "url": "assets/css/0.styles.07799b51.css",
    "revision": "e2694897af5072c3c9441558e38454c0"
  },
  {
    "url": "assets/img/bad_delete_project.e43702f3.png",
    "revision": "e43702f3fc97d9b60d2ef5fcc93472d0"
  },
  {
    "url": "assets/img/bad_delete_user.9990aca7.png",
    "revision": "9990aca727bc44ddc73d2f0ce5cc75cb"
  },
  {
    "url": "assets/img/bad_get_project.8e1834d0.png",
    "revision": "8e1834d04ab14c313a127f4c2e1360de"
  },
  {
    "url": "assets/img/bad_get_user.ec9e4299.png",
    "revision": "ec9e42990189d3613c11b67a673a28bc"
  },
  {
    "url": "assets/img/bad_post_project.554e7aa1.png",
    "revision": "554e7aa1c2e82116beafd12492cc9871"
  },
  {
    "url": "assets/img/bad_post_user.4a95137f.png",
    "revision": "4a95137fce152e961c38a6fd174b4d47"
  },
  {
    "url": "assets/img/delete_project_res.9f350c70.png",
    "revision": "9f350c70d43e0d6af7df4166b211a8d8"
  },
  {
    "url": "assets/img/delete_project.b4ad0b74.png",
    "revision": "b4ad0b74dcabe4a2d98863c9ac368419"
  },
  {
    "url": "assets/img/delete_user_res.5ffb381d.png",
    "revision": "5ffb381d3999d7bff5dd25733b336f17"
  },
  {
    "url": "assets/img/delete_user.3707f1ff.png",
    "revision": "3707f1ff25e6a1e3c9a58dcfd39d94b0"
  },
  {
    "url": "assets/img/get_all_projects.d5a2b6c2.png",
    "revision": "d5a2b6c29826a8b3b1d1911da1360811"
  },
  {
    "url": "assets/img/get_all_users.dc578086.png",
    "revision": "dc5780869b3a433805f325dedccd4810"
  },
  {
    "url": "assets/img/get_one_project.2dc9ad31.png",
    "revision": "2dc9ad31aaed90320cb7eed993d1b8d3"
  },
  {
    "url": "assets/img/get_one_user.836ecb9f.png",
    "revision": "836ecb9fee820521afe878a9b252eac3"
  },
  {
    "url": "assets/img/patch_project.e4d5da38.png",
    "revision": "e4d5da381cda05db35e4f7e9a428560e"
  },
  {
    "url": "assets/img/patch_user.99eb3598.png",
    "revision": "99eb35989bef6a451ee675e5cf1403ad"
  },
  {
    "url": "assets/img/post_project.564306ec.png",
    "revision": "564306ec39532246eda7974e469efa89"
  },
  {
    "url": "assets/img/post_user.db4069ec.png",
    "revision": "db4069ec2bbf90f50c6d7e1ce6a3a292"
  },
  {
    "url": "assets/img/projects_db.306c88a4.png",
    "revision": "306c88a42406f97ff4630ed3a363f68f"
  },
  {
    "url": "assets/img/relational_scheme.44c970b0.png",
    "revision": "44c970b0a143ec6fead87694514ea610"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/starting_api.67203872.png",
    "revision": "672038720c83c9c670d35fa985c19e47"
  },
  {
    "url": "assets/img/users_db.ce654b18.png",
    "revision": "ce654b180ad7348176bc44a2c54dea60"
  },
  {
    "url": "assets/js/1.3844ea3f.js",
    "revision": "8e527bcd4ec2f2317892222222abd15c"
  },
  {
    "url": "assets/js/10.aaa6304b.js",
    "revision": "434dfbd2b81a1cd994c6e3ba4bcbdeaa"
  },
  {
    "url": "assets/js/13.36d4ab52.js",
    "revision": "c5205c80bc9e0cb003531ea35b50abe0"
  },
  {
    "url": "assets/js/14.ad6f7787.js",
    "revision": "19fcfb4b133023059c0b672ad890c5e7"
  },
  {
    "url": "assets/js/15.dc7330b2.js",
    "revision": "dbaf2fff94b424d1d7df69032ea9fc56"
  },
  {
    "url": "assets/js/16.f5957e90.js",
    "revision": "7bdc205b2b31240cec7970b515fdf10c"
  },
  {
    "url": "assets/js/17.8d500ec9.js",
    "revision": "a17fce21a8278869e99bd2ca5d555309"
  },
  {
    "url": "assets/js/18.aef473c8.js",
    "revision": "d12dba1a9a7706c8b37cca889e347d37"
  },
  {
    "url": "assets/js/19.f18a3f78.js",
    "revision": "4892856f92a3216b9bba4673ac4d367d"
  },
  {
    "url": "assets/js/2.84bc8c61.js",
    "revision": "d9df528ba23f5f0e209e44a69b01417d"
  },
  {
    "url": "assets/js/20.106ba7c0.js",
    "revision": "d502abc59d557743eb8a90a0f64963fb"
  },
  {
    "url": "assets/js/21.c88a9ae9.js",
    "revision": "4a55c78f428654422992b19cbfcb6c9e"
  },
  {
    "url": "assets/js/22.ad07a126.js",
    "revision": "2d2aefcd7cb000ccfc7354d5c4d7992b"
  },
  {
    "url": "assets/js/23.7279c42d.js",
    "revision": "05c3867aa6d44f09d35b28d89ffa8c7b"
  },
  {
    "url": "assets/js/24.6e887fa1.js",
    "revision": "08bdc47714b8de4b1cc5225f0a9460cb"
  },
  {
    "url": "assets/js/25.b48850fb.js",
    "revision": "b9f0f7fdbd160f6264d23c9893ce1523"
  },
  {
    "url": "assets/js/26.75d636b7.js",
    "revision": "25097d4b15d164877a074855c62d5254"
  },
  {
    "url": "assets/js/27.eac39d19.js",
    "revision": "43ae50736c3a378fc9555fd3e468ef7e"
  },
  {
    "url": "assets/js/28.53285346.js",
    "revision": "3139584ad149b36c169ef9fe5ab62de3"
  },
  {
    "url": "assets/js/29.333f03a6.js",
    "revision": "178976665ef9bfb9f143a398d231d8bc"
  },
  {
    "url": "assets/js/3.693a1b30.js",
    "revision": "ba785f5ef9f15b19603ffb18aee7c990"
  },
  {
    "url": "assets/js/30.e2bc30eb.js",
    "revision": "12c1681a33cc973675e85b5e898f431f"
  },
  {
    "url": "assets/js/31.3d5939e4.js",
    "revision": "b680317338a7c4836ed5ac156c9afb66"
  },
  {
    "url": "assets/js/32.96cc09e9.js",
    "revision": "e825d1cb578074ff306d0e95b190ac78"
  },
  {
    "url": "assets/js/33.d930f828.js",
    "revision": "da779e74afa084be70ba0307f858a53c"
  },
  {
    "url": "assets/js/34.fd9ec551.js",
    "revision": "30f3cf421832714bf909738ca4acd116"
  },
  {
    "url": "assets/js/35.b13fef70.js",
    "revision": "6b3ec019df0e72a22d66d1f4c217f136"
  },
  {
    "url": "assets/js/36.b7afc933.js",
    "revision": "19522503eb2ce544e7878cba06ae967b"
  },
  {
    "url": "assets/js/37.7e374134.js",
    "revision": "4a0409245808b16728279df3a14d341e"
  },
  {
    "url": "assets/js/38.2ca837a5.js",
    "revision": "1b45d6c82062ab23d5eace9e092615a4"
  },
  {
    "url": "assets/js/39.0850f27e.js",
    "revision": "ad95a4938e1ae62b9696e685a106146b"
  },
  {
    "url": "assets/js/4.36acaae9.js",
    "revision": "29dbc2dfb2a7c868c8c92c0771d882b9"
  },
  {
    "url": "assets/js/41.8467d1f8.js",
    "revision": "1d9ab7b4fab02a0cb16175f203653fb4"
  },
  {
    "url": "assets/js/5.71d445e8.js",
    "revision": "b09be4d868266cb3d5c21a74ff1d1235"
  },
  {
    "url": "assets/js/6.3d09d4c0.js",
    "revision": "5b955678aa7b87a5b190b0e12cdd93a0"
  },
  {
    "url": "assets/js/7.8cdd77c8.js",
    "revision": "8dfcb9703185fa8bbf9cfaaff9ba9740"
  },
  {
    "url": "assets/js/8.583b0f46.js",
    "revision": "3d48c3561546f8d8b1fe040766b8f24c"
  },
  {
    "url": "assets/js/9.4185eaa5.js",
    "revision": "bdd4231a7ce58219fb7449519a874840"
  },
  {
    "url": "assets/js/app.3c640ca0.js",
    "revision": "4781e092c7b7d3dd67e60a3095748e3b"
  },
  {
    "url": "assets/js/vendors~docsearch.8bdb2884.js",
    "revision": "1dc7282dc3e2408f5e5762c4ebaefb05"
  },
  {
    "url": "conclusion/index.html",
    "revision": "aa65d62b43404cb564bf0b4fdd94d610"
  },
  {
    "url": "design/index.html",
    "revision": "bb6e2d019ccbf3dbed4fd13f8d1da572"
  },
  {
    "url": "index.html",
    "revision": "49b38a3362e3c0d3572c9f1915a3f2d2"
  },
  {
    "url": "intro/index.html",
    "revision": "b9907c6a106d44e0697b61bfdeade1b4"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "46c3c280daad38dea0c41754ad346121"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "a6ea2b61db99f4d2d55a64a451e2bb9f"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "b5f1a86ffc630c920a813765a0254cb4"
  },
  {
    "url": "software/index.html",
    "revision": "efd8050fa103af3a67fd4f5c3a04bc21"
  },
  {
    "url": "test/index.html",
    "revision": "ec41d138c0dbfcbab8ea254e9ca0818d"
  },
  {
    "url": "use cases/index.html",
    "revision": "14116020b3d3a7fd4ed7dfbd978cc33b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
