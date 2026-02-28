export function getResultDescription(title: string) {

    if (title.includes('Wenig')) {

        return 'Du zeigst nur wenige Merkmale, die typisch für Hochsensibilität sind. Wahrscheinlich reagierst du durchschnittlich auf Reize, Emotionen und soziale Situationen.'
    }

    if (title.includes("einige")) {

        return 'Du erkennst dich in einigen Aspekten wieder, z.B. bei emotionaler oder sensorischer Sensibilität Möglicherweise bist du in bestimmten Lebensbereichen empfindsamer als andere.'
    }

    if (title.includes("stark")) {

        return 'Du bist in nahezu allen Bereichen hochsensibel. Du brauchst wahrscheinlich regelmäßig Rückzugsorte und besondere Strategien im Alltag, um dich nicht zu überfordern.'
    }

    if (title.includes("wahrscheinlich")) {

        return 'Viele Aussagen treffen auf dich zu. Du nimmst deine Umwelt wahrscheinlich tiefgründig und intensiv wahr. Achtsamkeit und Selbstfürsorge sind besonders wichtig für dein Wohlbefinden.'
    }
}