import mixpanel from "mixpanel-browser";

export async function init() {
  miro.board.ui.on("icon:click", async () => {
    const { waitForClose } = await miro.board.ui.openPanel({ url: "app.html" });

    await waitForClose().then(() => { 
      mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
        debug: false,
        track_pageview: false,
        persistence: "localStorage",
      });
      mixpanel.track("Chat ended", {});
    });
  });
}

init();
