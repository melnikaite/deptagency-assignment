import "purecss";
import "../stylesheets/index.css";
import Alpine from "alpinejs";
window.Alpine = Alpine;

window.app = () => {
  return {
    isLoading: false,
    title: "",
    suggestions: [],
    trailer: "",
    async fetchResults() {
      if (!this.title) {
        this.suggestions = [];
        this.trailer = "";
        return;
      }
      this.isLoading = true;
      this.suggestions = await fetch(
        "/api/v1/search/" + encodeURIComponent(this.title)
      ).then(r => r.json());
      this.trailer = await fetch(
        "/api/v1/trailer/" + encodeURIComponent(this.title)
      ).then(r => r.json());
      this.$refs.player.load();
      this.isLoading = false;
    }
  };
};

Alpine.start();
