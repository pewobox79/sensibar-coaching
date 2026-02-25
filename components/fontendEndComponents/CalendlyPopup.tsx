'use client'

import {useEffect, useRef} from "react";

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_URL =
  "https://calendly.com/hello-sensibar-coaching/30min?hide_gdpr_banner=1&text_color=171717&primary_color=e6d3c6";

const CalendlyPopup = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_SCRIPT_SRC}"]`
    );

    const renderWidget = () => {
      if (!containerRef.current) return;

      containerRef.current.innerHTML = "";
      const widgetDiv = document.createElement("div");
      widgetDiv.className = "calendly-inline-widget";
      widgetDiv.setAttribute("data-url", CALENDLY_URL);
      widgetDiv.style.minWidth = "320px";
      widgetDiv.style.height = "700px";
      containerRef.current.appendChild(widgetDiv);

      const w = window as any;
      if (w.Calendly?.initInlineWidget) {
        w.Calendly.initInlineWidget({url: CALENDLY_URL, parentElement: widgetDiv});
      }
    };

    if (existingScript) {
      renderWidget();
      return;
    }

    const script = document.createElement("script");
    script.src = CALENDLY_SCRIPT_SRC;
    script.async = true;
    script.onload = renderWidget;
    document.body.appendChild(script);

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return <div ref={containerRef} />;
};

export default CalendlyPopup;