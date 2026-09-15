import "@/styles/AdventCalendar.css";
import Container from "@/components/global/Container";
import {AdventCard} from "@/components/AdventCalendar/AdventCard";
import {getAdventCalendar} from "@/lib/strapi/generalHelper";
import AdventCalenderSubscription from "@/components/AdventCalendar/AdventCalenderSubscription";
import AdventModalButton from "@/components/AdventCalendar/AdventModalButton";

const days = [
    {day: 1, variant: "accent"},
    {day: 9},
    {day: 3},
    {day: 17},
    {day: 13},
    {day: 6, variant: "accent"},

    {day: 7},
    {day: 20},
    {day: 4, variant: "accent"},
    {day: 10},
    {day: 2, variant: "accent"},
    {day: 12},

    {day: 22, variant: "accent"},
    {day: 14},
    {day: 24},
    {day: 16},
    {day: 18},
    {day: 23},

    {day: 19},
    {day: 8},
    {day: 21, variant: "accent"},
    {day: 11},
    {day: 15, variant: "accent"},
    {day: 5},
];


export default async function AdventCalendar() {
    const {data} = await getAdventCalendar()
    const calendarItems = data?.items
    return (
        <Container id="calendarPage">

            <div className="adventCalendar">
                { days.map((item, index) => {
                    const itemContent = calendarItems[item.day-1]
                    return <AdventCard
                        key={ item.day }
                        day={ item.day}
                        content={ itemContent }
                        variant={ item.variant }
                        isText={ itemContent?.isText }
                        image={ itemContent?.image }
                        youtube={ itemContent?.youtube }
                        index={ index }
                    />
                }) }
            </div>
            <AdventModalButton />
        </Container>
    );
}