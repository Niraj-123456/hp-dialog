export class Dialog {
  wrapper: HTMLElement;
  accessible: boolean;
  showCallback: any;
  hideCallback: any;
  constructor(selector: any, options: any) {
    const settings = Object.assign(
      {},
      {
        // Style
        background: "black",
        opacity: 0.75,
        duration: 250,
        animation: "ease-in",

        // Navigation
        escape: true,
        overlay: true,

        // Extras
        accessible: true,

        // Callbacks
        onShow: null,
        onHide: null,

        document,
      },
      options
    );

    this.wrapper = settings.document.querySelector(selector);
    this.wrapper.className = "modaly-wrapper";
    this.hide();

    // Set animation duration to zero if opacity is 0.
    if (settings.opacity === 0) {
      settings.duration = 0;
    }

    // Setup style properties.
    this.wrapper.style.setProperty("--background", settings.background);
    this.wrapper.style.setProperty("--animation", settings.animation);
    this.wrapper.style.setProperty("--opacity", settings.opacity);

    // Avoid inital flash
    this.wrapper.style.setProperty("--duration", "0s");
    setTimeout(() => {
      this.wrapper.style.setProperty("--duration", `${settings.duration}ms`);
      this.wrapper.style.display = "block";
    }, settings.duration);

    // Add accessibility attributes.
    this.accessible = settings.accessible;
    if (this.accessible) {
      this.wrapper.setAttribute("role", "dialog");
      this.wrapper.setAttribute("aria-modal", "true");
      this.wrapper.setAttribute("aria-hidden", "true");
    }

    // Bind callbacks.
    this.showCallback = settings.onShow;
    this.hideCallback = settings.onHide;

    // Bind every open trigger.
    const openTriggers = settings.document.querySelectorAll(
      `[data-modaly-open='${selector}']`
    );
    
    openTriggers.forEach((trigger: any) =>
      trigger.addEventListener("click", () => this.show(trigger))
    );

    // Bind every open trigger.
    const closeTriggers = this.wrapper.querySelectorAll("[data-modaly-close]");
    closeTriggers.forEach((trigger) => {
      // For assistive technologies.
      if (this.accessible) {
        trigger.setAttribute("aria-label", "close this dialog");
      }

      trigger.addEventListener("click", (event) => {
        // To prevent overlay for triggering click.
        event.stopPropagation();

        this.hide(trigger);
      });
    });

    // Bind ESC key with modal closing.
    if (settings.escape) {
      settings.document.addEventListener("keyup", (event: any) => {
        const key = event.key || event.keyCode;

        if (key === "Escape" || key === "Esc" || key === 27) {
          this.hide();
        }
      });
    }

    // Bind overlay click with modal closing.
    if (settings.overlay) {
      this.wrapper.addEventListener("click", () => {
        this.hide();
      });
    }
  }

  show(trigger: any = null) {
    console.log("I am here", this.showCallback);
    if (this.showCallback) this.showCallback(this.wrapper, trigger);
    if (this.accessible) this.wrapper.setAttribute("aria-hidden", "false");
    this.wrapper.classList.remove("modaly-hidden");
  }

  hide(trigger: any = null) {
    if (this.hideCallback) this.hideCallback(this.wrapper, trigger);
    if (this.accessible) this.wrapper.setAttribute("aria-hidden", "true");
    this.wrapper.classList.add("modaly-hidden");
  }
}
