export const startClue = "Erik vid havet tänker på den nya födelsen i hans gård av pengar."

export const locationsData = [
    {
        locationID: 1,
        hint: "Den gyllene måsen är nära till hands och tittar ut över vattnet",
        acceptableAnswers: ["McDonalds anna lindh plats", "anna lindh plats McDonalds", "McDonalds anna lindhs plats", "anna lindhs plats McDonalds", "McDonalds anna linds plats", "anna linds plats McDonalds"],
        challenge: "Här är min beställning: Big Mac mål, 4 bitar chicken nuggets och en sundae utan topping.",
        challAnswer: "x",
        mainClueHint: "Vi lämnar fast mark och närmar oss något vars namn skulle kunna beskriva en helt vanlig bostad, men där alla har känt sig långt ifrån hemma.",
        pinPoint: [55.609215923055416, 12.996340692043304]
    },
    {
        locationID: 2,
        hint: "När solen går ner vaknar huset till liv. Fjärdedelar av ljud. Här stiger ljudet våning för våning. Från golv till golv förändras genren.",
        acceptableAnswers: ["etage", "étage"],
        challenge: "En lapp sitter uppsatt på en stolpe utanför Etage, leta upp den…",
        challAnswer: "Alla vill till himlen men ingen vill dö",
        mainClueHint: "Jag står där historien sitter i vägg, men jag är inte levande – ändå full av skägg. Här kan du resa i tid utan att gå, och möta både nutid och det som var då.",

    },
    {
        locationID: 3,
        hint: "Här lånas tankar ut utan att försvinna, och historier lämnar spår utan att gå vilse.",
        acceptableAnswers: ["stadsbiblioteket", "malmö stadsbibliotek"],
        challenge: "Ta er till ljusets kalender och leta upp nr 746",
        challAnswer: "Konst & Foto",
        mainClueHint: "Där språk och herrar byttes utan att jag flyttades. Jag var en dansk försvarsvakt, men blev svensk historia."
    },
    {
        locationID: 4,
        hint: "Jag är en krona som blivit till betong, och en prins som aldrig regerade.",
        acceptableAnswers: ["kronprinsen", "kronprinsen köpcentrum"],
        challenge: "Hitta skärmen där man kan få all information. Här letar vi efter nr 4…",
        challAnswer: "Hantverket",
        mainClueHint: "Jag är det mest kända slottet i Malmö, omringad av vallgravar visar jag upp min och stadens historia."
    }, {
        locationID: 5,
        hint: "Jag är där asfalt ger plats åt löv och tystare steg, där bänkar tar över efter trafikens brus. Jag ligger där stadens sista steg blir utsikt, och där mitt namn låter som havet intill.",
        acceptableAnswers: ["öresundspark", "öresundsparken"],
        challAnswer: "1959",
        challenge: "Leta efter skulpturen Vinden."
    }
];
export const endLocation =
{
    acceptableAnswers: ["malmö hus", "malmö hus slott", "malmö slott"],
    finalChallenge: "Beskriver vad de gör på sista platsen"
}