export function getResultDescription(title: string) {

    if (title.includes('Wenig')) {

        return {
            description: 'Du zeigst nur wenige Merkmale, die typisch für Hochsensibilität sind. Wahrscheinlich reagierst du durchschnittlich auf Reize, Emotionen und soziale Situationen.',
            cta: 'das ist der text für wenig anzeichen'
        }
    }

    if (title.includes("einige")) {

        return {
            description: 'Du erkennst dich in einigen Aspekten wieder, z.B. bei emotionaler oder sensorischer Sensibilität Möglicherweise bist du in bestimmten Lebensbereichen empfindsamer als andere.',
            cta: 'das ist der text für einige anzeichen'
        }
    }

    if (title.includes("stark")) {

        return {
            description: 'Du bist in nahezu allen Bereichen hochsensibel. Du brauchst wahrscheinlich regelmäßig Rückzugsorte und besondere Strategien im Alltag, um dich nicht zu überfordern.',
            cta: 'das ist der text für starke anzeichen'
        }
    }

    if (title.includes("wahrscheinlich")) {

        return {
            description: 'Viele Aussagen treffen auf dich zu. Du nimmst deine Umwelt wahrscheinlich tiefgründig und intensiv wahr. Achtsamkeit und Selbstfürsorge sind besonders wichtig für dein Wohlbefinden.',
            cta: 'das ist der text für wahrscheinlich anzeichen'
        }
    }
    return {
        description: "",
        cta: ""
    }
}