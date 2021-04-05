import { createServer, Model, RestSerializer } from "miragejs";
import { database } from "../database";

export default function setupMockServer() {

  createServer({
    serializers: {
      application: RestSerializer
    },
    models: {
      video: Model,
      playlist: Model,
      savevideo: Model,
      history: Model,
      note: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 2000;
      this.resource("videos");
      this.resource("playlists");
      this.resource("watchlater");
      this.resource("history");
      this.resource("notes");
    },

    seeds(server) {
      database.forEach((video) => {
        server.create("video", {
          ...video
        });
      });
      server.create("playlist", {
        id: 1,
        name: "My Playlist",
        description: "To learn sketching",
        videoList: ["ewMksAbgdBI", "lKzHqSlnJmo"]
      });
      server.create("savevideo", {
        videoList : ["ewMksAbgdBI"]
      });
      server.create("history", {
        videoList : [{videoid:"ewMksAbgdBI", date:"04-02-2021"}]
      });
      server.create("note", {
        id: "ewMksAbgdBI",
        notes: [{title: "Read more later", desc:"Did not understand about the shading part", time:"24"}]
      });


    }

  });
}
