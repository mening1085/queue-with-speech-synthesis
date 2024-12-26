export default defineNuxtPlugin(() => {
  const loadResponsiveVoice = () => {
    return new Promise((resolve, reject) => {
      if (typeof window !== "undefined" && window.responsiveVoice) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src =
          "https://code.responsivevoice.org/responsivevoice.js?key=x8lqEoFo";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Failed to load ResponsiveVoice."));
        document.head.appendChild(script);
      }
    });
  };

  return {
    provide: {
      loadResponsiveVoice,
    },
  };
});
