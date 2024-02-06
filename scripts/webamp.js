if (window.innerWidth > window.innerHeight/1.2) {
  const Webamp = window.Webamp;
  const player = new Webamp({
    initialTracks: [
      {
        metaData: {
          artist: "Origami Repetika",
          title: "From The Sparkles In Your Eyes",
        },
        url: "music/ftsiye.mp3",
        duration: 186,
      },
      {
        metaData: {
          artist: "Ketsa",
          title: "Caught Out",
        },
        url: "music/co.mp3",
        duration: 180,
      },
      {
        metaData: {
          artist: "Aldous Ichnite",
          title: "Nebulous Twilight",
        },
        url: "music/nt.mp3",
        duration: 110,
      },
      {
        metaData: {
          artist: "Ketsa",
          title: "Bustle Beat",
        },
        url: "music/bb.mp3",
        duration: 184,
      },
      {
        metaData: {
          artist: "Ketsa",
          title: "Who Needs Saving",
        },
        url: "music/wns.mp3",
        duration: 191,
      },
    ],
    initialSkin: {
      url: 
   "/misc/dosamp.wsz"
  },
  }).renderWhenReady(document.getElementById("app"));
}
