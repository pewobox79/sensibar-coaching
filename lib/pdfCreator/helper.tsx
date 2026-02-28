export function getResultDescription(title: string) {

    const ctaNoSensible = 'Dein Ergebnis zeigt, dass Hochsensibilität bei dir keine große Rolle spielt. Vielleicht hilft dir diese Erkenntnis schon, deinen Alltag noch bewusster wahrzunehmen. Wenn du jemanden kennst – privat oder beruflich –, für den der Test interessant sein könnte, freue ich mich sehr, wenn du ihn weiterempfiehlst. Herzliche Grüße, Yessica'
    const ctaHochsensibel = 'Dein Ergebnis weist auf Hochsensibilität hin – wenn du mehr darüber erfahren und deine aktuellen Herausforderungen besser verstehen möchtest, dann scanne einfach den QR-Code und lass uns persönlich ins Gespräch kommen. Oft braucht es gar nicht viel, um eine spürbare Veränderung zu erreichen.'
    if (title.includes('wenig')) {

        return {
            description: 'Du zeigst nur wenige Merkmale, die typisch für Hochsensibilität sind. Wahrscheinlich reagierst du durchschnittlich auf Reize, Emotionen und soziale Situationen.',
            cta: ctaNoSensible
        }
    }

    if (title.includes("einige")) {

        return {
            description: 'Du erkennst dich in einigen Aspekten wieder, z.B. bei emotionaler oder sensorischer Sensibilität Möglicherweise bist du in bestimmten Lebensbereichen empfindsamer als andere.',
            cta: ctaHochsensibel    }
    }

    if (title.includes("stark")) {

        return {
            description: 'Du bist in nahezu allen Bereichen hochsensibel. Du brauchst wahrscheinlich regelmäßig Rückzugsorte und besondere Strategien im Alltag, um dich nicht zu überfordern.',
            cta: ctaHochsensibel
        }
    }

    if (title.includes("wahrscheinlich")) {

        return {
            description: 'Viele Aussagen treffen auf dich zu. Du nimmst deine Umwelt wahrscheinlich tiefgründig und intensiv wahr. Achtsamkeit und Selbstfürsorge sind besonders wichtig für dein Wohlbefinden.',
            cta: ctaHochsensibel
        }
    }
    return {
        description: "",
        cta: ""
    }
}